import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Mail, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 min-h-screen bg-muted/30 p-6 hidden lg:block">
          <div className="space-y-4">
            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-primary/20">
              <img src="/lovable-uploads/9427fcde-3345-4bda-acfa-a2ca6e2f3e9a.png" alt="Michael Jolley" className="w-full h-full object-cover" />
            </div>
            
            <nav className="space-y-2">
              <a href="#about" className="block py-2 px-3 rounded-lg hover:bg-background transition-colors">
                About
              </a>
              <a href="#experience" className="block py-2 px-3 rounded-lg hover:bg-background transition-colors">
                Experience
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
              <a href="#leadership" className="block py-2 px-3 rounded-lg hover:bg-background transition-colors">
                Leadership
              </a>
              <a href="#certifications" className="block py-2 px-3 rounded-lg hover:bg-background transition-colors">
                Certifications
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
                <p>Harrisonburg, VA | (571) 528-6985</p>
                <div className="flex flex-col lg:flex-row lg:gap-4 gap-1">
                  <a href="mailto:jolleymc@gmail.com" className="text-primary hover:underline">
                    jolleymc@gmail.com
                  </a>
                  <a href="https://www.linkedin.com/in/michael-jolley-23a4b2219/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    LinkedIn Profile
                  </a>
                  <a href="https://michaeljolley.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    michaeljolley.dev
                  </a>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed mb-8">
                Information Technology student with a minor in Philosophy at James Madison University, pursuing 
                my passion for learning in the intelligence and cybersecurity fields. I enjoy practicing critical thinking 
                and exploring abstract ideas in the field of Philosophy. I am experienced in Python, Java, SQL, software development, 
                networking, Linux, and much more. I am currently looking for a Summer 2026 internship.
              </p>

              <div className="flex justify-center lg:justify-start gap-4">
                <a href="https://www.linkedin.com/in/michael-jolley-23a4b2219/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </a>
                <a href="https://github.com/jolleymc" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                </a>
                <a href="mailto:jolleymc@gmail.com">
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </section>

            <Separator />

            {/* Experience */}
            <section id="experience">
              <h2 className="text-3xl font-bold mb-8">Experience</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Technology Intern</CardTitle>
                        <CardDescription className="mt-2">
                          Lansdowne Technology Consulting | Ashburn, VA
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Dec 2024 – Jan 2025</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Developed RESTful APIs using Django and Django REST Framework to support client contract deliverables, ensuring high-quality and scalable software solutions</li>
                      <li>• Worked in agile software development with sprints using JIRA</li>
                      <li>• Collaborated and engaged in problem-solving sessions with senior developers to debug Python code effectively</li>
                      <li>• Gained hands-on experience with AWS networking infrastructure and deployment tools</li>
                      <li>• Exposed to IT consulting practices, including client communication and requirement gathering</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Sales and Lead Generation Associate</CardTitle>
                        <CardDescription className="mt-2">
                          Lansdowne Technology Consulting | Leesburg, VA
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Jun 2025 – Present</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Conduct cold outreach to potential clients across multiple industries</li>
                      <li>• Research leads using platforms like GovTribe</li>
                      <li>• Maintain detailed tracking and earn commission for contributing to client acquisitions</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Student Intern / SQL and Python Trainee</CardTitle>
                        <CardDescription className="mt-2">
                          Global Career Accelerator: Coding for Data | Harrisonburg, VA
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Aug 2024 – Jan 2025</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Learned and applied data analytical skills using SQL, Python, and Tableau through coursework and assignments</li>
                      <li>• Communicated data analysis results verbally, in writing, and visually by creating visualizations in Tableau</li>
                      <li>• Examined user behavior across various industries and scenarios, identifying key trends and patterns</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Sales Associate</CardTitle>
                        <CardDescription className="mt-2">
                          EBike Connections | Leesburg, VA
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Jun 2025 – Aug 2025</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Assist customers in selecting e-bikes tailored to their needs while providing clear product guidance</li>
                      <li>• Manage inventory, test ride prep, and provide basic repair and diagnostic</li>
                    </ul>
                  </CardContent>
                </Card>
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
                        <CardTitle>Steam Game Database Project</CardTitle>
                        <CardDescription className="mt-2">
                          Tech Stack: Django, SQLite, REST Framework
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Recent</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Developed a full-stack web app using Django and SQLite to analyze a Steam game dataset. 
                      Used Django's REST framework to build querying functionality, and designed user-facing views 
                      and templates to display game listings and statistics in a clean UI.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Data Analysis Projects</CardTitle>
                        <CardDescription className="mt-2">
                          Intel's Sustainability Team & Grammy.com Data Analysis
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Global Career Accelerator</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Communicated data-driven recommendations and performance insights using data visualizations 
                      for various business issues. Worked with real-world datasets to identify trends and create 
                      actionable business intelligence.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            {/* Education */}
            <section id="education">
              <h2 className="text-3xl font-bold mb-8">Education</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>James Madison University</CardTitle>
                        <CardDescription className="mt-2">
                          Bachelor of Science in Information Technology<br />
                          Minor in Philosophy
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Expected May 2027</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Cumulative GPA:</strong> 3.482</p>
                      <p><strong>Academic Honors:</strong> Dean's List Fall 2024 | President's List Spring 2025</p>
                      <p><strong>Organizations:</strong> Phi Sigma Tau International Honor Society in Philosophy | Madison Tech Society</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Paul VI Catholic High School</CardTitle>
                        <CardDescription className="mt-2">
                          Advanced Diploma
                        </CardDescription>
                      </div>
                      <Badge variant="outline">2019 - 2023</Badge>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </section>

            <Separator />

            {/* Skills */}
            <section id="skills">
              <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Programming/Software Development</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      'Python', 'Java', 'OOP', 'NumPy', 'Pandas', 'TCP/IP', 'Django', 'Django REST', 'API Development', 'Socket Programming'
                    ].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-center justify-center py-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Database Management</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {['SQL'].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-center justify-center py-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Software Experience</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      'Kali Linux', 'Ubuntu', 'Wireshark', 'Tableau', 'VMWare', 'Microsoft Suite', 'JIRA'
                    ].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-center justify-center py-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Data Science</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      'Data Visualization', 'Data Joining', 'Conditional Logic', 'Data Aggregation', 'Data Cleaning'
                    ].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-center justify-center py-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Miscellaneous</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      'Sales', 'Logical Reasoning', 'Problem-Solving', 'Abstract Thinking', 'Intercultural Skills', 'Persuasive Writing'
                    ].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-center justify-center py-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Leadership */}
            <section id="leadership">
              <h2 className="text-3xl font-bold mb-8">Leadership & Projects</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Housing Committee and Scholarship Committee</CardTitle>
                        <CardDescription className="mt-2">
                          Lambda Chi Alpha Fraternity | Harrisonburg, VA
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Dec 2023 - Present</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Engaged with housing management and lead study sessions promoting academic success within the fraternity.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Social Media Chair</CardTitle>
                        <CardDescription className="mt-2">
                          Madison Tech Society | Harrisonburg, VA
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Apr 2025 - Present</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Manage club social media content to increase visibility and reach. Contribute to executive board leadership.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            {/* Certifications */}
            <section id="certifications">
              <h2 className="text-3xl font-bold mb-8">Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold">SQL Specialist</h3>
                    <p className="text-sm text-muted-foreground">Global Career Accelerator</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold">PCEP Certified Entry-Level Python Programmer</h3>
                    <p className="text-sm text-muted-foreground">OpenEDG Python Institute</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold">Intercultural Skills</h3>
                    <p className="text-sm text-muted-foreground">Global Career Accelerator</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;