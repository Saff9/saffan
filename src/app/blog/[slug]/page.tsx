import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { CodeBlock } from '@/components/shared/code-block';
import { BLOG_POSTS, type BlogBlock } from '@/lib/portfolio-data';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.dek,
    keywords: [...post.tags, 'software engineering', 'web development'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.dek,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: ['Saffan'],
      tags: post.tags,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.dek,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const morePosts = BLOG_POSTS.filter((p) => p.slug !== post.slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);

  // JSON-LD Schema for BlogPosting / TechArticle
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.dek,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Saffan',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Saffan',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
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
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div>
        <PageHeader
          eyebrow="Blog"
          title={post.title}
          subtitle={post.dek}
          showBack
          backHref="/blog"
        />

        {/* ── Meta strip ─────────────────────────────────────────────── */}
        <div className="px-6 pb-2 sm:px-10">
          <Reveal>
            <div
              className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y py-3"
              style={{ borderColor: 'rgba(44,44,44,0.10)' }}
            >
              <span className="label">{formatDate(post.date)}</span>
              <span className="label" aria-hidden="true">·</span>
              <span className="label">{post.readTime} read</span>
              <span className="label" aria-hidden="true">·</span>
              <div className="flex flex-wrap items-center gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Body ──────────────────────────────────────────────────── */}
        <article className="section px-6 sm:px-10" aria-label={post.title}>
          <div className="mx-auto max-w-2xl">
            {post.body.map((block, i) => (
              <Reveal key={i} delay={Math.min(i * 0.02, 0.16)} y={10}>
                <BodyBlock block={block} />
              </Reveal>
            ))}
          </div>
        </article>

        {/* ── More posts ─────────────────────────────────────────────── */}
        <section className="section px-6 sm:px-10" aria-label="More posts">
          <Reveal>
            <p className="label-accent mb-4">continue reading</p>
            <div className="border-t" style={{ borderColor: 'rgba(44,44,44,0.12)' }}>
              {morePosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group grid w-full grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b py-5 text-left transition-colors hover:bg-[rgba(223,94,75,0.04)]"
                  style={{ borderColor: 'rgba(44,44,44,0.12)' }}
                >
                  <span className="col-span-12 label sm:col-span-2">
                    {formatDate(p.date)}
                  </span>
                  <div className="col-span-12 sm:col-span-9">
                    <h3 className="sans text-lg font-semibold text-ink transition-colors group-hover:text-accent sm:text-xl">
                      {p.title}
                    </h3>
                    <p className="prose mt-1">{p.dek}</p>
                  </div>
                  <span className="col-span-12 flex items-center justify-end sm:col-span-1">
                    <ArrowRight
                      className="h-4 w-4 text-ink-soft transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/blog" className="btn-outline">
                view all posts <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}

function BodyBlock({ block }: { block: BlogBlock }): ReactNode {
  switch (block.type) {
    case 'paragraph':
      return <p className="prose mt-5 first:mt-0 leading-relaxed">{block.text}</p>;

    case 'heading':
      return (
        <h2 className="sans mt-10 mb-2 text-2xl font-semibold text-ink">
          {block.text}
        </h2>
      );

    case 'quote':
      return (
        <blockquote
          className="hand mt-8 border-l-[3px] py-1.5 pl-5 text-2xl leading-snug text-ink font-medium"
          style={{ borderColor: 'var(--accent)' }}
        >
          {block.text}
        </blockquote>
      );

    case 'code':
      return (
        <div className="mt-6">
          <CodeBlock code={block.code ?? ''} lang={block.lang} dimComments />
        </div>
      );

    case 'list':
      return (
        <ul className="prose mt-5 space-y-2.5">
          {(block.items ?? []).map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-2.5 h-1.5 w-1.5 rounded-full shrink-0"
                style={{ background: 'var(--accent)' }}
                aria-hidden="true"
              />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    default:
      return null;
  }
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
