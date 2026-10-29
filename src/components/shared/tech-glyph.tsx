
import { type ReactNode } from 'react';
import { TechIcon } from '@/components/tech-icon';

/**
 * Shared tech-name → canonical-icon-key resolver.
 *
 * Previously every page that rendered tech chips (HomePage, WorkPage,
 * StackPage, AboutPage, work-detail/blocks) redefined its own private
 * `TECH_ICON_KEY` map + `techIconKey()` helper + `TechGlyph` wrapper.
 * They were 95% identical — only the skip-list differed per page.
 *
 * This file merges all five into one source of truth. Adding a new
 * display name → canonical key alias (or marking a name as "no brand
 * icon, skip") is a one-line change here instead of a five-file hunt.
 *
 * Convention:
 *  - value `''`  → skip (no brand icon available; render text only)
 *  - value `'foo'` → pass `'foo'` to <TechIcon> (canonical lookup key)
 *  - key absent → pass the display name through unchanged; <TechIcon>
 *    lowercases it and falls back to a code-bracket glyph on miss.
 *
 * Keys are case-sensitive on the way in (display names like
 * `'Tailwind CSS'`), but <TechIcon> lowercases before its own lookup,
 * so the canonical values can stay lowercase.
 */
export const TECH_ICON_KEY: Record<string, string> = {
  // Tailwind's display name is "Tailwind CSS" but the canonical key is "tailwind".
  'Tailwind CSS': 'tailwind',
  // VS Code's display name maps to the Vscodium brand icon (trademark-safe).
  'VS Code': 'vscode',
  // Display names that have no matching brand icon — render text only.
  WebSocket: '',
  'Vercel CLI': '',
  LLMs: '',
  'LLM Integration': '',
  'Vector Search': '',
};

/**
 * Resolve a display name to a <TechIcon> `name` prop, or `null` when the
 * name is on the explicit skip-list. Callers should branch on `null` and
 * render the text label alone (no icon) in that case.
 */
export function techIconKey(name: string): string | null {
  if (name in TECH_ICON_KEY) {
    const v = TECH_ICON_KEY[name];
    return v === '' ? null : v;
  }
  return name;
}

/**
 * Inline brand glyph that hides itself from assistive tech — the
 * surrounding text label already carries the name, so the icon is
 * decorative.
 *
 * Pass `colored` to render in the brand's hex color (used on the Stack
 * page where each row gets a colored badge). Defaults to `currentColor`
 * so the glyph inherits the parent's text color — the quiet-marker
 * voice used on Home / About / Work-detail.
 */
export function TechGlyph({
  name,
  size = 14,
  colored = false,
}: {
  name: string;
  size?: number;
  colored?: boolean;
}): ReactNode {
  const k = techIconKey(name);
  if (!k) return null;
  return <TechIcon name={k} size={size} colored={colored} aria-hidden="true" />;
}
