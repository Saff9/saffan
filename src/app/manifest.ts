import type { MetadataRoute } from 'next';
import { SITE_DESCRIPTION } from '@/lib/site';

// Web app manifest — served at /manifest.webmanifest
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Saffan | Web Developer & CS Student',
    short_name: 'Saffan',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a1a',
    theme_color: '#df5e4b',
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
    categories: ['developer', 'portfolio', 'web-development', 'technology'],
  };
}
