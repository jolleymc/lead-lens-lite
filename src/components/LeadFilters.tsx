import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Filter, X } from "lucide-react";
import { LeadFilters } from "@/hooks/useLeads";

interface LeadFiltersProps {
  filters: LeadFilters;
  updateFilters: (filters: Partial<LeadFilters>) => void;
  uniqueIndustries: string[];
  uniqueSources: string[];
  totalResults: number;
}

export const LeadFiltersComponent = ({ 
  filters, 
  updateFilters, 
  uniqueIndustries, 
  uniqueSources,
  totalResults 
}: LeadFiltersProps) => {
  const clearFilters = () => {
    updateFilters({
      searchTerm: '',
      statusFilter: 'all',
      industryFilter: 'all',
      sourceFilter: 'all',
      dateRangeStart: '',
      dateRangeEnd: '',
    });
  };

  const activeFiltersCount = [
    filters.searchTerm,
    filters.statusFilter !== 'all' ? filters.statusFilter : '',
    filters.industryFilter !== 'all' ? filters.industryFilter : '',
    filters.sourceFilter !== 'all' ? filters.sourceFilter : '',
    filters.dateRangeStart,
    filters.dateRangeEnd,
  ].filter(Boolean).length;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <CardTitle className="text-lg">Advanced Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount} active</Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <Input
            placeholder="Search leads..."
            value={filters.searchTerm}
            onChange={(e) => updateFilters({ searchTerm: e.target.value })}
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={filters.statusFilter} onValueChange={(value) => updateFilters({ statusFilter: value })}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
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

          {/* Industry Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Industry</label>
            <Select value={filters.industryFilter} onValueChange={(value) => updateFilters({ industryFilter: value })}>
              <SelectTrigger>
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {uniqueIndustries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Source Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Source</label>
            <Select value={filters.sourceFilter} onValueChange={(value) => updateFilters({ sourceFilter: value })}>
              <SelectTrigger>
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {uniqueSources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Date Range
            </label>
            <div className="space-y-2">
              <Input
                type="date"
                placeholder="Start date"
                value={filters.dateRangeStart}
                onChange={(e) => updateFilters({ dateRangeStart: e.target.value })}
                className="text-sm"
              />
              <Input
                type="date"
                placeholder="End date"
                value={filters.dateRangeEnd}
                onChange={(e) => updateFilters({ dateRangeEnd: e.target.value })}
                className="text-sm"
              />
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">
            Showing {totalResults} lead{totalResults !== 1 ? 's' : ''}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};