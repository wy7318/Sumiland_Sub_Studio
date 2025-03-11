/*
  # Update leads table for cookie tracking

  1. Changes
    - Add new columns for visitor tracking:
      - `visitor_id`: Links to cookie tracking
      - `first_visit`: Timestamp of first website visit
      - `last_visit`: Timestamp of most recent visit
      - `visit_count`: Number of page visits
      - `pages_viewed`: Array of viewed page URLs
      - `total_time_spent`: Total time spent on site in seconds
      - `referrer`: Initial referrer URL
      - `utm_source`: UTM source parameter
      - `utm_medium`: UTM medium parameter
      - `utm_campaign`: UTM campaign parameter
      - `device_type`: User's device type
      - `browser`: User's browser
      - `location`: User's general location (country/city)

  2. Notes
    - All new columns are nullable to maintain compatibility with existing records
    - Existing data and columns are preserved
    - Added appropriate indexes for performance
*/

-- Add new columns for visitor tracking
DO $$ 
BEGIN
  -- Visitor identification
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'visitor_id') THEN
    ALTER TABLE leads ADD COLUMN visitor_id uuid;
  END IF;

  -- Visit timing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'first_visit') THEN
    ALTER TABLE leads ADD COLUMN first_visit timestamptz;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'last_visit') THEN
    ALTER TABLE leads ADD COLUMN last_visit timestamptz;
  END IF;

  -- Visit metrics
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'visit_count') THEN
    ALTER TABLE leads ADD COLUMN visit_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'pages_viewed') THEN
    ALTER TABLE leads ADD COLUMN pages_viewed text[] DEFAULT ARRAY[]::text[];
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'total_time_spent') THEN
    ALTER TABLE leads ADD COLUMN total_time_spent integer DEFAULT 0;
  END IF;

  -- Attribution
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'referrer') THEN
    ALTER TABLE leads ADD COLUMN referrer text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'utm_source') THEN
    ALTER TABLE leads ADD COLUMN utm_source text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'utm_medium') THEN
    ALTER TABLE leads ADD COLUMN utm_medium text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'utm_campaign') THEN
    ALTER TABLE leads ADD COLUMN utm_campaign text;
  END IF;

  -- User context
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'device_type') THEN
    ALTER TABLE leads ADD COLUMN device_type text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'browser') THEN
    ALTER TABLE leads ADD COLUMN browser text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'location') THEN
    ALTER TABLE leads ADD COLUMN location text;
  END IF;
END $$;

-- Add indexes for performance
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'leads' AND indexname = 'idx_leads_visitor_id') THEN
    CREATE INDEX idx_leads_visitor_id ON leads(visitor_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'leads' AND indexname = 'idx_leads_first_visit') THEN
    CREATE INDEX idx_leads_first_visit ON leads(first_visit);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'leads' AND indexname = 'idx_leads_last_visit') THEN
    CREATE INDEX idx_leads_last_visit ON leads(last_visit);
  END IF;
END $$;

-- Update RLS policies to include new columns
DO $$
BEGIN
  DROP POLICY IF EXISTS "Organization members can read leads" ON leads;
  
  CREATE POLICY "Organization members can read leads"
    ON leads
    FOR SELECT
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM organization_members
        WHERE organization_members.organization_id = leads.organization_id
        AND organization_members.user_id = auth.uid()
      )
    );
END $$;