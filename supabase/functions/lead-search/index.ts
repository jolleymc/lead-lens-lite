import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SearchCriteria {
  industry?: string;
  location?: string;
  companySize?: string;
  keywords?: string;
}

interface BusinessLead {
  companyName: string;
  website: string;
  phone?: string;
  email?: string;
  location?: string;
  industry?: string;
  score: number;
  websiteIssues: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { searchType, criteria } = await req.json();
    console.log('Search request:', { searchType, criteria });

    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

    if (!firecrawlApiKey || !perplexityApiKey) {
      throw new Error('Missing required API keys');
    }

    let leads: BusinessLead[] = [];

    if (searchType === 'badWebsites') {
      leads = await findBusinessesWithPoorWebsites(criteria, perplexityApiKey, firecrawlApiKey);
    } else {
      leads = await findBusinessesByCriteria(criteria, perplexityApiKey, firecrawlApiKey);
    }

    return new Response(JSON.stringify({ leads }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in lead-search function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function findBusinessesWithPoorWebsites(
  criteria: SearchCriteria,
  perplexityApiKey: string,
  firecrawlApiKey: string
): Promise<BusinessLead[]> {
  console.log('Searching for businesses with poor websites...');
  
  // Use Perplexity to find local businesses
  const location = criteria.location || 'United States';
  const industry = criteria.industry || 'small business';
  const query = `Find 10 local businesses in ${location} ${industry !== 'small business' ? `in the ${industry} industry` : ''} that likely need website improvements. Include business names and websites if available.`;
  
  const businesses = await searchWithPerplexity(query, perplexityApiKey);
  const leads: BusinessLead[] = [];

  for (const business of businesses.slice(0, 5)) {
    try {
      const websiteAnalysis = await analyzeWebsiteWithFirecrawl(business.website, firecrawlApiKey);
      const score = calculateLeadScore(business, websiteAnalysis);
      
      leads.push({
        companyName: business.name,
        website: business.website,
        phone: business.phone || undefined,
        email: business.email || undefined,
        location: business.location || criteria.location,
        industry: business.industry || criteria.industry,
        score,
        websiteIssues: websiteAnalysis.issues
      });
    } catch (error) {
      console.error(`Error analyzing ${business.name}:`, error);
      // Add business with basic info even if analysis fails
      leads.push({
        companyName: business.name,
        website: business.website,
        location: business.location || criteria.location,
        industry: business.industry || criteria.industry,
        score: 60,
        websiteIssues: ['Website analysis unavailable']
      });
    }
  }

  return leads;
}

async function findBusinessesByCriteria(
  criteria: SearchCriteria,
  perplexityApiKey: string,
  firecrawlApiKey: string
): Promise<BusinessLead[]> {
  console.log('Searching businesses by criteria...');
  
  const location = criteria.location || 'United States';
  const industry = criteria.industry || 'business';
  const query = `Find 10 businesses in ${location} ${industry !== 'business' ? `in the ${industry} industry` : ''} ${criteria.companySize ? `that are ${criteria.companySize} companies` : ''} ${criteria.keywords ? `related to ${criteria.keywords}` : ''}. Include business names, websites, and contact information.`;
  
  const businesses = await searchWithPerplexity(query, perplexityApiKey);
  const leads: BusinessLead[] = [];

  for (const business of businesses.slice(0, 8)) {
    try {
      let websiteAnalysis = { issues: [] as string[] };
      if (business.website) {
        websiteAnalysis = await analyzeWebsiteWithFirecrawl(business.website, firecrawlApiKey);
      }
      
      const score = calculateLeadScore(business, websiteAnalysis);
      
      leads.push({
        companyName: business.name,
        website: business.website || `https://${business.name.toLowerCase().replace(/\s+/g, '')}.com`,
        phone: business.phone || undefined,
        email: business.email || undefined,
        location: business.location || criteria.location,
        industry: business.industry || criteria.industry,
        score,
        websiteIssues: websiteAnalysis.issues
      });
    } catch (error) {
      console.error(`Error processing ${business.name}:`, error);
    }
  }

  return leads;
}

async function searchWithPerplexity(query: string, apiKey: string): Promise<any[]> {
  console.log('Searching with Perplexity:', query);
  
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [
        {
          role: 'system',
          content: 'You are a business research assistant. Return business information in a structured JSON array format with fields: name, website, phone, email, location, industry. Always return valid JSON.'
        },
        {
          role: 'user',
          content: query
        }
      ],
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 2000,
      return_images: false,
      return_related_questions: false,
      frequency_penalty: 1,
      presence_penalty: 0
    }),
  });

  if (!response.ok) {
    throw new Error(`Perplexity API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback: parse manually if JSON is not properly formatted
    return parseBusinessListFromText(content);
  } catch (error) {
    console.error('Error parsing Perplexity response:', error);
    return parseBusinessListFromText(content);
  }
}

function parseBusinessListFromText(text: string): any[] {
  const businesses = [];
  const lines = text.split('\n');
  
  let currentBusiness: any = {};
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Look for business names (often numbered or bulleted)
    if (/^\d+\.|\-|\*/.test(trimmed)) {
      if (currentBusiness.name) {
        businesses.push(currentBusiness);
      }
      currentBusiness = { name: trimmed.replace(/^\d+\.|\-|\*\s*/, '') };
    }
    
    // Extract website
    const websiteMatch = trimmed.match(/(?:website|site|www)[:\s]*(https?:\/\/[^\s]+|www\.[^\s]+|\w+\.\w+)/i);
    if (websiteMatch) {
      let website = websiteMatch[1];
      if (!website.startsWith('http')) {
        website = 'https://' + website;
      }
      currentBusiness.website = website;
    }
    
    // Extract phone
    const phoneMatch = trimmed.match(/(?:phone|tel)[:\s]*(\+?[\d\s\-\(\)\.]+)/i);
    if (phoneMatch) {
      currentBusiness.phone = phoneMatch[1].trim();
    }
    
    // Extract email
    const emailMatch = trimmed.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch) {
      currentBusiness.email = emailMatch[1];
    }
  }
  
  if (currentBusiness.name) {
    businesses.push(currentBusiness);
  }
  
  return businesses.slice(0, 10);
}

async function analyzeWebsiteWithFirecrawl(websiteUrl: string, apiKey: string): Promise<{ issues: string[] }> {
  console.log('Analyzing website with Firecrawl:', websiteUrl);
  
  try {
    const response = await fetch('https://api.firecrawl.dev/v0/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: websiteUrl,
        formats: ['markdown'],
        onlyMainContent: true
      }),
    });

    if (!response.ok) {
      throw new Error(`Firecrawl API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.data?.markdown || '';
    
    // Analyze the content for common website issues
    const issues = [];
    
    if (content.length < 500) {
      issues.push('Very limited content');
    }
    
    if (!/contact|phone|email|about/i.test(content)) {
      issues.push('Missing contact information');
    }
    
    if (!/services|products|what we do/i.test(content)) {
      issues.push('Unclear service offerings');
    }
    
    if (content.includes('coming soon') || content.includes('under construction')) {
      issues.push('Website under construction');
    }
    
    if (!/\d{4}/.test(content)) {
      issues.push('No recent updates visible');
    }
    
    return { issues };
  } catch (error) {
    console.error('Firecrawl analysis error:', error);
    return { issues: ['Website analysis failed'] };
  }
}

function calculateLeadScore(business: any, websiteAnalysis: { issues: string[] }): number {
  let score = 50; // Base score
  
  // Boost score based on available contact info
  if (business.phone) score += 15;
  if (business.email) score += 15;
  if (business.website) score += 10;
  
  // Reduce score for website issues
  score -= websiteAnalysis.issues.length * 5;
  
  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, score));
}