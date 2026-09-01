'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { SKILL_CATEGORIES } from '@/lib/portfolio-data';
import TechIcon from './TechIcon';

const CATEGORY_FILTERS = ['All', 'Systems', 'AI & Languages', 'Web & TypeScript', 'Databases & DevOps'];

const TECH_ICON_MAP: Record<string, string> = {
  'C (C11 Standard)': 'C',
  'Go (Golang)': 'Go',
  Rust: 'Rust',
  'POSIX & Linux Systems': 'Linux',
  Python: 'Python',
  'Compilers & AST Parsing': 'Compilers',
  'AI Agent Architecture': 'AI Agents',
  'Next.js': 'Next.js',
  TypeScript: 'TypeScript',
  'React & TailwindCSS': 'React',
  'PostgreSQL & SQL Engines': 'PostgreSQL',
  'WebSockets & Real-Time I/O': 'WebSockets',
  'Docker & DevOps': 'Docker',
};

const LEVEL_CONFIG = {
  Expert: { color: 'text-emerald-400', bg: 'bg-emerald-950/70 border-emerald-800/50', bar: 95 },
  Advanced: { color: 'text-indigo-400', bg: 'bg-indigo-950/70 border-indigo-800/50', bar: 80 },
  Proficient: { color: 'text-amber-400', bg: 'bg-amber-950/70 border-amber-800/50', bar: 65 },
} as const;

function SkillCard({ skill, isVisible }: {
  skill: { name: string; level: string; experienceYears: string; description: string; featured?: boolean };
  isVisible: boolean;
}) {
  const lvl = LEVEL_CONFIG[skill.level as keyof typeof LEVEL_CONFIG] ?? LEVEL_CONFIG.Proficient;
  const iconName = TECH_ICON_MAP[skill.name] || skill.name.split(' ')[0];

  return (
    <div
      className={`group p-3.5 sm:p-4 rounded-2xl bento-subcard transition-all ${
        skill.featured ? 'border-white/[0.09]' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0 group-hover:border-white/15 transition-colors">
          <TechIcon name={iconName} size={17} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-bold text-zinc-100 truncate font-mono">
              {skill.name}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-zinc-500 font-mono">{skill.experienceYears}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border ${lvl.bg} ${lvl.color}`}>
                {skill.level}
              </span>
            </div>
          </div>

          {/* Proficiency bar */}
          <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden mb-1.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-1000"
              style={{ width: isVisible ? `${lvl.bar}%` : '0%' }}
            />
          </div>

          <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">{skill.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function TechStackMatrix() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filteredCategories = useMemo(() => {
    if (selectedCategory === 'All') return SKILL_CATEGORIES;
    return SKILL_CATEGORIES.filter((c) =>
      c.name.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [selectedCategory]);

  return (
    <div className="space-y-6" ref={ref}>
      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-white/[0.04] text-zinc-400 border border-white/[0.08] hover:border-white/20 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCategories.map((category, catIdx) => (
          <div
            key={catIdx}
            className="p-5 sm:p-6 rounded-3xl bento-card space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {category.name}
                </h3>
                <span className="text-[10px] font-mono text-zinc-500">
                  {category.skills.length} core techs
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">{category.description}</p>
            </div>

            <div className="space-y-2.5">
              {category.skills.map((skill, sIdx) => (
                <SkillCard key={sIdx} skill={skill} isVisible={isVisible} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
