'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Github, ExternalLink, CheckCircle2, Cpu, ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/lib/portfolio-data';
import TechIcon from './TechIcon';

const CATEGORY_CONFIG: Record<string, { accentText: string; badgeBg: string }> = {
  'Systems & Database':       { accentText: 'text-indigo-400', badgeBg: 'bg-indigo-950/60 border-indigo-800/40' },
  'AI & Autonomous Agents':   { accentText: 'text-violet-400', badgeBg: 'bg-violet-950/60 border-violet-800/40' },
  'Compilers & Languages':    { accentText: 'text-amber-400',  badgeBg: 'bg-amber-950/60 border-amber-800/40' },
  'Full-Stack & Platforms':   { accentText: 'text-cyan-400',   badgeBg: 'bg-cyan-950/60 border-cyan-800/40' },
  'Privacy & Real-Time':      { accentText: 'text-emerald-400',badgeBg: 'bg-emerald-950/60 border-emerald-800/40' },
};

function MetricCard({ label, value, accentText }: { label: string; value: string; accentText: string }) {
  return (
    <div className="p-4 rounded-2xl bento-subcard space-y-1">
      <div className={`text-xl sm:text-2xl font-black font-mono tracking-tight ${accentText}`}>{value}</div>
      <div className="text-[10px] text-zinc-500 font-semibold uppercase font-mono tracking-wider">{label}</div>
    </div>
  );
}

export default function InteractiveProjectShowcase() {
  const [activeTabs, setActiveTabs] = useState<Record<string, 'overview' | 'architecture' | 'benchmarks'>>(
    Object.fromEntries(PROJECTS.map((p) => [p.id, 'overview']))
  );

  const setTab = (id: string, tab: 'overview' | 'architecture' | 'benchmarks') =>
    setActiveTabs((prev) => ({ ...prev, [id]: tab }));

  return (
    <div className="space-y-8">
      {PROJECTS.map((project, idx) => {
        const cfg = CATEGORY_CONFIG[project.category] ?? CATEGORY_CONFIG['Systems & Database'];
        const currentTab = activeTabs[project.id] ?? 'overview';

        return (
          <div
            key={project.id}
            className="bento-card p-6 sm:p-8 rounded-3xl space-y-6 relative overflow-hidden group"
          >
            {/* ── Header ──────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-white/[0.07]">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs font-black text-zinc-600">0{idx + 1}</span>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-mono ${cfg.badgeBg} ${cfg.accentText}`}
                  >
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                    <span className="status-dot" />
                    Production Ready
                  </span>
                </div>
                <Link href={`/projects/${project.slug}`} className="block group/title">
                  <h3 className="text-2xl sm:text-3xl font-black text-white group-hover/title:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-xs sm:text-sm text-zinc-400 font-mono">{project.tagline}</p>
              </div>

              {/* Tabs + links */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/[0.07] text-xs font-mono">
                  {(['overview', 'architecture', 'benchmarks'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setTab(project.id, tab)}
                      className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-all ${
                        currentTab === tab
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-zinc-300 hover:text-white transition-all"
                  title="View GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>

                {project.liveUrl && project.liveUrl !== project.githubUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-2xl bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-700/40 text-indigo-300 hover:text-white transition-all"
                    title="Live Deployment"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* ── Overview Tab ─────────────────────────────────── */}
            {currentTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
                <div className="lg:col-span-7 space-y-5">
                  <p className="text-sm text-zinc-300 leading-relaxed">{project.fullStory}</p>
                  <div className="space-y-2">
                    {project.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${cfg.accentText}`} />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                  {/* Tech stack with real brand icons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bento-subcard text-zinc-300 font-mono text-xs font-semibold"
                      >
                        <TechIcon name={tech.split(' ')[0]} size={13} />
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Deep dive link */}
                  <div className="pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors group/link"
                    >
                      <span>Explore Full System Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                  {project.metrics.map((m, i) => (
                    <MetricCard key={i} label={m.label} value={m.value} accentText={cfg.accentText} />
                  ))}
                </div>
              </div>
            )}

            {/* ── Architecture Tab ─────────────────────────────── */}
            {currentTab === 'architecture' && (
              <div className="space-y-4 animate-fade-in">
                <h4 className={`text-xs font-bold font-mono uppercase tracking-wider ${cfg.accentText}`}>
                  // Architectural Layers &amp; Pipeline Internals
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.architectureDetails.map((detail, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bento-subcard space-y-2"
                    >
                      <div className={`flex items-center gap-2 font-mono font-bold text-xs ${cfg.accentText}`}>
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Layer 0{i + 1}</span>
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>Read Complete Engineering Deep Dive →</span>
                  </Link>
                </div>
              </div>
            )}

            {/* ── Benchmarks Tab ───────────────────────────────── */}
            {currentTab === 'benchmarks' && (
              <div className="space-y-4 animate-fade-in">
                <h4 className={`text-xs font-bold font-mono uppercase tracking-wider ${cfg.accentText}`}>
                  // Verified Production Metrics &amp; Performance
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bento-subcard text-center space-y-1"
                    >
                      <div className={`text-xl sm:text-2xl font-black font-mono ${cfg.accentText}`}>{m.value}</div>
                      <div className="text-xs text-zinc-400 font-medium">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="p-3.5 rounded-2xl bento-subcard text-xs font-mono text-zinc-500 flex items-center justify-between">
                  <span>Target SLA: Zero Runtime Crashes</span>
                  <span className="text-emerald-400">✔ Memory Leaks Verified Clean</span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* ── View All Projects CTA ────────────────────────────── */}
      <div className="text-center pt-2">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white text-xs font-bold transition-all hover:border-indigo-500/30 group"
        >
          <span>View All 6 Projects in Dedicated Gallery</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-indigo-400" />
        </Link>
      </div>
    </div>
  );
}
