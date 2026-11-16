import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { StackFilterView } from '@/components/pages/stack-filter-view';
import { STACK_INTRO } from '@/lib/portfolio-data';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Tech Stack & Engineering Tools | Saffan',
  description:
    'Core technologies and tools used by Saffan: Next.js, React, TypeScript, FastAPI, Node.js, PostgreSQL, Redis, Docker, and autonomous AI agents.',
  keywords: [
    'Saffan tech stack',
    'Next.js developer tools',
    'React TypeScript stack',
    'FastAPI Python architecture',
    'Redis WebSocket stack',
    'AI agent tools stack',
  ],
  alternates: {
    canonical: `${SITE_URL}/stack`,
  },
  openGraph: {
    title: 'Tech Stack & Engineering Tools | Saffan',
    description: STACK_INTRO.subtitle,
    url: `${SITE_URL}/stack`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Saffan Tech Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Stack & Engineering Tools | Saffan',
    description: STACK_INTRO.subtitle,
    images: [`${SITE_URL}/twitter-image`],
  },
};

export default function StackPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Stack', item: `${SITE_URL}/stack` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div>
        <PageHeader
          eyebrow={STACK_INTRO.eyebrow}
          title={STACK_INTRO.title}
          subtitle={STACK_INTRO.subtitle}
        />
        <StackFilterView />
      </div>
    </>
  );
}
