import Link from 'next/link';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import { NAV_LINKS } from '@/lib/nav';
import { ScrollToTop } from '@/components/shared/scroll-to-top';
import { Github, Send, MessageCircle, Mail } from 'lucide-react';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="px-6 py-12 sm:px-10 mt-auto bg-[var(--paper)]"
      style={{ borderTop: '1px solid var(--ink-10)' }}
    >
      <div className="grid gap-10 md:grid-cols-12 pb-8 border-b border-[var(--ink-08)]">
        {/* Brand identity */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7"
              aria-hidden="true"
            />
            <span className="hand text-2xl text-ink font-medium">{PERSONAL_INFO.name}</span>
          </div>
          <p className="sans text-sm text-ink-soft max-w-sm leading-relaxed mt-1">
            Computer Science student and full-stack web developer. Building clean web apps, resilient backend APIs, and autonomous AI tools.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-ink-soft hover:text-accent transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL_INFO.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="text-ink-soft hover:text-accent transition-colors"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL_INFO.discord}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="text-ink-soft hover:text-accent transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Email"
              className="text-ink-soft hover:text-accent transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-4">
          <p className="label text-xs uppercase tracking-wider mb-3">Navigation</p>
          <nav className="grid grid-cols-2 gap-2" aria-label="Footer navigation">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="sans text-sm text-ink-soft transition-colors hover:text-accent py-0.5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Direct Contact info */}
        <div className="md:col-span-3 flex flex-col justify-between">
          <div>
            <p className="label text-xs uppercase tracking-wider mb-3">Direct Contact</p>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="sans text-sm font-medium text-ink hover:text-accent transition-colors break-all"
            >
              {PERSONAL_INFO.email}
            </a>
            <p className="sans text-xs text-ink-soft mt-1.5">
              Replies usually within 24 hours.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
        <p className="sans text-xs text-ink-soft">
          © {currentYear} Saffan. Built with Next.js Server Components.
        </p>
        <ScrollToTop />
      </div>
    </footer>
  );
}
