import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Lead, LeadFormData } from '@/types/lead';
import { Plus, ChevronDown, Shuffle } from 'lucide-react';
import { sanitizeText, isValidEmail, isValidPhone, isValidURL } from '@/utils/sanitize';
import { toast } from 'sonner';

interface LeadDialogProps {
  onSubmit: (data: LeadFormData) => void;
  lead?: Lead;
  trigger?: React.ReactNode;
}

const generateRandomLead = (): LeadFormData => {
  const businesses = [
    'TechCorp Solutions', 'Innovate Digital', 'Metro Construction', 'HealthFirst Clinic', 
    'Green Energy Co', 'Elite Marketing', 'Precision Manufacturing', 'EduTech Academy'
  ];
  const contacts = [
    'John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Wilson', 
    'Chris Brown', 'Jessica Lee', 'David Kim', 'Amanda Clark'
  ];
  const sources = ['Google', 'LinkedIn', 'Referral', 'Website', 'Social Media'];
  const industries = ['Technology', 'Healthcare', 'Manufacturing', 'Education', 'Construction'];
  const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ'];
  const webQualities = ['None', 'Poor', 'Fair', 'Good'];

  const business = businesses[Math.floor(Math.random() * businesses.length)];
  const contact = contacts[Math.floor(Math.random() * contacts.length)];
  
  return {
    businessName: business,
    contactName: contact,
    phoneNumber: `(555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    email: `${contact.toLowerCase().replace(' ', '.')}@${business.toLowerCase().replace(/[^a-z]/g, '')}.com`,
    website: `https://www.${business.toLowerCase().replace(/[^a-z]/g, '')}.com`,
    source: sources[Math.floor(Math.random() * sources.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    industry: industries[Math.floor(Math.random() * industries.length)],
    currentWebQuality: webQualities[Math.floor(Math.random() * webQualities.length)],
    pitchStatus: 'New',
    followUpDate: '',
    contractSecured: false,
    setupCostQuoted: Math.floor(Math.random() * 10000 + 1000),
    commissionEarned: 0,
    notes: `Lead generated from ${sources[Math.floor(Math.random() * sources.length)]}. Potential for website redesign project.`,
  };
};

export const LeadDialog = ({ onSubmit, lead, trigger }: LeadDialogProps) => {
  const [open, setOpen] = useState(false);
  
  const form = useForm<LeadFormData>({
    defaultValues: lead ? {
      businessName: lead.businessName,
      contactName: lead.contactName,
      phoneNumber: lead.phoneNumber,
      email: lead.email,
      website: lead.website,
      source: lead.source,
      location: lead.location,
      industry: lead.industry,
      currentWebQuality: lead.currentWebQuality,
      pitchStatus: lead.pitchStatus,
      followUpDate: lead.followUpDate,
      contractSecured: lead.contractSecured,
      setupCostQuoted: lead.setupCostQuoted,
      commissionEarned: lead.commissionEarned,
      notes: lead.notes,
    } : {
      businessName: '',
      contactName: '',
      phoneNumber: '',
      email: '',
      website: '',
      source: '',
      location: '',
      industry: '',
      currentWebQuality: '',
      pitchStatus: 'New',
      followUpDate: '',
      contractSecured: false,
      setupCostQuoted: 0,
      commissionEarned: 0,
      notes: '',
    }
  });

  const handleSubmit = (data: LeadFormData) => {
    // Validate required fields
    if (!data.businessName.trim() || !data.contactName.trim() || !data.email.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate email format
    if (!isValidEmail(data.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Validate phone number format
    if (!isValidPhone(data.phoneNumber)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    // Validate website URL if provided
    if (data.website && !isValidURL(data.website)) {
      toast.error('Please enter a valid website URL');
      return;
    }

    // Sanitize all text inputs
    const sanitizedData = {
      ...data,
      businessName: sanitizeText(data.businessName),
      contactName: sanitizeText(data.contactName),
      email: sanitizeText(data.email),
      phoneNumber: sanitizeText(data.phoneNumber),
      website: data.website ? sanitizeText(data.website) : data.website,
      source: sanitizeText(data.source),
      location: sanitizeText(data.location),
      industry: sanitizeText(data.industry),
      currentWebQuality: data.currentWebQuality ? sanitizeText(data.currentWebQuality) : data.currentWebQuality,
      notes: data.notes ? sanitizeText(data.notes) : data.notes,
    };

    onSubmit(sanitizedData);
    setOpen(false);
    form.reset();
  };

  const handleAddRandomLead = () => {
    const randomLead = generateRandomLead();
    onSubmit(randomLead);
  };

  return (
    <div className="flex">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button className="rounded-r-none">
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{lead ? 'Edit Lead' : 'Add New Lead'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border z-50">
                          <SelectItem value="Google">Google</SelectItem>
                          <SelectItem value="GovTribe">GovTribe</SelectItem>
                          <SelectItem value="Google Maps">Google Maps</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="Referral">Referral</SelectItem>
                          <SelectItem value="Email Campaign">Email Campaign</SelectItem>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="Social Media">Social Media</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (City, State)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border z-50">
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="Professional Services">Professional Services</SelectItem>
                          <SelectItem value="Construction">Construction</SelectItem>
                          <SelectItem value="Real Estate">Real Estate</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                          <SelectItem value="Government">Government</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Hospitality">Hospitality</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Legal">Legal</SelectItem>
                          <SelectItem value="Marketing/Advertising">Marketing/Advertising</SelectItem>
                          <SelectItem value="Transportation">Transportation</SelectItem>
                          <SelectItem value="Energy">Energy</SelectItem>
                          <SelectItem value="Agriculture">Agriculture</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentWebQuality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Web Quality</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select web quality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border z-50">
                          <SelectItem value="None">No Website</SelectItem>
                          <SelectItem value="Poor">Poor</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Professional">Professional</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pitchStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pitch Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border z-50">
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Contacted">Contacted</SelectItem>
                          <SelectItem value="Qualified">Qualified</SelectItem>
                          <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                          <SelectItem value="Closed Won">Closed Won</SelectItem>
                          <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="followUpDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Follow-Up Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="setupCostQuoted"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Setup Cost Quoted ($)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="commissionEarned"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commission Earned ($)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contractSecured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Contract Secured</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {lead ? 'Update Lead' : 'Add Lead'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {!lead && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-l-none border-l-0 px-3">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleAddRandomLead} className="flex items-center gap-2">
              <Shuffle className="h-4 w-4" />
              Add Random Example Lead
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};