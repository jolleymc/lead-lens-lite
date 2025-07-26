import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { lead, scriptType } = await req.json();

    const systemPrompt = scriptType === 'cold-call' 
      ? `You are an expert sales consultant creating cold call scripts. Create a professional, conversational cold call script that sounds natural and engaging. Focus on building rapport, identifying pain points, and scheduling a follow-up meeting. Keep it concise (30-60 seconds for the opener).`
      : `You are an expert sales consultant creating cold email templates. Create a professional, personalized cold email that's concise, value-focused, and has a clear call-to-action. Use a compelling subject line and keep the email brief but impactful.`;

    const userPrompt = `Create a ${scriptType === 'cold-call' ? 'cold call script' : 'cold email'} for Lansdowne Technology Consulting targeting:

Business: ${lead.businessName}
Contact: ${lead.contactName}
Industry: ${lead.industry}
Location: ${lead.location}
Current Web Quality: ${lead.currentWebQuality || 'Not specified'}
Lead Source: ${lead.source}

Our company (Lansdowne Technology Consulting) specializes in web development and technology solutions. Focus on how we can improve their web presence and technology infrastructure. ${scriptType === 'cold-call' ? 'Make it sound conversational and natural for a phone call.' : 'Include a compelling subject line.'}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const script = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      script,
      scriptType 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-script function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});