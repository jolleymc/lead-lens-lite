import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Plus, Edit, Trash2, Copy, Send } from 'lucide-react';
import { Lead } from '@/types/lead';
import { useToast } from '@/hooks/use-toast';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'initial-contact' | 'follow-up' | 'proposal' | 'closing' | 'thank-you';
  variables: string[];
}

interface EmailTemplatesProps {
  leads: Lead[];
}

const defaultTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Initial Contact',
    subject: 'Partnership Opportunity for {businessName}',
    body: `Hi {contactName},

I hope this email finds you well. I'm reaching out from Lansdowne Technology because I noticed that {businessName} could benefit from our web development services.

I've taken a look at your current website at {website}, and I believe we could help improve your online presence and drive more business your way.

Would you be interested in a brief 15-minute call to discuss how we might be able to help {businessName} grow online?

Best regards,
[Your Name]
Lansdowne Technology`,
    category: 'initial-contact',
    variables: ['contactName', 'businessName', 'website']
  },
  {
    id: '2',
    name: 'Follow-up Email',
    subject: 'Following up on our conversation - {businessName}',
    body: `Hi {contactName},

I wanted to follow up on our previous conversation about {businessName}'s web development needs.

As discussed, our team specializes in helping businesses in the {industry} industry improve their online presence and drive more leads.

I'd love to schedule a time to show you some examples of our work and discuss how we can help {businessName} achieve its goals.

Are you available for a quick call this week?

Best regards,
[Your Name]
Lansdowne Technology`,
    category: 'follow-up',
    variables: ['contactName', 'businessName', 'industry']
  },
  {
    id: '3',
    name: 'Proposal Follow-up',
    subject: 'Your website proposal - {businessName}',
    body: `Hi {contactName},

I hope you've had a chance to review the proposal we sent for {businessName}'s new website.

Our team is excited about the opportunity to work with you and help transform your online presence.

If you have any questions about the proposal or would like to discuss any modifications, I'm here to help.

Would you like to schedule a call to go over the details?

Best regards,
[Your Name]
Lansdowne Technology`,
    category: 'proposal',
    variables: ['contactName', 'businessName']
  }
];

