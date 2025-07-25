import { useState } from 'react';
import { Lead, LeadFormData } from '@/types/lead';

export interface LeadFilters {
  searchTerm: string;
  statusFilter: string;
  industryFilter: string;
  sourceFilter: string;
  dateRangeStart: string;
  dateRangeEnd: string;
}

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<LeadFilters>({
    searchTerm: '',
    statusFilter: 'all',
    industryFilter: 'all',
    sourceFilter: 'all',
    dateRangeStart: '',
    dateRangeEnd: '',
  });

  const addLead = (leadData: LeadFormData) => {
    const newLead: Lead = {
      ...leadData,
      id: Date.now().toString(),
      leadId: `LEAD-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const updateLead = (id: string, leadData: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, ...leadData } : lead
    ));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  const updateFilters = (newFilters: Partial<LeadFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const toggleLeadSelection = (leadId: string) => {
    setSelectedLeads(prev => {
      const newSet = new Set(prev);
      if (newSet.has(leadId)) {
        newSet.delete(leadId);
      } else {
        newSet.add(leadId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedLeads.size === filteredLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(filteredLeads.map(lead => lead.id!)));
    }
  };

  const bulkDeleteLeads = () => {
    setLeads(prev => prev.filter(lead => !selectedLeads.has(lead.id!)));
    setSelectedLeads(new Set());
  };

  const bulkUpdateStatus = (status: Lead['pitchStatus']) => {
    setLeads(prev => prev.map(lead => 
      selectedLeads.has(lead.id!) ? { ...lead, pitchStatus: status } : lead
    ));
    setSelectedLeads(new Set());
  };

  const importLeadsFromCSV = (csvData: Lead[]) => {
    const newLeads = csvData.map(lead => ({
      ...lead,
      id: Date.now().toString() + Math.random(),
      leadId: `LEAD-${Date.now()}-${Math.random()}`,
      dateAdded: lead.dateAdded || new Date().toISOString().split('T')[0],
    }));
    setLeads(prev => [...newLeads, ...prev]);
  };

  const filteredLeads = leads.filter(lead => {
    const { searchTerm, statusFilter, industryFilter, sourceFilter, dateRangeStart, dateRangeEnd } = filters;
    
    const matchesSearch = !searchTerm || Object.values(lead).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesStatus = statusFilter === 'all' || lead.pitchStatus === statusFilter;
    const matchesIndustry = industryFilter === 'all' || lead.industry === industryFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    const matchesDateRange = (!dateRangeStart || lead.dateAdded >= dateRangeStart) && 
                            (!dateRangeEnd || lead.dateAdded <= dateRangeEnd);
    
    return matchesSearch && matchesStatus && matchesIndustry && matchesSource && matchesDateRange;
  });

  // Get unique values for filter dropdowns
  const uniqueIndustries = [...new Set(leads.map(lead => lead.industry))].filter(Boolean);
  const uniqueSources = [...new Set(leads.map(lead => lead.source))].filter(Boolean);

  return {
    leads: filteredLeads,
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
    // Legacy compatibility
    searchTerm: filters.searchTerm,
    setSearchTerm: (term: string) => updateFilters({ searchTerm: term }),
    statusFilter: filters.statusFilter,
    setStatusFilter: (status: string) => updateFilters({ statusFilter: status }),
  };
};