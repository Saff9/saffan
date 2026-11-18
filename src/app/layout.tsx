import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/site';
import { PERSONAL_INFO } from '@/lib/content/personal';
import { SiteNav } from '@/components/layout/site-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { HashRedirect } from '@/components/shared/hash-redirect';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
    { media: '(prefers-color-scheme: light)', color: '#fbf8f0' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Saffan',
    'Saffan work',
    'Saffan services',
    'Saffan portfolio',
    'Saffan web developer',
    'Saffan software engineer',
    'Saffan Next.js developer',
    'hire Saffan',
    'Saffan freelance developer',
    'web developer',
    'full stack developer',
    'Next.js developer',
    'React developer',
    'AI agent developer',
    'freelance web developer',
    'hire Next.js developer',
    'custom web application development',
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
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
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
  alternateName: ['Saffan Work', 'Saffan Services', 'Saffan Developer'],
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
    'FastAPI',
    'Express',
    'AI Agent Development',
    'Full Stack Development',
  ],
  description: PERSONAL_INFO.bio,
  areaServed: 'Worldwide',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: ['Saffan Work', 'Saffan Services', 'Saffan Portfolio'],
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'en',
  publisher: { '@type': 'Person', name: PERSONAL_INFO.name, url: SITE_URL },
  author: { '@type': 'Person', name: PERSONAL_INFO.name, url: SITE_URL },
};

const videoSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Saffan — Web Development & AI Agents Portfolio Reel',
  description:
    'Showcase of Saffan Work: modern web apps, scalable backends, and AI workflows by Saffan.',
  thumbnailUrl: [`${SITE_URL}/opengraph-image`, `${SITE_URL}/twitter-image`],
  uploadDate: '2026-01-01T00:00:00Z',
  contentUrl: `${SITE_URL}/my-site-video.mp4`,
  embedUrl: SITE_URL,
  publisher: {
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    url: SITE_URL,
  },
  duration: 'PT30S',
  inLanguage: 'en',
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Saffan Services',
  alternateName: 'Saffan Web Development & AI Engineering',
  url: `${SITE_URL}/services`,
  image: `${SITE_URL}/opengraph-image`,
  priceRange: '$$',
  description:
    'Saffan Services: landing pages, complete websites, full-stack apps, and custom AI agent tools with fixed pricing.',
  areaServed: 'Worldwide',
  provider: {
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    url: SITE_URL,
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Landing Page',
      description: 'Single high-converting page with strong SEO and performance.',
    },
    {
      '@type': 'Offer',
      name: 'Complete Website',
      description: 'Multi-page Next.js site with technical SEO and analytics.',
    },
    {
      '@type': 'Offer',
      name: 'Custom Web App & AI',
      description: 'Full-stack apps and autonomous AI workflows by Saffan.',
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
        <meta name="google-site-verification" content="Q7mAqyFVwG2zeScg2UAuMLlidBEjgjwhvFngytF5_Ko" />
        {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
          <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
        )}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
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
        <SpeedInsights />
      </body>
    </html>
  );
}
