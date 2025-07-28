import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, ArrowRight, LogOut, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

const Home = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeToggle />
        {user && (
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        )}
      </div>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent leading-tight pb-2">
            Michael Jolley
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Information Technology Professional and Senior Sales Representative for LTC
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Welcome to my digital space. Explore my professional portfolio or access a demo of the lead management system I've built.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Portfolio</CardTitle>
              <CardDescription className="text-base">
                Explore my projects, skills, education, and professional experience in technology and cybersecurity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/portfolio">
                <Button className="w-full group/btn" size="lg">
                  View Portfolio
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">CRM System</CardTitle>
              <CardDescription className="text-base">
                Access a demo of the comprehensive lead management system I've developed for sales tracking and customer relationship management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/crm">
                <Button className="w-full group/btn" size="lg" variant="outline">
                  Access CRM
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Lead Generator</CardTitle>
              <CardDescription className="text-base">
                Automated lead discovery platform that searches multiple data sources to find qualified prospects for your business.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/lead-generator">
                <Button className="w-full group/btn" size="lg" variant="secondary">
                  Generate Leads
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Authentication Section */}
        <div className="text-center mt-12">
          {user ? (
            <div className="space-y-4">
              <div className="text-lg">
                Welcome back, <span className="font-semibold text-primary">{user.user_metadata?.display_name || user.email}</span>!
              </div>
              <Link to="/crm">
                <Button size="lg">
                  Access Your CRM
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="secondary" size="lg">
                  Sign In / Create Account
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                Create an account to save your CRM data and preferences
              </p>
            </>
          )}
        </div>

        {/* Contact Information */}
        <div className="text-center mt-16 space-y-4">
          <h2 className="text-2xl font-semibold">Get In Touch</h2>
          <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
            <span>(571) 528-6985</span>
            <a href="mailto:jolleymc@gmail.com" className="text-primary hover:underline">
              jolleymc@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;