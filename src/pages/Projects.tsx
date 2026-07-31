import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Network, Database, Globe, Shield, Spade } from 'lucide-react';

const projects = [
  {
    title: 'Mini SOC (Security Operations Center) Dashboard',
    period: 'Fall 2025',
    icon: Shield,
    tags: ['Linux', 'Cybersecurity', 'Grafana', 'Python (parsers)', 'IDS/IPS', 'Observability'],
    description: 'Built a Linux-based Security Operations Center using Suricata, Loki, and Grafana to monitor real-time network threats and visualize security alerts. Developed a full ingestion pipeline that captures IDS events, parses JSON logs, and displays interactive security metrics such as top attack sources, alert severity, and traffic patterns.'
  },
  {
    title: 'Screen Reader Poker Analysis Tool',
    period: '2024 – 2026',
    icon: Spade,
    tags: ['Python', 'Screen Reading', 'Probability', 'Automation', 'Claude API'],
    description: 'Developed a screen-reader-based poker analysis tool that continuously captures table state on screen changes, logging hole cards, community cards, and opponent actions. Integrates the Claude Haiku API to deliver real-time, AI-driven move recommendations alongside calculated win probabilities, enabling players to practice strategy and hand-reading in play-money games before transitioning to real-stakes poker.'
  },
  {
    title: 'Steam Game Database Project',
    period: 'Spring 2025',
    icon: Database,
    tags: ['Django', 'SQLite', 'REST APIs', 'Full-Stack'],
    description: 'Built a full-stack web app using Django and SQLite; implemented REST APIs and query features to analyze data from 100+ game records.'
  },
  {
    title: 'Data Analysis Project with Intel\'s Sustainability Team',
    period: 'Fall 2024',
    icon: Code2,
    tags: ['Python', 'Tableau', 'Data Visualization'],
    description: 'Communicated data-driven recommendations and performance insights using data visualizations for various business issues.'
  },
  {
    title: 'Grammy.com Data Analysis Project',
    period: 'Fall 2024',
    icon: Code2,
    tags: ['SQL', 'Python', 'Analytics'],
    description: 'Global Career Accelerator project analyzing user behavior and trends with comprehensive data visualizations.'
  }
];

const labs = [
  {
    title: 'Network Devices & Functions',
    icon: Network,
    tags: ['Linux', 'VMware', 'VLAN', 'Routing'],
    description: 'Configured virtual LANs and performed static and dynamic routing using Linux networking tools and VMware to understand bridges, switches, and routers in a simulated network environment.'
  },
  {
    title: 'Network Services (ARP, DNS, DHCP)',
    icon: Network,
    tags: ['ARP', 'DNS', 'DHCP', 'Wireshark'],
    description: 'Implemented ARP, DNS (including mDNS), and DHCP/DHCP relay services on virtual machines, troubleshooting and analyzing network packet flows using Wireshark.'
  },
  {
    title: 'Web Technology & RESTful Services',
    icon: Globe,
    tags: ['NGINX', 'Apache', 'MongoDB', 'MySQL', 'Node.js'],
    description: 'Developed and deployed full-stack web applications with NGINX, Apache, MongoDB, MySQL, PHP, Node.js, and AJAX, integrating database-driven functionality and API services in virtualized Linux environments.'
  },
  {
    title: 'GNS3, VLANs, and VoIP/SIP',
    icon: Network,
    tags: ['GNS3', 'VoIP', 'SIP', 'RTP', 'Asterisk'],
    description: 'Engineered advanced network topologies in GNS3, segmenting networks with VLANs and enabling VoIP communication using SIP, RTP, and Asterisk SIP proxies for real-time voice traffic.'
  },
  {
    title: 'Wireless Networking & Security',
    icon: Network,
    tags: ['Raspberry Pi', 'WPA2', 'NAT', 'iptables'],
    description: 'Configured Raspberry Pi as a wireless access point, set up WPA2 security with DHCP, NAT, and iptables, and utilized Wireshark for wireless protocol analysis and secure wireless networking.'
  }
];

const Projects = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold gradient-text">Projects & Labs</h1>
            <p className="text-xl text-muted-foreground">
              Hands-on experience with real-world applications
            </p>
          </div>

          {/* Software Projects */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Software Projects</h2>
            <div className="grid gap-6">
              {projects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <Card key={index} className="card-hover">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                            <CardTitle className="text-xl">{project.title}</CardTitle>
                            <Badge variant="outline">{project.period}</Badge>
                          </div>
                          <CardDescription className="mt-2">
                            {project.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Networking Labs */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Networking & Infrastructure Labs</h2>
            <div className="grid gap-6">
              {labs.map((lab, index) => {
                const Icon = lab.icon;
                return (
                  <Card key={index} className="card-hover">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{lab.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {lab.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {lab.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Leadership Projects */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Leadership</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Scholarship Committee</CardTitle>
                  <CardDescription>
                    Lambda Chi Alpha Fraternity | Harrisonburg, VA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="mb-3">12/2023 – 11/2025</Badge>
                  <p className="text-muted-foreground">
                    Led study sessions promoting academic success within the fraternity. Helped facilitate an overall chapter GPA growth of .2 on a 4.0 scale.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Social Media Chair</CardTitle>
                  <CardDescription>
                    Madison Tech Society | Harrisonburg, VA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="mb-3">06/2025 – Present</Badge>
                  <p className="text-muted-foreground">
                    Managed social media content to increase visibility and reach. Contributed to executive board leadership. Developed promotional content that contributed to 25+ attendees at the club's first event.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
