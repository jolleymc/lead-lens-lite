import { useState } from 'react';
import { Lead } from '@/types/lead';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Copy, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ScriptGeneratorProps {
  lead: Lead;
}

export const ScriptGenerator = ({ lead }: ScriptGeneratorProps) => {
  const [open, setOpen] = useState(false);
  const [scriptType, setScriptType] = useState<'cold-call' | 'email'>('cold-call');
  const [generatedScript, setGeneratedScript] = useState('');
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-script', {
        body: {
          lead: {
            businessName: lead.businessName,
            contactName: lead.contactName,
            industry: lead.industry,
            location: lead.location,
            currentWebQuality: lead.currentWebQuality,
            source: lead.source
          },
          scriptType
        }
      });

      if (error) {
        console.error('Error generating script:', error);
        throw new Error(error.message || 'Failed to generate script');
      }

      if (data?.script) {
        setGeneratedScript(data.script);
        toast.success(`${scriptType === 'cold-call' ? 'Call script' : 'Email template'} generated successfully!`);
      } else {
        throw new Error('No script received from the service');
      }
    } catch (error) {
      console.error('Error generating script:', error);
      toast.error('Failed to generate script. Please try again.');
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