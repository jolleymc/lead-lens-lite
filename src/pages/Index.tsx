import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LeadDialog } from '@/components/LeadDialog';
import { LeadTable } from '@/components/LeadTable';
import { LeadStats } from '@/components/LeadStats';
import { useLeads } from '@/hooks/useLeads';
import { Search, Filter } from 'lucide-react';

const Index = () => {
  const {
    leads,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    addLead,
    updateLead,
    deleteLead,
  } = useLeads();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Lansdowne Technology CRM</h1>
            <p className="text-muted-foreground">Manage your sales leads and track your progress</p>
          </div>
          <LeadDialog onSubmit={addLead} />
        </div>

        {/* Stats Cards */}
        <LeadStats leads={leads} />

        {/* Filters */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Lead Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                    <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                    <SelectItem value="Closed Won">Closed Won</SelectItem>
                    <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Leads Table */}
            <LeadTable 
              leads={leads}
              onUpdateLead={updateLead}
              onDeleteLead={deleteLead}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
