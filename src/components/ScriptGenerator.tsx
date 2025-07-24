import { useState } from 'react';
import { Lead } from '@/types/lead';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Copy, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ScriptGeneratorProps {
  lead: Lead;
}

export const ScriptGenerator = ({ lead }: ScriptGeneratorProps) => {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [scriptType, setScriptType] = useState<'cold-call' | 'email'>('cold-call');
  const [generatedScript, setGeneratedScript] = useState('');
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter your OpenAI API key');
      return;
    }

    setLoading(true);
    try {
      const systemPrompt = scriptType === 'cold-call' 
        ? `You are an expert sales consultant creating cold call scripts. Create a professional, conversational cold call script that sounds natural and engaging. Focus on building rapport, identifying pain points, and scheduling a follow-up meeting. Keep it concise (30-60 seconds for the opener).`
        : `You are an expert sales consultant creating cold email templates. Create a professional, personalized cold email that's concise, value-focused, and has a clear call-to-action. Use a compelling subject line and keep the email brief but impactful.`;

      const userPrompt = `Create a ${scriptType === 'cold-call' ? 'cold call script' : 'cold email'} for Lansdowne Technology Consulting targeting:

Business: ${lead.businessName}
Contact: ${lead.contactName}
Industry: ${lead.industry}
Location: ${lead.location}
Current Web Quality: ${lead.currentWebQuality}
Lead Source: ${lead.source}

Our company (Lansdowne Technology Consulting) specializes in web development and technology solutions. Focus on how we can improve their web presence and technology infrastructure. ${scriptType === 'cold-call' ? 'Make it sound conversational and natural for a phone call.' : 'Include a compelling subject line.'}`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
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
        throw new Error('Failed to generate script');
      }

      const data = await response.json();
      const script = data.choices[0].message.content;
      setGeneratedScript(script);
      toast.success(`${scriptType === 'cold-call' ? 'Call script' : 'Email template'} generated successfully!`);
    } catch (error) {
      console.error('Error generating script:', error);
      toast.error('Failed to generate script. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedScript);
    toast.success('Script copied to clipboard!');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageSquare className="h-4 w-4 mr-1" />
          AI Script
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Generate AI Script for {lead.businessName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This requires an OpenAI API key. Your key is only used for this request and not stored.
                Get your API key from{' '}
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">
                  OpenAI Platform
                </a>
              </p>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="apiKey">OpenAI API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="scriptType">Script Type</Label>
            <Select value={scriptType} onValueChange={(value: 'cold-call' | 'email') => setScriptType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border z-50">
                <SelectItem value="cold-call">Cold Call Script</SelectItem>
                <SelectItem value="email">Cold Email Template</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={generateScript} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              `Generate ${scriptType === 'cold-call' ? 'Call Script' : 'Email Template'}`
            )}
          </Button>

          {generatedScript && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Generated Script</Label>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={generatedScript}
                readOnly
                rows={12}
                className="font-mono text-sm"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};