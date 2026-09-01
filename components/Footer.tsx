'use client';

import Link from 'next/link';
import { ArrowUp, Mail, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import TechIcon from './TechIcon';

const NAV_LINKS = [
  { label: 'Overview', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Stack', href: '/stack' },
  { label: 'Journey', href: '/journey' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-white/[0.08] bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 space-y-16">

        {/* ── Top Modern Statement: SAFFAN nowadays ───────────── */}
        <div className="pb-12 border-b border-white/[0.08] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                SAFFAN · NOWADAYS
              </span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
                SAFFAN
              </h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed font-mono">
              Currently engineering zero-dependency database internals in C11, exploring low-level memory allocators, Pratt compilers, and distributed systems architecture.
            </p>
          </div>

          {/* Clean Status & Availability Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bento-subcard text-xs font-mono text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>Available Worldwide (Remote / Relocation)</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 px-3.5 py-1.5 rounded-full bento-subcard">
              <span className="status-dot" />
              <span>Available for Hire</span>
            </div>
          </div>
        </div>

        {/* ── Main Navigation Grid ────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-black flex items-center justify-center shadow-sm group-hover:scale-105 transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/saffan-logo.jpg"
                  alt="Saffan Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-sm text-white group-hover:text-zinc-300 transition-colors">
                {PERSONAL_INFO.fullName}
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Self-taught systems architect. Building from first principles without black boxes or unnecessary abstractions.
            </p>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-1.5 text-xs text-white hover:underline font-mono transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
              Site Navigation
            </p>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Verified Profiles */}
          <div className="space-y-4">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
              Verified Channels
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <TechIcon name="GitHub" size={14} />
                <span>github.com/Saff9</span>
              </a>

              <a
                href={PERSONAL_INFO.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <TechIcon name="Discord" size={14} />
                <span>discord.gg/XWJ25UShKT</span>
              </a>

              <a
                href={PERSONAL_INFO.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <TechIcon name="Telegram" size={14} />
                <span>t.me/saffanme</span>
              </a>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-white transition-colors pt-1 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
          </div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────── */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500 font-mono">
          <p>
            © {new Date().getFullYear()} Saffan. All rights reserved.
          </p>
          <p>
            Zero AI Flop · 100% Real Systems &amp; Compilers
          </p>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="status-dot" />
            <span>100/100 Core Web Vitals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
