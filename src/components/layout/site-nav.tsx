'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/nav';
import { ThemeToggle } from '@/components/shared/theme-toggle';

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handle escape key and click outside
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      const nav = (e.target as HTMLElement | null)?.closest?.('#primary-nav');
      if (!nav) setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const timer = window.setTimeout(() => {
      document.addEventListener('click', onClick);
    }, 0);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
      window.clearTimeout(timer);
    };
  }, [mobileOpen]);

  // Close on desktop resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      id="primary-nav"
      className={`sticky top-0 z-40 flex items-center justify-between gap-4 px-5 py-4 transition-colors sm:px-10 ${
        scrolled ? 'bg-[var(--paper)]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      style={{ borderBottom: '1px solid rgba(44,44,44,0.08)' }}
    >
      {/* Brand logo & home link */}
      <Link
        href="/"
        aria-label="Saffan — Home"
        className="flex items-center gap-2.5 transition-transform active:scale-95"
      >
        <img
          src="/logo.svg"
          alt="Saffan logo"
          width={30}
          height={30}
          className="h-7 w-7 sm:h-8 sm:w-8"
        />
        <span className="hand text-2xl text-ink sm:text-3xl font-medium tracking-tight">
          Saffan
        </span>
      </Link>

      {/* Desktop Navigation Links — larger, tactile, well spaced */}
      <nav aria-label="Main navigation" className="hidden flex-wrap items-center gap-6 sm:flex lg:gap-8">
        {NAV_LINKS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`sans text-base font-semibold px-1 py-1 transition-all hover:text-[var(--accent-deep)] ${
                active
                  ? 'text-[var(--accent)] border-b-2 border-[var(--accent)] font-bold'
                  : 'text-ink'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right Action: Theme Toggle + Desktop Hire CTA + Mobile Menu Button */}
      <div className="flex items-center gap-2.5">
        <ThemeToggle />

        <Link
          href="/connect"
          className="btn-ink hidden text-xs sm:inline-flex"
          style={{ padding: '0.45rem 1rem' }}
        >
          hire me
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-[rgba(223,94,75,0.08)] hover:text-accent sm:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-menu"
            className="absolute left-0 right-0 top-full z-40 flex flex-col gap-1 overflow-hidden px-5 py-4 sm:hidden"
            style={{
              background: 'var(--paper)',
              borderBottom: '1px solid rgba(44,44,44,0.12)',
              boxShadow: '0 12px 24px -12px rgba(44,44,44,0.2)',
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {NAV_LINKS.map((item, i) => {
              const active = isActive(item.href);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.18 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`sans block rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-[rgba(223,94,75,0.06)] hover:text-[var(--accent-deep)] ${
                      active ? 'text-[var(--accent-deep)] font-semibold bg-[rgba(223,94,75,0.08)]' : 'text-ink-soft'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
            <div className="pt-3 flex gap-2">
              <Link
                href="/connect"
                onClick={() => setMobileOpen(false)}
                className="btn-ink flex-1 justify-center text-center text-xs"
              >
                hire me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
