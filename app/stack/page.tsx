import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo-utils';
import { SKILL_CATEGORIES } from '@/lib/portfolio-data';
import TechIcon from '@/components/TechIcon';
import RevealSection from '@/components/RevealSection';
import { Cpu, Terminal, Layers, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = generatePageMetadata({
  title: 'Technical Stack & Engineering Capabilities',
  description:
    'Comprehensive overview of Saffan’s technical competencies in C11, Go, Rust, TypeScript, Python, PostgreSQL, Linux POSIX, Docker, and distributed backends.',
  path: '/stack',
});

const LEVEL_CONFIG = {
  Expert: { color: 'text-emerald-400', bg: 'bg-emerald-950/60 border-emerald-800/50', bar: 'w-[95%]' },
  Advanced: { color: 'text-indigo-400', bg: 'bg-indigo-950/60 border-indigo-800/50', bar: 'w-[80%]' },
  Proficient: { color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-800/50', bar: 'w-[65%]' },
};

export default function StackPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tech Stack', url: '/stack' },
  ]);

  return (
    <div className="space-y-12 sm:space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Page Header ─────────────────────────────────────── */}
      <section className="space-y-4 pt-4 sm:pt-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors">
            Home
          </Link>
          <span className="text-zinc-600 font-mono text-xs">/</span>
          <span className="text-xs font-mono text-indigo-400 font-medium">Tech Stack</span>
        </div>

        <div className="space-y-3 max-w-3xl">
          <p className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            Core Competencies &amp; Technical Inventory
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Tools &amp; Systems Mastered.
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Every technology here has been leveraged to build and ship production systems — with a focus on
            minimal runtime overhead, predictable memory allocation, and zero latency waste.
          </p>
        </div>
      </section>

      {/* ── Skills Categories Grid ───────────────────────────── */}
      <section className="space-y-10">
        {SKILL_CATEGORIES.map((category, catIdx) => (
          <RevealSection key={category.name} delay={(catIdx % 2) as 0 | 1}>
            <div className="p-6 sm:p-8 rounded-3xl bento-card space-y-6">
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <h2 className="text-xl sm:text-2xl font-black text-white">{category.name}</h2>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">{category.description}</p>
                </div>
                <span className="text-xs font-mono text-zinc-500">
                  {category.skills.length} core technologies
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.skills.map((skill) => {
                  const lvl = LEVEL_CONFIG[skill.level as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG.Proficient;

                  return (
                    <div
                      key={skill.name}
                      id={skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                      className="p-5 rounded-2xl bento-subcard transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                            <TechIcon name={skill.name.split(' ')[0]} size={20} />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white font-mono">{skill.name}</h3>
                            <span className="text-[11px] font-mono text-zinc-500">{skill.experienceYears} hands-on</span>
                          </div>
                        </div>

                        <span
                          className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${lvl.bg} ${lvl.color}`}
                        >
                          {skill.level}
                        </span>
                      </div>

                      {/* Level Indicator Bar */}
                      <div className="w-full h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 ${lvl.bar}`} />
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {skill.description}
                      </p>

                      {skill.useCases && (
                        <div className="pt-2 border-t border-white/[0.04] space-y-1">
                          <span className="text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider">
                            Applied In:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {skill.useCases.map((uc) => (
                              <span
                                key={uc}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-indigo-300 border border-indigo-500/20"
                              >
                                {uc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </RevealSection>
        ))}
      </section>

      {/* ── Architectural Philosophy Callout ─────────────────── */}
      <section className="p-8 rounded-3xl bento-card border border-white/[0.08] bg-zinc-950/40 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
          <Sparkles className="w-4 h-4" />
          <span>Technology Selection Philosophy</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Why I pick compiled languages &amp; zero-dependency systems
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
          I choose technologies based on runtime predictability and hardware alignment. In systems programming,
          C11 and Go offer deterministic performance without unpredictable memory overhead. In full-stack web,
          Next.js combined with TypeScript provides unmatched developer velocity without bloated bundle payloads.
        </p>
      </section>
    </div>
  );
}
