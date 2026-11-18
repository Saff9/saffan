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

/** Primary SERP title — keep under ~60 chars, brand first. */
export const SITE_TITLE = 'Saffan — Web Developer, Work & Services';

/** Primary SERP description — brand + what you offer, no host/platform noise. */
export const SITE_DESCRIPTION =
  'Saffan is a web developer and CS student. Explore Saffan Work (projects & case studies) and Saffan Services — fast Next.js sites, full-stack apps, and custom AI tools.';
