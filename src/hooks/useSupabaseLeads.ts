import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Lead, LeadFormData } from '@/types/lead';
import { Activity, Task } from '@/components/ActivityTimeline';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface LeadFilters {
  searchTerm: string;
  statusFilter: string;
  industryFilter: string;
  sourceFilter: string;
  dateRangeStart: string;
  dateRangeEnd: string;
}

export const useSupabaseLeads = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<LeadFilters>({
    searchTerm: '',
    statusFilter: 'all',
    industryFilter: 'all',
    sourceFilter: 'all',
    dateRangeStart: '',
    dateRangeEnd: '',
  });

  // Load data when user is available
  useEffect(() => {
    if (user) {
      loadData();
    } else {
      setLeads([]);
      setActivities([]);
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await Promise.all([loadLeads(), loadActivities(), loadTasks()]);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const loadLeads = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading leads:', error);
      toast.error('Failed to load leads');
      return;
    }

    // Convert Supabase data to Lead format
    const convertedLeads: Lead[] = data.map(lead => ({
      id: lead.id,
      leadId: lead.lead_id,
      businessName: lead.business_name,
      contactName: lead.contact_name,
      phoneNumber: lead.phone_number,
      email: lead.email,
      website: lead.website,
      source: lead.source,
      location: lead.location,
      industry: lead.industry,
      currentWebQuality: lead.current_web_quality,
      pitchStatus: lead.pitch_status as Lead['pitchStatus'],
      notes: lead.notes,
      dateAdded: lead.date_added,
      followUpDate: lead.follow_up_date,
      setupCostQuoted: lead.setup_cost_quoted ? Number(lead.setup_cost_quoted) : undefined,
      contractSecured: lead.contract_secured,
      commissionEarned: lead.commission_earned ? Number(lead.commission_earned) : undefined,
    }));

    setLeads(convertedLeads);
  };

  const loadActivities = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading activities:', error);
      return;
    }

    const convertedActivities: Activity[] = data.map(activity => ({
      id: activity.id,
      leadId: activity.lead_id,
      type: activity.type as Activity['type'],
      title: activity.type,
      description: activity.description,
      date: activity.date,
      time: new Date(activity.created_at).toLocaleTimeString(),
      timestamp: activity.created_at,
    }));

    setActivities(convertedActivities);
  };

  const loadTasks = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading tasks:', error);
      return;
    }

    const convertedTasks: Task[] = data.map(task => ({
      id: task.id,
      leadId: task.lead_id,
      type: task.type as Task['type'],
      title: task.title,
      description: task.description,
      priority: task.priority as Task['priority'],
      dueDate: task.due_date,
      completed: task.completed,
    }));

    setTasks(convertedTasks);
  };

  const addLead = async (leadData: LeadFormData) => {
    if (!user) {
      toast.error('You must be logged in to add leads');
      return;
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([{
        user_id: user.id,
        lead_id: `LEAD-${Date.now()}`,
        business_name: leadData.businessName,
        contact_name: leadData.contactName,
        phone_number: leadData.phoneNumber,
        email: leadData.email,
        website: leadData.website,
        source: leadData.source,
        location: leadData.location,
        industry: leadData.industry,
        current_web_quality: leadData.currentWebQuality,
        pitch_status: leadData.pitchStatus,
        notes: leadData.notes,
        follow_up_date: leadData.followUpDate,
        setup_cost_quoted: leadData.setupCostQuoted,
        contract_secured: leadData.contractSecured,
        commission_earned: leadData.commissionEarned,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding lead:', error);
      toast.error('Failed to add lead');
      return;
    }

    await loadLeads();
    toast.success('Lead added successfully');
  };

  const updateLead = async (id: string, leadData: Partial<Lead>) => {
    if (!user) return;

    // Convert Lead format to Supabase format
    const updateData: any = {};
    if (leadData.businessName !== undefined) updateData.business_name = leadData.businessName;
    if (leadData.contactName !== undefined) updateData.contact_name = leadData.contactName;
    if (leadData.phoneNumber !== undefined) updateData.phone_number = leadData.phoneNumber;
    if (leadData.email !== undefined) updateData.email = leadData.email;
    if (leadData.website !== undefined) updateData.website = leadData.website;
    if (leadData.source !== undefined) updateData.source = leadData.source;
    if (leadData.location !== undefined) updateData.location = leadData.location;
    if (leadData.industry !== undefined) updateData.industry = leadData.industry;
    if (leadData.currentWebQuality !== undefined) updateData.current_web_quality = leadData.currentWebQuality;
    if (leadData.pitchStatus !== undefined) updateData.pitch_status = leadData.pitchStatus;
    if (leadData.notes !== undefined) updateData.notes = leadData.notes;
    if (leadData.followUpDate !== undefined) updateData.follow_up_date = leadData.followUpDate;
    if (leadData.setupCostQuoted !== undefined) updateData.setup_cost_quoted = leadData.setupCostQuoted;
    if (leadData.contractSecured !== undefined) updateData.contract_secured = leadData.contractSecured;
    if (leadData.commissionEarned !== undefined) updateData.commission_earned = leadData.commissionEarned;

    const { error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead');
      return;
    }

    await loadLeads();
    toast.success('Lead updated successfully');
  };

  const deleteLead = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting lead:', error);
      toast.error('Failed to delete lead');
      return;
    }

    await loadLeads();
    toast.success('Lead deleted successfully');
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

  const bulkDeleteLeads = async () => {
    if (!user || selectedLeads.size === 0) return;

    const { error } = await supabase
      .from('leads')
      .delete()
      .in('id', Array.from(selectedLeads))
      .eq('user_id', user.id);

    if (error) {
      console.error('Error bulk deleting leads:', error);
      toast.error('Failed to delete leads');
      return;
    }

    setSelectedLeads(new Set());
    await loadLeads();
    toast.success('Leads deleted successfully');
  };

  const bulkUpdateStatus = async (status: Lead['pitchStatus']) => {
    if (!user || selectedLeads.size === 0) return;

    const { error } = await supabase
      .from('leads')
      .update({ pitch_status: status })
      .in('id', Array.from(selectedLeads))
      .eq('user_id', user.id);

    if (error) {
      console.error('Error bulk updating leads:', error);
      toast.error('Failed to update leads');
      return;
    }

    setSelectedLeads(new Set());
    await loadLeads();
    toast.success('Leads updated successfully');
  };

  const importLeadsFromCSV = async (csvData: Lead[]) => {
    if (!user) {
      toast.error('You must be logged in to import leads');
      return;
    }

    const insertData = csvData.map(lead => ({
      user_id: user.id,
      lead_id: `LEAD-${Date.now()}-${Math.random()}`,
      business_name: lead.businessName,
      contact_name: lead.contactName,
      phone_number: lead.phoneNumber,
      email: lead.email,
      website: lead.website,
      source: lead.source,
      location: lead.location,
      industry: lead.industry,
      current_web_quality: lead.currentWebQuality,
      pitch_status: lead.pitchStatus,
      notes: lead.notes,
      date_added: lead.dateAdded || new Date().toISOString().split('T')[0],
      follow_up_date: lead.followUpDate,
      setup_cost_quoted: lead.setupCostQuoted,
      contract_secured: lead.contractSecured,
      commission_earned: lead.commissionEarned,
    }));

    const { error } = await supabase
      .from('leads')
      .insert(insertData);

    if (error) {
      console.error('Error importing leads:', error);
      toast.error('Failed to import leads');
      return;
    }

    await loadLeads();
    toast.success(`${csvData.length} leads imported successfully`);
  };

  const filteredLeads = leads.filter(lead => {
    const { searchTerm, statusFilter, industryFilter, sourceFilter, dateRangeStart, dateRangeEnd } = filters;
    
    const matchesSearch = !searchTerm || Object.values(lead).some(value => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesStatus = statusFilter === 'all' || lead.pitchStatus === statusFilter;
    const matchesIndustry = industryFilter === 'all' || lead.industry === industryFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    const matchesDateRange = (!dateRangeStart || lead.dateAdded >= dateRangeStart) && 
                            (!dateRangeEnd || lead.dateAdded <= dateRangeEnd);
    
    return matchesSearch && matchesStatus && matchesIndustry && matchesSource && matchesDateRange;
  });

  // Activity management
  const addActivity = async (activity: Omit<Activity, 'id'>) => {
    if (!user) return;

    const { error } = await supabase
      .from('activities')
      .insert([{
        user_id: user.id,
        lead_id: activity.leadId,
        type: activity.type,
        description: activity.description,
        date: activity.date,
      }]);

    if (error) {
      console.error('Error adding activity:', error);
      toast.error('Failed to add activity');
      return;
    }

    await loadActivities();
    toast.success('Activity added successfully');
  };

  // Task management
  const addTask = async (task: Omit<Task, 'id'>) => {
    if (!user) return;

    const { error } = await supabase
      .from('tasks')
      .insert([{
        user_id: user.id,
        lead_id: task.leadId,
        type: task.type,
        title: task.title,
        description: task.description,
        priority: task.priority,
        due_date: task.dueDate,
        completed: task.completed || false,
      }]);

    if (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
      return;
    }

    await loadTasks();
    toast.success('Task added successfully');
  };

  const toggleTask = async (taskId: string) => {
    if (!user) return;

    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const { error } = await supabase
      .from('tasks')
      .update({ completed: !task.completed })
      .eq('id', taskId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error toggling task:', error);
      toast.error('Failed to update task');
      return;
    }

    await loadTasks();
  };

  const deleteTask = async (taskId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
      return;
    }

    await loadTasks();
    toast.success('Task deleted successfully');
  };

  const markFollowUpComplete = async (leadId: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 7); // Set next follow-up for a week later
    await updateLead(leadId, { followUpDate: tomorrow.toISOString().split('T')[0] });
  };

  // Get unique values for filter dropdowns
  const uniqueIndustries = [...new Set(leads.map(lead => lead.industry))].filter(Boolean);
  const uniqueSources = [...new Set(leads.map(lead => lead.source))].filter(Boolean);

  return {
    leads: filteredLeads,
    allLeads: leads,
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
    // Activity & Task management
    activities,
    tasks,
    addActivity,
    addTask,
    toggleTask,
    deleteTask,
    markFollowUpComplete,
    // Loading state
    loading,
    // Legacy compatibility
    searchTerm: filters.searchTerm,
    setSearchTerm: (term: string) => updateFilters({ searchTerm: term }),
    statusFilter: filters.statusFilter,
    setStatusFilter: (status: string) => updateFilters({ statusFilter: status }),
  };
};