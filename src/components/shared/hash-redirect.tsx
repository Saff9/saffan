'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * HashRedirect — backward compatibility helper.
 * If a visitor lands on a legacy hash URL (e.g. `/#/work`, `/#/blog/stop-useeffect-fetching`),
 * this transparently redirects them to the proper Next.js App Router canonical route.
 */
export function HashRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#/')) return;

    const match = hash.match(/^#\/(work-detail|work|blog-detail|blog|about|services|stack|connect)(?:\/(.+))?$/);
    if (match) {
      const view = match[1];
      const slug = match[2];

      if (view === 'work-detail' && slug) {
        router.replace(`/work/${slug}`);
      } else if (view === 'work' && slug) {
        router.replace(`/work/${slug}`);
      } else if (view === 'work') {
        router.replace('/work');
      } else if (view === 'blog-detail' && slug) {
        router.replace(`/blog/${slug}`);
      } else if (view === 'blog' && slug) {
        router.replace(`/blog/${slug}`);
      } else if (view === 'blog') {
        router.replace('/blog');
      } else if (view === 'about') {
        router.replace('/about');
      } else if (view === 'services') {
        router.replace('/services');
      } else if (view === 'stack') {
        router.replace('/stack');
      } else if (view === 'connect') {
        router.replace('/connect');
      }
    }
  }, [router]);

  return null;
}