export const EmailTemplates = ({ leads }: EmailTemplatesProps) => {
  const [templates, setTemplates] = useState<EmailTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [emailPreview, setEmailPreview] = useState({ subject: '', body: '' });
  const { toast } = useToast();

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    body: '',
    category: 'initial-contact' as EmailTemplate['category']
  });

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.body) return;

    // Extract variables from template
    const variables = [...newTemplate.subject.matchAll(/\{(\w+)\}/g), ...newTemplate.body.matchAll(/\{(\w+)\}/g)]
      .map(match => match[1])
      .filter((v, i, arr) => arr.indexOf(v) === i);

    const template: EmailTemplate = {
      id: Date.now().toString(),
      name: newTemplate.name,
      subject: newTemplate.subject,
      body: newTemplate.body,
      category: newTemplate.category,
      variables
    };

    setTemplates([...templates, template]);
    setNewTemplate({ name: '', subject: '', body: '', category: 'initial-contact' });
    setIsTemplateDialogOpen(false);
    
    toast({
      title: "Template created",
      description: "Email template has been saved successfully.",
    });
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setNewTemplate({
      name: template.name,
      subject: template.subject,
      body: template.body,
      category: template.category
    });
    setIsTemplateDialogOpen(true);
  };

  const handleUpdateTemplate = () => {
    if (!editingTemplate || !newTemplate.name || !newTemplate.subject || !newTemplate.body) return;

    const variables = [...newTemplate.subject.matchAll(/\{(\w+)\}/g), ...newTemplate.body.matchAll(/\{(\w+)\}/g)]
      .map(match => match[1])
      .filter((v, i, arr) => arr.indexOf(v) === i);

    const updatedTemplate: EmailTemplate = {
      ...editingTemplate,
      name: newTemplate.name,
      subject: newTemplate.subject,
      body: newTemplate.body,
      category: newTemplate.category,
      variables
    };

    setTemplates(templates.map(t => t.id === editingTemplate.id ? updatedTemplate : t));
    setNewTemplate({ name: '', subject: '', body: '', category: 'initial-contact' });
    setEditingTemplate(null);
    setIsTemplateDialogOpen(false);
    
    toast({
      title: "Template updated",
      description: "Email template has been updated successfully.",
    });
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter(t => t.id !== templateId));
    toast({
      title: "Template deleted",
      description: "Email template has been removed.",
    });
  };

  const handleComposeEmail = (template: EmailTemplate, lead: Lead) => {
    setSelectedTemplate(template);
    setSelectedLead(lead);
    
    // Replace variables with lead data
    const leadData: Record<string, string> = {
      contactName: lead.contactName,
      businessName: lead.businessName,
      website: lead.website,
      industry: lead.industry,
      email: lead.email,
      phoneNumber: lead.phoneNumber,
      location: lead.location
    };

    let subject = template.subject;
    let body = template.body;

    template.variables.forEach(variable => {
      if (leadData[variable]) {
        subject = subject.replace(new RegExp(`\\{${variable}\\}`, 'g'), leadData[variable]);
        body = body.replace(new RegExp(`\\{${variable}\\}`, 'g'), leadData[variable]);
      }
    });

    setEmailPreview({ subject, body });
    setIsComposeDialogOpen(true);
  };

  const handleCopyTemplate = (template: EmailTemplate) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`
    };
    setTemplates([...templates, newTemplate]);
    
    toast({
      title: "Template copied",
      description: "Email template has been duplicated.",
    });
  };

  const handleSendEmail = () => {
    if (!selectedLead) return;
    
    // In a real app, this would integrate with an email service
    toast({
      title: "Email sent",
      description: `Email sent to ${selectedLead.contactName} at ${selectedLead.email}`,
    });
    
    setIsComposeDialogOpen(false);
  };

  const getCategoryColor = (category: EmailTemplate['category']) => {
    switch (category) {
      case 'initial-contact': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'follow-up': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'proposal': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'closing': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'thank-you': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Mail className="h-6 w-6" />
            Email Templates
          </h2>
          <p className="text-muted-foreground">Create and manage email templates for lead communication</p>
        </div>
        <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTemplate ? 'Edit Template' : 'Create New Template'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    placeholder="Initial Contact Email"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    className="w-full px-3 py-2 border border-input rounded-md"
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value as EmailTemplate['category'] })}
                  >
                    <option value="initial-contact">Initial Contact</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="proposal">Proposal</option>
                    <option value="closing">Closing</option>
                    <option value="thank-you">Thank You</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                  placeholder="Partnership Opportunity for {businessName}"
                />
              </div>
              <div>
                <Label htmlFor="body">Email Body</Label>
                <Textarea
                  id="body"
                  value={newTemplate.body}
                  onChange={(e) => setNewTemplate({ ...newTemplate, body: e.target.value })}
                  placeholder="Hi {contactName}..."
                  rows={8}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-2">Available variables:</p>
                <div className="flex flex-wrap gap-2">
                  {['contactName', 'businessName', 'website', 'industry', 'email', 'phoneNumber', 'location'].map(variable => (
                    <Badge key={variable} variant="outline" className="text-xs">
                      {`{${variable}}`}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button onClick={editingTemplate ? handleUpdateTemplate : handleCreateTemplate} className="w-full">
                {editingTemplate ? 'Update Template' : 'Create Template'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge className={`mt-2 ${getCategoryColor(template.category)}`}>
                    {template.category.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditTemplate(template)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyTemplate(template)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Subject:</p>
                  <p className="text-sm">{template.subject}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Preview:</p>
                  <p className="text-sm line-clamp-3">{template.body}</p>
                </div>
                <div className="pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        Use Template
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Select Lead</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 max-h-60 overflow-y-auto">
                        {leads.map((lead) => (
                          <div
                            key={lead.leadId}
                            className="p-3 border rounded-lg cursor-pointer hover:bg-accent"
                            onClick={() => handleComposeEmail(template, lead)}
                          >
                            <div className="font-medium">{lead.businessName}</div>
                            <div className="text-sm text-muted-foreground">{lead.contactName} - {lead.email}</div>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compose Email Dialog */}
      <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Compose Email</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm">
                  <strong>To:</strong> {selectedLead.contactName} ({selectedLead.email})
                </div>
                <div className="text-sm">
                  <strong>Company:</strong> {selectedLead.businessName}
                </div>
              </div>
              <div>
                <Label htmlFor="email-subject">Subject</Label>
                <Input
                  id="email-subject"
                  value={emailPreview.subject}
                  onChange={(e) => setEmailPreview({ ...emailPreview, subject: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email-body">Message</Label>
                <Textarea
                  id="email-body"
                  value={emailPreview.body}
                  onChange={(e) => setEmailPreview({ ...emailPreview, body: e.target.value })}
                  rows={10}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSendEmail} className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Email
                </Button>
                <Button variant="outline" onClick={() => setIsComposeDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};