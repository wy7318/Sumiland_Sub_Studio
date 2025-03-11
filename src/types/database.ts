export interface Post {
  id: uuid;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  author_id: string;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  organization_id: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  organization_id: string;
}

export interface Lead {
  id: string;
  organization_id: string;
  customer_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  company?: string;
  website?: string;
  phone?: string;
  description?: string;
  product_interest?: string;
  email_opt_out: boolean;
  status: string;
  lead_source: string;
  owner_id?: string;
  is_converted: boolean;
  converted_at?: string;
  converted_by?: string;
  created_at: string;
  created_by?: string;
  updated_at: string;
  updated_by?: string;
}

export interface Case {
  id: string;
  title: string;
  type: string;
  sub_type: string;
  status: string;
  contact_id?: string;
  owner_id?: string;
  description: string;
  resume_url?: string;
  created_at: string;
  created_by?: string;
  updated_at: string;
  updated_by?: string;
  organization_id: string;
  attachment_url?: string;
}