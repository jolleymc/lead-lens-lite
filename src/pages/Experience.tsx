import { PageHeading } from '@/components/PageHeading';

const experiences = [
  {
    title: 'AI / Machine Learning Technical Intern',
    company: 'General Dynamics Information Technology',
    location: 'Falls Church, VA',
    period: '06/2026 – 08/2026',
    description: [
      'Developed AI capabilities for a DISA-targeted Integrated MPE Zero Trust Common Operating Picture, a secure coalition communications platform designed for information handling, continuous authentication, and future battlespace interoperability.',
      'Built and shipped a full-stack LLM-powered chat summarization service across four releases, spanning a Python microservice, React widget, Redis persistence, and Prometheus/Grafana observability on GKE.',
      'Conducted GDC-A thin client network connectivity testing and authored application test cases; hardened air-gapped deployment by replacing cloud Vertex AI with in-cluster Gemma serving and enforcing zero-trust Kubernetes NetworkPolicy.'
    ]
  },
  {
    title: 'Software Engineering Intern',
    company: 'Tidal Cyber with CCI Experiential Entrepreneurship Internship Program',
    location: 'Remote',
    period: '01/2026 – 05/2026',
    description: [
      'Built and shipped backend features for the Tidal Cyber cybersecurity platform using Django, Python, and AWS.',
      'Work spanned REST API development, Celery task design, database infrastructure, test coverage, and AWS CDK native blue/green deployment.'
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
    title: 'Sales and Lead Generation Associate',
    company: 'Lansdowne Technology Consulting',
    location: 'Leesburg, VA',
    period: '06/2025 – 09/2025',
    description: [
      'Conducted cold outreach and qualification to 30+ prospective clients weekly across multiple industries.',
      'Developed a custom CRM tool, streamlining sales workflow and increasing personal productivity.'
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
  }
];

const Experience = () => {
  return (
    <div className="min-h-screen px-6 py-14 md:px-14 md:py-20 animate-fade-in">
      <div className="max-w-3xl">
        <PageHeading
          eyebrow="~/portfolio/experience"
          title="Experience"
          subline="Professional journey and achievements"
        />

        <div className="flex flex-col gap-4">
          {experiences.map((exp, index) => (
            <div key={index} className="flat-card">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-1">
                <h3 className="font-mono text-base font-semibold text-foreground">{exp.title}</h3>
                <span className="meta-date shrink-0">{exp.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {exp.company} · {exp.location}
              </p>
              <ul className="space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-primary shrink-0">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
