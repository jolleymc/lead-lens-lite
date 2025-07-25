import { Lead } from '@/types/lead';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, ExternalLink, Phone, Mail, Globe, MapPin, Calendar } from 'lucide-react';
import { LeadDialog } from './LeadDialog';
import { ScriptGenerator } from './ScriptGenerator';
import { ActivityTimeline, Activity, Task } from './ActivityTimeline';

interface LeadTableProps {
  leads: Lead[];
  selectedLeads: Set<string>;
  activities: Activity[];
  tasks: Task[];
  onUpdateLead: (id: string, data: Partial<Lead>) => void;
  onDeleteLead: (id: string) => void;
  onToggleLeadSelection: (leadId: string) => void;
  onAddActivity: (activity: Omit<Activity, 'id'>) => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const statusColors = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Qualified': 'bg-green-100 text-green-800',
  'Proposal Sent': 'bg-purple-100 text-purple-800',
  'Closed Won': 'bg-emerald-100 text-emerald-800',
  'Closed Lost': 'bg-red-100 text-red-800',
};

export const LeadTable = ({ leads, selectedLeads, activities, tasks, onUpdateLead, onDeleteLead, onToggleLeadSelection, onAddActivity, onAddTask, onToggleTask, onDeleteTask }: LeadTableProps) => {
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
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedLeads.size === leads.length && leads.length > 0}
                  onCheckedChange={() => {
                    if (selectedLeads.size === leads.length) {
                      leads.forEach(lead => onToggleLeadSelection(lead.id!));
                    } else {
                      leads.forEach(lead => {
                        if (!selectedLeads.has(lead.id!)) {
                          onToggleLeadSelection(lead.id!);
                        }
                      });
                    }
                  }}
                />
              </TableHead>
              <TableHead>Lead ID</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Follow-Up</TableHead>
              <TableHead>Setup Cost</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedLeads.has(lead.id!)}
                    onCheckedChange={() => onToggleLeadSelection(lead.id!)}
                  />
                </TableCell>
                <TableCell className="font-mono text-xs">{lead.leadId}</TableCell>
                <TableCell className="font-medium">
                  <div>
                    <div>{lead.businessName}</div>
                    <div className="text-xs text-muted-foreground">{lead.location}</div>
                    {lead.website && (
                      <a 
                        href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs flex items-center gap-1 mt-1"
                      >
                        <Globe className="h-3 w-3" />
                        Website
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{lead.contactName}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {lead.email}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {lead.phoneNumber}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{lead.industry}</TableCell>
                <TableCell>
                  <Badge className={statusColors[lead.pitchStatus]}>
                    {lead.pitchStatus}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(lead.followUpDate)}</TableCell>
                <TableCell>{formatCurrency(lead.setupCostQuoted)}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <ActivityTimeline
                      lead={lead}
                      activities={activities}
                      tasks={tasks}
                      onAddActivity={onAddActivity}
                      onAddTask={onAddTask}
                      onToggleTask={onToggleTask}
                      onDeleteTask={onDeleteTask}
                    />
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

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {leads.map((lead) => (
          <Card key={lead.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    checked={selectedLeads.has(lead.id!)}
                    onCheckedChange={() => onToggleLeadSelection(lead.id!)}
                    className="mt-1"
                  />
                  <div>
                    <CardTitle className="text-lg">{lead.businessName}</CardTitle>
                    <p className="text-sm text-muted-foreground font-mono">{lead.leadId}</p>
                  </div>
                </div>
                <Badge className={statusColors[lead.pitchStatus]}>
                  {lead.pitchStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <h4 className="font-medium text-sm">Contact Information</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{lead.contactName} - {lead.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{lead.location}</span>
                    </div>
                    {lead.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <a 
                          href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Industry:</span>
                    <div className="text-muted-foreground">{lead.industry}</div>
                  </div>
                  <div>
                    <span className="font-medium">Follow-up:</span>
                    <div className="text-muted-foreground">{formatDate(lead.followUpDate)}</div>
                  </div>
                  <div>
                    <span className="font-medium">Setup Cost:</span>
                    <div className="text-muted-foreground">{formatCurrency(lead.setupCostQuoted)}</div>
                  </div>
                  <div>
                    <span className="font-medium">Contract:</span>
                    <Badge variant={lead.contractSecured ? "default" : "secondary"} className="text-xs">
                      {lead.contractSecured ? "Secured" : "Pending"}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <ActivityTimeline
                    lead={lead}
                    activities={activities}
                    tasks={tasks}
                    onAddActivity={onAddActivity}
                    onAddTask={onAddTask}
                    onToggleTask={onToggleTask}
                    onDeleteTask={onDeleteTask}
                  />
                  <ScriptGenerator lead={lead} />
                  <LeadDialog
                    lead={lead}
                    onSubmit={(data) => onUpdateLead(lead.id!, data)}
                    trigger={
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    }
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onDeleteLead(lead.id!)}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};