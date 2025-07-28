import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus, Phone, Mail } from "lucide-react";
import { Lead } from "@/types/lead";

interface UncontactedLeadsProps {
  leads: Lead[];
  onUpdateLead: (id: string, updates: Partial<Lead>) => void;
}

export const UncontactedLeads = ({ leads, onUpdateLead }: UncontactedLeadsProps) => {
  const uncontactedLeads = leads.filter(lead => lead.pitchStatus === 'New');

  const markAsContacted = (leadId: string) => {
    onUpdateLead(leadId, { pitchStatus: 'Contacted' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Uncontacted Leads
          {uncontactedLeads.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {uncontactedLeads.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {uncontactedLeads.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-green-600 mb-2">
              <UserPlus className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="font-medium text-lg">All leads contacted!</h3>
            <p className="text-muted-foreground">No new leads waiting for initial contact</p>
          </div>
        ) : (
          <div className="space-y-3">
            {uncontactedLeads
              .sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime())
              .map((lead) => (
              <Card key={lead.id} className="border-warning/20 bg-warning/5 dark:border-warning/30 dark:bg-warning/10">
                <CardContent className="py-4">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0 space-y-2">
                      <h4 className="font-medium text-foreground">{lead.businessName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {lead.contactName} • {lead.industry}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Added: {formatDate(lead.dateAdded)}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <a 
                          href={`tel:${lead.phoneNumber}`}
                          className="text-xs text-primary hover:underline flex items-center gap-1 w-fit"
                        >
                          <Phone className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{lead.phoneNumber}</span>
                        </a>
                        <a 
                          href={`mailto:${lead.email}`}
                          className="text-xs text-primary hover:underline flex items-center gap-1 w-fit"
                        >
                          <Mail className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </a>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsContacted(lead.id!)}
                        className="w-full sm:w-auto whitespace-nowrap"
                      >
                        Mark as Contacted
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};