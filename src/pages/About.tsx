import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold gradient-text">About Me</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              U.S. Citizen Eligible for a Security Clearance
            </p>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg animate-float">
              <img 
                src="/lovable-uploads/9427fcde-3345-4bda-acfa-a2ca6e2f3e9a.png" 
                alt="Michael Jolley" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Education</h2>
            </div>

            <Card className="card-hover">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <CardTitle className="text-2xl">James Madison University</CardTitle>
                    <CardDescription className="mt-2 text-base">
                      Bachelor of Science in Information Technology<br />
                      Minor in Philosophy
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-sm">August 2023 – May 2027</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-primary">Academic Performance</p>
                    <p className="text-muted-foreground">Cumulative GPA: 3.482</p>
                    <p className="text-muted-foreground">Dean's List Fall 2024</p>
                    <p className="text-muted-foreground">President's List Spring 2025</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Organizations</p>
                    <p className="text-muted-foreground">Phi Sigma Tau International Honor Society in Philosophy</p>
                    <p className="text-muted-foreground">Madison Tech Society</p>
                    <p className="text-muted-foreground">Lambda Chi Alpha</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Relevant Coursework */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Relevant Coursework</h3>
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {[
                    'Data Structures and Advanced Programming for IT',
                    'Computational Structures and Logic',
                    'Information Security and Privacy',
                    'Intro to Telecom and Networking',
                    'Digital Electronics',
                    'Database Administration',
                    'Web Technology',
                    'Advanced Networking for Information Technology'
                  ].map((course) => (
                    <Badge key={course} variant="secondary" className="text-sm">
                      {course}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certifications */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Certifications</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="card-hover text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">SQL Specialist</h4>
                  <p className="text-sm text-muted-foreground">Global Career Accelerator</p>
                </CardContent>
              </Card>
              <Card className="card-hover text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8 text-accent" />
                  </div>
                  <h4 className="font-semibold mb-2">PCEP Certified</h4>
                  <p className="text-sm text-muted-foreground">Entry-Level Python Programmer</p>
                </CardContent>
              </Card>
              <Card className="card-hover text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Intercultural Skills</h4>
                  <p className="text-sm text-muted-foreground">Global Career Accelerator</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
