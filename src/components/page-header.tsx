'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Reveal } from '@/components/reveal';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  showBack = false,
  backHref,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="px-6 pb-10 pt-16 sm:px-10 sm:pt-20">
      {showBack && (
        <div className="mb-7">
          {backHref ? (
            <Link
              href={backHref}
              aria-label="Back to listing"
              className="inline-flex items-center gap-1.5 sans text-sm text-ink-soft transition-colors hover:text-[var(--accent-deep)]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>back</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="inline-flex items-center gap-1.5 sans text-sm text-ink-soft transition-colors hover:text-[var(--accent-deep)]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>back</span>
            </button>
          )}
        </div>
      )}
      <Reveal>
        <p className="label-accent">{eyebrow}</p>
        <h1 className="hand mt-2 text-4xl leading-[0.98] text-ink sm:text-5xl md:text-6xl font-normal">
          {title}
        </h1>
        {subtitle && (
          <p className="sans mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {subtitle}
          </p>
        )}
      </Reveal>
    </header>
  );
}
