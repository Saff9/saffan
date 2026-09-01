import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Clock, Calendar, Tag, Share2, ArrowRight } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '@/lib/blog-data';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import { getBaseUrl } from '@/lib/seo-utils';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} — Saffan`,
    description: post.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [PERSONAL_INFO.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const baseUrl = getBaseUrl();
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.summary,
    author: {
      '@type': 'Person',
      name: PERSONAL_INFO.name,
      url: baseUrl,
    },
    datePublished: post.publishedAt,
    keywords: post.tags.join(', '),
    url: `${baseUrl}/blog/${post.slug}`,
  };

  return (
    <article className="max-w-4xl mx-auto py-6 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Back Link */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Publications</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-6 pb-8 border-b border-white/[0.08]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 rounded-full bento-subcard text-xs font-mono font-bold text-zinc-300">
            {post.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-mono">
          {post.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400"
            >
              #{t}
            </span>
          ))}
        </div>
      </header>

      {/* Article Body */}
      <div className="bento-card rounded-3xl p-8 sm:p-12 space-y-6 text-zinc-200 text-sm sm:text-base leading-relaxed">
        {post.content.split('\n\n').map((block, idx) => {
          if (block.startsWith('## ')) {
            return (
              <h2 key={idx} className="text-2xl font-bold text-white tracking-tight pt-4 first:pt-0">
                {block.replace('## ', '')}
              </h2>
            );
          }
          if (block.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-lg font-bold text-white tracking-tight pt-2">
                {block.replace('### ', '')}
              </h3>
            );
          }
          if (block.startsWith('```')) {
            const lines = block.split('\n');
            const lang = lines[0].replace('```', '') || 'code';
            const code = lines.slice(1, -1).join('\n');
            return (
              <div key={idx} className="rounded-2xl bento-subcard overflow-hidden my-4 border border-white/[0.08]">
                <div className="px-4 py-2 bg-black/60 border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>{lang}</span>
                  <span>raw implementation</span>
                </div>
                <pre className="p-4 font-mono text-xs leading-relaxed text-zinc-200 overflow-x-auto">
                  <code>{code}</code>
                </pre>
              </div>
            );
          }
          if (block.startsWith('- ')) {
            const items = block.split('\n- ');
            return (
              <ul key={idx} className="space-y-2 list-disc list-inside text-zinc-300">
                {items.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed">
                    {item.replace(/^- /, '')}
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="text-zinc-300 leading-relaxed">
              {block}
            </p>
          );
        })}
      </div>

      {/* Author Footer Card */}
      <div className="bento-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-white">Written by {PERSONAL_INFO.name}</h4>
          <p className="text-xs font-mono text-zinc-400 max-w-md">
            Self-taught systems architect. Exploring low-level database engines, compilers, and distributed protocols.
          </p>
        </div>

        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs shrink-0 transition-all hover:scale-105"
        >
          Discuss Engineering
        </Link>
      </div>

    </article>
  );
}
