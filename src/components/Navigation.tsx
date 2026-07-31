import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
  { name: 'Personal', path: '/personal' },
  { name: 'Contact', path: '/contact' },
];

export const Navigation = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-56 md:shrink-0 md:h-screen md:sticky md:top-0 border-r border-border bg-secondary/40 px-6 py-8">
        <Link to="/" className="mb-10 block">
          <span className="block font-mono text-sm font-semibold text-foreground">
            Michael Jolley
          </span>
          <span className="block font-mono text-xs text-muted-foreground">
            portfolio/
          </span>
        </Link>
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 text-sm border-l-2 transition-colors ${
                isActive(link.path)
                  ? 'border-primary text-primary bg-accent font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="font-mono text-sm font-semibold text-foreground">
            Michael Jolley
          </Link>
          <button
            onClick={() => setMobileOpen((open) => !open)}
            className="font-mono text-sm text-muted-foreground hover:text-foreground"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        {mobileOpen && (
          <nav className="flex flex-col border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 text-sm border-b border-border last:border-b-0 ${
                  isActive(link.path)
                    ? 'text-primary bg-accent font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </>
  );
};
