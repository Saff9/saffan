'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { FilterBar } from '@/components/shared/filter-bar';
import { TechGlyph } from '@/components/shared/tech-glyph';
import { PROJECTS } from '@/lib/portfolio-data';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = ['all', 'full-stack', 'ai'] as const;
type CategoryKey = (typeof CATEGORIES)[number];

export function WorkProjectList() {
  const [filter, setFilter] = useState<CategoryKey>('all');

  const filtered =
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) =>
          p.category.toLowerCase().includes(filter.toLowerCase()),
        );

  return (
    <div className="px-6 pb-12 sm:px-10 sm:pb-16">
      {/* ── Category filter bar ─────────────────────────── */}
      <Reveal>
        <FilterBar
          filters={[...CATEGORIES]}
          active={filter}
          onChange={(k) => setFilter(k as CategoryKey)}
          label="Filter projects by category"
          countLabel={`${filtered.length} ${filtered.length === 1 ? 'system' : 'systems'}`}
        />
      </Reveal>

      {/* ── Project index ───────────────────────────────── */}
      <div className="mt-8 border-t" style={{ borderColor: 'rgba(44,44,44,0.12)' }}>
        {filtered.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.04}>
            <Link
              href={`/work/${p.slug}`}
              className="group grid w-full grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b py-6 text-left transition-colors hover:bg-[rgba(223,94,75,0.04)]"
              style={{ borderColor: 'rgba(44,44,44,0.12)' }}
            >
              <span className="col-span-2 sans text-sm font-semibold text-accent sm:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="col-span-10 sm:col-span-5">
                <h3 className="sans text-xl font-semibold text-ink transition-colors group-hover:text-accent sm:text-2xl">
                  {p.title}
                </h3>
                <p className="prose mt-1">{p.tagline}</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {p.techStack.slice(0, 5).map((t) => (
                    <span key={t} className="chip">
                      <TechGlyph name={t} size={12} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <p className="col-span-12 sans text-sm text-ink-soft sm:col-span-4 sm:col-start-7">
                {p.category}
              </p>
              <span className="col-span-6 sans text-sm text-ink-soft sm:col-span-1">
                {p.year}
              </span>
              <span className="col-span-6 flex items-center justify-end sm:col-span-1">
                <ArrowRight
                  className="h-4 w-4 text-ink-soft transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* ── Footer note ─────────────────────────────────── */}
      <Reveal>
        <p className="caption mt-8 text-center">
          All {PROJECTS.length} systems designed, built, and shipped with real code
        </p>
      </Reveal>
    </div>
  );
}
