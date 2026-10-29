import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Dynamic robots.txt — served at /robots.txt by Next.js metadata route.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
