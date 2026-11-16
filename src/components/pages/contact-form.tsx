'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  Check,
  Loader2,
  Clock,
} from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';

const SERVICE_OPTIONS = [
  'Full Website & App',
  'Landing Page',
  'AI Agent Workflow',
  'Backend / FastAPI',
  'Codebase Audit & Speed',
  'Custom Consulting',
];

const BUDGET_OPTIONS = [
  '< $150 / ₹10,000',
  '$150 – $350 / ₹12k–₹25k',
  '$350 – $750 / ₹25k–₹60k',
  '$750+ / ₹60,000+',
  'Flexible / Open',
];

const SCOPE_TAGS = [
  'Need 98+ Lighthouse / SEO',
  'Figma designs ready',
  'Urgent timeline (< 2 weeks)',
  'AI agent / LLM integration',
  'Database & Auth included',
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full Website & App',
    budget: '$150 – $350 / ₹12k–₹25k',
    message: '',
    website_hp: '',
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const compiledMessage = selectedTags.length > 0
      ? `${formData.message}\n\n[Project Highlights: ${selectedTags.join(', ')}]`
      : formData.message;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: compiledMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setStatus('success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setErrorMessage(msg);
      setStatus('error');
    }
  };

  const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${formData.service} from ${formData.name || 'Client'}`,
  )}&body=${encodeURIComponent(
    `Hi Saffan,\n\nName: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\nBudget: ${formData.budget}\nHighlights: ${selectedTags.join(', ') || 'None'}\n\nProject Details:\n${formData.message}`,
  )}`;

  return (
    <div
      className="paper-soft relative rounded-2xl border p-6 sm:p-10 transition-all shadow-sm"
      style={{ borderColor: 'var(--ink-14)' }}
    >
      {/* Tape decoration */}
      <span
        className="tape hidden sm:block"
        style={{ top: '-13px', right: '40px' }}
        aria-hidden="true"
      />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 border-b pb-5" style={{ borderColor: 'var(--ink-10)' }}>
        <div>
          <span className="label-accent">Start a Project</span>
          <h2 className="sans text-xl sm:text-2xl font-semibold text-ink mt-0.5">
            Send an Inquiry
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[var(--ink-12)] bg-[var(--paper)] px-3 py-1 text-xs text-ink-soft">
          <Clock className="h-3.5 w-3.5 text-accent" />
          <span>Average reply: &lt; 24h</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="rounded-2xl border border-[var(--ink-14)] bg-[var(--paper)] p-8 sm:p-10 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(223,94,75,0.10)] text-accent mb-4">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>

            <h3 className="sans text-2xl font-semibold text-ink">
              Inquiry Sent Successfully!
            </h3>

            <p className="prose mt-2 text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-ink">{formData.name}</strong>. Your project details have landed in my inbox. I will review your requirements and reply with a breakdown within 24 hours.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={mailtoUrl} className="btn-outline text-xs">
                <Mail className="h-3.5 w-3.5 mr-1" /> Open copy in your email
              </a>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setFormData({
                    name: '',
                    email: '',
                    service: 'Full Website & App',
                    budget: '$150 – $350 / ₹12k–₹25k',
                    message: '',
                    website_hp: '',
                  });
                  setSelectedTags([]);
                }}
                className="btn-ghost text-xs"
              >
                Send another message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-7"
          >
            {/* Honeypot field for spam prevention */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_hp">Leave empty</label>
              <input
                type="text"
                id="website_hp"
                name="website_hp"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website_hp}
                onChange={handleChange}
              />
            </div>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {/* Step 1: Select Service */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label className="label font-semibold text-ink">
                  01 / What do you need built?
                </label>
                <span className="label text-[10px] text-ink-soft">Single select</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((srv) => {
                  const active = formData.service === srv;
                  return (
                    <motion.button
                      key={srv}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setFormData((p) => ({ ...p, service: srv }))}
                      className={`rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                        active
                          ? 'border-[1.5px] border-[var(--accent)] bg-[rgba(223,94,75,0.08)] text-accent font-semibold shadow-xs'
                          : 'border border-[var(--ink-14)] bg-[var(--paper)] text-ink hover:border-[var(--accent)]/50'
                      }`}
                    >
                      {srv}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Budget */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label className="label font-semibold text-ink">
                  02 / Estimated Budget Range
                </label>
                <span className="label text-[10px] text-ink-soft">Transparent tiers</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {BUDGET_OPTIONS.map((bgt) => {
                  const active = formData.budget === bgt;
                  return (
                    <motion.button
                      key={bgt}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setFormData((p) => ({ ...p, budget: bgt }))}
                      className={`rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                        active
                          ? 'border-[1.5px] border-[var(--accent)] bg-[rgba(223,94,75,0.08)] text-accent font-semibold shadow-xs'
                          : 'border border-[var(--ink-14)] bg-[var(--paper)] text-ink hover:border-[var(--accent)]/50'
                      }`}
                    >
                      {bgt}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Quick Scope Tags */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label className="label font-semibold text-ink">
                  03 / Key Requirements (Optional)
                </label>
                <span className="label text-[10px] text-ink-soft">Select any that apply</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SCOPE_TAGS.map((tag) => {
                  const selected = selectedTags.includes(tag);
                  return (
                    <motion.button
                      key={tag}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleTag(tag)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-all ${
                        selected
                          ? 'border border-[var(--accent)] bg-[rgba(223,94,75,0.10)] text-accent font-medium'
                          : 'border border-[var(--ink-12)] bg-[var(--paper)] text-ink-soft hover:text-ink'
                      }`}
                    >
                      {selected ? (
                        <Check className="h-3 w-3 text-accent" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/40" />
                      )}
                      {tag}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Contact Details Grid */}
            <div className="grid gap-5 sm:grid-cols-2 pt-2">
              <div>
                <label htmlFor="name" className="label block mb-2 font-semibold text-ink">
                  Your Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Rivera"
                  className="w-full rounded-xl border border-[var(--ink-18)] bg-[var(--paper)] px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="label block mb-2 font-semibold text-ink">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. alex@company.com"
                  className="w-full rounded-xl border border-[var(--ink-18)] bg-[var(--paper)] px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
            </div>

            {/* Step 5: Message Details */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="message" className="label font-semibold text-ink">
                  Project Description *
                </label>
                <span className="font-mono text-[11px] text-ink-soft">
                  {formData.message.length} / 1000
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                maxLength={1000}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your project, objectives, inspiration links, or desired completion date..."
                className="w-full rounded-xl border border-[var(--ink-18)] bg-[var(--paper)] p-4 text-sm text-ink placeholder:text-ink-soft/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors leading-relaxed"
              />
            </div>

            {/* Step 6: Submit Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2 border-t" style={{ borderColor: 'var(--ink-10)' }}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'loading'}
                className="btn-ink inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-accent" />
                    <span>Sending inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              <a
                href={mailtoUrl}
                className="sans text-xs text-ink-soft hover:text-accent transition-colors text-center sm:text-right"
              >
                Or open in your email client →
              </a>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
