import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Michael Jolley
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Information Technology Professional & CRM Developer
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Welcome to my digital space. Explore my professional portfolio or access the lead management system I've built.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                Access the comprehensive lead management system I've developed for sales tracking and customer relationship management.
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
        </div>

        {/* Contact Information */}
        <div className="text-center mt-16 space-y-4">
          <h2 className="text-2xl font-semibold">Get In Touch</h2>
          <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
            <span>522 Pheasant Run Circle · Harrisonburg, VA 22801</span>
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