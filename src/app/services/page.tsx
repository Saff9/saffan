import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { PageHeader } from '@/components/page-header';
import { SERVICES_INTRO, SERVICE_PACKAGES } from '@/lib/content/services';
import { PERSONAL_INFO } from '@/lib/content/personal';
import { SITE_URL } from '@/lib/site';
import { FaqAccordion } from '@/components/pages/faq-accordion';
import { Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Transparent web development and AI agent packages from Saffan. Fast delivery, fixed prices in INR & USD, and direct communication.',
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: 'Services | Saffan',
    description: SERVICES_INTRO.subtitle,
    url: `${SITE_URL}/services`,
  },
};

const FAQ_ITEMS = [
  {
    q: 'What is the typical turnaround time for a project?',
    a: 'Single landing pages typically deliver in 3-5 business days. Full multi-page websites or custom web applications take 2 to 4 weeks depending on the complexity of backend logic and integrations.',
  },
  {
    q: 'Do you design the interface or do I need to provide mockups?',
    a: 'I handle both end-to-end design and engineering. If you already have Figma designs, brand assets, or wireframes, I will implement them pixel-perfectly. If starting from scratch, I craft responsive designs aligned with your brand identity.',
  },
  {
    q: 'Can you work with technology stacks other than Next.js?',
    a: 'Next.js with TypeScript and Tailwind CSS is my default for optimal performance and SEO. However, I also build with React, Astro, Vite, Node.js, Express, and Python FastAPI depending on project requirements.',
  },
  {
    q: 'How does payment and invoicing work?',
    a: 'Engagements are structured with a 50% deposit to initiate work and 50% upon final launch approval. Payments can be handled via direct bank wire, Wise, PayPal, or crypto.',
  },
  {
    q: 'What happens after the website is launched?',
    a: 'All projects include 30 days of complimentary post-launch support and bug fixes to ensure complete operational peace of mind. Ongoing maintenance arrangements are available upon request.',
  },
];

const PROCESS_STEPS = [
  {
    title: '1. Discovery & Scope',
    body: 'We discuss your product vision, audience, and technical requirements via Telegram or email. I provide honest feedback on scope.',
  },
  {
    title: '2. Fixed Proposal',
    body: 'You receive a clear, itemized proposal with a locked price and concrete milestone timeline. No hidden hourly surprises.',
  },
  {
    title: '3. Build & Iterate',
    body: 'I design, code, and deploy to a private preview URL. You review live progress and test features as they are built.',
  },
  {
    title: '4. Launch & Handoff',
    body: 'We point DNS to your production domain, run final SEO and performance audits, and hand over the codebase with 30 days of support.',
  },
];

export default function ServicesPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Saffan | Web Development & AI Engineering',
    description: SERVICES_INTRO.subtitle,
    provider: { '@type': 'Person', name: PERSONAL_INFO.name, url: SITE_URL },
    areaServed: 'Worldwide',
    url: `${SITE_URL}/services`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: SERVICE_PACKAGES.map((pkg) => ({
        '@type': 'Offer',
        name: pkg.name,
        description: pkg.tagline,
        price: pkg.price.replace(/[^0-9]/g, '').slice(0, 5) || '9999',
        priceCurrency: 'INR',
      })),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div>
        <PageHeader
          eyebrow={SERVICES_INTRO.eyebrow}
          title={SERVICES_INTRO.title}
          subtitle={SERVICES_INTRO.subtitle}
        />

        <div className="px-6 pb-16 sm:px-10">
          {/* ── Pricing cards ──────────────────────────────── */}
          <Reveal>
            <p className="label-accent">offerings</p>
            <h2 className="hand mt-2 text-3xl text-ink sm:text-4xl font-medium">
              Transparent packages. Fixed rates.
            </h2>
          </Reveal>

          <ul role="list" className="pricing-grid mt-8">
            {SERVICE_PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.05}>
                <li
                  className={`pricing-card ${
                    pkg.highlighted ? 'pricing-card--highlighted' : ''
                  }`}
                >
                  <p className="pricing-name">{pkg.name}</p>
                  <p className="pricing-price">{pkg.price}</p>
                  <p className="pricing-tagline">{pkg.tagline}</p>
                  <p className="pricing-blurb">{pkg.blurb}</p>
                  <ul role="list" className="pricing-features">
                    {pkg.features.map((f, j) => (
                      <li key={j}>
                        <Check
                          className="h-3.5 w-3.5 shrink-0 text-[var(--accent-deep)]"
                          aria-hidden="true"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/connect"
                    className={
                      pkg.highlighted
                        ? 'btn-ink pricing-cta justify-center'
                        : 'btn-outline pricing-cta--outline justify-center'
                    }
                    aria-label={`${pkg.cta} — contact Saffan`}
                  >
                    {pkg.cta}
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>

          {/* ── Process ────────────────────────────────────── */}
          <Reveal>
            <section className="section">
              <p className="label-accent">collaboration</p>
              <h2 className="hand mt-2 text-3xl text-ink sm:text-4xl font-medium">
                from concept to live URL.
              </h2>
              <ol role="list" className="mt-8 space-y-6">
                {PROCESS_STEPS.map((step, i) => (
                  <li key={i} className="process-step">
                    <span className="process-number" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="sans text-base font-semibold text-ink">
                        {step.title}
                      </h3>
                      <p className="prose mt-1">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          {/* ── FAQ ────────────────────────────────────────── */}
          <Reveal>
            <section className="section">
              <p className="label-accent">clarity</p>
              <h2 className="hand mt-2 text-3xl text-ink sm:text-4xl font-medium">
                frequently asked questions.
              </h2>
              <FaqAccordion items={FAQ_ITEMS} />
            </section>
          </Reveal>

          {/* ── Final CTA ──────────────────────────────────── */}
          <Reveal>
            <section
              className="section"
              style={{ borderTop: '2px solid var(--accent-40)' }}
            >
              <p className="label-accent">ready to start?</p>
              <h2 className="hand mt-2 text-3xl text-ink sm:text-4xl font-medium">
                let&apos;s build something exceptional.
              </h2>
              <p className="lead mt-3 max-w-xl">
                Tell me about your product or idea. I will reply within 24 hours with honest feasibility feedback and pricing options.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/connect" className="btn-ink">
                  contact me <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/work" className="btn-outline">
                  review my work first <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </>
  );
}
