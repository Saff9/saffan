'use client';

import { useState } from 'react';
import { Mail, Send, Check, Copy, ArrowRight, Github } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';
import TechIcon from './TechIcon';

const SOCIALS = [
  {
    name: 'GitHub',
    handle: '@Saff9',
    href: PERSONAL_INFO.github,
    icon: 'GitHub',
  },
  {
    name: 'Discord',
    handle: 'saffan',
    href: PERSONAL_INFO.discord,
    icon: 'Discord',
  },
  {
    name: 'Telegram',
    handle: '@saffanme',
    href: PERSONAL_INFO.telegram,
    icon: 'Telegram',
  },
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PERSONAL_INFO.email}?subject=Engineering%20Inquiry%20from%20${encodeURIComponent(
      form.name
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div className="space-y-8">
      {/* ── Section Header ───────────────────────────────────── */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.04] text-xs font-mono text-zinc-300">
          <span className="status-dot" />
          <span>Status: Actively Reviewing Engineering Inquiries</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Let&apos;s Build Systems Together.
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
          Looking for a systems builder who takes extreme ownership? Reach out for full-time roles,
          distributed systems consulting, or architectural advisory.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* ── Left Column: Direct Connect & Socials ──────────── */}
        <div className="space-y-4">
          {/* Direct Email Card */}
          <div className="p-6 rounded-3xl bento-card space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                Direct Email Channel
              </span>
              <span className="text-[11px] font-mono text-zinc-400">≤ 24h Response SLA</span>
            </div>

            <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bento-subcard font-mono text-xs sm:text-sm">
              <span className="text-white select-all truncate font-semibold">{PERSONAL_INFO.email}</span>
              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs transition-all shrink-0 shadow-sm cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5 text-black" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Engineering%20Opportunity`}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl bento-subcard text-white text-xs font-bold hover:bg-white/[0.08] transition-all"
            >
              <span>Open in Default Mail Client</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Social Profiles Grid (GitHub + Discord + Telegram) */}
          <div className="space-y-3">
            <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-500 px-1">
              Direct Community &amp; Code
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bento-card flex flex-col items-center justify-center gap-2 text-center transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <TechIcon name={s.icon} size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-zinc-300 transition-colors">
                      {s.name}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500 truncate mt-0.5">
                      {s.handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Column: Interactive Contact Form ─────────── */}
        <div className="p-6 sm:p-8 rounded-3xl bento-card space-y-5">
          <div>
            <h3 className="text-lg font-bold text-white">Send Direct Message</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Fills a direct inquiry to start an architectural discussion.
            </p>
          </div>

          {sent ? (
            <div className="p-6 rounded-2xl bento-subcard text-center space-y-3 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-white/[0.1] border border-white/[0.2] text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-sm font-bold text-white">Email Client Dispatched</h4>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Your email client was opened with your pre-filled inquiry. Saffan will respond within 24 hours.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-black hover:bg-zinc-200 transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 font-mono">Your Name / Organization</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Engineering Lead / Company"
                  className="w-full px-4 py-3 rounded-2xl bento-subcard text-white text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 font-mono">Your Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="contact@domain.com"
                  className="w-full px-4 py-3 rounded-2xl bento-subcard text-white text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 font-mono">Engineering Role or System Scope</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your systems requirements, technical stack, or project goals..."
                  className="w-full px-4 py-3 rounded-2xl bento-subcard text-white text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs shadow-lg transition-all hover:scale-[1.01] cursor-pointer"
              >
                <Send className="w-4 h-4 text-black" />
                <span>Send Direct Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
