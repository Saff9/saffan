import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <title>Page Not Found | Saffan</title>
      <meta name="robots" content="noindex, nofollow" />
      <div>
        <PageHeader
        eyebrow="404 Error"
        title="Page Not Found"
        subtitle="The page or article you are looking for does not exist or may have been relocated."
        showBack
        backHref="/"
      />

      <div className="px-6 pb-20 sm:px-10">
        <Reveal>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="btn-ink">
              <Home className="h-4 w-4" aria-hidden="true" /> return to home
            </Link>
            <Link href="/work" className="btn-outline">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> view my work
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
    </>
  );
}
