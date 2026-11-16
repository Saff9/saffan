import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { CopyButton } from '@/components/shared/copy-button';
import { ContactForm } from '@/components/pages/contact-form';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import { SITE_URL } from '@/lib/site';
import { Github, Send, MessageCircle, ArrowRight, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Saffan | Hire Full-Stack & AI Agent Developer',
  description:
    'Send a direct project inquiry or message to Saffan for freelance web development, full-stack software engineering, or custom AI agent tools.',
  keywords: [
    'contact Saffan',
    'hire web developer',
    'freelance software engineer',
    'hire Next.js developer',
    'AI agent consultant',
    'work with Saffan',
  ],
  alternates: {
    canonical: `${SITE_URL}/connect`,
  },
  openGraph: {
    title: 'Contact Saffan | Hire Full-Stack & AI Agent Developer',
    description: 'Send a project inquiry or connect directly with Saffan.',
    url: `${SITE_URL}/connect`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Contact Saffan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Saffan | Hire Full-Stack & AI Agent Developer',
    description: 'Send a project inquiry or connect directly with Saffan.',
    images: [`${SITE_URL}/twitter-image`],
  },
};

export default function ConnectPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/connect` },
    ],
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Saffan',
    description: 'Direct contact and inquiry form for hiring Saffan for web development and AI engineering.',
    url: `${SITE_URL}/connect`,
    mainEntity: {
      '@type': 'Person',
      name: PERSONAL_INFO.name,
      email: `mailto:${PERSONAL_INFO.email}`,
      telephone: '+91 95415 67355',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div>
        <PageHeader
          eyebrow="Contact"
          title="Let's Talk."
          subtitle="Have a project in mind, need a quote, or want to discuss a new product idea? Fill out the inquiry form or reach out directly."
        />

        <div className="px-6 pb-20 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* ── Left: Interactive Contact Form ─────────────── */}
            <div className="lg:col-span-7">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            {/* ── Right: Direct Channels & Information ───────── */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Direct email card */}
              <Reveal delay={0.05}>
                <div
                  className="paper-soft relative rounded-2xl border p-6 sm:p-8 transition-all hover:border-[var(--accent)]"
                  style={{ borderColor: 'var(--ink-14)' }}
                >
                  <span
                    className="tape hidden sm:block"
                    style={{ top: '-12px', left: '20px' }}
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="h-4 w-4 text-accent" />
                    <p className="label-accent">Direct Email</p>
                  </div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="hand mt-2 block text-2xl text-ink font-semibold hover:text-accent transition-colors break-all"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <p className="sans mt-2 text-xs text-ink-soft">
                    I read every message personally and reply within 24 hours.
                  </p>
                  <div className="mt-4">
                    <CopyButton text={PERSONAL_INFO.email} />
                  </div>
                </div>
              </Reveal>

              {/* Direct messaging card */}
              <Reveal delay={0.1}>
                <div
                  className="paper-soft rounded-2xl border p-6 sm:p-8"
                  style={{ borderColor: 'var(--ink-14)' }}
                >
                  <p className="label-accent mb-1">Direct Channels</p>
                  <p className="sans text-xs text-ink-soft mb-4">
                    For quick questions or preliminary scopes, ping me directly:
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href={PERSONAL_INFO.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-[var(--ink-12)] bg-[var(--paper)] p-3 text-sm font-medium text-ink hover:border-accent hover:bg-[rgba(223,94,75,0.04)] transition-all"
                    >
                      <span className="flex items-center gap-2.5">
                        <Send className="h-4 w-4 text-ink-soft group-hover:text-accent transition-colors" />
                        <span>Telegram</span>
                      </span>
                      <span className="text-xs text-ink-soft group-hover:text-accent transition-colors">
                        @{PERSONAL_INFO.telegramHandle} →
                      </span>
                    </a>

                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-[var(--ink-12)] bg-[var(--paper)] p-3 text-sm font-medium text-ink hover:border-accent hover:bg-[rgba(223,94,75,0.04)] transition-all"
                    >
                      <span className="flex items-center gap-2.5">
                        <Github className="h-4 w-4 text-ink-soft group-hover:text-accent transition-colors" />
                        <span>GitHub</span>
                      </span>
                      <span className="text-xs text-ink-soft group-hover:text-accent transition-colors">
                        @{PERSONAL_INFO.githubHandle} →
                      </span>
                    </a>

                    <a
                      href={PERSONAL_INFO.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-[var(--ink-12)] bg-[var(--paper)] p-3 text-sm font-medium text-ink hover:border-accent hover:bg-[rgba(223,94,75,0.04)] transition-all"
                    >
                      <span className="flex items-center gap-2.5">
                        <MessageCircle className="h-4 w-4 text-ink-soft group-hover:text-accent transition-colors" />
                        <span>Discord</span>
                      </span>
                      <span className="text-xs text-ink-soft group-hover:text-accent transition-colors">
                        Open Chat →
                      </span>
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* What happens next? Timeline */}
              <Reveal delay={0.12}>
                <div
                  className="paper-soft rounded-2xl border p-6 sm:p-8"
                  style={{ borderColor: 'var(--ink-14)' }}
                >
                  <p className="label-accent mb-4">Project Kickoff Process</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(223,94,75,0.12)] font-mono text-xs font-semibold text-accent">
                        1
                      </span>
                      <div>
                        <p className="sans text-sm font-semibold text-ink">Same-Day Review</p>
                        <p className="sans text-xs text-ink-soft mt-0.5 leading-relaxed">
                          I examine your scope, tech stack, and goals to ensure a perfect fit.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(223,94,75,0.12)] font-mono text-xs font-semibold text-accent">
                        2
                      </span>
                      <div>
                        <p className="sans text-sm font-semibold text-ink">Fixed Proposal &amp; Milestones</p>
                        <p className="sans text-xs text-ink-soft mt-0.5 leading-relaxed">
                          You receive a clear scope document with pricing and delivery timeline.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(223,94,75,0.12)] font-mono text-xs font-semibold text-accent">
                        3
                      </span>
                      <div>
                        <p className="sans text-sm font-semibold text-ink">Live Build &amp; Preview</p>
                        <p className="sans text-xs text-ink-soft mt-0.5 leading-relaxed">
                          Direct staging deployments so you can test every feature before launch.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── Services crosslink ───────────────────────────── */}
          <Reveal delay={0.15}>
            <section
              className="section mt-16"
              style={{ borderTop: '2px solid var(--accent-40)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="sans text-lg font-semibold text-ink">Looking for packaged pricing?</h3>
                  <p className="sans text-sm text-ink-soft mt-1">
                    Transparent deliverables ranging from fast landing pages to complete full-stack web applications.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/services" className="btn-ink">
                    View Services &amp; Packages <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                  <Link href="/work" className="btn-outline">
                    Explore Case Studies <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </>
  );
}
