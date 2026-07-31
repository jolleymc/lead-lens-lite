interface CodeTagProps {
  children: React.ReactNode;
}

export const CodeTag = ({ children }: CodeTagProps) => (
  <span className="code-tag">
    <span className="bracket">[</span>
    {children}
    <span className="bracket">]</span>
  </span>
);
