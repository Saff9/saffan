'use client';

import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll back to top"
      className="inline-flex items-center gap-1.5 sans text-xs text-ink-soft transition-colors hover:text-[var(--accent-deep)] focus:outline-none"
    >
      Back to top <ArrowUp className="h-3 w-3" aria-hidden="true" />
    </button>
  );
}
