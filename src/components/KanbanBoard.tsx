import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Bot, Phone, Mail, Globe, MapPin, Calendar, DollarSign } from "lucide-react";
import { Lead } from "@/types/lead";
import { LeadDialog } from "./LeadDialog";
import { ScriptGenerator } from "./ScriptGenerator";

interface KanbanBoardProps {
  leads: Lead[];
  onUpdateLead: (id: string, data: Partial<Lead>) => void;
  onDeleteLead: (id: string) => void;
}

const statusConfig = {
  'New': { color: 'bg-blue-500', label: 'New Leads' },
  'Contacted': { color: 'bg-yellow-500', label: 'Contacted' },
  'Qualified': { color: 'bg-green-500', label: 'Qualified' },
  'Proposal Sent': { color: 'bg-purple-500', label: 'Proposal Sent' },
  'Closed Won': { color: 'bg-emerald-500', label: 'Closed Won' },
  'Closed Lost': { color: 'bg-red-500', label: 'Closed Lost' },
};

export const KanbanBoard = ({ leads, onUpdateLead, onDeleteLead }: KanbanBoardProps) => {
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  const statusOrder: (keyof typeof statusConfig)[] = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed Won', 'Closed Lost'];

  const getLeadsByStatus = (status: string) => {
    return leads.filter(lead => lead.pitchStatus === status);
  };

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: Lead['pitchStatus']) => {
    e.preventDefault();
    if (draggedLead && draggedLead.pitchStatus !== newStatus) {
      onUpdateLead(draggedLead.id!, { pitchStatus: newStatus });
    }
    setDraggedLead(null);
  };

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

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-6 min-w-[1200px] p-4">
        {statusOrder.map((status) => {
          const statusLeads = getLeadsByStatus(status);
          const config = statusConfig[status];
          
          return (
            <div
              key={status}
              className="flex-1 min-w-[280px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              {/* Column Header */}
              <div className="mb-4">
                <div className={`${config.color} text-white p-3 rounded-t-lg`}>
                  <h3 className="font-semibold text-center">{config.label}</h3>
                  <p className="text-center text-sm opacity-90">
                    {statusLeads.length} lead{statusLeads.length !== 1 ? 's' : ''}
                  </p>
                </div>
                {statusLeads.length > 0 && (
                  <div className="bg-muted/50 p-2 rounded-b-lg text-center text-sm">
                    Total Value: {formatCurrency(statusLeads.reduce((sum, lead) => sum + lead.setupCostQuoted, 0))}
                  </div>
                )}
              </div>

              {/* Cards */}
              <div className="space-y-3 min-h-[400px]">
                {statusLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    className="cursor-move hover:shadow-md transition-shadow"
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-sm font-medium truncate">
                            {lead.businessName}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground font-mono">
                            {lead.leadId}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <ScriptGenerator lead={lead} />
                          <LeadDialog
                            lead={lead}
                            onSubmit={(data) => onUpdateLead(lead.id!, data)}
                            trigger={
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Edit className="h-3 w-3" />
                              </Button>
                            }
                          />
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onDeleteLead(lead.id!)}
                            className="h-6 w-6 p-0 text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 space-y-2">
                      {/* Contact Info */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Phone className="h-3 w-3" />
                          <span className="truncate">{lead.contactName}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{lead.location}</span>
                        </div>
                      </div>

                      {/* Industry & Source */}
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {lead.industry}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {lead.source}
                        </Badge>
                      </div>

                      {/* Financial Info */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {formatCurrency(lead.setupCostQuoted)}
                        </span>
                        {lead.contractSecured && (
                          <Badge variant="default" className="text-xs">
                            Contract
                          </Badge>
                        )}
                      </div>

                      {/* Follow-up Date */}
                      {lead.followUpDate && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Follow-up: {formatDate(lead.followUpDate)}</span>
                        </div>
                      )}

                      {/* Website Link */}
                      {lead.website && (
                        <div className="pt-1">
                          <a 
                            href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-xs flex items-center gap-1"
                          >
                            <Globe className="h-3 w-3" />
                            Website
                          </a>
                        </div>
                      )}

                      {/* Notes */}
                      {lead.notes && (
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {lead.notes}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {statusLeads.length === 0 && (
                  <div className="text-center text-muted-foreground text-sm py-8 border-2 border-dashed border-muted rounded-lg">
                    Drop leads here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};