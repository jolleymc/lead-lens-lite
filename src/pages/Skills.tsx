import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Shield, BarChart, Wrench, Users } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming/Software Development',
    icon: Code,
    color: 'text-primary',
    skills: [
      'Python',
      'Object-Oriented Programming',
      'Django',
      'Django REST Framework',
      'REST APIs',
      'API Development',
      'LangChain',
      'HTML',
      'CSS',
      'JavaScript'
    ]
  },
  {
    title: 'Cybersecurity and Networking',
    icon: Shield,
    color: 'text-accent',
    skills: [
      'TCP/IP Protocols (5-layer model)',
      'Kali Linux',
      'Wireshark',
      'Ubuntu',
      'VMWare',
      'Socket Programming',
      'RIP'
    ]
  },
  {
    title: 'Software Experience',
    icon: Wrench,
    color: 'text-primary',
    skills: [
      'Tableau',
      'Microsoft Suite',
      'JIRA'
    ]
  },
  {
    title: 'Data Science',
    icon: BarChart,
    color: 'text-accent',
    skills: [
      'Data Visualization',
      'Conditional Logic',
      'SQL'
    ]
  },
  {
    title: 'Database Management',
    icon: Database,
    color: 'text-primary',
    skills: [
      'SQL',
      'SQLite',
      'MongoDB',
      'MySQL',
      'Database Administration'
    ]
  },
  {
    title: 'Miscellaneous',
    icon: Users,
    color: 'text-accent',
    skills: [
      'Sales',
      'Logical Reasoning',
      'Persuasive Writing',
      'Intercultural Skills'
    ]
  }
];

const Skills = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold gradient-text">Technical Skills</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive technical expertise and competencies
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={index} 
                  className="card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary"
                          className="text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Skill Highlights */}
          <div className="mt-12">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold">Core Competencies</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Experienced in full-stack development, cybersecurity, data analysis, and networking. 
                    Strong foundation in Python, Django, SQL, and cloud technologies with hands-on experience 
                    in agile development environments.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
