import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { CodeBlock } from '@/components/shared/code-block';
import { CopyButton } from '@/components/shared/copy-button';
import { ReadingProgressBar } from '@/components/pages/reading-progress-bar';
import { BLOG_POSTS, PERSONAL_INFO, type BlogBlock } from '@/lib/portfolio-data';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import { ArrowRight, ArrowLeft, Clock, Calendar, Send, Twitter } from 'lucide-react';
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
    title: `${post.title} | Saffan's Engineering Notes`,
    description: post.dek,
    keywords: [...post.tags, 'software engineering', 'web development', 'Next.js architecture'],
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

  const articleUrl = `${SITE_URL}/blog/${post.slug}`;

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
      '@id': articleUrl,
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
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <ReadingProgressBar />
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
          eyebrow="Technical Essay"
          title={post.title}
          subtitle={post.dek}
          showBack
          backHref="/blog"
        />

        {/* ── Metadata strip ─────────────────────────────────────────── */}
        <div className="px-6 pb-4 sm:px-10">
          <Reveal>
            <div
              className="flex flex-wrap items-center justify-between gap-4 border-y py-3.5"
              style={{ borderColor: 'var(--ink-12)' }}
            >
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-ink-soft">
                <span className="label font-mono flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-accent" />
                  {formatDate(post.date)}
                </span>
                <span className="text-ink-soft/40" aria-hidden="true">·</span>
                <span className="label flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                  {post.readTime} read
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {post.tags.map((t) => (
                  <span key={t} className="chip text-[11px]">
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
              <Reveal key={i} delay={Math.min(i * 0.02, 0.14)} y={8}>
                <BodyBlock block={block} />
              </Reveal>
            ))}
          </div>
        </article>

        {/* ── Article Footer: Share & Author Box ───────────────────── */}
        <section className="px-6 pb-12 sm:px-10">
          <div className="mx-auto max-w-2xl">
            {/* Share bar */}
            <Reveal>
              <div
                className="flex flex-wrap items-center justify-between gap-4 border-t pt-6 pb-8"
                style={{ borderColor: 'var(--ink-12)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="label">Share article:</span>
                  <CopyButton
                    text={articleUrl}
                    label="copy link"
                    copiedLabel="link copied!"
                    className="btn-outline text-xs py-1.5 px-3"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-xs inline-flex items-center gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" /> Telegram
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${post.title} by Saffan`)}&url=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-xs inline-flex items-center gap-1.5"
                  >
                    <Twitter className="h-3.5 w-3.5" /> Share
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Author Box */}
            <Reveal delay={0.05}>
              <div
                className="paper-soft relative rounded-2xl border p-6 sm:p-8 transition-all hover:border-[var(--accent)]"
                style={{ borderColor: 'var(--ink-14)' }}
              >
                <span
                  className="tape hidden sm:block"
                  style={{ top: '-12px', left: '24px' }}
                  aria-hidden="true"
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                  <div>
                    <span className="label-accent">Written by</span>
                    <h3 className="hand mt-1 text-2xl sm:text-3xl text-ink font-semibold">{PERSONAL_INFO.name}</h3>
                    <p className="prose text-sm text-ink-soft mt-1 leading-relaxed max-w-md">
                      Computer Science student &amp; full-stack engineer. Building scalable web applications, real-time event systems, and autonomous AI agents.
                    </p>
                  </div>
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <Link href="/connect" className="btn-ink text-xs whitespace-nowrap text-center">
                      Hire / Inquire <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                    <Link href="/work" className="btn-outline text-xs whitespace-nowrap text-center">
                      Explore Projects
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── More posts ─────────────────────────────────────────────── */}
        <section className="section px-6 sm:px-10" aria-label="More posts">
          <Reveal>
            <div className="flex items-center justify-between mb-4">
              <p className="label-accent">Continue reading</p>
              <Link href="/blog" className="text-xs text-accent hover:underline inline-flex items-center gap-1">
                All articles <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="border-t" style={{ borderColor: 'rgba(44,44,44,0.12)' }}>
              {morePosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group grid w-full grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b py-5 text-left transition-colors hover:bg-[rgba(223,94,75,0.04)] px-2 rounded-lg"
                  style={{ borderColor: 'rgba(44,44,44,0.12)' }}
                >
                  <span className="col-span-12 label sm:col-span-2 text-ink-soft">
                    {formatDate(p.date)}
                  </span>
                  <div className="col-span-12 sm:col-span-9">
                    <h3 className="sans text-lg font-semibold text-ink transition-colors group-hover:text-accent sm:text-xl">
                      {p.title}
                    </h3>
                    <p className="prose mt-1 text-sm line-clamp-1">{p.dek}</p>
                  </div>
                  <span className="col-span-12 flex items-center justify-end sm:col-span-1">
                    <ArrowRight
                      className="h-4 w-4 text-ink-soft transition-all group-hover:translate-x-1 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/blog" className="btn-outline text-xs">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to blog archive
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
      return (
        <p className="prose mt-6 first:mt-0 text-base sm:text-lg leading-relaxed text-ink/90">
          {block.text}
        </p>
      );

    case 'heading':
      return (
        <h2 className="sans mt-12 mb-3 text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
          {block.text}
        </h2>
      );

    case 'quote':
      return (
        <blockquote
          className="paper-soft my-8 rounded-r-xl border-l-4 py-4 px-6 text-xl sm:text-2xl leading-relaxed text-ink font-medium shadow-xs"
          style={{ borderColor: 'var(--accent)' }}
        >
          <span className="label-accent block mb-1">Key Takeaway</span>
          <p className="hand text-2xl sm:text-3xl leading-snug">{block.text}</p>
        </blockquote>
      );

    case 'code':
      return (
        <div className="mt-6 mb-4">
          <CodeBlock code={block.code ?? ''} lang={block.lang} dimComments />
        </div>
      );

    case 'list':
      return (
        <ul className="prose mt-6 space-y-3 pl-1">
          {(block.items ?? []).map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-2.5 h-1.5 w-1.5 rounded-full shrink-0"
                style={{ background: 'var(--accent)' }}
                aria-hidden="true"
              />
              <span className="leading-relaxed text-sm sm:text-base text-ink/90">{item}</span>
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
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}
