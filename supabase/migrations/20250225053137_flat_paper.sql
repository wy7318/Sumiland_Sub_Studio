-- Drop existing trigger and functions
DROP TRIGGER IF EXISTS quote_approval_trigger ON quote_hdr CASCADE;
DROP FUNCTION IF EXISTS handle_quote_approval() CASCADE;
DROP FUNCTION IF EXISTS approve_quote_and_create_order(uuid, uuid) CASCADE;

-- Create function to handle quote approval and order creation
CREATE OR REPLACE FUNCTION approve_quote_and_create_order(
  quote_id_param uuid,
  user_id_param uuid
)
RETURNS uuid AS $$
DECLARE
  new_order_id uuid;
  quote_record RECORD;
BEGIN
  -- Start an explicit transaction block with serializable isolation
  -- This ensures complete isolation of concurrent transactions
  SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

  -- First check if order exists without locking
  IF EXISTS (
    SELECT 1 
    FROM order_hdr 
    WHERE quote_id = quote_id_param
  ) THEN
    RAISE EXCEPTION 'Order already exists for this quote';
  END IF;

  -- Get quote information with FOR UPDATE SKIP LOCKED
  -- This allows concurrent transactions to skip locked rows instead of waiting
  SELECT 
    q.quote_id,
    q.customer_id,
    q.vendor_id,
    q.organization_id,
    q.total_amount,
    q.notes,
    q.status
  INTO quote_record
  FROM quote_hdr q
  WHERE q.quote_id = quote_id_param
  FOR UPDATE SKIP LOCKED;

  -- Basic validations
  IF quote_record.quote_id IS NULL THEN
    RAISE EXCEPTION 'Quote not found or is being processed by another user';
  END IF;

  IF quote_record.status = 'Approved' THEN
    RAISE EXCEPTION 'Quote is already approved';
  END IF;

  IF quote_record.status NOT IN ('Pending', 'Draft') THEN
    RAISE EXCEPTION 'Quote cannot be approved because it is %', quote_record.status;
  END IF;

  -- Double-check for existing order after acquiring lock
  -- This prevents race conditions between check and insert
  IF EXISTS (
    SELECT 1 
    FROM order_hdr 
    WHERE quote_id = quote_id_param
    FOR UPDATE SKIP LOCKED
  ) THEN
    RAISE EXCEPTION 'Order already exists for this quote';
  END IF;

  -- Create order
  INSERT INTO order_hdr (
    order_number,
    customer_id,
    vendor_id,
    organization_id,
    total_amount,
    quote_id,
    created_by,
    updated_by,
    notes,
    status,
    payment_status,
    payment_amount
  )
  VALUES (
    generate_order_number(quote_record.organization_id),
    quote_record.customer_id,
    quote_record.vendor_id,
    quote_record.organization_id,
    quote_record.total_amount,
    quote_id_param,
    user_id_param,
    user_id_param,
    quote_record.notes,
    'New'::order_status,
    'Pending'::payment_status,
    0
  )
  RETURNING order_id INTO new_order_id;
  
  -- Copy quote details to order details
  INSERT INTO order_dtl (
    order_id,
    product_id,
    quantity,
    unit_price,
    subtotal,
    notes,
    organization_id
  )
  SELECT
    new_order_id,
    NULL,
    quantity,
    unit_price,
    quantity * unit_price,
    item_desc,
    quote_record.organization_id
  FROM quote_dtl
  WHERE quote_id = quote_id_param;
  
  -- Update quote status
  UPDATE quote_hdr
  SET 
    status = 'Approved',
    updated_at = now(),
    updated_by = user_id_param
  WHERE quote_id = quote_id_param;
  
  RETURN new_order_id;
EXCEPTION
  WHEN serialization_failure THEN
    -- Handle serialization failures by telling the client to retry
    RAISE EXCEPTION 'Transaction failed due to concurrent access, please try again';
  WHEN OTHERS THEN
    -- Re-raise other errors
    RAISE;
END;
$$ LANGUAGE plpgsql;

-- Create minimal trigger function
CREATE OR REPLACE FUNCTION handle_quote_approval()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if status is being changed to Approved
  IF NEW.status = 'Approved' AND OLD.status != 'Approved' THEN
    BEGIN
      -- Attempt to approve quote and create order
      PERFORM approve_quote_and_create_order(NEW.quote_id, COALESCE(NEW.updated_by, NEW.created_by));
    EXCEPTION
      WHEN OTHERS THEN
        -- On any error, reset status and re-raise
        NEW.status := OLD.status;
        RAISE;
    END;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER quote_approval_trigger
  BEFORE UPDATE OF status
  ON quote_hdr
  FOR EACH ROW
  WHEN (NEW.status = 'Approved' AND OLD.status != 'Approved')
  EXECUTE FUNCTION handle_quote_approval();

-- Add comments
COMMENT ON FUNCTION approve_quote_and_create_order(uuid, uuid) IS 
'Handles quote approval and order creation with serializable isolation.
Uses SKIP LOCKED to handle concurrent access without blocking.
Double-checks order existence to prevent race conditions.
Provides clear error messages for all failure cases.';

COMMENT ON FUNCTION handle_quote_approval() IS 
'Minimal trigger function that safely handles quote approval.
Resets quote status on any error to maintain consistency.';