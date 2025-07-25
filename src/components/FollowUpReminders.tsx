import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Clock, Phone, Mail, AlertTriangle } from "lucide-react";
import { Lead } from "@/types/lead";
import { Task } from "./ActivityTimeline";

interface FollowUpRemindersProps {
  leads: Lead[];
  tasks: Task[];
  onMarkFollowUpComplete: (leadId: string) => void;
}

export const FollowUpReminders = ({ leads, tasks, onMarkFollowUpComplete }: FollowUpRemindersProps) => {
  const [overdueLeads, setOverdueLeads] = useState<Lead[]>([]);
  const [todayFollowUps, setTodayFollowUps] = useState<Lead[]>([]);
  const [upcomingFollowUps, setUpcomingFollowUps] = useState<Lead[]>([]);
  const [overdueTasks, setOverdueTasks] = useState<Task[]>([]);
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Filter leads by follow-up dates
    const overdue = leads.filter(lead => 
      lead.followUpDate && 
      lead.followUpDate < today &&
      lead.pitchStatus !== 'Closed Won' && 
      lead.pitchStatus !== 'Closed Lost'
    );

    const todayFollows = leads.filter(lead => 
      lead.followUpDate === today &&
      lead.pitchStatus !== 'Closed Won' && 
      lead.pitchStatus !== 'Closed Lost'
    );

    const upcoming = leads.filter(lead => 
      lead.followUpDate && 
      lead.followUpDate > today && 
      lead.followUpDate <= nextWeek &&
      lead.pitchStatus !== 'Closed Won' && 
      lead.pitchStatus !== 'Closed Lost'
    );

    // Filter tasks
    const overduePendingTasks = tasks.filter(task => 
      !task.completed && task.dueDate < today
    );

    const todayPendingTasks = tasks.filter(task => 
      !task.completed && task.dueDate === today
    );

    setOverdueLeads(overdue);
    setTodayFollowUps(todayFollows);
    setUpcomingFollowUps(upcoming);
    setOverdueTasks(overduePendingTasks);
    setTodayTasks(todayPendingTasks);
  }, [leads, tasks]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysOverdue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = today.getTime() - dueDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTotalReminders = () => {
    return overdueLeads.length + todayFollowUps.length + overdueTasks.length + todayTasks.length;
  };

  if (getTotalReminders() === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Follow-up Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-green-600 mb-2">
              <Bell className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="font-medium text-lg">All caught up!</h3>
            <p className="text-muted-foreground">No overdue follow-ups or tasks</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Follow-up Reminders
          <Badge variant="destructive" className="ml-2">
            {getTotalReminders()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overdue Follow-ups */}
        {overdueLeads.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <h3 className="font-semibold text-red-600">
                Overdue Follow-ups ({overdueLeads.length})
              </h3>
            </div>
            <div className="space-y-2">
              {overdueLeads.map((lead) => (
                <Card key={lead.id} className="border-red-200 bg-red-50">
                  <CardContent className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{lead.businessName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {lead.contactName} • {lead.pitchStatus}
                        </p>
                        <p className="text-xs text-red-600">
                          {getDaysOverdue(lead.followUpDate)} days overdue
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onMarkFollowUpComplete(lead.id!)}
                        >
                          Mark Complete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Today's Follow-ups */}
        {todayFollowUps.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-600" />
              <h3 className="font-semibold text-orange-600">
                Today's Follow-ups ({todayFollowUps.length})
              </h3>
            </div>
            <div className="space-y-2">
              {todayFollowUps.map((lead) => (
                <Card key={lead.id} className="border-orange-200 bg-orange-50">
                  <CardContent className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{lead.businessName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {lead.contactName} • {lead.pitchStatus}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <a 
                            href={`tel:${lead.phoneNumber}`}
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            <Phone className="h-3 w-3" />
                            {lead.phoneNumber}
                          </a>
                          <a 
                            href={`mailto:${lead.email}`}
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </a>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onMarkFollowUpComplete(lead.id!)}
                        >
                          Mark Complete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Overdue Tasks */}
        {overdueTasks.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <h3 className="font-semibold text-red-600">
                Overdue Tasks ({overdueTasks.length})
              </h3>
            </div>
            <div className="space-y-2">
              {overdueTasks.map((task) => {
                const lead = leads.find(l => l.id === task.leadId);
                return (
                  <Card key={task.id} className="border-red-200 bg-red-50">
                    <CardContent className="py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {lead?.businessName} • {task.type}
                          </p>
                          <p className="text-xs text-red-600">
                            {getDaysOverdue(task.dueDate)} days overdue
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Today's Tasks */}
        {todayTasks.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold text-blue-600">
                Today's Tasks ({todayTasks.length})
              </h3>
            </div>
            <div className="space-y-2">
              {todayTasks.map((task) => {
                const lead = leads.find(l => l.id === task.leadId);
                return (
                  <Card key={task.id} className="border-blue-200 bg-blue-50">
                    <CardContent className="py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {lead?.businessName} • {task.type}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Upcoming Follow-ups */}
        {upcomingFollowUps.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold text-blue-600">
                Upcoming Follow-ups (Next 7 days)
              </h3>
            </div>
            <div className="space-y-2">
              {upcomingFollowUps
                .sort((a, b) => new Date(a.followUpDate).getTime() - new Date(b.followUpDate).getTime())
                .map((lead) => (
                <Card key={lead.id} className="border-blue-200 bg-blue-50">
                  <CardContent className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{lead.businessName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {lead.contactName} • {lead.pitchStatus}
                        </p>
                        <p className="text-xs text-blue-600">
                          Due: {formatDate(lead.followUpDate)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};