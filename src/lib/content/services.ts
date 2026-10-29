// ============================================================
// Services — client engagement packages with transparent pricing
// ============================================================

import type { ServicePackage } from './types';

export const SERVICES_INTRO = {
  eyebrow: 'Services & Pricing',
  title: 'Work With Me',
  subtitle:
    'From responsive, high-converting landing pages to full-stack web applications and custom AI workflows. Transparent deliverables, fixed pricing, and direct communication.',
};

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'landing',
    name: 'Landing Page',
    price: '₹9,999 / $120',
    tagline: 'Single page, built for conversions.',
    blurb: 'Perfect for launching a product, showcasing a personal portfolio, or promoting a focused offer with instant page speed.',
    features: [
      '1 custom-designed responsive page',
      'Mobile, tablet, and desktop perfection',
      '95+ Lighthouse speed and SEO score',
      'Deployment to Vercel with custom domain',
      'Contact form integration',
      '2 rounds of revisions included',
    ],
    highlighted: false,
    cta: 'start with landing',
  },
  {
    id: 'multi-page',
    name: 'Complete Website',
    price: '₹14,999 / $180',
    tagline: 'Full multi-page web presence.',
    blurb: 'For businesses, agencies, and creators needing a complete, credible web presence with top-tier search visibility and analytics.',
    features: [
      'Up to 5 custom responsive pages',
      'Complete technical SEO and OpenGraph setup',
      'Interactive contact forms and email notifications',
      'Performance-tuned Next.js Server Components',
      'Analytics and event tracking integration',
      '14 days post-launch support and bug fixes',
    ],
    highlighted: true,
    cta: 'build full website',
  },
  {
    id: 'full-custom',
    name: 'Custom Web App & AI',
    price: '₹24,999 / $300',
    tagline: 'Full-stack application or AI tool.',
    blurb: 'For products requiring backend databases, customer dashboards, real-time data flows, or autonomous LLM tool-calling pipelines.',
    features: [
      'Custom UI design and component library',
      'Full-stack Next.js with FastAPI or Express',
      'PostgreSQL database and Redis caching',
      'Authentication and user account management',
      'Custom API endpoints and background tasks',
      'AI model function calling and streaming transport',
      '30 days post-launch support and bug-fix warranty',
    ],
    highlighted: false,
    cta: 'scope custom app',
  },
  {
    id: 'custom',
    name: 'Custom Partnership',
    price: "Let's discuss",
    tagline: 'Tailored to your roadmap.',
    blurb: 'Have an ongoing contract, refactoring needs, or an ambitious technical vision? Let us define the milestones together.',
    features: [
      'Flexible fixed-milestone or weekly scope',
      'Direct updates via Telegram or Discord',
      'Fast turnaround with no agency bureaucracy',
      'Transparent code reviews and clean Git commits',
    ],
    highlighted: false,
    cta: 'discuss your project',
  },
];
