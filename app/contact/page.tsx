import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo-utils';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact & Hire Saffan — Systems Architect',
  description:
    'Get in touch with Saffan for high-impact software engineering roles, systems consulting, and technical architecture contracts.',
  path: '/contact',
});

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  return (
    <div className="space-y-12 sm:space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Breadcrumbs ─────────────────────────────────────── */}
      <nav className="flex items-center gap-2 pt-4 sm:pt-6">
        <Link href="/" className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors">
          Home
        </Link>
        <span className="text-zinc-600 font-mono text-xs">/</span>
        <span className="text-xs font-mono text-indigo-400 font-medium">Contact</span>
      </nav>

      {/* ── Main Contact Section ────────────────────────────── */}
      <ContactSection />
    </div>
  );
}
