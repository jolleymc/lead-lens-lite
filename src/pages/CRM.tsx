import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeadDialog } from '@/components/LeadDialog';
import { LeadTable } from '@/components/LeadTable';
import { LeadStats } from '@/components/LeadStats';
import { LeadFiltersComponent } from '@/components/LeadFilters';
import { BulkActions } from '@/components/BulkActions';
import { CSVImport } from '@/components/CSVImport';
import { CSVExport } from '@/components/CSVExport';
import { KanbanBoard } from '@/components/KanbanBoard';
import { FollowUpReminders } from '@/components/FollowUpReminders';
import { UncontactedLeads } from '@/components/UncontactedLeads';
import { CalendarIntegration } from '@/components/CalendarIntegration';
import { EmailTemplates } from '@/components/EmailTemplates';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useLeads } from '@/hooks/useLeads';
import { useAuth } from '@/hooks/useAuth';
import { Plus, LayoutGrid, List, Calendar, Mail, Users, ArrowLeft, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const CRM = () => {
  const { user, signOut, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isDemo = searchParams.get('demo') === 'true';

  // Redirect to auth if not authenticated and not in demo mode
  useEffect(() => {
    if (!loading && !user && !isDemo) {
      navigate('/auth');
    }
  }, [user, loading, isDemo, navigate]);

  const {
    leads,
    allLeads,
    filters,
    updateFilters,
    selectedLeads,
    toggleLeadSelection,
    toggleSelectAll,
    bulkDeleteLeads,
    bulkUpdateStatus,
    importLeadsFromCSV,
    uniqueIndustries,
    uniqueSources,
    addLead,
    updateLead,
    deleteLead,
    activities,
    tasks,
    addActivity,
    addTask,
    toggleTask,
    deleteTask,
    markFollowUpComplete,
  } = useLeads();

  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link to="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              {isDemo && (
                <div className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
                  Demo Mode
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold">Lansdowne Technology CRM</h1>
            <p className="text-muted-foreground">
              {isDemo 
                ? "Exploring in demo mode - data won't be saved" 
                : "Manage your sales leads and track your progress"
              }
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            {user && (
              <div className="text-sm text-muted-foreground">
                Welcome, {user.email}
              </div>
            )}
            <ThemeToggle />
            {user && (
              <Button variant="ghost" onClick={signOut} className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            )}
            {!user && !isDemo && (
              <Link to="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
            <CSVExport leads={leads} selectedLeads={selectedLeads} />
            <CSVImport onImportLeads={importLeadsFromCSV} />
            <LeadDialog 
              onSubmit={addLead} 
              trigger={
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Lead
                </Button>
              }
            />
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Templates
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-6">
            {/* Stats Cards */}
            <LeadStats leads={leads} />

            {/* Follow-up Reminders */}
            <FollowUpReminders 
              leads={allLeads} 
              tasks={tasks} 
              onMarkFollowUpComplete={markFollowUpComplete}
            />

            {/* Advanced Filters */}
            <LeadFiltersComponent
              filters={filters}
              updateFilters={updateFilters}
              uniqueIndustries={uniqueIndustries}
              uniqueSources={uniqueSources}
              totalResults={leads.length}
            />

            {/* Bulk Actions */}
            <BulkActions
              selectedLeads={selectedLeads}
              totalLeads={leads.length}
              onToggleSelectAll={toggleSelectAll}
              onBulkDelete={bulkDeleteLeads}
              onBulkUpdateStatus={bulkUpdateStatus}
            />

            {/* View Toggle */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Leads ({leads.length})</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                      className="flex items-center gap-2"
                    >
                      <List className="h-4 w-4" />
                      Table
                    </Button>
                    <Button
                      variant={viewMode === 'kanban' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('kanban')}
                      className="flex items-center gap-2"
                    >
                      <LayoutGrid className="h-4 w-4" />
                      Kanban
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === 'table' ? (
                  <LeadTable 
                    leads={leads}
                    selectedLeads={selectedLeads}
                    activities={activities}
                    tasks={tasks}
                    onUpdateLead={updateLead}
                    onDeleteLead={deleteLead}
                    onToggleLeadSelection={toggleLeadSelection}
                    onAddActivity={addActivity}
                    onAddTask={addTask}
                    onToggleTask={toggleTask}
                    onDeleteTask={deleteTask}
                  />
                ) : (
                  <KanbanBoard
                    leads={leads}
                    onUpdateLead={updateLead}
                    onDeleteLead={deleteLead}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarIntegration leads={allLeads} />
          </TabsContent>

          <TabsContent value="email">
            <EmailTemplates leads={allLeads} />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <LeadStats leads={leads} />
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <FollowUpReminders 
                leads={allLeads} 
                tasks={tasks} 
                onMarkFollowUpComplete={markFollowUpComplete}
              />
              <UncontactedLeads 
                leads={allLeads}
                onUpdateLead={updateLead}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <LeadDialog 
                    onSubmit={addLead} 
                    trigger={
                      <Button className="w-full flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add New Lead
                      </Button>
                    }
                  />
                  <CSVImport onImportLeads={importLeadsFromCSV} />
                  <CSVExport leads={leads} selectedLeads={selectedLeads} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CRM;
