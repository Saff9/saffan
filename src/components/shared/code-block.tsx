import { type ReactNode } from 'react';

/**
 * Props for the reusable code block.
 *
 * `code` is the raw source string (may contain `\n` line breaks). `lang`
 * is the language label shown in the header (e.g. `'c'`, `'go'`); defaults
 * to `'text'` when omitted so the header always shows something.
 *
 * `dimComments` enables the comment-dimming style: each
 * line whose trimmed content starts with `//` is wrapped in a
 * `<span className="text-muted-foreground">` so comments read at lower
 * contrast, like a real editor. Lines that aren't comments render at the
 * default ink color.
 *
 * Server-component safe — no hooks, no client-only APIs.
 */
export interface CodeBlockProps {
  code: string;
  lang?: string;
  dimComments?: boolean;
}

/**
 * Reusable code block built on the `.codeblock` / `.codeblock-header` /
 * `.codeblock-dot` / `.codeblock-lang` utility classes from `globals.css`.
 * Renders the macOS-style header (three traffic-light dots + language
 * label) followed by a scrollable `<pre>` block.
 *
 * Replaces the two duplicated implementations flagged in CODE_REVIEW.md §3
 * (the plain one in `work-detail/blocks.tsx` and the comment-dimming one
 * previously in the removed PhilosophyPage). Comment dimming is the better
 * feature, so it's kept here as an opt-in via `dimComments`.
 */
export function CodeBlock({
  code,
  lang = 'text',
  dimComments = false,
}: CodeBlockProps): ReactNode {
  return (
    <div className="codeblock">
      <div className="codeblock-header">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="codeblock-dot" />
          <span className="codeblock-dot" />
          <span className="codeblock-dot" />
        </div>
        <span className="codeblock-lang">{lang}</span>
      </div>
      <pre className="whitespace-pre p-4 overflow-x-auto text-[13px] leading-relaxed text-ink">
        <code className="mono">
          {dimComments ? renderWithDimmedComments(code) : code}
        </code>
      </pre>
    </div>
  );
}

/**
 * Splits `code` on `\n` and wraps each `//`-prefixed line (after trimming
 * leading whitespace, so indented comments also dim) in a muted-foreground
 * span. Non-comment lines render unstyled so they inherit the parent
 * `text-ink`. A trailing `\n` is re-inserted between lines (except after
 * the last) so the source layout is preserved inside `whitespace-pre`.
 */
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
