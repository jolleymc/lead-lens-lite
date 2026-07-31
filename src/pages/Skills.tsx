import { PageHeading } from '@/components/PageHeading';
import { CodeTag } from '@/components/CodeTag';

const skillCategories = [
  {
    title: 'Programming / Software Development',
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
    skills: [
      'TCP/IP Protocols (5-layer model)',
      'Kali Linux',
      'Wireshark',
      'Ubuntu',
      'VMWare',
      'Socket Programming',
      'RIP',
      'iptables'
    ]
  },
  {
    title: 'Software Experience',
    skills: ['Tableau', 'Microsoft Suite', 'JIRA', 'Kubernetes']
  },
  {
    title: 'Data Science',
    skills: ['Data Visualization', 'Conditional Logic', 'SQL']
  },
  {
    title: 'Database Management',
    skills: ['SQL', 'SQLite', 'MongoDB', 'MySQL', 'Database Administration']
  },
  {
    title: 'Miscellaneous',
    skills: [
      'Sales',
      'Logical Reasoning',
      'Persuasive Writing',
      'Troubleshooting',
      'Decision Making',
      'Zero-Trust',
      'Intercultural Skills'
    ]
  }
];

const Skills = () => {
  return (
    <div className="min-h-screen px-6 py-14 md:px-14 md:py-20 animate-fade-in">
      <div className="max-w-3xl">
        <PageHeading
          eyebrow="~/portfolio/skills"
          title="Technical Skills"
          subline="Comprehensive technical expertise and competencies"
        />

        <div className="flex flex-col gap-8">
          {skillCategories.map((category) => (
            <section key={category.title}>
              <p className="section-label">{category.title.toLowerCase()}</p>
              <div className="flat-card flex flex-wrap gap-x-4 gap-y-2">
                {category.skills.map((skill) => (
                  <CodeTag key={skill}>{skill}</CodeTag>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="section-label">core competencies</p>
          <p className="text-sm leading-7 text-muted-foreground max-w-2xl">
            Experienced in full-stack development, cybersecurity, data analysis, and networking.
            Strong foundation in Python, Django, SQL, and cloud technologies with hands-on experience
            in agile development environments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skills;
