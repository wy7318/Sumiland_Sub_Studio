/*
  # Create tracking tables for visitor analytics

  1. New Tables
    - `page_views`
      - Tracks individual page views with timing and referrer data
    - `leads`
      - Stores potential leads based on visitor behavior

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read data
*/

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id uuid NOT NULL,
  organization_id uuid NOT NULL REFERENCES organizations(id),
  page_url text NOT NULL,
  referrer text,
  time_spent integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id uuid NOT NULL,
  organization_id uuid NOT NULL REFERENCES organizations(id),
  lead_source text NOT NULL,
  status text NOT NULL,
  first_visit timestamptz NOT NULL,
  last_visit timestamptz NOT NULL,
  visit_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Organization members can read page_views"
  ON page_views
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM organization_members
      WHERE organization_members.organization_id = page_views.organization_id
      AND organization_members.user_id = auth.uid()
    )
  );

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

-- Create indexes
CREATE INDEX idx_page_views_visitor_id ON page_views(visitor_id);
CREATE INDEX idx_page_views_organization_id ON page_views(organization_id);
CREATE INDEX idx_leads_visitor_id ON leads(visitor_id);
CREATE INDEX idx_leads_organization_id ON leads(organization_id);