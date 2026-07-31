export const Footer = () => {
  return (
    <footer className="border-t border-border px-6 py-6 md:px-14">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
        <p className="font-mono">© {new Date().getFullYear()} Michael Jolley</p>
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/michael-jolley-23a4b2219/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/jolleymc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a href="mailto:jolleymc@gmail.com" className="hover:text-primary transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};
