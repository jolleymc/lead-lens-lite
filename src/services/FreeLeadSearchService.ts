import { supabase } from "@/integrations/supabase/client";

export interface SearchCriteria {
  industry?: string;
  location?: string;
  companySize?: string;
  keywords?: string;
}

export interface DiscoveredLead {
  id: string;
  companyName: string;
  website: string;
  phone?: string;
  email?: string;
  location?: string;
  industry?: string;
  companySize?: string;
  score: number;
  source: string;
  websiteIssues: string[];
}

export class FreeLeadSearchService {
  static async searchLeads(searchType: 'badWebsites' | 'criteria', criteria: SearchCriteria): Promise<DiscoveredLead[]> {
    try {
      console.log('Calling free lead search function with:', { searchType, criteria });
      
      const { data, error } = await supabase.functions.invoke('free-lead-search', {
        body: { searchType, criteria }
      });

      if (error) {
        console.error('Free search function error:', error);
        throw new Error(`Search failed: ${error.message}`);
      }

      if (!data?.leads) {
        console.warn('No leads returned from free search');
        return [];
      }

      // Transform the results to match our interface
      return data.leads.map((lead: any, index: number) => ({
        id: `free-search-${Date.now()}-${index}`,
        companyName: lead.companyName,
        website: lead.website,
        phone: lead.phone,
        email: lead.email,
        location: lead.location || 'Location not available',
        industry: lead.industry || 'Industry not specified',
        companySize: lead.companySize || 'Size not available',
        score: lead.score,
        source: 'Free Search',
        websiteIssues: lead.websiteIssues || []
      }));
    } catch (error) {
      console.error('Free lead search service error:', error);
      throw error;
    }
  }
}