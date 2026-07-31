import { PageHeading } from '@/components/PageHeading';
import { CodeTag } from '@/components/CodeTag';

const certifications = [
  { name: 'SQL Specialist', issuer: 'Global Career Accelerator' },
  { name: 'PCEP Certified', issuer: 'Entry-Level Python Programmer, OpenEDG Python Institute' },
  { name: 'Intercultural Skills', issuer: 'Global Career Accelerator' },
  { name: 'Microsoft Azure AI Fundamentals', issuer: 'Microsoft' },
  { name: 'Virtru Data Security Platform Partner', issuer: 'Virtru' },
  { name: 'CCI Cybersecurity Fundamentals Traineeship', issuer: 'CCI' },
];

const coursework = [
  'Data Structures and Advanced Programming for IT',
  'Computational Structures and Logic',
  'Information Security and Privacy',
  'Intro to Telecom and Networking',
  'Digital Electronics',
  'Database Administration',
  'Web Technology',
  'Advanced Networking for Information Technology',
  'Operating Systems Admin',
  'Data Science and Machine Learning',
];

const About = () => {
  return (
    <div className="min-h-screen px-6 py-14 md:px-14 md:py-20 animate-fade-in">
      <div className="max-w-3xl">
        <PageHeading
          eyebrow="~/portfolio/about"
          title="About Me"
          subline="U.S. Citizen · Eligible for a Security Clearance"
        />

        {/* Education */}
        <section className="mb-12">
          <p className="section-label">education</p>
          <div className="flat-card">
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-4">
              <div>
                <h3 className="font-mono text-base font-semibold text-foreground">James Madison University</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Bachelor of Science in Information Technology, Minor in Philosophy
                </p>
              </div>
              <span className="meta-date shrink-0">August 2023 – May 2027</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-primary mb-1">Academic Performance</p>
                <p className="text-muted-foreground">Cumulative GPA: 3.388</p>
                <p className="text-muted-foreground">Dean's List Fall 2024, Spring 2026</p>
                <p className="text-muted-foreground">President's List Spring 2025</p>
              </div>
              <div>
                <p className="font-medium text-primary mb-1">Organizations</p>
                <p className="text-muted-foreground">Phi Sigma Tau International Honor Society in Philosophy</p>
                <p className="text-muted-foreground">Madison Tech Society</p>
                <p className="text-muted-foreground">Lambda Chi Alpha</p>
              </div>
            </div>
          </div>
        </section>

        {/* Coursework */}
        <section className="mb-12">
          <p className="section-label">relevant coursework</p>
          <div className="flat-card flex flex-wrap gap-x-4 gap-y-2">
            {coursework.map((course) => (
              <CodeTag key={course}>{course}</CodeTag>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <p className="section-label">certifications</p>
          <div className="border border-border rounded-sm divide-y divide-border">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 px-4 py-3">
                <span className="font-mono text-sm text-foreground">{cert.name}</span>
                <span className="text-xs text-muted-foreground">{cert.issuer}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
