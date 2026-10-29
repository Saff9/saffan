/**
 * Site configuration — single source of truth for canonical URL and SEO strings.
 */

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '') ||
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : '') ||
  'https://saffan-hazel.vercel.app';

export const SITE_URL = rawSiteUrl.replace(/\/$/, '');

export const SITE_NAME = 'Saffan';

export const SITE_TITLE = 'Saffan | Web Developer & CS Student';

export const SITE_DESCRIPTION =
  'Computer Science student and full-stack web developer building responsive web applications, fast APIs, and custom AI tools with Next.js, TypeScript, FastAPI, and Express.';
