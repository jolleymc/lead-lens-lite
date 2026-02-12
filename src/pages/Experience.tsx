import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    title: 'Software Engineering Intern',
    company: 'Tidal Cyber with CCI Experiential Entrepreneurship Internship Program',
    location: 'Remote',
    period: '01/2026 – Present',
    description: [
      'SWE Intern for Tidal Cyber.'
    ]
  },
  {
    title: 'AI/ML Intern',
    company: 'General Dynamics Information Technology',
    location: 'TBD',
    period: 'Summer 2025',
    description: [
      'Incoming AI/ML Intern for Summer 2025.',
      'Will work on artificial intelligence and machine learning projects supporting mission-critical operations.'
    ]
  },
  {
    title: 'AI Intern',
    company: 'Pelican Intel with CCI Experiential Entrepreneurship Internship Program',
    location: 'Remote',
    period: '09/2025 – 12/2025',
    description: [
      'Developed proof-of-concept workflows in Python using LangChain to prototype LLM-based chatbots and semantic search tools, ensuring alignment with CJIS compliance requirements.',
      'Built foundational scripts for document ingestion and prompt engineering in preparation for secure implementation of large language models in criminal justice data environments.'
    ]
  },
  {
    title: 'Technology Intern',
    company: 'Lansdowne Technology Consulting',
    location: 'Ashburn, VA',
    period: '12/2024 – 01/2025',
    description: [
      'Developed and deployed RESTful APIs using Django and Django REST Framework, supporting a client contract and enabling scalable software solutions in an agile JIRA environment.',
      'Collaborated with senior developers to resolve 5-10 backend issues per sprint, improving code reliability and gaining exposure to AWS networking and secure cloud deployment practices.'
    ]
  },
  {
    title: 'Sales and Lead Generation Associate',
    company: 'Lansdowne Technology Consulting',
    location: 'Leesburg, VA',
    period: '06/2025 – 09/2025',
    description: [
      'Conducted cold outreach and qualification to 30+ prospective clients weekly across multiple industries.',
      'Developed a custom CRM tool that reduced lead tracking and follow-up time by 40%, streamlining sales workflow and increasing personal productivity.'
    ]
  },
  {
    title: 'SQL and Python Trainee',
    company: 'Global Career Accelerator: Coding for Data',
    location: 'Harrisonburg, VA',
    period: '08/2024 – 01/2025',
    description: [
      'Applied data analytics skills using SQL, Python, and Tableau to examine user behavior across multiple industries and identify key trends.',
      'Communicated analytical findings through presentations and Tableau data visualizations for diverse business scenarios.'
    ]
  },
  {
    title: 'Sales Associate',
    company: 'EBike Connections',
    location: 'Leesburg, VA',
    period: '06/2025 – 08/2025',
    description: [
      'Assisted customers in selecting e-bikes tailored to their needs while providing clear product guidance.',
      'Sold over $8000 of inventory over the course of the summer.'
    ]
  }
];

const Experience = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Briefcase className="h-10 w-10 text-primary" />
              <h1 className="text-5xl font-bold gradient-text">Experience</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Professional journey and achievements
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="card-hover" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">{exp.title}</CardTitle>
                      <CardDescription className="text-base">
                        {exp.company}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                    </div>
                    <Badge variant="outline" className="text-sm shrink-0">
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3 text-muted-foreground">
                        <span className="text-primary shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
