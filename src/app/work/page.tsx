import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { WorkProjectList } from '@/components/pages/work-project-list';
import { WORK_INTRO } from '@/lib/portfolio-data';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Work & Projects | Full-Stack Systems & AI Workflows',
  description:
    'Explore production web applications, telemetry streaming engines, high-throughput APIs, and autonomous AI agent architectures engineered by Saffan.',
  keywords: [
    'web development portfolio',
    'software engineer portfolio',
    'Next.js case studies',
    'React production apps',
    'FastAPI project examples',
    'AI agent workflows',
    'telemetry streaming architecture',
    'full stack developer work',
    'Saffan projects',
  ],
  alternates: {
    canonical: `${SITE_URL}/work`,
  },
  openGraph: {
    title: 'Work & Projects | Saffan',
    description: WORK_INTRO.subtitle,
    url: `${SITE_URL}/work`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Saffan Work & Projects Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work & Projects | Saffan',
    description: WORK_INTRO.subtitle,
    images: [`${SITE_URL}/twitter-image`],
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
