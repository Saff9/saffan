import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { TechGlyph } from '@/components/shared/tech-glyph';
import { SITE_URL } from '@/lib/site';
import {
  ABOUT_FACETS,
  SOUL_FUEL,
  NERD_OUTS,
  ENERGY_SOURCES,
  PERSONAL_INFO,
} from '@/lib/portfolio-data';
import type { SoulItem } from '@/lib/content/types';
import { Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Background, philosophy, and daily tools of Saffan. Computer Science student and web developer building with Next.js, TypeScript, and FastAPI.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About | Saffan',
    description: PERSONAL_INFO.bio,
    url: `${SITE_URL}/about`,
  },
};

type CareTag = 'fuel' | 'nerd' | 'energy';
type CareItem = SoulItem & { tag: CareTag };

const CARE_ITEMS: CareItem[] = [
  ...SOUL_FUEL.map((i) => ({ ...i, tag: 'fuel' as const })),
  ...NERD_OUTS.map((i) => ({ ...i, tag: 'nerd' as const })),
  ...ENERGY_SOURCES.map((i) => ({ ...i, tag: 'energy' as const })),
];

const TAG_DOT: Record<CareTag, string> = {
  fuel: 'var(--accent)',
  nerd: 'var(--ink)',
  energy: 'var(--ink-soft)',
};

export default function AboutPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
    ],
  };

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Saffan',
    description: PERSONAL_INFO.bio,
    url: `${SITE_URL}/about`,
    mainEntity: {
      '@type': 'Person',
      name: PERSONAL_INFO.name,
      jobTitle: PERSONAL_INFO.title,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div>
        <PageHeader
          eyebrow="About"
          title="About Me"
          subtitle={PERSONAL_INFO.bio}
        />

      {/* ── Story / Anchor ───────────────────────────────── */}
      <section className="px-6 pb-6 sm:px-10">
        <Reveal>
          <svg
            className="doodle mb-5 block"
            width="64"
            height="14"
            viewBox="0 0 64 14"
            aria-hidden="true"
            fill="none"
          >
            <path
              d="M2 9 C 10 3, 18 11, 26 6 S 42 3, 50 8 S 60 11, 62 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="lead max-w-2xl">{PERSONAL_INFO.longBio}</p>
        </Reveal>
      </section>

      {/* ── How I Work ───────────────────────────────────── */}
      <section className="section relative px-6 sm:px-10">
        <span
          className="tape"
          style={{ top: '-10px', left: '20px' }}
          aria-hidden="true"
        />
        <Reveal>
          <p className="label-accent">philosophy</p>
          <h2 className="hand mt-2 text-4xl text-ink sm:text-5xl font-medium">
            how i build.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {ABOUT_FACETS.map((f, i) => (
            <Reveal key={f.role} delay={i * 0.05}>
              <div
                className="border-l-2 pl-4"
                style={{ borderColor: 'var(--accent)' }}
              >
                <h3 className="sans text-base font-semibold text-ink">
                  {f.role}
                </h3>
                <p className="prose mt-1">{f.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── What Matters To Me ───────────────────────────── */}
      <section className="section-rule px-6 pt-12 pb-12 sm:px-10 sm:pt-[4.5rem] sm:pb-[4.5rem]">
        <Reveal>
          <p className="label-accent">curiosity & drive</p>
          <h2 className="hand mt-2 text-4xl text-ink sm:text-5xl font-medium">
            what drives my work.
          </h2>
          <p className="caption mt-2">
            fuel is what sparks new builds · nerd is what i research on weekends · energy is what makes collaboration great
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {CARE_ITEMS.map((item, i) => (
            <Reveal
              key={`${item.tag}-${item.title}`}
              delay={Math.min(i * 0.03, 0.3)}
            >
              <div>
                <span className="chip">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: TAG_DOT[item.tag] }}
                    aria-hidden="true"
                  />
                  {item.tag}
                </span>
                <h3 className="sans mt-3 text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="prose mt-1">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Currently ────────────────────────────────────── */}
      <section className="section px-6 sm:px-10">
        <Reveal>
          <p className="label-accent">active focus</p>
          <h2 className="hand mt-2 text-4xl text-ink sm:text-5xl font-medium">
            what i&apos;m doing right now.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {PERSONAL_INFO.currently.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <div className="flex items-baseline gap-3">
                <span className="label shrink-0">{c.label}</span>
                <span className="prose">{c.value}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Tools ────────────────────────────────────────── */}
      <section className="section px-6 sm:px-10">
        <Reveal>
          <p className="label-accent">daily arsenal</p>
          <h2 className="hand mt-2 text-4xl text-ink sm:text-5xl font-medium">
            technologies i trust.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PERSONAL_INFO.tools.map((t, i) => (
            <Reveal key={t.category} delay={i * 0.06}>
              <div>
                <p className="label">{t.category}</p>
                <ul className="mt-2 space-y-1">
                  {t.items.map((item) => (
                    <li key={item} className="sans flex items-center gap-1.5 text-sm text-ink">
                      <TechGlyph name={item} size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section px-6 sm:px-10">
        <Reveal>
          <p className="lead max-w-2xl">
            Want to see how these tools translate into real products?
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/work" className="btn-ink">
              explore shipped projects <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="btn-outline"
            >
              <Mail className="h-4 w-4" aria-hidden="true" /> send an email
            </a>
          </div>
        </Reveal>
      </section>
    </div>
    </>
  );
}
