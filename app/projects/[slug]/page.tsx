import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  PROJECTS,
  getProjectBySlug,
  getAllProjects,
} from '@/lib/portfolio-data';
import {
  generateProjectSchema,
  generateBreadcrumbSchema,
  generatePageMetadata,
} from '@/lib/seo-utils';
import TechIcon from '@/components/TechIcon';
import RevealSection from '@/components/RevealSection';
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Cpu,
  Layers,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Terminal,
} from 'lucide-react';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return generatePageMetadata({
    title: `${project.title} — Technical Case Study`,
    description: `${project.tagline}. ${project.description}`,
    path: `/projects/${project.slug}`,
  });
}

export default function SingleProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const projectSchema = generateProjectSchema(project);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
    { name: project.title, url: `/projects/${project.slug}` },
  ]);

  // Find next project for bottom navigation
  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Breadcrumb & Back ───────────────────────────────── */}
      <nav className="flex items-center justify-between gap-4 pt-4 sm:pt-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to all projects</span>
        </Link>

        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
          <span>Project {currentIndex + 1} of {allProjects.length}</span>
        </div>
      </nav>

      {/* ── Project Header ──────────────────────────────────── */}
      <header className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border bg-indigo-950/60 border-indigo-800/50 text-indigo-300">
            {project.category}
          </span>
          <span className="text-xs font-mono text-zinc-600">·</span>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="status-dot" />
            Production Ready
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-xl font-mono text-zinc-400 leading-relaxed">
          {project.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <Github className="w-4 h-4" />
            <span>View Source on GitHub</span>
          </a>

          {project.liveUrl && project.liveUrl !== project.githubUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] text-zinc-200 border border-white/[0.08] text-xs font-semibold transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
        </div>
      </header>

      {/* ── Key Metrics Grid ─────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
          Verified Performance Metrics
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {project.metrics.map((metric, i) => (
            <div
              key={i}
              className="p-5 rounded-3xl bento-card space-y-1.5"
            >
              <div className="text-2xl sm:text-3xl font-black font-mono text-indigo-300">
                {metric.value}
              </div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                {metric.label}
              </div>
              {metric.description && (
                <p className="text-[11px] text-zinc-400 pt-1 leading-snug font-mono">
                  {metric.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Architecture & Story ─────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Deep Dive Narrative */}
        <div className="lg:col-span-8 space-y-8">
          {/* Problem Statement */}
          {project.problemStatement && (
            <div className="p-6 sm:p-8 rounded-3xl bento-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span>The Core Engineering Problem</span>
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>
          )}

          {/* Solution & Full Story */}
          <div className="p-6 sm:p-8 rounded-3xl bento-card space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span>Architectural Solution</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {project.fullStory}
            </p>
          </div>

          {/* Architecture Layers Breakdown */}
          <div className="p-6 sm:p-8 rounded-3xl bento-card space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              <Layers className="w-4 h-4" />
              <span>System Architectural Layers</span>
            </div>

            <div className="space-y-3">
              {project.architectureDetails.map((layer, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bento-subcard flex items-start gap-3.5"
                >
                  <span className="w-6 h-6 rounded-lg bg-indigo-950/80 border border-indigo-800/60 font-mono text-[11px] font-bold text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                    {layer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Highlights */}
          <div className="p-6 sm:p-8 rounded-3xl bento-card space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              Key Engineering Accomplishments
            </h3>
            <div className="space-y-2.5">
              {project.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tech Stack & Metadata */}
        <div className="lg:col-span-4 space-y-6">
          {/* Tech Stack Card */}
          <div className="p-6 rounded-3xl bento-card space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>Technology Stack</span>
            </div>

            <div className="space-y-2">
              {project.techStack.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bento-subcard"
                >
                  <TechIcon name={tech.split(' ')[0]} size={16} />
                  <span className="font-mono text-xs font-semibold text-zinc-200">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Repository & Collaboration */}
          <div className="p-6 rounded-3xl bento-card space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              Codebase &amp; Architecture
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Available under permissive open-source license. Includes benchmark harnesses and containerized development environments.
            </p>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-white text-xs font-bold border border-white/[0.08] transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Explore GitHub Repo</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Next Project Footer ──────────────────────────────── */}
      <footer className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/projects"
          className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          ← Back to all projects
        </Link>

        {nextProject && (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors group"
          >
            <span>Next Project: {nextProject.title}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </footer>
    </div>
  );
}
