import { useEffect, useRef, useState } from 'react';

interface PageHeadingProps {
  eyebrow: string;
  title: string;
  subline?: string;
}

export const PageHeading = ({ eyebrow, title, subline }: PageHeadingProps) => {
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setTyped(title);
      setDone(true);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(title.slice(0, i));
      if (i >= title.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [title]);

  return (
    <div className="mb-10">
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h1 className="text-2xl font-medium tracking-tight text-foreground">
        {typed}
        <span className={`cursor-caret ${done ? 'blink' : ''}`}>|</span>
      </h1>
      {subline && <p className="mt-2 text-sm text-muted-foreground">{subline}</p>}
    </div>
  );
};
