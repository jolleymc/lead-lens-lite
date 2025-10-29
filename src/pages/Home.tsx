import { Button } from '@/components/ui/button';
import { Briefcase, ArrowRight } from 'lucide-react';
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent leading-tight pb-2">
            Michael Jolley
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Information Technology Professional and Senior Sales Representative for LTC
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Welcome to my digital space. Explore my professional portfolio showcasing my projects, skills, and experience.
          </p>
        </div>

        {/* Portfolio Card */}
        <div className="max-w-md mx-auto">
          <div className="text-center space-y-8 p-8 border-2 border-primary/20 rounded-lg hover:border-primary/50 transition-all duration-300 hover:shadow-lg bg-card">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Briefcase className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Professional Portfolio</h2>
              <p className="text-muted-foreground text-lg">
                Explore my projects, skills, education, and professional experience in technology and cybersecurity.
              </p>
            </div>
            <Link to="/portfolio">
              <Button size="lg" className="w-full text-lg py-6">
                View Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
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