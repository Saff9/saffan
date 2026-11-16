'use client';

import { useState, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';

export interface CodeBlockProps {
  code: string;
  lang?: string;
  dimComments?: boolean;
}

export function CodeBlock({
  code,
  lang = 'text',
  dimComments = false,
}: CodeBlockProps): ReactNode {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
    }
  };

  return (
    <div className="codeblock group relative">
      <div className="codeblock-header flex items-center justify-between">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="codeblock-dot" />
          <span className="codeblock-dot" />
          <span className="codeblock-dot" />
          <span className="codeblock-lang ml-2">{lang}</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Code copied' : 'Copy code snippet'}
          className="flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-mono text-ink-soft transition-colors hover:text-accent hover:bg-black/10 dark:hover:bg-white/10"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-medium">copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />
              <span>copy</span>
            </>
          )}
        </button>
      </div>

      <pre className="whitespace-pre p-4 overflow-x-auto text-[13px] leading-relaxed text-ink">
        <code className="mono">
          {dimComments ? renderWithDimmedComments(code) : code}
        </code>
      </pre>
    </div>
  );
}

function renderWithDimmedComments(code: string): ReactNode[] {
  const lines = code.split('\n');
  return lines.map((line, i) => {
    const isComment = line.trim().startsWith('//');
    return (
      <span
        key={i}
        className={isComment ? 'text-muted-foreground' : undefined}
      >
        {line}
        {i < lines.length - 1 ? '\n' : ''}
      </span>
    );
  });
}
