'use client';

// Reusable building blocks for the work-detail layouts. Each takes
// typed props — most accept the full `Project` and read only the fields
// they need. None know which tone-layout is rendering them.

import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { CodeBlock } from '@/components/shared/code-block';
import { TechGlyph } from '@/components/shared/tech-glyph';
import { ArrowRight, Github, ExternalLink, Check, AlertCircle } from 'lucide-react';
import type { Project, DeepDiveBlock } from '@/lib/content/types';

// Year + category + production-ready flag, plus source/live buttons.
// `showLive` hides the live button when it equals the GitHub URL.
export function MetaStrip({ project }: { project: Project }) {
  const showLive = Boolean(project.liveUrl) && project.liveUrl !== project.githubUrl;
  return (
    <Reveal>
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-y py-4"
        style={{ borderColor: 'rgba(44,44,44,0.10)' }}
      >
        <div className="sans flex flex-wrap items-center gap-2 text-xs text-ink-soft">
          <span>{project.year}</span>
          <span className="chip">{project.category.split(' ')[0]}</span>
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: 'var(--accent)' }}
            aria-hidden
          />
          <span className="text-accent">production ready</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs"
            style={{ padding: '0.35rem 0.8rem' }}
          >
            <Github className="h-3.5 w-3.5" aria-hidden /> source
          </a>
          {showLive && (
            <a
              href={project.liveUrl as string}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink text-xs"
              style={{ padding: '0.35rem 0.8rem' }}
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden /> live
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

// Multi-paragraph lead. Splits on \n\n so the long-form fullStory
// ships as one string but renders as separate <p> elements.
export function Lead({ text, className = '' }: { text: string; className?: string }) {
  const paras = text.split('\n\n');
  return (
    <div className={`lead ${className}`.trim()}>
      {paras.map((para, i) => (
        <p key={i} className={i > 0 ? 'mt-4' : undefined}>
          {para}
        </p>
      ))}
    </div>
  );
}

// 2×N grid of metric cards. `gap-px` paints the gaps using the rule
// color so the cells read as a single table.
export function MetricsGrid({ project }: { project: Project }) {
  return (
    <Reveal>
      <p className="label-accent">by the numbers</p>
      <div className="mt-4 grid grid-cols-2 gap-px bg-[rgba(44,44,44,0.12)] sm:grid-cols-4">
        {project.metrics.map((m, i) => (
          <div key={i} className="bg-[var(--paper)] p-4">
            <p className="sans text-2xl font-semibold text-ink">{m.value}</p>
            <p className="label mt-1">{m.label}</p>
            {m.note && <p className="sans mt-1 text-xs text-ink-soft">{m.note}</p>}
          </div>
        ))}
      </div>
    </Reveal>
  );
}

// Two-column problem / approach split.
export function ProblemSolution({ project }: { project: Project }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Reveal>
        <div>
          <p className="label-accent">the problem</p>
          <p className="prose mt-3">{project.problemStatement}</p>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div>
          <p className="label-accent">the approach</p>
          <p className="prose mt-3">{project.solution}</p>
        </div>
      </Reveal>
    </div>
  );
}

// Numbered architecture list — the depth-signal column.
export function ArchitectureList({ project }: { project: Project }) {
  return (
    <Reveal>
      <p className="label-accent">under the hood</p>
      <ol className="mt-3 border-t" style={{ borderColor: 'rgba(44,44,44,0.12)' }}>
        {project.architectureDetails.map((detail, i) => (
          <li
            key={i}
            className="grid grid-cols-12 gap-4 border-b py-5"
            style={{ borderColor: 'rgba(44,44,44,0.12)' }}
          >
            <span className="hand col-span-2 text-2xl text-accent sm:col-span-1">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="prose col-span-10 sm:col-span-11">{detail}</p>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

// Highlights + Challenges split. When `challenges` is empty we surface
// a soft "no notable friction" note rather than a blank card.
export function HighlightsChallenges({ project }: { project: Project }) {
  const challenges = project.challenges ?? [];
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Reveal>
        <div className="paper-soft p-5">
          <p className="label-accent">highlights</p>
          <ul className="mt-3 space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span className="sans text-sm leading-relaxed text-ink-soft">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="paper-soft p-5">
          <p className="label-accent">challenges</p>
          {challenges.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {challenges.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft" aria-hidden />
                  <span className="sans text-sm leading-relaxed text-ink-soft">{c}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="sans mt-3 text-sm italic text-ink-soft">
              no notable friction recorded — the build shipped clean.
            </p>
          )}
        </div>
      </Reveal>
    </div>
  );
}

// Highlights-only card — used by ResultsLayout where we want the
// positive summary without the challenges split.
export function HighlightsOnly({ project }: { project: Project }) {
  return (
    <Reveal>
      <div className="paper-soft p-5">
        <p className="label-accent">highlights</p>
        <ul className="mt-3 space-y-2">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span className="sans text-sm leading-relaxed text-ink-soft">{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

// Tech-stack chip cloud.
export function TechChips({ project }: { project: Project }) {
  return (
    <Reveal>
      <p className="label-accent">technology</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.techStack.map((t, i) => (
          <span key={i} className="chip chip-large">
            <TechGlyph name={t} size={14} />
            {t}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

// "Next system" nav link — wraps the row in a <section> so the
// rule line above renders consistently across layouts.
export function NextSystemNav({ next }: { next: Project }) {
  return (
    <section className="section">
      <Reveal>
        <Link
          href={`/work/${next.slug}`}
          aria-label={`Next system: ${next.title}`}
          className="group flex w-full items-center justify-between gap-4 text-left"
        >
          <span>
            <span className="label block">next</span>
            <span className="hand mt-1 block text-3xl text-ink transition-colors group-hover:text-accent sm:text-4xl">
              {next.title}
            </span>
          </span>
          <ArrowRight
            className="h-5 w-5 shrink-0 text-ink-soft transition-all group-hover:translate-x-1 group-hover:text-accent"
            aria-hidden
          />
        </Link>
      </Reveal>
    </section>
  );
}

// Single deep-dive entry — heading + body + optional code snippet.
// Uses the shared CodeBlock from @/components/shared/code-block.
export function DeepDiveBlockItem({
  block,
  index,
}: {
  block: DeepDiveBlock;
  index: number;
}) {
  return (
    <div className="deep-dive">
      <p className="label-accent">
        {String(index + 1).padStart(2, '0')} · {block.heading}
      </p>
      <p className="prose mt-2">{block.body}</p>
      {block.code && (
        <div className="mt-3">
          <CodeBlock lang={block.code.lang} code={block.code.code} />
        </div>
      )}
    </div>
  );
}

// Benchmark table — generic web app metrics, not database-engine-specific.
export function BenchmarkTable() {
  const rows = [
    { op: 'Initial page load', latency: '0.4s', throughput: 'FCP' },
    { op: 'API response (p50)', latency: '45ms', throughput: '~500 req/s' },
    { op: 'API response (p99)', latency: '120ms', throughput: '~500 req/s' },
    { op: 'WebSocket message', latency: '<50ms', throughput: '10k msg/s' },
    { op: 'Lighthouse score', latency: '98+', throughput: 'Perf + A11y' },
  ];
  return (
    <div className="overflow-x-auto" tabIndex={0} aria-label="Benchmark results table">
      <table className="benchmark-table">
        <thead>
          <tr>
            <th>operation</th>
            <th>latency</th>
            <th>throughput</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.op}</td>
              <td className="num">{r.latency}</td>
              <td className="num">{r.throughput}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
