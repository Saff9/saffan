import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo-utils';
import { JOURNEY_MILESTONES } from '@/lib/portfolio-data';
import TechIcon from '@/components/TechIcon';
import RevealSection from '@/components/RevealSection';
import { Compass, Sparkles, BookOpen, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = generatePageMetadata({
  title: 'The Self-Taught Engineering Journey',
  description:
    'The story of how Saffan mastered low-level systems programming in C11, built NovaDB, engineered Breeze compiler, and built autonomous AI agent platforms through first-principles learning.',
  path: '/journey',
});

export default function JourneyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Journey', url: '/journey' },
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
          <span className="text-xs font-mono text-amber-400 font-medium">The Narrative</span>
        </div>

        <div className="space-y-3 max-w-3xl">
          <p className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            First Principles &amp; Independent Mastery
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The Self-Taught Trajectory.
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            How I bypassed traditional gatekeeping to engineer an ACID SQL database in pure C11,
            design a custom programming language compiler, and build autonomous AI platforms.
          </p>
        </div>
      </section>

      {/* ── Narrative Milestones ─────────────────────────────── */}
      <section className="space-y-8 relative">
        {/* Central Connecting Line */}
        <div className="hidden md:block absolute left-8 top-10 bottom-10 w-px bg-gradient-to-b from-indigo-500/40 via-violet-500/20 to-emerald-500/40" />

        <div className="space-y-8">
          {JOURNEY_MILESTONES.map((milestone, idx) => (
            <RevealSection key={milestone.year} delay={(idx % 2) as 0 | 1}>
              <div className="relative flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                {/* Year Marker Badge */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/[0.09] flex flex-col items-center justify-center text-center shadow-lg shadow-black/80 z-10">
                    <span className="text-[11px] font-mono font-black text-indigo-400">
                      {milestone.year.split('–')[0]}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500">
                      {milestone.year.split('–')[1] || 'Now'}
                    </span>
                  </div>
                </div>

                {/* Milestone Details Card */}
                <div className="flex-1 bento-card rounded-3xl p-6 sm:p-8 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                        {milestone.year}
                      </span>
                      <span className="text-zinc-600 font-mono">·</span>
                      <span className="text-xs font-mono text-zinc-400">{milestone.roleOrPhase}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">{milestone.title}</h2>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Key Learnings */}
                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                      Key Technical Breakthroughs:
                    </span>
                    <div className="space-y-1.5">
                      {milestone.keyLearnings.map((learning, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{learning}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Technologies Used */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {milestone.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bento-subcard text-[11px] font-mono text-zinc-300"
                      >
                        <TechIcon name={tech.split(' ')[0]} size={12} />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Callout ─────────────────────────────────────────── */}
      <section className="p-8 rounded-3xl bento-card border border-indigo-500/30 bg-gradient-to-r from-indigo-950/20 to-zinc-950/60 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-lg font-black text-white">Looking for a builder who solves hard problems?</h3>
          <p className="text-xs text-zinc-400">
            I bring relentless curiosity, systems-level debugging, and rapid execution to engineering teams.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 shrink-0"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
