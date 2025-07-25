import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, FileText } from "lucide-react";
import { Lead } from "@/types/lead";
import { toast } from "sonner";

interface CSVExportProps {
  leads: Lead[];
  selectedLeads: Set<string>;
}

export const CSVExport = ({ leads, selectedLeads }: CSVExportProps) => {
  const exportToCSV = (leadsToExport: Lead[], filename: string) => {
    if (leadsToExport.length === 0) {
      toast.error("No leads to export");
      return;
    }

    // Define the CSV headers
    const headers = [
      'leadId',
      'dateAdded',
      'businessName',
      'contactName',
      'phoneNumber',
      'email',
      'website',
      'source',
      'location',
      'industry',
      'currentWebQuality',
      'pitchStatus',
      'followUpDate',
      'contractSecured',
      'setupCostQuoted',
      'commissionEarned',
      'notes'
    ];

    // Convert leads to CSV format
    const csvContent = [
      headers.join(','),
      ...leadsToExport.map(lead => 
        headers.map(header => {
          let value = lead[header as keyof Lead];
          
          // Handle different data types
          if (typeof value === 'boolean') {
            value = value ? 'true' : 'false';
          } else if (typeof value === 'number') {
            value = value.toString();
          } else if (typeof value === 'string') {
            // Escape commas and quotes in string values
            if (value.includes(',') || value.includes('"') || value.includes('\n')) {
              value = `"${value.replace(/"/g, '""')}"`;
            }
          } else {
            value = value || '';
          }
          
          return value;
        }).join(',')
      )
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    toast.success(`Exported ${leadsToExport.length} leads to ${filename}`);
  };

  const exportAllLeads = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    exportToCSV(leads, `leads-export-${timestamp}.csv`);
  };

  const exportSelectedLeads = () => {
    const selectedLeadsData = leads.filter(lead => selectedLeads.has(lead.id!));
    const timestamp = new Date().toISOString().split('T')[0];
    exportToCSV(selectedLeadsData, `selected-leads-export-${timestamp}.csv`);
  };

  const selectedCount = selectedLeads.size;
  const hasSelected = selectedCount > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportAllLeads} className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Export All Leads ({leads.length})
        </DropdownMenuItem>
        
        {hasSelected && (
          <DropdownMenuItem onClick={exportSelectedLeads} className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Export Selected ({selectedCount})
          </DropdownMenuItem>
        )}
        
        {!hasSelected && leads.length > 0 && (
          <DropdownMenuItem disabled className="flex items-center gap-2 text-muted-foreground">
            <FileText className="h-4 w-4" />
            Export Selected (0)
          </DropdownMenuItem>
        )}
        
        {leads.length === 0 && (
          <DropdownMenuItem disabled className="text-muted-foreground">
            No leads to export
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};