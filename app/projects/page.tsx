import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo-utils';
import { PROJECTS } from '@/lib/portfolio-data';
import TechIcon from '@/components/TechIcon';
import RevealSection from '@/components/RevealSection';
import {
  Code2,
  Cpu,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = generatePageMetadata({
  title: 'Production Projects & Systems Architecture',
  description:
    'Explore production-grade database engines (NovaDB C11), compilers (Breeze), AI platforms (ASTRAMIND, CodeCraftAI), and web platforms built by Saffan.',
  path: '/projects',
});

const CATEGORY_STYLES: Record<string, { badgeBg: string; badgeText: string; accentBorder: string }> = {
  'Systems & Database': {
    badgeBg: 'bg-indigo-950/60 border-indigo-800/40',
    badgeText: 'text-indigo-400',
    accentBorder: 'hover:border-indigo-500/40',
  },
  'AI & Autonomous Agents': {
    badgeBg: 'bg-violet-950/60 border-violet-800/40',
    badgeText: 'text-violet-400',
    accentBorder: 'hover:border-violet-500/40',
  },
  'Compilers & Languages': {
    badgeBg: 'bg-amber-950/60 border-amber-800/40',
    badgeText: 'text-amber-400',
    accentBorder: 'hover:border-amber-500/40',
  },
  'Full-Stack & Platforms': {
    badgeBg: 'bg-cyan-950/60 border-cyan-800/40',
    badgeText: 'text-cyan-400',
    accentBorder: 'hover:border-cyan-500/40',
  },
  'Privacy & Real-Time': {
    badgeBg: 'bg-emerald-950/60 border-emerald-800/40',
    badgeText: 'text-emerald-400',
    accentBorder: 'hover:border-emerald-500/40',
  },
};

export default function ProjectsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
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
          <span className="text-xs font-mono text-indigo-400 font-medium">Projects</span>
        </div>

        <div className="space-y-3 max-w-3xl">
          <p className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
            Production Engineering Portfolio
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Engineered from First Principles.
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Detailed case studies and technical architectures for C11 database engines,
            custom language interpreters, autonomous AI agent platforms, and real-time protocols.
          </p>
        </div>
      </section>

      {/* ── Projects Grid (All 6 Real Projects) ─────────────── */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROJECTS.map((project, idx) => {
            const style = CATEGORY_STYLES[project.category] || CATEGORY_STYLES['Systems & Database'];

            return (
              <RevealSection key={project.id} delay={(idx % 2) as 0 | 1}>
                <div
                  className={`bento-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all group ${style.accentBorder}`}
                >
                  {/* Top metadata */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${style.badgeBg} ${style.badgeText}`}
                      >
                        {project.category}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500">0{idx + 1}</span>
                    </div>

                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-indigo-300 transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-xs font-mono text-zinc-500 mt-1">{project.tagline}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Metrics row */}
                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      {project.metrics.slice(0, 2).map((metric, i) => (
                        <div key={i} className="p-3 rounded-2xl bento-subcard">
                          <div className="text-base sm:text-lg font-black font-mono text-white">
                            {metric.value}
                          </div>
                          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.map((tech) => (
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

                  {/* Actions footer */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors"
                    >
                      <span>Read System Deep-Dive</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.07] text-zinc-400 hover:text-white hover:border-white/20 transition-all"
                        title="GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>

                      {project.liveUrl && project.liveUrl !== project.githubUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-indigo-950/40 border border-indigo-700/40 text-indigo-300 hover:text-white transition-all"
                          title="Live Deployment"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </RevealSection>
            );
          })}
        </div>
      </section>

      {/* ── Callout ─────────────────────────────────────────── */}
      <section className="p-8 rounded-3xl bento-card border border-indigo-500/20 bg-indigo-950/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-lg font-black text-white">Have a challenging systems problem?</h3>
          <p className="text-xs text-zinc-400">
            I specialize in designing low-level systems in C11, Go, Rust, and autonomous AI agents.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 shrink-0"
        >
          Discuss Engineering Role
        </Link>
      </section>
    </div>
  );
}
