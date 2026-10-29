import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { PERSONAL_INFO, PROJECTS } from '@/lib/portfolio-data';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import { CopyButton } from '@/components/shared/copy-button';
import { ArrowRight, ArrowDownRight, Github, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: {
    absolute: `${PERSONAL_INFO.name} | Web Developer & CS Student`,
  },
  description:
    'Web developer and Computer Science student building fast Next.js websites, scalable APIs, and autonomous AI agent workflows.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${PERSONAL_INFO.name} | Web Developer & CS Student`,
    description:
      'Web developer and Computer Science student building fast Next.js websites, scalable APIs, and autonomous AI agent workflows.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'profile',
  },
};

const CORE_PRINCIPLES = [
  {
    title: 'Ship to Learn & Iterate',
    body: 'Software only becomes valuable once someone actually uses it. I build and deploy clean MVPs early, watch real user workflows, and refine through concrete usage rather than endless speculative planning.',
  },
  {
    title: 'Speed is Respect',
    body: '98+ Lighthouse scores and 60fps renders are not vanity badges. Fast, lightweight software respects the user’s time and device battery. Good engineering makes responsiveness an invariant, not an afterthought.',
  },
  {
    title: 'Autonomous Tools Over Chatbots',
    body: 'Text generation alone is a novelty. Real leverage comes when language models have typed JSON schemas, real-time tool execution, and database access to automate complex workflows end-to-end.',
  },
];

const FEATURED_PROJECTS = PROJECTS.slice(0, 4);

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="px-6 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-20">
        <Reveal>
          <p className="hand text-2xl text-accent sm:text-3xl font-medium">
            Hi, I&apos;m {PERSONAL_INFO.name}.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="hand mt-2 text-5xl leading-[0.95] text-ink sm:text-7xl md:text-8xl font-normal">
            i build websites,
            <br />
            <span className="text-accent">software & AI agents.</span>
          </h1>
          {/* hand-drawn doodle squiggle */}
          <span className="doodle mt-2 hidden sm:inline-block" aria-hidden="true">
            <svg viewBox="0 0 120 12" fill="none" className="h-3 w-32">
              <path
                d="M3 8 Q 15 2, 30 8 T 60 8 T 90 8 T 117 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <Reveal delay={0.15} className="md:col-span-7">
            <p className="lead">{PERSONAL_INFO.bio}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/work" className="btn-ink">
                view the work <ArrowRight className="h-4 w-4" />
              </Link>
              <CopyButton text={PERSONAL_INFO.email} />
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Github className="h-4 w-4" /> github
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-5">
            <div
              className="md:border-l md:pl-8"
              style={{ borderColor: 'var(--ink-14)' }}
            >
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
                {PERSONAL_INFO.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="label">{s.label}</dt>
                    <dd className="hand mt-1 text-3xl text-ink font-semibold">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="label mt-6">{PERSONAL_INFO.location}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Principles ───────────────────────────────────── */}
      <section className="section px-6 sm:px-10">
        <Reveal>
          <p className="label-accent">how i think</p>
          <h2 className="hand mt-2 text-4xl text-ink sm:text-5xl font-medium">
            principles behind my craft.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {CORE_PRINCIPLES.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div className="flex flex-col">
                <p className="hand text-2xl text-accent font-semibold">0{i + 1}</p>
                <h3 className="sans mt-2 text-xl font-semibold text-ink">{b.title}</h3>
                <p className="prose mt-2 leading-relaxed">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Selected work ────────────────────────────────── */}
      <section className="section px-6 sm:px-10">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div className="relative">
              <span
                className="tape hidden sm:block"
                style={{ top: '-12px', left: '16px' }}
                aria-hidden="true"
              />
              <p className="label-accent">selected work</p>
              <h2 className="hand mt-2 text-4xl text-ink sm:text-5xl font-medium">
                featured production systems.
              </h2>
            </div>
            <Link
              href="/work"
              className="btn-ghost hidden sm:inline-flex items-center gap-1"
            >
              all work <ArrowDownRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 border-t" style={{ borderColor: 'var(--ink-12)' }}>
          {FEATURED_PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <Link
                href={`/work/${p.slug}`}
                className="group grid w-full grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b py-6 text-left transition-colors hover:bg-[var(--accent-04)]"
                style={{ borderColor: 'var(--ink-12)' }}
              >
                <span className="col-span-2 sans text-sm font-semibold text-accent sm:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="col-span-10 sm:col-span-5">
                  <h3 className="sans text-xl font-semibold text-ink transition-colors group-hover:text-accent sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="sans mt-1 text-sm text-ink-soft line-clamp-2">{p.tagline}</p>
                </div>
                <p className="col-span-12 sans text-sm text-ink-soft sm:col-span-4 sm:col-start-7">
                  {p.category}
                </p>
                <span className="col-span-6 sans text-sm text-ink-soft sm:col-span-1">
                  {p.year}
                </span>
                <span className="col-span-6 flex items-center justify-end sm:col-span-1">
                  <ArrowRight className="h-4 w-4 text-ink-soft transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── More about me CTA ────────────────────────────── */}
      <section className="section px-6 sm:px-10">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="sans text-lg text-ink font-medium">Curious about my journey, education, and daily stack?</p>
              <p className="prose text-sm text-ink-soft mt-1">From studying Computer Science to building real client apps.</p>
            </div>
            <Link href="/about" className="btn-outline whitespace-nowrap self-start sm:self-auto">
              more about me <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── Connect CTA ──────────────────────────────────── */}
      <section
        className="section section-rule px-6 sm:px-10"
        style={{ borderTop: '2px solid var(--accent-40)' }}
      >
        <Reveal>
          <p className="label-accent">get in touch</p>
          <h2 className="hand mt-2 text-4xl text-ink sm:text-5xl md:text-6xl font-medium">
            have a project in mind?
          </h2>
          <p className="lead mt-4 max-w-xl">
            Whether you need a high-converting web presence, an interactive full-stack app, or an autonomous AI integration, let&apos;s talk.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/services" className="btn-ink">
              see services & pricing <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/connect" className="btn-outline">
              start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Github className="h-4 w-4" /> @{PERSONAL_INFO.githubHandle}
            </a>
            <a
              href={PERSONAL_INFO.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Send className="h-4 w-4" /> @{PERSONAL_INFO.telegramHandle}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
