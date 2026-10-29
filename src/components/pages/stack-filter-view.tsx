'use client';

import { useState, useRef, useEffect } from 'react';
import { Reveal } from '@/components/reveal';
import { FilterBar } from '@/components/shared/filter-bar';
import { TechGlyph } from '@/components/shared/tech-glyph';
import { SKILL_CATEGORIES } from '@/lib/portfolio-data';

type Filter = 'all' | 'frontend' | 'backend' | 'ai' | 'databases';

const FILTERS: Filter[] = ['all', 'frontend', 'backend', 'ai', 'databases'];

const FILTER_QUERY: Record<Filter, string> = {
  all: '',
  frontend: 'frontend',
  backend: 'backend',
  ai: 'ai',
  databases: 'database',
};

type Level = 'Expert' | 'Advanced' | 'Proficient';

const LEVEL_WIDTH: Record<Level, number> = {
  Expert: 95,
  Advanced: 80,
  Proficient: 65,
};

const LEVEL_COLOR: Record<Level, string> = {
  Expert: 'text-accent font-semibold',
  Advanced: 'text-ink font-medium',
  Proficient: 'text-ink-soft',
};

function ProficiencyBar({ level }: { level: Level }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const width = LEVEL_WIDTH[level] ?? 60;

  return (
    <div
      ref={ref}
      className="mt-2 h-1 overflow-hidden rounded-full"
      style={{ background: 'rgba(44,44,44,0.12)' }}
      aria-hidden="true"
    >
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{
          width: visible ? `${width}%` : '0%',
          background: 'var(--accent)',
        }}
      />
    </div>
  );
}

export function StackFilterView() {
  const [filter, setFilter] = useState<Filter>('all');

  const query = FILTER_QUERY[filter];
  const filtered = SKILL_CATEGORIES.filter((cat) =>
    query ? cat.name.toLowerCase().includes(query) : true,
  );
  const totalSkills = filtered.reduce((n, c) => n + c.skills.length, 0);

  return (
    <div className="px-6 pb-12 sm:px-10 sm:pb-16">
      {/* ── Filter bar ────────────────────────────────── */}
      <FilterBar
        filters={FILTERS}
        active={filter}
        onChange={(f) => setFilter(f as Filter)}
        label="Filter stack by category"
        countLabel={`${totalSkills} ${totalSkills === 1 ? 'discipline' : 'disciplines'}`}
      />

      {/* ── Categories ────────────────────────────────── */}
      <div className="mt-6">
        {filtered.map((cat, ci) => (
          <Reveal key={cat.name} delay={ci * 0.05}>
            <section
              className="section"
              style={ci === 0 ? { borderTop: 'none' } : undefined}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="sans text-xl font-semibold text-ink">{cat.name}</h2>
                <span className="label">{cat.skills.length} skills</span>
              </div>
              <p className="prose mt-1 max-w-2xl">{cat.blurb}</p>

              <div
                className="mt-5 grid grid-cols-12 gap-4 border-t"
                style={{ borderColor: 'rgba(44,44,44,0.12)' }}
              >
                {cat.skills.map((skill, i) => (
                  <div
                    key={skill.name}
                    className="col-span-12 grid grid-cols-12 gap-4 py-4"
                    style={
                      i === 0
                        ? undefined
                        : { borderTop: '1px solid rgba(44,44,44,0.12)' }
                    }
                  >
                    <div className="col-span-2 sm:col-span-1">
                      <span className="hand text-lg text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="col-span-10 sm:col-span-7">
                      <h3 className="sans text-base font-medium text-ink">
                        <span className="inline-flex items-center gap-2">
                          <TechGlyph name={skill.name} colored size={16} />
                          <span>{skill.name}</span>
                        </span>
                      </h3>
                      <p className="prose mt-1">{skill.note}</p>
                      {skill.shipped && skill.shipped.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {skill.shipped.map((u) => (
                            <span key={u} className="chip">
                              {u}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <span className="label">{skill.years}</span>
                      <div className="hidden sm:block">
                        <ProficiencyBar level={skill.level as Level} />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-2 sm:text-right">
                      <span className={`label ${LEVEL_COLOR[skill.level as Level] ?? 'text-ink-soft'}`}>
                        {skill.level.toLowerCase()}
                      </span>
                    </div>

                    <div className="col-span-12 sm:hidden">
                      <ProficiencyBar level={skill.level as Level} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <p className="caption mt-10 text-center">
        every technology above is actively used in a deployed production system
      </p>
    </div>
  );
}
