import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/lib/portfolio-data';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import {
  DeepLayout,
  EssayLayout,
  ResultsLayout,
  ProblemLayout,
} from '@/components/pages/work-detail/layouts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const title = `${project.title} | ${project.tagline}`;
  const description = `${project.problemStatement} Built with ${project.techStack.join(', ')}.`;
  const url = `${SITE_URL}/work/${project.slug}`;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  // Structured Data for Google Software / Project rich results
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.tagline,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    author: {
      '@type': 'Person',
      name: 'Saffan',
      url: SITE_URL,
    },
    url: `${SITE_URL}/work/${project.slug}`,
    sameAs: project.githubUrl,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Work',
        item: `${SITE_URL}/work`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${SITE_URL}/work/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {renderLayout(project, next)}
    </>
  );
}

function renderLayout(project: (typeof PROJECTS)[number], next: (typeof PROJECTS)[number]) {
  switch (project.tone) {
    case 'essay':
      return <EssayLayout project={project} next={next} />;
    case 'results':
      return <ResultsLayout project={project} next={next} />;
    case 'problem':
      return <ProblemLayout project={project} next={next} />;
    case 'deep':
    default:
      return <DeepLayout project={project} next={next} />;
  }
}
