import Cookies from 'js-cookie';
import { supabase } from './supabase';

interface TrackingData {
  page_url: string;
  referrer: string;
  time_spent: number;
  visitor_id: string;
  organization_id: string;
}

const ORGANIZATION_ID = '4d1b70f4-dd23-48b7-8697-29e9f47cc1de';
const LEAD_CREATION_THRESHOLD = 3; // Number of page views before creating a lead
const TIME_THRESHOLD = 120; // Time in seconds (2 minutes) before creating a lead

export const tracking = {
  startTime: Date.now(),
  pageViewCount: 0,
  
  // Initialize tracking
  init() {
    console.log('Cookie consent:', Cookies.get('cookie-consent')); // Debugging
    // Check if cookies are accepted
    const cookieConsent = Cookies.get('cookie-consent');
    if (cookieConsent !== 'true') return;

    // Get or create visitor ID
    let visitorId = Cookies.get('visitor_id');
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      console.log('Generated new visitor_id:', visitorId); // Debugging
      Cookies.set('visitor_id', visitorId, { expires: 365 });
    }

    // Initialize page view count
    this.pageViewCount = parseInt(Cookies.get('page_view_count') || '0', 10);

    // Track page view
    this.trackPageView();

    // Add event listeners for tracking
    window.addEventListener('beforeunload', () => this.trackTimeSpent());

    // Check time spent every minute
    setInterval(() => this.checkTimeThreshold(), 60000);
  },

  // Track page view
  async trackPageView() {
    const cookieConsent = Cookies.get('cookie-consent');
    if (cookieConsent !== 'true') return;

    const visitorId = Cookies.get('visitor_id');
    if (!visitorId) return;

    // Increment page view count
    this.pageViewCount++;
    Cookies.set('page_view_count', this.pageViewCount.toString());

    const data: TrackingData = {
      page_url: window.location.pathname,
      referrer: document.referrer,
      time_spent: 0,
      visitor_id: visitorId,
      organization_id: ORGANIZATION_ID
    };

    try {
      await supabase.from('page_views').insert([data]);

      // Check if we should create a lead based on page views
      if (this.pageViewCount >= LEAD_CREATION_THRESHOLD) {
        await this.createLead(visitorId);
      }
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  },

  // Check time threshold
  async checkTimeThreshold() {
    const cookieConsent = Cookies.get('cookie-consent');
    if (cookieConsent !== 'true') return;

    const visitorId = Cookies.get('visitor_id');
    if (!visitorId) return;

    const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
    if (timeSpent >= TIME_THRESHOLD) {
      await this.createLead(visitorId);
    }
  },

  // Track time spent on page
  async trackTimeSpent() {
    const cookieConsent = Cookies.get('cookie-consent');
    if (cookieConsent !== 'true') return;

    const visitorId = Cookies.get('visitor_id');
    if (!visitorId) return;

    const timeSpent = Math.round((Date.now() - this.startTime) / 1000); // Convert to seconds

    try {
      await supabase.from('page_views')
        .update({ time_spent: timeSpent })
        .eq('visitor_id', visitorId)
        .eq('page_url', window.location.pathname)
        .order('created_at', { ascending: false })
        .limit(1);

      // Check if we should create a lead based on time spent
      if (timeSpent >= TIME_THRESHOLD) {
        await this.createLead(visitorId);
      }
    } catch (error) {
      console.error('Error tracking time spent:', error);
    }
  },

  // Create lead from visitor
  async createLead(visitorId: string) {
    try {
      // Check if lead already exists
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id')
        .eq('visitor_id', visitorId)
        .single();

      if (existingLead) return;

      // Get visitor's page views
      const { data: pageViews } = await supabase
        .from('page_views')
        .select('*')
        .eq('visitor_id', visitorId)
        .order('created_at', { ascending: true });

      if (!pageViews?.length) return;

      // Create lead
      await supabase.from('leads').insert([{
        first_name: 'cookie',
        last_name: 'Lead',
        email: 'cookieLead@notvalid.com',
        visitor_id: visitorId,
        organization_id: ORGANIZATION_ID,
        lead_source: 'web',
        status: 'new',
        first_visit: pageViews[0].created_at,
        last_visit: pageViews[pageViews.length - 1].created_at,
        visit_count: pageViews.length,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error creating lead:', error);
    }
  }
};