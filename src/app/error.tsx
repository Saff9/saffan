'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/reveal';
import { RotateCcw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring if configured
    console.error('App error boundary caught error:', error);
  }, [error]);

  return (
    <div>
      <PageHeader
        eyebrow="Unexpected Error"
        title="Something went wrong"
        subtitle="A transient error occurred while rendering this view. You can reload the view or return to the home page."
        showBack
        backHref="/"
      />

      <div className="px-6 pb-20 sm:px-10">
        <Reveal>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="btn-ink cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> try again
            </button>
            <Link href="/" className="btn-outline">
              <Home className="h-4 w-4" aria-hidden="true" /> return home
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
