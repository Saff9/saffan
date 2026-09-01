import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog-data';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import { getBaseUrl } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'Engineering Blog & Systems Notes',
  description: 'Deep architectural breakdowns of database storage engines (NovaDB C11), Pratt compilers (Breeze), and autonomous AI agent DAGs by Saffan.',
  alternates: {
    canonical: `${getBaseUrl()}/blog`,
  },
  openGraph: {
    title: 'Engineering Blog & Systems Notes — Saffan',
    description: 'Deep architectural breakdowns of database storage engines, compilers, and distributed systems.',
  },
};

export default function BlogIndexPage() {
  return (
    <div className="space-y-12 py-4">

      {/* Header */}
      <div className="space-y-4 pb-8 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white" />
          <p className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
            ENGINEERING PUBLICATIONS
          </p>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Systems &amp; Architecture Notes
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          Technical deep-dives into database storage engines, parser algorithms, POSIX concurrency, and distributed AI execution. Written from real implementations.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="bento-card rounded-3xl p-6 flex flex-col justify-between gap-6 group hover:border-white/30 transition-all"
          >
            <div className="space-y-4">
              {/* Category & Read Time */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bento-subcard text-[10px] font-mono font-bold text-zinc-300">
                  {post.category}
                </span>
                <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              {/* Title & Summary */}
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Read Article CTA */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-500">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:translate-x-0.5 transition-transform"
              >
                <span>Read Deep-Dive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
