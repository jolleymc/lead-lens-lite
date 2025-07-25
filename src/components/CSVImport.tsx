import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Download, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Lead } from "@/types/lead";
import { toast } from "sonner";

interface CSVImportProps {
  onImportLeads: (leads: Lead[]) => void;
}

export const CSVImport = ({ onImportLeads }: CSVImportProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previewData, setPreviewData] = useState<Lead[]>([]);
  const [isValidData, setIsValidData] = useState(false);

  const requiredFields = ['businessName', 'contactName', 'email', 'phoneNumber'];

  const downloadTemplate = () => {
    const template = [
      {
        businessName: "Example Corp",
        contactName: "John Doe", 
        email: "john@example.com",
        phoneNumber: "555-1234",
        website: "https://example.com",
        source: "Website",
        location: "New York, NY",
        industry: "Technology",
        currentWebQuality: "Good",
        pitchStatus: "New",
        followUpDate: "2024-01-15",
        contractSecured: false,
        setupCostQuoted: 5000,
        commissionEarned: 0,
        notes: "Sample lead for template"
      }
    ];

    const csv = [
      Object.keys(template[0]).join(','),
      ...template.map(row => Object.values(row).map(value => 
        typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      ).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lead-import-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const detectAndConvertFormat = (headers: string[]): { isGoogleSheetsFormat: boolean; mappedHeaders: string[] } => {
    const googleSheetsHeaders = [
      'Lead ID', 'Date Added', 'Business Name', 'Contact Name', 'Phone Number', 
      'Email', 'Website', 'Source', 'Location (City, State)', 'Industry', 
      'Grant Info (if app)', 'Current Web Quality', 'Pitch Status', 'Follow-Up Date', 
      'Contract Secured Y/N', 'Setup Cost Quoted', 'Comission %', 'Commission Earned', 'Notes'
    ];

    const isGoogleSheetsFormat = googleSheetsHeaders.some(header => 
      headers.some(h => h.trim().toLowerCase() === header.toLowerCase())
    );

    if (isGoogleSheetsFormat) {
      const headerMapping: { [key: string]: string } = {
        'Lead ID': 'leadId',
        'Date Added': 'dateAdded',
        'Business Name': 'businessName',
        'Contact Name': 'contactName',
        'Phone Number': 'phoneNumber',
        'Email': 'email',
        'Website': 'website',
        'Source': 'source',
        'Location (City, State)': 'location',
        'Industry': 'industry',
        'Current Web Quality': 'currentWebQuality',
        'Pitch Status': 'pitchStatus',
        'Follow-Up Date': 'followUpDate',
        'Contract Secured Y/N': 'contractSecured',
        'Setup Cost Quoted': 'setupCostQuoted',
        'Commission Earned': 'commissionEarned',
        'Notes': 'notes'
      };

      const mappedHeaders = headers.map(header => {
        const trimmedHeader = header.trim();
        return headerMapping[trimmedHeader] || trimmedHeader;
      });

      return { isGoogleSheetsFormat: true, mappedHeaders };
    }

    return { isGoogleSheetsFormat: false, mappedHeaders: headers };
  };

  const parseCSV = (csvText: string): Lead[] => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];

    const originalHeaders = lines[0].split('\t').length > lines[0].split(',').length
      ? lines[0].split('\t').map(h => h.trim().replace(/"/g, ''))
      : lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    const { isGoogleSheetsFormat, mappedHeaders } = detectAndConvertFormat(originalHeaders);
    const rows = lines.slice(1);

    if (isGoogleSheetsFormat) {
      toast.success("Google Sheets format detected - automatically converting to CRM format");
    }

    return rows.map((row, index) => {
      const values = originalHeaders.length > row.split(',').length
        ? row.split('\t').map(v => v.trim().replace(/"/g, ''))
        : row.split(',').map(v => v.trim().replace(/"/g, ''));
      
      const lead: any = {};

      mappedHeaders.forEach((header, i) => {
        let value = values[i] || '';
        
        // Skip fields that we don't use anymore
        if (header === 'Grant Info (if app)' || header === 'Comission %') {
          return;
        }
        
        // Convert specific fields based on the mapped header name
        if (header === 'contractSecured') {
          // Handle Y/N from Google Sheets format
          if (isGoogleSheetsFormat) {
            lead[header] = value.toLowerCase() === 'y' || value.toLowerCase() === 'yes';
          } else {
            lead[header] = value.toLowerCase() === 'true';
          }
          return;
        } else if (header === 'setupCostQuoted' || header === 'commissionEarned') {
          // Remove any currency symbols and parse as number
          const cleanValue = value.replace(/[$,]/g, '');
          lead[header] = parseFloat(cleanValue) || 0;
          return;
        } else if (header === 'dateAdded' || header === 'followUpDate') {
          // Handle date format conversion if needed
          if (value && isGoogleSheetsFormat) {
            try {
              const date = new Date(value);
              lead[header] = date.toISOString().split('T')[0];
            } catch {
              lead[header] = value;
            }
          } else {
            lead[header] = value;
          }
          return;
        } else if (header === 'pitchStatus') {
          // Map some common status variations
          const statusMapping: { [key: string]: string } = {
            'not contacted': 'New',
            'spoke - not interested': 'Contacted',
            'not interested': 'Closed Lost'
          };
          lead[header] = statusMapping[value.toLowerCase()] || value || 'New';
          return;
        }
        
        lead[header] = value;
      });

      // Set defaults for missing required fields with better fallbacks
      return {
        businessName: lead.businessName || `Business ${index + 1}`,
        contactName: lead.contactName || 'Unknown Contact',
        email: lead.email || `contact${index + 1}@example.com`,
        phoneNumber: lead.phoneNumber || '000-000-0000',
        website: lead.website || '',
        source: lead.source || 'CSV Import',
        location: lead.location || '',
        industry: lead.industry || 'Other',
        currentWebQuality: lead.currentWebQuality || 'Unknown',
        pitchStatus: lead.pitchStatus || 'New',
        followUpDate: lead.followUpDate || new Date().toISOString().split('T')[0],
        contractSecured: lead.contractSecured || false,
        setupCostQuoted: lead.setupCostQuoted || 0,
        commissionEarned: lead.commissionEarned || 0,
        notes: lead.notes || '',
      } as Lead;
    });
  };

  const validateData = (data: Lead[]): boolean => {
    return data.every(lead => 
      requiredFields.every(field => 
        lead[field as keyof Lead] && 
        String(lead[field as keyof Lead]).trim() !== ''
      )
    );
  };

  const handleFileUpload = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast.error("Please upload a CSV file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const parsedData = parseCSV(csvText);
        setPreviewData(parsedData);
        setIsValidData(validateData(parsedData));
      } catch (error) {
        toast.error("Error parsing CSV file");
        console.error("CSV parse error:", error);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleImport = () => {
    if (isValidData && previewData.length > 0) {
      onImportLeads(previewData);
      toast.success(`Successfully imported ${previewData.length} leads`);
      setIsOpen(false);
      setPreviewData([]);
      setIsValidData(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Import CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Leads from CSV</DialogTitle>
          <DialogDescription>
            Upload a CSV file to import multiple leads at once
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Download */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Download Template</CardTitle>
              <CardDescription>
                Get a sample CSV file with the correct format and required fields
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={downloadTemplate} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download CSV Template
              </Button>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upload CSV File</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={() => setIsDragging(false)}
              >
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Drop your CSV file here</h3>
                <p className="text-muted-foreground mb-4">or</p>
                <label>
                  <Button variant="outline" className="cursor-pointer">
                    Browse Files
                  </Button>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          {previewData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {isValidData ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  )}
                  Preview ({previewData.length} leads)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isValidData && (
                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Some leads are missing required fields: {requiredFields.join(', ')}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="max-h-60 overflow-auto border rounded">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-2 text-left">Business</th>
                        <th className="p-2 text-left">Contact</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Industry</th>
                        <th className="p-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.slice(0, 10).map((lead, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2">{lead.businessName}</td>
                          <td className="p-2">{lead.contactName}</td>
                          <td className="p-2">{lead.email}</td>
                          <td className="p-2">{lead.industry}</td>
                          <td className="p-2">{lead.pitchStatus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {previewData.length > 10 && (
                    <p className="p-2 text-center text-muted-foreground border-t">
                      ... and {previewData.length - 10} more leads
                    </p>
                  )}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => {
                    setPreviewData([]);
                    setIsValidData(false);
                  }}>
                    Clear
                  </Button>
                  <Button 
                    onClick={handleImport} 
                    disabled={!isValidData || previewData.length === 0}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Import {previewData.length} Leads
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};