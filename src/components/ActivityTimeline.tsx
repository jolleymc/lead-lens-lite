import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CheckSquare, Clock, MessageSquare, Phone, Mail, Plus, Trash2 } from "lucide-react";
import { Lead } from "@/types/lead";

export interface Activity {
  id: string;
  leadId: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'status_change';
  title: string;
  description: string;
  date: string;
  time: string;
  completed?: boolean;
}

export interface Task {
  id: string;
  leadId: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  type: 'call' | 'email' | 'meeting' | 'follow_up' | 'other';
}

interface ActivityTimelineProps {
  lead: Lead;
  activities: Activity[];
  tasks: Task[];
  onAddActivity: (activity: Omit<Activity, 'id'>) => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const ActivityTimeline = ({ 
  lead, 
  activities, 
  tasks,
  onAddActivity, 
  onAddTask, 
  onToggleTask,
  onDeleteTask 
}: ActivityTimelineProps) => {
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'note' as Activity['type'],
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
  });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium' as Task['priority'],
    type: 'follow_up' as Task['type'],
  });

  const leadActivities = activities.filter(a => a.leadId === lead.id);
  const leadTasks = tasks.filter(t => t.leadId === lead.id);
  const pendingTasks = leadTasks.filter(t => !t.completed);
  const completedTasks = leadTasks.filter(t => t.completed);

  const handleAddActivity = () => {
    if (newActivity.title.trim()) {
      onAddActivity({
        leadId: lead.id!,
        ...newActivity,
      });
      setNewActivity({
        type: 'note',
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
      });
      setIsAddingActivity(false);
    }
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      onAddTask({
        leadId: lead.id!,
        completed: false,
        ...newTask,
      });
      setNewTask({
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'medium',
        type: 'follow_up',
      });
      setIsAddingTask(false);
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      case 'note': return <MessageSquare className="h-4 w-4" />;
      case 'status_change': return <CheckSquare className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTaskIcon = (type: Task['type']) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      case 'follow_up': return <Clock className="h-4 w-4" />;
      default: return <CheckSquare className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Timeline
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{lead.businessName} - Activity Timeline</DialogTitle>
          <DialogDescription>
            Track activities and manage tasks for this lead
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tasks Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Tasks</h3>
              <Button 
                onClick={() => setIsAddingTask(true)} 
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </div>

            {/* Add Task Form */}
            {isAddingTask && (
              <Card>
                <CardContent className="pt-4 space-y-3">
                  <Input
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Task description (optional)"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    rows={2}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                    <Select value={newTask.priority} onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="high">High Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Select value={newTask.type} onValueChange={(value: Task['type']) => setNewTask({ ...newTask, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Phone Call</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="follow_up">Follow Up</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button onClick={handleAddTask} size="sm">Add Task</Button>
                    <Button onClick={() => setIsAddingTask(false)} variant="outline" size="sm">Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pending Tasks */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">Pending ({pendingTasks.length})</h4>
              {pendingTasks.map((task) => (
                <Card key={task.id} className="border-l-4" style={{ borderLeftColor: `var(--${getPriorityColor(task.priority).split('-')[1]}-500)` }}>
                  <CardContent className="py-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <button
                          onClick={() => onToggleTask(task.id)}
                          className="mt-1"
                        >
                          <CheckSquare className="h-4 w-4 text-muted-foreground hover:text-primary" />
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {getTaskIcon(task.type)}
                            <span className="font-medium text-sm">{task.title}</span>
                          </div>
                          {task.description && (
                            <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => onDeleteTask(task.id)}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {pendingTasks.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No pending tasks</p>
              )}
            </div>

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Completed ({completedTasks.length})</h4>
                {completedTasks.map((task) => (
                  <Card key={task.id} className="opacity-60">
                    <CardContent className="py-2">
                      <div className="flex items-center gap-3">
                        <button onClick={() => onToggleTask(task.id)}>
                          <CheckSquare className="h-4 w-4 text-green-600" />
                        </button>
                        <div className="flex-1">
                          <span className="text-sm line-through">{task.title}</span>
                        </div>
                        <Button
                          onClick={() => onDeleteTask(task.id)}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Activities Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Activity History</h3>
              <Button 
                onClick={() => setIsAddingActivity(true)} 
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Activity
              </Button>
            </div>

            {/* Add Activity Form */}
            {isAddingActivity && (
              <Card>
                <CardContent className="pt-4 space-y-3">
                  <Input
                    placeholder="Activity title"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Activity description"
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    rows={2}
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <Select value={newActivity.type} onValueChange={(value: Activity['type']) => setNewActivity({ ...newActivity, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="call">Phone Call</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="note">Note</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="date"
                      value={newActivity.date}
                      onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                    />
                    <Input
                      type="time"
                      value={newActivity.time}
                      onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddActivity} size="sm">Add Activity</Button>
                    <Button onClick={() => setIsAddingActivity(false)} variant="outline" size="sm">Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Activity Timeline */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {leadActivities
                .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime())
                .map((activity) => (
                <Card key={activity.id}>
                  <CardContent className="py-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{activity.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                        </div>
                        {activity.description && (
                          <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDateTime(activity.date, activity.time)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {leadActivities.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No activities recorded</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};