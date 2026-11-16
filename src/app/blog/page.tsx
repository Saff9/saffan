import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { BlogArticleList } from '@/components/pages/blog-article-list';
import { BLOG_POSTS } from '@/lib/portfolio-data';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Engineering Blog | Next.js, Real-time APIs & AI Agents',
  description:
    'Deep dives on Next.js Server Components, Server-Sent Events vs WebSockets, FastAPI vs Express, and Web Vitals performance optimization by Saffan.',
  keywords: [
    'web engineering blog',
    'Next.js tutorials',
    'Server-Sent Events vs WebSocket',
    'FastAPI vs Express comparison',
    'stop useEffect data fetching',
    'Next.js 98+ Lighthouse',
    'real-time web dev',
    'AI agent architectures',
    'Saffan engineering blog',
  ],
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Engineering Blog | Saffan',
    description: 'Technical notes on web engineering, real-time protocols, and AI agent architectures.',
    url: `${SITE_URL}/blog`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Saffan Engineering Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Blog | Saffan',
    description: 'Technical notes on web engineering, real-time protocols, and AI agent architectures.',
    images: [`${SITE_URL}/twitter-image`],
  },
};

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
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
          eyebrow="Blog"
          title="Engineering Notes"
          subtitle="Reflections on web architecture, real-time event streaming, and building high-performance software. Written from first-hand production experience."
        />

        <section className="section px-6 sm:px-10" aria-label="Blog posts">
          <Reveal>
            <BlogArticleList posts={posts} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 border-t pt-8 text-center" style={{ borderColor: 'var(--ink-10)' }}>
              <p className="caption text-ink-soft">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} published · all examples tested in production
              </p>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
