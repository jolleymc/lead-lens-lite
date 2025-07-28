import { useState } from 'react';
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
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';

interface SearchCriteria {
  industry: string;
  location: string;
  companySize: string;
  keywords: string;
  jobTitles: string;
}

interface DiscoveredLead {
  id: string;
  companyName: string;
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  industry: string;
  companySize: string;
  score: number;
  source: string;
}

const LeadGenerator = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    industry: '',
    location: '',
    companySize: '',
    keywords: '',
    jobTitles: ''
  });
  
  const [isSearching, setIsSearching] = useState(false);
  const [discoveredLeads, setDiscoveredLeads] = useState<DiscoveredLead[]>([]);
  const [searchResults, setSearchResults] = useState<any>(null);

  const handleSearch = async () => {
    setIsSearching(true);
    
    // Simulate search process
    setTimeout(() => {
      // Mock results for demo
      const mockLeads: DiscoveredLead[] = [
        {
          id: '1',
          companyName: 'TechCorp Solutions',
          contactName: 'Sarah Johnson',
          jobTitle: 'VP of Operations',
          email: 'sarah.johnson@techcorp.com',
          phone: '(555) 123-4567',
          website: 'https://techcorp.com',
          location: 'San Francisco, CA',
          industry: 'Technology',
          companySize: '50-200',
          score: 95,
          source: 'LinkedIn'
        },
        {
          id: '2',
          companyName: 'GrowthCo',
          contactName: 'Michael Chen',
          jobTitle: 'Chief Technology Officer',
          email: 'mchen@growthco.com',
          phone: '(555) 987-6543',
          website: 'https://growthco.com',
          location: 'Austin, TX',
          industry: 'Software',
          companySize: '20-50',
          score: 88,
          source: 'Company Directory'
        }
      ];
      
      setDiscoveredLeads(mockLeads);
      setSearchResults({
        totalFound: mockLeads.length,
        sourcesSearched: ['LinkedIn', 'Company Directories', 'Business Websites'],
        searchTime: '2.3 seconds'
      });
      setIsSearching(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Search Configuration
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

              <div className="space-y-2">
                <Label htmlFor="jobTitles">Target Job Titles</Label>
                <Input
                  id="jobTitles"
                  placeholder="e.g., CEO, CTO, VP of Sales"
                  value={searchCriteria.jobTitles}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, jobTitles: e.target.value }))}
                />
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
              onClick={handleSearch} 
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
                  Start Lead Discovery
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
                            <h3 className="font-semibold text-lg">{lead.contactName}</h3>
                            <Badge variant="secondary">{lead.jobTitle}</Badge>
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${getScoreColor(lead.score)}`} />
                              <span className="text-sm font-medium">{lead.score}% match</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              {lead.companyName}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {lead.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Globe className="h-4 w-4" />
                              {lead.source}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-medium">Email:</span> {lead.email}
                            </div>
                            <div>
                              <span className="font-medium">Phone:</span> {lead.phone}
                            </div>
                            <div>
                              <span className="font-medium">Website:</span> {lead.website}
                            </div>
                            <div>
                              <span className="font-medium">Industry:</span> {lead.industry}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm">
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