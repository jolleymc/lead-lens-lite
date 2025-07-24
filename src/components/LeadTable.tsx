import { Lead } from '@/types/lead';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import { LeadDialog } from './LeadDialog';
import { ScriptGenerator } from './ScriptGenerator';

interface LeadTableProps {
  leads: Lead[];
  onUpdateLead: (id: string, data: Partial<Lead>) => void;
  onDeleteLead: (id: string) => void;
}

const statusColors = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Qualified': 'bg-green-100 text-green-800',
  'Proposal Sent': 'bg-purple-100 text-purple-800',
  'Closed Won': 'bg-emerald-100 text-emerald-800',
  'Closed Lost': 'bg-red-100 text-red-800',
};

export const LeadTable = ({ leads, onUpdateLead, onDeleteLead }: LeadTableProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  if (leads.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No leads found. Add your first lead to get started!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lead ID</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead>Business Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Follow-Up</TableHead>
            <TableHead>Setup Cost</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead>Contract</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-mono text-xs">{lead.leadId}</TableCell>
              <TableCell>{formatDate(lead.dateAdded)}</TableCell>
              <TableCell className="font-medium">
                <div>
                  <div>{lead.businessName}</div>
                  {lead.website && (
                    <a 
                      href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-xs flex items-center gap-1 mt-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Website
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{lead.contactName}</div>
                  <div className="text-xs text-muted-foreground">{lead.email}</div>
                  <div className="text-xs text-muted-foreground">{lead.phoneNumber}</div>
                </div>
              </TableCell>
              <TableCell>{lead.location}</TableCell>
              <TableCell>{lead.industry}</TableCell>
              <TableCell>
                <Badge className={statusColors[lead.pitchStatus]}>
                  {lead.pitchStatus}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(lead.followUpDate)}</TableCell>
              <TableCell>{formatCurrency(lead.setupCostQuoted)}</TableCell>
              <TableCell>
                <div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(lead.commissionEarned)}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={lead.contractSecured ? "default" : "secondary"}>
                  {lead.contractSecured ? "Yes" : "No"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <ScriptGenerator lead={lead} />
                  <LeadDialog
                    lead={lead}
                    onSubmit={(data) => onUpdateLead(lead.id!, data)}
                    trigger={
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    }
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onDeleteLead(lead.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};