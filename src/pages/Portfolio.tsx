import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Mail, ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 min-h-screen bg-muted/30 p-6 hidden lg:block">
          <div className="space-y-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">MJ</span>
            </div>
            
            <nav className="space-y-2">
              <a href="#about" className="block py-2 px-3 rounded-lg hover:bg-background transition-colors">
                About
              </a>
              <a href="#projects" className="block py-2 px-3 rounded-lg hover:bg-background transition-colors">
                Projects
              </a>
              <a href="#education" className="block py-2 px-3 rounded-lg hover:bg-background transition-colors">
                Education
              </a>
              <a href="#skills" className="block py-2 px-3 rounded-lg hover:bg-background transition-colors">
                Skills
              </a>
              <a href="#interests" className="block py-2 px-3 rounded-lg hover:bg-background transition-colors">
                Interests
              </a>
              <a href="#awards" className="block py-2 px-3 rounded-lg hover:bg-background transition-colors">
                Awards
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-12">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Header */}
            <section id="about" className="text-center lg:text-left">
              <h1 className="text-5xl font-bold mb-4">
                MICHAEL <span className="text-primary">JOLLEY</span>
              </h1>
              <div className="text-muted-foreground mb-6 space-y-1">
                <p>522 Pheasant Run Circle · Harrisonburg, VA 22801 · (571) 528-6985</p>
                <a href="mailto:jolleymc@gmail.com" className="text-primary hover:underline">
                  jolleymc@gmail.com
                </a>
              </div>
              
              <p className="text-lg leading-relaxed mb-8">
                Hello! I am an Information Technology major with a minor in Philosophy at James Madison University, pursuing 
                my passion for learning in the intelligence and cybersecurity fields. I also enjoy practicing critical thinking 
                and exploring abstract ideas in the field of Philosophy. I am experienced in Python, SQL, software development, 
                networking, Linux, and much more. I am currently looking for a Summer 2025 internship.
              </p>

              <div className="flex justify-center lg:justify-start gap-4">
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </section>

            <Separator />

            {/* Projects */}
            <section id="projects">
              <h2 className="text-3xl font-bold mb-8">Projects</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Socket Programming Project</CardTitle>
                        <CardDescription className="mt-2">
                          Tech Stack: Python, Socket Module, TCP
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Spring 2024</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      This project involves using the socket module in Python to exchange TCP messages from client to server, 
                      with the server returning an echo/ping and message reception timestamp.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Server Code
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Client Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Data Analysis Project with Python</CardTitle>
                        <CardDescription className="mt-2">
                          Tech Stack: Python, MatPlotLib, NumPy
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Spring 2024</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      This program simulates student grade data, calculates important statistics, and visualizes the results 
                      using plots. It automates the analysis of student performance across various subjects by generating grades 
                      either randomly or from a file, and provides insights through visual representations like bar charts and histograms.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Functions Code
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Main Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Django Web API Development</CardTitle>
                        <CardDescription className="mt-2">
                          Tech Stack: Python, Django, Django REST Framework, AWS, Zapier
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Internship Project</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>
                      During my internship with Lansdowne Technology Consulting, I designed and implemented robust RESTful API 
                      endpoints using Django REST Framework. Leveraging Django's class-based views and serializers, I built secure 
                      and scalable APIs that efficiently handle data operations. This project not only enhanced my expertise in API 
                      development but also strengthened my skills in error handling, authentication, and database optimization.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            {/* Education */}
            <section id="education">
              <h2 className="text-3xl font-bold mb-8">Education</h2>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>James Madison University</CardTitle>
                      <CardDescription className="mt-2">
                        Bachelor of Science, Information Technology<br />
                        Minor in Philosophy
                      </CardDescription>
                    </div>
                    <Badge variant="outline">Expected 2026</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Focus on cybersecurity, intelligence fields, and critical thinking through philosophical studies.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Skills */}
            <section id="skills">
              <h2 className="text-3xl font-bold mb-8">Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  'Python', 'SQL', 'Django', 'Linux', 'Networking', 'TCP/IP',
                  'Socket Programming', 'Data Analysis', 'MatPlotLib', 'NumPy',
                  'AWS', 'Zapier', 'RESTful APIs', 'Database Design',
                  'Cybersecurity', 'Philosophy', 'Critical Thinking'
                ].map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-center justify-center py-2">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            <Separator />

            {/* Interests */}
            <section id="interests">
              <h2 className="text-3xl font-bold mb-8">Interests</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-lg leading-relaxed">
                    I am passionate about cybersecurity and intelligence work, enjoying the challenge of protecting systems 
                    and analyzing complex problems. My minor in Philosophy complements my technical studies by developing 
                    my critical thinking abilities and helping me approach problems from multiple perspectives. I'm always 
                    eager to learn new technologies and explore the intersection of technology and human thought.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Awards */}
            <section id="awards">
              <h2 className="text-3xl font-bold mb-8">Awards & Recognition</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    Academic achievements and professional recognition to be updated as earned.
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;