import type { Metadata } from 'next';
import { PERSONAL_INFO, Project } from './portfolio-data';

export const SITE_NAME = `${PERSONAL_INFO.name} — Systems Architect & Software Engineer`;
export const SITE_TAGLINE = 'Self-Taught Systems Architect · Distributed Systems, AI Infrastructure & Modern Web';
export const DEFAULT_DESCRIPTION =
  'Portfolio of Saffan — Self-Taught Software Engineer & Systems Architect. Specializing in high-throughput distributed systems (Go, Rust), AI infrastructure (FastAPI, Qdrant), and modern high-performance web platforms (Next.js, TypeScript).';

export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  return 'https://saffan-hazel.vercel.app';
}

export function generateCanonicalUrl(path: string = '/'): string {
  const base = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function generatePersonSchema() {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.title,
    description: PERSONAL_INFO.shortBio,
    url: baseUrl,
    sameAs: [
      PERSONAL_INFO.github,
      PERSONAL_INFO.telegram,
      PERSONAL_INFO.discord,
    ],
    knowsAbout: [
      'C (C11 Standard)',
      'Database Architecture (NovaDB)',
      'Compilers & AST Interpreters (Breeze)',
      'Autonomous AI Agents (ASTRAMIND)',
      'Go (Golang)',
      'Rust',
      'TypeScript',
      'Python',
      'Next.js',
      'React',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'Vector Databases',
      'WebGL',
      'Docker',
      'High-Concurrency Systems',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Self-Taught Computer Science & Systems Engineering',
    },
  };
}

export function generateProfilePageSchema() {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2026-01-01',
    mainEntity: generatePersonSchema(),
    name: `${PERSONAL_INFO.name}'s Engineering Portfolio`,
    url: baseUrl,
  };
}

export function generateProjectSchema(project: Project) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    author: {
      '@type': 'Person',
      name: PERSONAL_INFO.name,
      url: baseUrl,
    },
    url: `${baseUrl}/projects/${project.slug}`,
    codeRepository: project.githubUrl,
    keywords: project.techStack.join(', '),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  };
}

export function generatePageMetadata({
  title,
  description,
  path = '/',
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const baseUrl = getBaseUrl();
  const canonicalUrl = generateCanonicalUrl(path);
  const ogImage = image || `${baseUrl}/api/og`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      title: `${title} | ${PERSONAL_INFO.name}`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${PERSONAL_INFO.name}`,
      description,
      images: [ogImage],
    },
  };
}
