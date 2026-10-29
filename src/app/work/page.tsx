import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { WorkProjectList } from '@/components/pages/work-project-list';
import { WORK_INTRO } from '@/lib/portfolio-data';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Explore production web applications, telemetry streaming engines, and AI agent architectures built and shipped by Saffan.',
  alternates: {
    canonical: `${SITE_URL}/work`,
  },
  openGraph: {
    title: 'Work | Saffan',
    description: WORK_INTRO.subtitle,
    url: `${SITE_URL}/work`,
  },
};

export default function WorkPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work` },
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
          eyebrow={WORK_INTRO.eyebrow}
          title={WORK_INTRO.title}
          subtitle={WORK_INTRO.subtitle}
        />
        <WorkProjectList />
      </div>
    </>
  );
}
