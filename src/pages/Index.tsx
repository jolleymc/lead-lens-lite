import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LeadDialog } from '@/components/LeadDialog';
import { LeadTable } from '@/components/LeadTable';
import { LeadStats } from '@/components/LeadStats';
import { LeadFiltersComponent } from '@/components/LeadFilters';
import { BulkActions } from '@/components/BulkActions';
import { CSVImport } from '@/components/CSVImport';
import { CSVExport } from '@/components/CSVExport';
import { useLeads } from '@/hooks/useLeads';
import { Plus } from 'lucide-react';

const Index = () => {
  const {
    leads,
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
  } = useLeads();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Lansdowne Technology CRM</h1>
            <p className="text-muted-foreground">Manage your sales leads and track your progress</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
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

        {/* Stats Cards */}
        <LeadStats leads={leads} />

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

        {/* Leads Table/Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Leads ({leads.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadTable 
              leads={leads}
              selectedLeads={selectedLeads}
              onUpdateLead={updateLead}
              onDeleteLead={deleteLead}
              onToggleLeadSelection={toggleLeadSelection}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
