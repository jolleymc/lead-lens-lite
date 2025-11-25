import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Briefcase, Trophy, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Animated Background */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 md:pt-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="container mx-auto px-4 text-center space-y-12 animate-fade-in">
          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl animate-float-soft">
              <img 
                src="/lovable-uploads/9427fcde-3345-4bda-acfa-a2ca6e2f3e9a.png" 
                alt="Michael Jolley" 
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight text-foreground">
              Michael Jolley
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground">
              Incoming AI/ML Intern at General Dynamics Information Technology
            </p>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI | Cybersecurity | Networking | Python
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link to="/about">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 animate-glow">
                Explore Portfolio
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6">
                <Mail className="h-5 w-5" />
                Contact Me
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-16 pb-20">
            <Link to="/experience" className="group">
              <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur card-hover">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Experience</h3>
                <p className="text-muted-foreground">5+ roles in tech and sales</p>
              </div>
            </Link>

            <Link to="/projects" className="group">
              <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur card-hover">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Projects</h3>
                <p className="text-muted-foreground">8+ technical projects & labs</p>
              </div>
            </Link>

            <Link to="/skills" className="group">
              <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur card-hover">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Skills</h3>
                <p className="text-muted-foreground">30+ technical skills</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;