import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import {
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  getBaseUrl,
  generatePersonSchema,
  generateProfilePageSchema,
} from '@/lib/seo-utils';
import { PERSONAL_INFO } from '@/lib/portfolio-data';

const baseUrl = getBaseUrl();
const defaultOgImage = `${baseUrl}/api/og`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: PERSONAL_INFO.name, url: baseUrl }],
  creator: PERSONAL_INFO.name,
  keywords: [
    'Saffan',
    'Self-Taught Systems Architect',
    'NovaDB',
    'C11 SQL Engine',
    'Breeze Programming Language',
    'ASTRAMIND AI',
    'Distributed Systems Engineer',
    'Go Golang Engineer',
    'Rust Developer',
    'TypeScript Architect',
    'Next.js 14 Developer',
    'FastAPI Microservices',
    'PostgreSQL Performance',
    'High Concurrency Systems',
  ],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'profile',
    firstName: PERSONAL_INFO.name,
    username: 'saffan',
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
    description: DEFAULT_DESCRIPTION,
    url: baseUrl,
    siteName: SITE_NAME,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
    description: DEFAULT_DESCRIPTION,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personSchema = generatePersonSchema();
  const profilePageSchema = generateProfilePageSchema();

  return (
    <html
      lang="en"
      className="dark scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#000000] text-zinc-200 selection:bg-white selection:text-black">
        <ScrollProgressBar />
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
