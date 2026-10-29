import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { CopyButton } from '@/components/shared/copy-button';
import { ContactForm } from '@/components/pages/contact-form';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import { SITE_URL } from '@/lib/site';
import { Github, Send, MessageCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Send a direct project inquiry or message to Saffan for freelance web development, full-stack software, or custom AI agent engineering.',
  alternates: {
    canonical: `${SITE_URL}/connect`,
  },
  openGraph: {
    title: 'Contact | Saffan',
    description: 'Send a project inquiry or connect directly with Saffan.',
    url: `${SITE_URL}/connect`,
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
          subtitle="Have a project in mind, need a quote, or want to discuss a new product idea? Fill out the form below or message me directly."
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
            <Reveal delay={0.05}>
              <div
                className="paper-soft rounded-2xl border p-6 sm:p-8"
                style={{ borderColor: 'var(--ink-14)' }}
              >
                <p className="label-accent">direct email</p>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hand mt-2 block text-2xl text-ink font-semibold hover:text-accent transition-colors break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
                <p className="sans mt-2 text-xs text-ink-soft">
                  I read every email personally and reply within 24 hours.
                </p>
                <div className="mt-4">
                  <CopyButton text={PERSONAL_INFO.email} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                className="paper-soft rounded-2xl border p-6 sm:p-8"
                style={{ borderColor: 'var(--ink-14)' }}
              >
                <p className="label-accent">direct message</p>
                <p className="sans mt-1 text-sm text-ink-soft">
                  For quick questions or brief scopes, feel free to reach out directly:
                </p>
                <div className="mt-4 flex flex-col gap-2.5">
                  <a
                    href={PERSONAL_INFO.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-[var(--ink-12)] p-3 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" /> Telegram
                    </span>
                    <span className="text-xs text-ink-soft">@{PERSONAL_INFO.telegramHandle}</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-[var(--ink-12)] p-3 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="h-4 w-4" /> GitHub
                    </span>
                    <span className="text-xs text-ink-soft">@{PERSONAL_INFO.githubHandle}</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-[var(--ink-12)] p-3 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" /> Discord
                    </span>
                    <span className="text-xs text-ink-soft">Community / Chat</span>
                  </a>
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
                <h3 className="sans text-lg font-semibold text-ink">Want to see fixed-price packages?</h3>
                <p className="sans text-sm text-ink-soft mt-1">
                  From landing pages starting at ₹9,999 to custom full-stack applications.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/services" className="btn-ink">
                  view services & pricing <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/work" className="btn-outline">
                  see my work <ArrowRight className="h-4 w-4" />
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
