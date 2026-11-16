'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Search, Clock, BookOpen, Sparkles } from 'lucide-react';
import type { BlogPost } from '@/lib/portfolio-data';

interface BlogArticleListProps {
  posts: BlogPost[];
}

export function BlogArticleList({ posts }: BlogArticleListProps) {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all unique tags across all posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return ['all', ...Array.from(tagSet)];
  }, [posts]);

  // Filter posts based on selected tag and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag =
        selectedTag === 'all' ||
        post.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.dek.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));

      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  // Featured post is the first one if on "all" and no search query
  const featuredPost =
    selectedTag === 'all' && !searchQuery ? filteredPosts[0] : null;
  const archivePosts = featuredPost
    ? filteredPosts.slice(1)
    : filteredPosts;

  return (
    <div className="space-y-10">
      {/* ── Filter Bar & Search Row ────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-5" style={{ borderColor: 'var(--ink-12)' }}>
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {allTags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <motion.button
                key={tag}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'border-[1.5px] border-[var(--accent)] bg-[rgba(223,94,75,0.08)] text-accent shadow-xs font-semibold'
                    : 'border border-[var(--ink-14)] bg-[var(--paper)] text-ink-soft hover:border-[var(--accent)]/50 hover:text-ink'
                }`}
              >
                {tag === 'all' ? 'All Topics' : tag}
              </motion.button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-soft" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes & tags..."
            className="w-full rounded-full border border-[var(--ink-14)] bg-[var(--paper-2)] py-1.5 pl-8 pr-3 text-xs text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-ink-soft hover:text-ink"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Featured Essay (shown when browsing all without active search) ── */}
      {featuredPost && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="label-accent font-semibold tracking-wider text-[11px] uppercase">
              Featured Deep-Dive
            </span>
          </div>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className="paper-soft group relative block rounded-2xl border p-6 sm:p-10 transition-all hover:border-[var(--accent)] hover:shadow-lg"
            style={{ borderColor: 'var(--ink-14)' }}
          >
            <span
              className="tape hidden sm:block"
              style={{ top: '-14px', right: '36px' }}
              aria-hidden="true"
            />

            <div className="flex flex-wrap items-center gap-3 text-xs text-ink-soft mb-3">
              <span className="label font-mono">{formatDate(featuredPost.date)}</span>
              <span aria-hidden="true">·</span>
              <span className="label flex items-center gap-1">
                <Clock className="h-3 w-3" /> {featuredPost.readTime} read
              </span>
            </div>

            <h2 className="hand text-3xl sm:text-4xl lg:text-5xl font-medium text-ink transition-colors group-hover:text-accent leading-[1.05]">
              {featuredPost.title}
            </h2>

            <p className="prose text-base sm:text-lg text-ink-soft mt-3 max-w-2xl leading-relaxed">
              {featuredPost.dek}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-5" style={{ borderColor: 'var(--ink-10)' }}>
              <div className="flex flex-wrap items-center gap-2">
                {featuredPost.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-1.5 sans text-xs font-semibold text-accent transition-transform group-hover:translate-x-1">
                Read full essay <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </motion.div>
      )}

      {/* ── Articles List ─────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="label-accent">
            {selectedTag === 'all' && !searchQuery
              ? 'Archive & Technical Notes'
              : `Found ${filteredPosts.length} ${filteredPosts.length === 1 ? 'article' : 'articles'}`}
          </p>
          <span className="label text-[11px]">
            {filteredPosts.length} total
          </span>
        </div>

        {archivePosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--ink-14)] p-12 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-ink-soft/60" />
            <h3 className="sans mt-3 text-base font-medium text-ink">
              No matching articles found
            </h3>
            <p className="prose mt-1 text-xs text-ink-soft">
              Try selecting a different topic or clearing your search keywords.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedTag('all');
                setSearchQuery('');
              }}
              className="btn-outline text-xs mt-4"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="border-t" style={{ borderColor: 'rgba(44,44,44,0.12)' }}>
            <AnimatePresence mode="popLayout">
              {archivePosts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid w-full grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b py-6 text-left transition-colors hover:bg-[rgba(223,94,75,0.04)] px-2 sm:px-3 rounded-lg"
                    style={{ borderColor: 'rgba(44,44,44,0.12)' }}
                  >
                    {/* Date column */}
                    <span className="col-span-12 label sm:col-span-2 text-ink-soft">
                      {formatDate(post.date)}
                    </span>

                    {/* Content column */}
                    <div className="col-span-12 sm:col-span-7">
                      <h3 className="sans text-lg font-semibold text-ink transition-colors group-hover:text-accent sm:text-xl">
                        {post.title}
                      </h3>
                      <p className="prose mt-1.5 text-sm line-clamp-2 text-ink-soft leading-relaxed">
                        {post.dek}
                      </p>

                      {/* Tags & read time */}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {post.tags.map((t) => (
                          <span key={t} className="chip text-[10px]">
                            {t}
                          </span>
                        ))}
                        <span className="label ml-1 text-[10px] flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Action column */}
                    <span className="col-span-12 flex items-center justify-end sm:col-span-3 pt-2 sm:pt-0">
                      <span className="sans text-xs text-ink-soft transition-colors group-hover:text-accent font-medium">
                        Read post
                      </span>
                      <ArrowRight
                        className="ml-1.5 h-3.5 w-3.5 text-ink-soft transition-all group-hover:translate-x-1 group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
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
