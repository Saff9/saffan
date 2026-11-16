import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/site';
import { PERSONAL_INFO } from '@/lib/content/personal';
import { SiteNav } from '@/components/layout/site-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { HashRedirect } from '@/components/shared/hash-redirect';

export const viewport: Viewport = {
  themeColor: '#df5e4b',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSONAL_INFO.name} | Web Developer & CS Student`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Saffan',
    'Saffan web developer',
    'Saffan software engineer',
    'freelance web developer',
    'hire web developer',
    'hire full stack engineer',
    'Next.js developer',
    'React developer',
    'TypeScript developer',
    'FastAPI developer',
    'Express developer',
    'AI agent developer',
    'build AI agents',
    'autonomous AI systems',
    'full stack developer',
    'portfolio',
    'web development portfolio',
    'software engineer portfolio',
    'custom web application development',
    'high performance website Next.js',
    'frontend engineer',
    'backend engineer',
  ],
  authors: [{ name: PERSONAL_INFO.name, url: PERSONAL_INFO.github }],
  creator: PERSONAL_INFO.name,
  publisher: PERSONAL_INFO.name,
  applicationName: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'profile',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    firstName: PERSONAL_INFO.name,
    username: PERSONAL_INFO.githubHandle,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${PERSONAL_INFO.name} | Web Developer & CS Student`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: PERSONAL_INFO.handle,
    images: [`${SITE_URL}/twitter-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ||
      'Q7mAqyFVwG2zeScg2UAuMLlidBEjgjwhvFngytF5_Ko',
    other: {
      'p:domain_verify': '2e0e82d196e6aba1a6bd7a910c027e22',
      ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
        ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION }
        : {}),
    },
  },
  other: {
    'pinterest-rich-pin': 'true',
    'p:domain_verify': '2e0e82d196e6aba1a6bd7a910c027e22',
  },
};

// ── JSON-LD Structured Data ──────────────────────────────────────────
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PERSONAL_INFO.name,
  jobTitle: PERSONAL_INFO.title,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  email: `mailto:${PERSONAL_INFO.email}`,
  sameAs: [
    PERSONAL_INFO.github,
    PERSONAL_INFO.telegram,
    PERSONAL_INFO.discord,
  ],
  knowsAbout: [
    'Web Development',
    'Software Engineering',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'FastAPI',
    'Express',
    'Node.js',
    'Python',
    'AI Agent Development',
    'PostgreSQL',
    'Redis',
  ],
  description: PERSONAL_INFO.longBio,
  areaServed: 'Worldwide',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  author: { '@type': 'Person', name: PERSONAL_INFO.name },
};

const videoSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: `${PERSONAL_INFO.name} — Web Development & AI Agents Portfolio Reel`,
  description:
    'Showcase reel of modern web applications, scalable backend systems, and autonomous AI workflows engineered by Saffan.',
  thumbnailUrl: [`${SITE_URL}/opengraph-image`, `${SITE_URL}/twitter-image`],
  uploadDate: '2026-01-01T00:00:00Z',
  contentUrl: `${SITE_URL}/my-site-video.mp4`,
  embedUrl: SITE_URL,
  publisher: {
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    url: SITE_URL,
  },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${PERSONAL_INFO.name} | Web Development & AI Engineering Services`,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  priceRange: '$$',
  description: SITE_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Worldwide · Remote',
  },
  provider: {
    '@type': 'Person',
    name: PERSONAL_INFO.name,
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Full-Stack Web Application Development',
      description:
        'Custom web apps built with Next.js, React, TypeScript, Tailwind CSS, and scalable APIs.',
    },
    {
      '@type': 'Offer',
      name: 'AI Agent & Tool Integration',
      description:
        'End-to-end autonomous agentic systems, vector retrieval, and custom LLM workflows.',
    },
    {
      '@type': 'Offer',
      name: 'Backend API Engineering & Optimization',
      description:
        'High-throughput APIs built with FastAPI, Express, PostgreSQL, and Redis caching.',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="p:domain_verify" content="2e0e82d196e6aba1a6bd7a910c027e22" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="me" href={PERSONAL_INFO.github} />
        <link rel="me" href={PERSONAL_INFO.telegram} />
        <link rel="author" href={PERSONAL_INFO.github} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
      </head>
      <body className="antialiased">
        <div className="relative min-h-screen w-full bg-[var(--void)]">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[var(--paper)] focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg"
          >
            Skip to content
          </a>
          <HashRedirect />
          <div className="relative z-10 w-full">
            <div
              className="paper relative min-h-screen flex flex-col overflow-hidden border-x-[6px]"
              style={{ borderColor: 'var(--accent)' }}
            >
              <SiteNav />
              <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
                {children}
              </main>
              <SiteFooter />
            </div>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
