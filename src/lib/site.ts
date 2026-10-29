/**
 * Site configuration — single source of truth for canonical URL and SEO strings.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://saffan-portfolio.vercel.app';

export const SITE_NAME = 'Saffan';

export const SITE_TITLE = 'Saffan | Web Developer & CS Student';

export const SITE_DESCRIPTION =
  'Computer Science student and full-stack web developer building responsive web applications, fast APIs, and custom AI tools with Next.js, TypeScript, FastAPI, and Express.';
