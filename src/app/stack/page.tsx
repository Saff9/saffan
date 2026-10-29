import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { StackFilterView } from '@/components/pages/stack-filter-view';
import { STACK_INTRO } from '@/lib/portfolio-data';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Stack',
  description:
    'Core technologies and tools used by Saffan: Next.js, React, TypeScript, FastAPI, Node.js, PostgreSQL, Redis, Docker, and AI agents.',
  alternates: {
    canonical: `${SITE_URL}/stack`,
  },
  openGraph: {
    title: 'Stack | Saffan',
    description: STACK_INTRO.subtitle,
    url: `${SITE_URL}/stack`,
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
