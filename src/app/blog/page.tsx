import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { BLOG_POSTS } from '@/lib/portfolio-data';
import { SITE_URL } from '@/lib/site';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Deep dives on Next.js Server Components, Server-Sent Events vs WebSockets, FastAPI vs Express, and Web Vitals performance optimization.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog | Saffan',
    description: 'Technical notes on web engineering, real-time protocols, and AI agent architectures.',
    url: `${SITE_URL}/blog`,
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
          subtitle="Practical reflections on web development, distributed streaming, and building software that lasts. Zero fluff."
        />

      <section className="section px-6 sm:px-10" aria-label="Blog posts">
        <div className="border-t" style={{ borderColor: 'rgba(44,44,44,0.12)' }}>
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.04}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid w-full grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b py-6 text-left transition-colors hover:bg-[rgba(223,94,75,0.04)]"
                style={{ borderColor: 'rgba(44,44,44,0.12)' }}
              >
                {/* Date column */}
                <span className="col-span-12 label sm:col-span-2">
                  {formatDate(post.date)}
                </span>

                <div className="col-span-12 sm:col-span-7">
                  <h2 className="sans text-xl font-semibold text-ink transition-colors group-hover:text-accent sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="prose mt-1.5">{post.dek}</p>

                  {/* Tags + read time row */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {post.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                    <span className="label ml-1">{post.readTime} read</span>
                  </div>
                </div>

                {/* Read action */}
                <span className="col-span-12 flex items-center justify-end sm:col-span-3">
                  <span className="sans text-sm text-ink-soft transition-colors group-hover:text-accent font-medium">
                    read post
                  </span>
                  <ArrowRight
                    className="ml-2 h-4 w-4 text-ink-soft transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="caption mt-8 text-center">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} · written from first-hand technical experience
          </p>
        </Reveal>
      </section>
    </div>
    </>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const months = [
    'jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
  ];
  return `${d.getUTCFullYear()} · ${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
}
