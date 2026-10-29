'use client';

import { type ReactNode } from 'react';

/**
 * Props for the reusable filter pill bar.
 *
 * `filters` are the option keys (e.g. `['all', 'systems', 'ai']`) and also
 * serve as the visible label — they should already be human-readable. The
 * `active` filter is controlled by the parent. `onChange` fires on click.
 *
 * `label` is exposed on the wrapping `role="group"` so screen readers
 * announce context ("Filter projects by category, group"). Each pill uses
 * `aria-pressed` to communicate toggle state — the group label means we
 * don't need per-button `aria-label`s (that would be redundant noise).
 *
 * `countLabel` (e.g. "6 systems") renders right-aligned via the `.label`
 * utility class and is marked `aria-live="polite"` so count changes are
 * announced.
 */
export interface FilterBarProps {
  filters: string[];
  active: string;
  onChange: (f: string) => void;
  label?: string;
  countLabel?: string;
}

/**
 * Accessible, notebook-aesthetic filter pill bar. Replaces the duplicated
 * markup in `WorkPage.tsx` and `StackPage.tsx` (see CODE_REVIEW.md §3
 * "Repetition"). Active pill: terracotta border + soft tinted background;
 * inactive pill: ink-soft outline that hover-shifts to accent text. The
 * bar wraps naturally on narrow viewports via `flex-wrap`.
 */
export function FilterBar({
  filters,
  active,
  onChange,
  label = 'Filter',
  countLabel,
}: FilterBarProps): ReactNode {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex flex-wrap items-center gap-2"
    >
      {filters.map((f) => {
        const isActive = active === f;
        return (
          <button
            key={f}
            type="button"
            onClick={() => onChange(f)}
            aria-pressed={isActive}
            className={
              'sans rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ' +
              (isActive
                ? 'border-[1.5px] bg-[rgba(223,94,75,0.08)] text-accent'
                : 'border border-[rgba(44,44,44,0.18)] text-ink-soft hover:text-accent')
            }
            style={isActive ? { borderColor: 'var(--accent)' } : undefined}
          >
            {f}
          </button>
        );
      })}
      {countLabel && (
        <span className="label ml-auto" aria-live="polite">
          {countLabel}
        </span>
      )}
    </div>
  );
}
