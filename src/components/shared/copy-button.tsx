'use client';

import { useCopy } from '@/hooks/use-copy';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}

export function CopyButton({
  text,
  label = 'copy email',
  copiedLabel = 'copied!',
  className = 'btn-outline',
}: CopyButtonProps) {
  const { copied, copy } = useCopy();

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      className={`${className} ${
        copied
          ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-06)] font-semibold'
          : ''
      }`}
      aria-label={copied ? copiedLabel : label}
    >
      {copied ? (
        <Check className="h-4 w-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      <span className="text-ink">{copied ? copiedLabel : label}</span>
    </button>
  );
}
