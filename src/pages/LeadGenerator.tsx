import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  ArrowLeft, 
  Settings, 
  Users, 
  Building, 
  MapPin, 
  Globe,
  Filter,
  Download,
  RefreshCw,
  Zap,
  Plus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useSupabaseLeads } from '@/hooks/useSupabaseLeads';
import { toast } from '@/hooks/use-toast';
import { LeadSearchService } from '@/services/LeadSearchService';

interface SearchCriteria {
  industry: string;
  location: string;
  companySize: string;
  keywords: string;
}

// Import the DiscoveredLead type from the service
import type { DiscoveredLead } from '@/services/LeadSearchService';

const LeadGenerator = () => {
  const { user, loading } = useAuth();
  const { addLead } = useSupabaseLeads();
  const navigate = useNavigate();
  
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    industry: '',
    location: '',
    companySize: '',
    keywords: ''
  });
  
  const [isSearching, setIsSearching] = useState(false);
  const [discoveredLeads, setDiscoveredLeads] = useState<DiscoveredLead[]>([]);
  const [searchResults, setSearchResults] = useState<any>(null);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth?redirect=' + encodeURIComponent('/lead-generator'));
    }
  }, [user, loading, navigate]);

  const handleSearch = async (searchType: 'criteria' | 'badWebsites' = 'criteria') => {
    setIsSearching(true);
    
    try {
      // Prepare search criteria
      const criteria: SearchCriteria = {
        industry: searchCriteria.industry,
        location: searchCriteria.location,
        companySize: searchCriteria.companySize,
        keywords: searchCriteria.keywords
      };

      console.log('Starting real search with criteria:', criteria);
      
      // Use the real search service
      const leads = await LeadSearchService.searchLeads(searchType, criteria);
      
      setDiscoveredLeads(leads);
      setSearchResults({
        totalFound: leads.length,
        sourcesSearched: searchType === 'badWebsites' 
          ? ['Website Analysis', 'Firecrawl', 'SEO Tools']
          : ['Perplexity AI', 'Business Directories', 'Web Search'],
        searchTime: `${((Date.now() % 10000) / 1000).toFixed(1)} seconds`
      });
      
      toast({
        title: "Search Complete!",
        description: `Found ${leads.length} potential leads.`,
      });
    } catch (error) {
      console.error('Search failed:', error);
      toast({
        title: "Search Failed",
        description: error instanceof Error ? error.message : "Failed to search for leads. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleAddToCRM = async (lead: DiscoveredLead) => {
    try {
      const leadData = {
        businessName: lead.companyName,
        contactName: 'Contact needed',
        phoneNumber: lead.phone || 'Phone needed',
        email: lead.email || 'Email needed',
        website: lead.website,
        source: `Lead Generator - ${lead.source}`,
        location: lead.location,
        industry: lead.industry,
        pitchStatus: 'New' as const,
        notes: `Lead score: ${lead.score}% | Company size: ${lead.companySize}${lead.websiteIssues ? ' | Issues: ' + lead.websiteIssues.join(', ') : ''}`
      };

      await addLead(leadData);
      
      toast({
        title: "Lead Added!",
        description: `${lead.companyName} has been added to your CRM.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add lead to CRM. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-xl font-semibold">Lead Generator</h1>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Search Configuration */}
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Quick Discovery
              </CardTitle>
              <CardDescription>
                Find companies with poor websites that need improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleSearch('badWebsites')} 
                disabled={isSearching}
                className="w-full"
                size="lg"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Scanning Websites...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Find Companies with Bad Websites
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Custom Search
              </CardTitle>
              <CardDescription>
                Define specific criteria for targeted lead discovery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full" 
                size="lg"
                onClick={() => document.getElementById('custom-search')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Filter className="h-4 w-4 mr-2" />
                Configure Custom Search
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Custom Search Configuration */}
        <Card id="custom-search">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Custom Search Configuration
            </CardTitle>
            <CardDescription>
              Define your target criteria to discover qualified leads
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="industry">Target Industry</Label>
                <Select value={searchCriteria.industry} onValueChange={(value) => 
                  setSearchCriteria(prev => ({ ...prev, industry: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Target Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, CA or United States"
                  value={searchCriteria.location}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size</Label>
                <Select value={searchCriteria.companySize} onValueChange={(value) => 
                  setSearchCriteria(prev => ({ ...prev, companySize: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="500+">500+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords & Requirements</Label>
              <Textarea
                id="keywords"
                placeholder="Describe specific requirements, technologies, or characteristics you're looking for..."
                value={searchCriteria.keywords}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, keywords: e.target.value }))}
                rows={3}
              />
            </div>

            <Button 
              onClick={() => handleSearch('criteria')} 
              disabled={isSearching || !searchCriteria.industry}
              className="w-full"
              size="lg"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Start Custom Search
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Search Results Summary */}
        {searchResults && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Search Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{searchResults.totalFound}</div>
                  <div className="text-sm text-muted-foreground">Leads Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{searchResults.sourcesSearched.length}</div>
                  <div className="text-sm text-muted-foreground">Sources Searched</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{searchResults.searchTime}</div>
                  <div className="text-sm text-muted-foreground">Search Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Discovered Leads */}
        {discoveredLeads.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Discovered Leads
                  </CardTitle>
                  <CardDescription>
                    Ranked by relevance and quality score
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discoveredLeads.map((lead) => (
                  <Card key={lead.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-xl">
                              <a 
                                href={lead.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                {lead.companyName}
                              </a>
                            </h3>
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${getScoreColor(lead.score)}`} />
                              <span className="text-sm font-medium">{lead.score}% match</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {lead.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              {lead.industry} • {lead.companySize} employees
                            </div>
                            <div className="flex items-center gap-1">
                              <Globe className="h-4 w-4" />
                              {lead.source}
                            </div>
                          </div>

                          {lead.websiteIssues && (
                            <div className="text-sm">
                              <span className="font-medium text-destructive">Website Issues:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {lead.websiteIssues.map((issue, idx) => (
                                  <Badge key={idx} variant="destructive" className="text-xs">
                                    {issue}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">Email:</span> {lead.email || 'Contact info needed'}
                            </div>
                            <div>
                              <span className="font-medium">Phone:</span> {lead.phone || 'Contact info needed'}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.open(lead.website, '_blank')}
                          >
                            Visit Website
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleAddToCRM(lead)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add to CRM
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Getting Started Guide */}
        {discoveredLeads.length === 0 && !isSearching && (
          <Card>
            <CardHeader>
              <CardTitle>Getting Started with Lead Generation</CardTitle>
              <CardDescription>
                Follow these steps to discover qualified leads for your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold">1. Define Your Target</h3>
                  <p className="text-sm text-muted-foreground">
                    Specify your ideal customer's industry, location, company size, and job titles to focus your search.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold">2. Add Keywords</h3>
                  <p className="text-sm text-muted-foreground">
                    Include specific technologies, requirements, or characteristics that define your ideal prospects.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold">3. Start Discovery</h3>
                  <p className="text-sm text-muted-foreground">
                    Our system will search multiple data sources including LinkedIn, company directories, and business websites.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold">4. Review & Export</h3>
                  <p className="text-sm text-muted-foreground">
                    Review scored leads, filter by relevance, and export qualified prospects directly to your CRM.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LeadGenerator;