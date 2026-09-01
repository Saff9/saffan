'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import TechIcon from './TechIcon';
import CommandMenu from './CommandMenu';

const NAV_ITEMS = [
  { label: 'Overview', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Stack', href: '/stack' },
  { label: 'Journey', href: '/journey' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandMenuOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? 'pt-3 px-3 sm:px-6' : 'pt-0 px-0'
        }`}
      >
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'max-w-4xl mx-auto rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.14] shadow-2xl shadow-black/90 px-4 sm:px-6 h-14'
              : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-transparent h-16'
          } flex items-center justify-between gap-4`}
        >

          {/* ── Brand Logo ────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-black flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/saffan-logo.jpg"
                alt="Saffan Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-sm text-white tracking-tight group-hover:text-zinc-300 transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                Systems Architect
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ─────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full transition-all ${
                    active
                      ? 'bg-white text-black font-extrabold shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Actions ─────────────────────────────────── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsCommandMenuOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 text-xs transition-all cursor-pointer"
              title="Search anything (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline text-zinc-400 font-medium">Search</span>
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* GitHub */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
              title="GitHub Profile"
            >
              <TechIcon name="GitHub" size={14} />
            </a>

            {/* Discord */}
            <a
              href={PERSONAL_INFO.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
              title="Discord Community"
            >
              <TechIcon name="Discord" size={14} />
            </a>

            {/* Telegram */}
            <a
              href={PERSONAL_INFO.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
              title="Telegram"
            >
              <TechIcon name="Telegram" size={14} />
            </a>

            {/* CTA */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black font-extrabold text-xs shadow-md transition-all hover:scale-105"
            >
              <span>Hire Me</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu Drawer ─────────────────────────────── */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 mx-3 rounded-3xl border border-white/[0.1] bg-[#000000]/95 backdrop-blur-2xl p-4 space-y-1 animate-fade-in shadow-2xl">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-white text-black font-bold'
                      : 'text-zinc-300 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCommandMenuOpen(true);
                }}
                className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white"
              >
                <Search className="w-4 h-4 text-white" />
                <span>Search (⌘K)</span>
              </button>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-extrabold text-xs"
              >
                <span>Hire Me</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>

      <CommandMenu isOpen={isCommandMenuOpen} onClose={() => setIsCommandMenuOpen(false)} />
    </>
  );
}
