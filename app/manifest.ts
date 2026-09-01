import { MetadataRoute } from 'next';
import { PERSONAL_INFO } from '@/lib/portfolio-data';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
    short_name: `${PERSONAL_INFO.name}.dev`,
    description: PERSONAL_INFO.shortBio,
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
  };
}
