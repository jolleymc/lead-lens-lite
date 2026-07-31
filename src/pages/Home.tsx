import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/PageHeading';
import { Link } from 'react-router-dom';

const quickLinks = [
  { to: '/experience', label: 'Experience', desc: '5+ roles across AI, cybersecurity, and software' },
  { to: '/projects', label: 'Projects', desc: '8+ technical projects & labs' },
  { to: '/skills', label: 'Skills', desc: '30+ technical skills' },
];

const Home = () => {
  return (
    <div className="min-h-screen px-6 py-14 md:px-14 md:py-20 animate-fade-in">
      <div className="max-w-2xl">
        <PageHeading
          eyebrow="~/portfolio"
          title="Michael Jolley"
          subline="AI/ML Technical Intern at General Dynamics Information Technology"
        />

        <p className="text-sm leading-7 text-muted-foreground max-w-xl mb-10">
          Working across <span className="text-primary">applied AI</span>, cybersecurity, and
          backend engineering. James Madison University — B.S. Information Technology, minor in
          Philosophy. Interested in zero-trust systems, LLM tooling, and building things that ship.
        </p>

        <div className="flex flex-wrap gap-3 mb-14">
          <Link to="/about">
            <Button size="default">Explore Portfolio</Button>
          </Link>
          <Link to="/contact">
            <Button size="default" variant="outline">Contact Me</Button>
          </Link>
        </div>

        <p className="section-label">elsewhere on this site</p>
        <div className="flex flex-col border border-border rounded-sm divide-y divide-border">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-baseline justify-between gap-4 px-4 py-3 hover:bg-secondary/60 transition-colors"
            >
              <span className="font-mono text-sm text-foreground">{link.label}</span>
              <span className="text-xs text-muted-foreground">{link.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
