import { PageHeading } from '@/components/PageHeading';

const contactInfo = [
  { label: 'Email', value: 'jolleymc@gmail.com', href: 'mailto:jolleymc@gmail.com' },
  { label: 'Location', value: 'Washington D.C. Metro Area', href: null },
  { label: 'LinkedIn', value: 'linkedin.com/in/michael-jolley-23a4b2219', href: 'https://www.linkedin.com/in/michael-jolley-23a4b2219/' },
  { label: 'GitHub', value: 'github.com/jolleymc', href: 'https://github.com/jolleymc' },
];

const Contact = () => {
  return (
    <div className="min-h-screen px-6 py-14 md:px-14 md:py-20 animate-fade-in">
      <div className="max-w-2xl">
        <PageHeading
          eyebrow="~/portfolio/contact"
          title="Get In Touch"
          subline="Let's connect and discuss opportunities"
        />

        <div className="border border-border rounded-sm divide-y divide-border">
          {contactInfo.map((item) => (
            <div key={item.label} className="flex items-baseline justify-between gap-4 px-4 py-3">
              <span className="font-mono text-sm text-muted-foreground">{item.label}</span>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm text-foreground hover:text-primary transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-sm text-foreground">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
