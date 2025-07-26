import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Plus, Clock } from 'lucide-react';
import { format, isSameDay, parseISO } from 'date-fns';
import { Lead } from '@/types/lead';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  leadId?: string;
  type: 'meeting' | 'call' | 'follow-up' | 'deadline';
}

interface CalendarIntegrationProps {
  leads: Lead[];
}

export const CalendarIntegration = ({ leads }: CalendarIntegrationProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    time: '',
    leadId: '',
    type: 'meeting' as CalendarEvent['type']
  });

  const handleCreateEvent = () => {
    if (!selectedDate || !newEvent.title || !newEvent.time) return;

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: selectedDate,
      time: newEvent.time,
      leadId: newEvent.leadId || undefined,
      type: newEvent.type
    };

    setEvents([...events, event]);
    setNewEvent({ title: '', description: '', time: '', leadId: '', type: 'meeting' });
    setIsDialogOpen(false);
  };

  const getDayEvents = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getUpcomingFollowUps = () => {
    return leads
      .filter(lead => lead.followUpDate)
      .map(lead => ({
        id: `followup-${lead.leadId}`,
        title: `Follow-up: ${lead.businessName}`,
        description: `Contact ${lead.contactName}`,
        date: parseISO(lead.followUpDate),
        time: '09:00',
        leadId: lead.leadId,
        type: 'follow-up' as const
      }));
  };

  const allEvents = [...events, ...getUpcomingFollowUps()];
  const selectedDateEvents = selectedDate ? getDayEvents(selectedDate) : [];

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'call': return 'bg-green-500';
      case 'follow-up': return 'bg-orange-500';
      case 'deadline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Calendar
            </CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Meeting with client"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Discuss project requirements"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value) => setNewEvent({ ...newEvent, type: value as CalendarEvent['type'] })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="call">Call</SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                          <SelectItem value="deadline">Deadline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="lead">Related Lead (Optional)</Label>
                    <Select
                      value={newEvent.leadId || undefined}
                      onValueChange={(value) => setNewEvent({ ...newEvent, leadId: value || '' })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a lead (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {leads.map(lead => (
                          <SelectItem key={lead.leadId} value={lead.leadId}>
                            {lead.businessName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreateEvent} className="w-full">
                    Create Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              hasEvents: (date) => allEvents.some(event => isSameDay(event.date, date))
            }}
            modifiersStyles={{
              hasEvents: { 
                backgroundColor: 'hsl(var(--primary))', 
                color: 'hsl(var(--primary-foreground))',
                fontWeight: 'bold'
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Events for selected date */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Select a date'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {selectedDateEvents.length === 0 ? (
              <p className="text-muted-foreground text-sm">No events scheduled</p>
            ) : (
              selectedDateEvents.map((event) => (
                <div key={event.id} className="p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${getEventTypeColor(event.type)}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm truncate">{event.title}</h4>
                        <span className="text-xs text-muted-foreground">{event.time}</span>
                      </div>
                      {event.description && (
                        <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                      )}
                      <span className="text-xs text-muted-foreground capitalize">{event.type}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};