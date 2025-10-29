import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold gradient-text">Get In Touch</h1>
            <p className="text-xl text-muted-foreground">
              Let's connect and discuss opportunities
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Email</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <a 
                  href="mailto:jolleymc@gmail.com" 
                  className="text-lg text-muted-foreground hover:text-primary transition-colors"
                >
                  jolleymc@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Phone</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <a 
                  href="tel:571-528-6985" 
                  className="text-lg text-muted-foreground hover:text-primary transition-colors"
                >
                  (571) 528-6985
                </a>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Location</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  Washington D.C. Metro Area
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Linkedin className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Website</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <a 
                  href="https://michaeljolley.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg text-muted-foreground hover:text-primary transition-colors"
                >
                  michaeljolley.dev
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Social Links */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold">Connect on Social Media</h3>
                <div className="flex justify-center gap-4">
                  <a 
                    href="https://www.linkedin.com/in/michael-jolley-23a4b2219/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" variant="outline" className="gap-2">
                      <Linkedin className="h-5 w-5" />
                      LinkedIn
                    </Button>
                  </a>
                  <a 
                    href="https://github.com/jolleymc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" variant="outline" className="gap-2">
                      <Github className="h-5 w-5" />
                      GitHub
                    </Button>
                  </a>
                  <a href="mailto:jolleymc@gmail.com">
                    <Button size="lg" variant="outline" className="gap-2">
                      <Mail className="h-5 w-5" />
                      Email Me
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <div className="text-center space-y-4">
            <div className="inline-block px-6 py-3 bg-primary/10 rounded-full">
              <p className="text-lg font-semibold text-primary">
                Currently seeking Summer 2026 internship opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
