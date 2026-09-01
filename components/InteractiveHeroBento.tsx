'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, MapPin, ArrowRight, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import TechIcon from './TechIcon';

const MARQUEE_TECHS = [
  'C', 'Go', 'Rust', 'TypeScript', 'Python', 'Next.js',
  'PostgreSQL', 'Docker', 'Linux', 'AWS', 'FastAPI',
  'Discord', 'GitHub', 'Telegram', 'Dart', 'TailwindCSS',
];

export default function InteractiveHeroBento() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">

      {/* ── Expansive Full-Width Hero Bento ──────────────────── */}
      <div className="bento-card rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col justify-between gap-10">

        {/* Top Status & Location Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.12] bg-white/[0.04] text-xs font-mono text-zinc-300">
            <span className="status-dot" />
            <span>Available for Systems &amp; Core Engineering</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <MapPin className="w-4 h-4 text-zinc-300" />
            <span>Available Worldwide · Systems Engineering</span>
          </div>
        </div>

        {/* Massive Headline & Bio */}
        <div className="space-y-6 max-w-4xl">
          <p className="text-xs font-mono font-bold text-zinc-400 tracking-widest uppercase">
            Self-Taught Systems Architect · First Principles
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.04] text-white">
            Building systems<br />
            <span className="gradient-text-accent">from the metal up.</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
            I&apos;m <strong className="text-white font-bold">{PERSONAL_INFO.name}</strong> — a self-directed engineer who built{' '}
            <span className="text-white font-semibold underline decoration-white/30 underline-offset-4">NovaDB</span> (an ACID SQL engine in pure C11),{' '}
            <span className="text-white font-semibold underline decoration-white/30 underline-offset-4">Breeze</span> (custom language compiler), and{' '}
            <span className="text-white font-semibold underline decoration-white/30 underline-offset-4">ASTRAMIND</span> (autonomous AI agent platform).
          </p>
        </div>

        {/* Action CTAs & Verified Profiles */}
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs shadow-xl shadow-white/10 transition-all hover:scale-105"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bento-subcard text-zinc-200 text-xs font-semibold hover:text-white transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-zinc-400" />}
              <span>{copied ? 'Copied!' : 'Copy Email'}</span>
            </button>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bento-subcard text-zinc-200 text-xs font-semibold hover:text-white transition-all"
            >
              <TechIcon name="GitHub" size={15} />
              <span>GitHub (@Saff9)</span>
            </a>

            <a
              href={PERSONAL_INFO.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bento-subcard text-zinc-200 text-xs font-semibold hover:text-white transition-all"
            >
              <TechIcon name="Discord" size={15} />
              <span>Discord</span>
            </a>

            <a
              href={PERSONAL_INFO.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bento-subcard text-zinc-200 text-xs font-semibold hover:text-white transition-all"
            >
              <TechIcon name="Telegram" size={15} />
              <span>Telegram (@saffanme)</span>
            </a>
          </div>

          {/* Key Performance Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/[0.08]">
            {PERSONAL_INFO.stats.map((s, i) => (
              <div key={i} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">{s.value}</div>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Marquee of Real Techs ────────────────────────────── */}
      <div className="bento-card rounded-2xl overflow-hidden py-3.5 px-4">
        <div className="animate-marquee flex items-center gap-8">
          {[...MARQUEE_TECHS, ...MARQUEE_TECHS].map((tech, idx) => (
            <span
              key={idx}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors whitespace-nowrap cursor-default"
            >
              <TechIcon name={tech} size={15} />
              <span className="font-mono text-xs font-semibold">{tech}</span>
              <span className="text-zinc-700 ml-2">·</span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
