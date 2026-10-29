
// Tone-based layouts — one per `ProjectTone`. The 4 layouts vary
// the section order and visual weight so the 6 case studies read
// as distinct, not templated. Each composes the blocks from
// `./blocks` + the diagram from `./diagrams` and is rendered by
// the orchestrator `WorkDetailPage.tsx`.

import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import type { Project } from '@/lib/content/types';
import { ProjectDiagram } from './diagrams';
import {
  MetaStrip,
  Lead,
  MetricsGrid,
  ProblemSolution,
  ArchitectureList,
  HighlightsChallenges,
  HighlightsOnly,
  TechChips,
  NextSystemNav,
  BenchmarkTable,
  DeepDiveBlockItem,
} from './blocks';

type LayoutProps = { project: Project; next: Project };

// tone: 'deep' — the full technical case study (NovaDB).
// Story → diagram → problem/solution → metrics → deep-dive blocks
// with real C code → benchmark table → architecture list →
// highlights/challenges → tech → next.
export function DeepLayout({ project, next }: LayoutProps) {
  return (
    <>
      <PageHeader
        eyebrow={project.category}
        title={project.title}
        subtitle={project.tagline}
        showBack
      />
      <div className="px-6 pb-12 sm:px-10 sm:pb-16">
        <MetaStrip project={project} />

        {/* Lead — full multi-paragraph story */}
        <Reveal>
          <Lead text={project.fullStory} className="mt-10 max-w-2xl" />
        </Reveal>

        {/* Architecture diagram */}
        <section className="section">
          <Reveal>
            <ProjectDiagram slug={project.slug} />
          </Reveal>
        </section>

        {/* Problem + Solution */}
        <section className="section">
          <ProblemSolution project={project} />
        </section>

        {/* Metrics */}
        <section className="section-tight">
          <MetricsGrid project={project} />
        </section>

        {/* Deep-dive blocks */}
        {project.deepDive && project.deepDive.length > 0 && (
          <section className="section">
            <Reveal>
              <p className="label-accent">deep dive</p>
            </Reveal>
            <div className="mt-4 space-y-6">
              {project.deepDive.map((block, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <DeepDiveBlockItem block={block} index={i} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Benchmark table */}
        <section className="section-tight">
          <Reveal>
            <p className="label-accent">benchmarks</p>
            <BenchmarkTable />
            <p className="caption mt-2">
              Illustrative numbers from local runs — single core, 4 KB pages, warm buffer pool. The
              shape holds; the absolute numbers will not.
            </p>
          </Reveal>
        </section>

        {/* Architecture list — numbered, 7 entries */}
        <section className="section">
          <ArchitectureList project={project} />
        </section>

        {/* Highlights + Challenges */}
        <section className="section">
          <HighlightsChallenges project={project} />
        </section>

        {/* Tech */}
        <section className="section-tight">
          <TechChips project={project} />
        </section>

        <NextSystemNav next={next} />
      </div>
    </>
  );
}

// tone: 'essay' — short, personal, one screen (Breeze, CodeCraftAI).
// No metrics, no problem/solution split, no architecture list, no
// highlights/challenges. Just the essay + a small diagram + tech + next.
export function EssayLayout({ project, next }: LayoutProps) {
  return (
    <>
      <PageHeader
        eyebrow={project.category}
        title={project.title}
        subtitle={project.tagline}
        showBack
      />
      <div className="px-6 pb-12 sm:px-10 sm:pb-16">
        <MetaStrip project={project} />

        {/* Lead — centered essay column */}
        <Reveal>
          <Lead text={project.fullStory} className="mx-auto mt-10 max-w-2xl" />
        </Reveal>

        {/* Small diagram, ~400px wide */}
        <section className="section">
          <Reveal>
            <div className="mx-auto max-w-[400px]">
              <ProjectDiagram slug={project.slug} />
            </div>
          </Reveal>
        </section>

        {/* Tech */}
        <section className="section-tight">
          <TechChips project={project} />
        </section>

        <NextSystemNav next={next} />
      </div>
    </>
  );
}

// tone: 'results' — metrics lead, above the fold (BudgetTechIndia).
// Inverts the standard layout: numbers first, story supporting.
export function ResultsLayout({ project, next }: LayoutProps) {
  return (
    <>
      <PageHeader
        eyebrow={project.category}
        title={project.title}
        subtitle={project.tagline}
        showBack
      />
      <div className="px-6 pb-12 sm:px-10 sm:pb-16">
        <MetaStrip project={project} />

        {/* Metrics FIRST — above the fold */}
        <section className="section-tight">
          <MetricsGrid project={project} />
        </section>

        {/* Lead — story as supporting prose */}
        <Reveal>
          <Lead text={project.fullStory} className="mt-10 max-w-2xl" />
        </Reveal>

        {/* Diagram — Lighthouse bars */}
        <section className="section">
          <Reveal>
            <ProjectDiagram slug={project.slug} />
          </Reveal>
        </section>

        {/* Problem + Solution */}
        <section className="section">
          <ProblemSolution project={project} />
        </section>

        {/* Highlights only — keep it positive, no challenges split */}
        <section className="section">
          <HighlightsOnly project={project} />
        </section>

        {/* Tech */}
        <section className="section-tight">
          <TechChips project={project} />
        </section>

        <NextSystemNav next={next} />
      </div>
    </>
  );
}

// tone: 'problem' — problem-first, skeptic/handoff angle
// (ASTRAMIND, ChatlyPro). Leads with the problem statement.
export function ProblemLayout({ project, next }: LayoutProps) {
  return (
    <>
      <PageHeader
        eyebrow={project.category}
        title={project.title}
        subtitle={project.tagline}
        showBack
      />
      <div className="px-6 pb-12 sm:px-10 sm:pb-16">
        <MetaStrip project={project} />

        {/* Problem statement FIRST */}
        <section className="section-tight">
          <Reveal>
            <p className="label-accent">the problem</p>
            <Lead text={project.problemStatement} className="mt-3 max-w-2xl" />
          </Reveal>
        </section>

        {/* Lead — story below */}
        <Reveal>
          <Lead text={project.fullStory} className="mt-10 max-w-2xl" />
        </Reveal>

        {/* Diagram — state machine */}
        <section className="section">
          <Reveal>
            <ProjectDiagram slug={project.slug} />
          </Reveal>
        </section>

        {/* Solution */}
        <section className="section">
          <Reveal>
            <p className="label-accent">the approach</p>
            <p className="prose mt-3 max-w-2xl">{project.solution}</p>
          </Reveal>
        </section>

        {/* Metrics */}
        <section className="section-tight">
          <MetricsGrid project={project} />
        </section>

        {/* Highlights + Challenges */}
        <section className="section">
          <HighlightsChallenges project={project} />
        </section>

        {/* Tech */}
        <section className="section-tight">
          <TechChips project={project} />
        </section>

        <NextSystemNav next={next} />
      </div>
    </>
  );
}
