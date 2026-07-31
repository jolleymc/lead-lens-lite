import { PageHeading } from '@/components/PageHeading';
import { CodeTag } from '@/components/CodeTag';

const projects = [
  {
    title: 'Mini SOC (Security Operations Center) Dashboard',
    period: 'Fall 2025',
    tags: ['Linux', 'Cybersecurity', 'Grafana', 'Python (parsers)', 'IDS/IPS', 'Observability'],
    description: 'Built a Linux-based Security Operations Center using Suricata, Loki, and Grafana to monitor real-time network threats and visualize security alerts. Developed a full ingestion pipeline that captures IDS events, parses JSON logs, and displays interactive security metrics such as top attack sources, alert severity, and traffic patterns.'
  },
  {
    title: 'Screen Reader Poker Analysis Tool',
    period: '2024 – 2026',
    tags: ['Python', 'Screen Reading', 'Probability', 'Automation', 'Claude API'],
    description: 'Developed a screen-reader-based poker analysis tool that continuously captures table state on screen changes, logging hole cards, community cards, and opponent actions. Integrates the Claude Haiku API to deliver real-time, AI-driven move recommendations alongside calculated win probabilities, enabling players to practice strategy and hand-reading in play-money games before transitioning to real-stakes poker.'
  },
  {
    title: 'Steam Game Database Project',
    period: 'Spring 2025',
    tags: ['Django', 'SQLite', 'REST APIs', 'Full-Stack'],
    description: 'Built a full-stack web app using Django and SQLite; implemented REST APIs and query features to analyze data from 100+ game records.'
  },
  {
    title: "Data Analysis Project with Intel's Sustainability Team",
    period: 'Fall 2024',
    tags: ['Python', 'Tableau', 'Data Visualization'],
    description: 'Communicated data-driven recommendations and performance insights using data visualizations for various business issues.'
  },
  {
    title: 'Grammy.com Data Analysis Project',
    period: 'Fall 2024',
    tags: ['SQL', 'Python', 'Analytics'],
    description: 'Global Career Accelerator project analyzing user behavior and trends with comprehensive data visualizations.'
  }
];

const labs = [
  {
    title: 'Network Devices & Functions',
    tags: ['Linux', 'VMware', 'VLAN', 'Routing'],
    description: 'Configured virtual LANs and performed static and dynamic routing using Linux networking tools and VMware to understand bridges, switches, and routers in a simulated network environment.'
  },
  {
    title: 'Network Services (ARP, DNS, DHCP)',
    tags: ['ARP', 'DNS', 'DHCP', 'Wireshark'],
    description: 'Implemented ARP, DNS (including mDNS), and DHCP/DHCP relay services on virtual machines, troubleshooting and analyzing network packet flows using Wireshark.'
  },
  {
    title: 'Web Technology & RESTful Services',
    tags: ['NGINX', 'Apache', 'MongoDB', 'MySQL', 'Node.js'],
    description: 'Developed and deployed full-stack web applications with NGINX, Apache, MongoDB, MySQL, PHP, Node.js, and AJAX, integrating database-driven functionality and API services in virtualized Linux environments.'
  },
  {
    title: 'GNS3, VLANs, and VoIP/SIP',
    tags: ['GNS3', 'VoIP', 'SIP', 'RTP', 'Asterisk'],
    description: 'Engineered advanced network topologies in GNS3, segmenting networks with VLANs and enabling VoIP communication using SIP, RTP, and Asterisk SIP proxies for real-time voice traffic.'
  },
  {
    title: 'Wireless Networking & Security',
    tags: ['Raspberry Pi', 'WPA2', 'NAT', 'iptables'],
    description: 'Configured Raspberry Pi as a wireless access point, set up WPA2 security with DHCP, NAT, and iptables, and utilized Wireshark for wireless protocol analysis and secure wireless networking.'
  }
];

const leadership = [
  {
    title: 'Scholarship Committee',
    org: 'Lambda Chi Alpha Fraternity · Harrisonburg, VA',
    period: '12/2023 – 11/2025',
    description: 'Led study sessions promoting academic success within the fraternity. Helped facilitate an overall chapter GPA growth of .2 on a 4.0 scale.'
  },
  {
    title: 'Social Media Chair',
    org: 'Madison Tech Society · Harrisonburg, VA',
    period: '06/2025 – Present',
    description: "Managed social media content to increase visibility and reach. Contributed to executive board leadership. Developed promotional content that contributed to 25+ attendees at the club's first event."
  }
];

const Projects = () => {
  return (
    <div className="min-h-screen px-6 py-14 md:px-14 md:py-20 animate-fade-in">
      <div className="max-w-3xl">
        <PageHeading
          eyebrow="~/portfolio/projects"
          title="Projects & Labs"
          subline="Hands-on experience with real-world applications"
        />

        <section className="mb-12">
          <p className="section-label">software projects</p>
          <div className="flex flex-col gap-4">
            {projects.map((project, index) => (
              <div key={index} className="flat-card">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-2">
                  <h3 className="font-mono text-base font-semibold text-foreground">{project.title}</h3>
                  <span className="meta-date shrink-0">{project.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {project.tags.map((tag) => (
                    <CodeTag key={tag}>{tag}</CodeTag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <p className="section-label">networking & infrastructure labs</p>
          <div className="flex flex-col gap-4">
            {labs.map((lab, index) => (
              <div key={index} className="flat-card">
                <h3 className="font-mono text-base font-semibold text-foreground mb-2">{lab.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{lab.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {lab.tags.map((tag) => (
                    <CodeTag key={tag}>{tag}</CodeTag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="section-label">leadership</p>
          <div className="flex flex-col gap-4">
            {leadership.map((role) => (
              <div key={role.title} className="flat-card">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-1">
                  <h3 className="font-mono text-base font-semibold text-foreground">{role.title}</h3>
                  <span className="meta-date shrink-0">{role.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{role.org}</p>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
