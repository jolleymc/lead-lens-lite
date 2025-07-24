export interface Lead {
  id?: string;
  leadId: string;
  dateAdded: string;
  businessName: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  website: string;
  source: string;
  location: string;
  industry: string;
  currentWebQuality: string;
  pitchStatus: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Closed Won' | 'Closed Lost';
  followUpDate: string;
  contractSecured: boolean;
  setupCostQuoted: number;
  commissionEarned: number;
  notes: string;
}

export type LeadFormData = Omit<Lead, 'id' | 'leadId' | 'dateAdded'>;