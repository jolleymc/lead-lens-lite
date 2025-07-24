import { useState } from 'react';
import { Lead, LeadFormData } from '@/types/lead';

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

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

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = Object.values(lead).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus = statusFilter === 'all' || lead.pitchStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return {
    leads: filteredLeads,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    addLead,
    updateLead,
    deleteLead,
  };
};