'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Complete Website',
    budget: '₹10,000 - ₹20,000 / $120 - $250',
    message: '',
    website_hp: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
    `Hi Saffan,\n\nName: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\nBudget: ${formData.budget}\n\nProject Details:\n${formData.message}`,
  )}`;

  return (
    <div
      className="paper-soft rounded-2xl border p-6 sm:p-10 transition-colors"
      style={{ borderColor: 'var(--ink-14)' }}
    >
      <div className="flex items-center gap-2.5 mb-6">
        <MessageSquare className="h-5 w-5 text-accent" aria-hidden="true" />
        <h2 className="sans text-xl font-semibold text-ink sm:text-2xl">
          Send a Project Inquiry
        </h2>
      </div>

      {status === 'success' ? (
        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
          <h3 className="sans mt-4 text-lg font-semibold text-ink">
            Message received!
          </h3>
          <p className="prose mt-2 text-sm text-ink-soft max-w-md mx-auto">
            Thanks for reaching out, {formData.name}. I have received your project details and will review and reply within 24 hours.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={mailtoUrl} className="btn-outline text-xs">
              <Mail className="h-3.5 w-3.5" /> Open copy in your email app
            </a>
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setFormData({
                  name: '',
                  email: '',
                  service: 'Complete Website',
                  budget: '₹15,000 - ₹35,000 / $200 - $450',
                  message: '',
                  website_hp: '',
                });
              }}
              className="btn-ghost text-xs"
            >
              Send another message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot field for spam bots */}
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
            <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3.5 text-sm text-red-500">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="label block mb-2 font-medium">
                Your Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex"
                className="w-full rounded-lg border border-[var(--ink-18)] bg-[var(--paper-2)] px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="email" className="label block mb-2 font-medium">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                className="w-full rounded-lg border border-[var(--ink-18)] bg-[var(--paper-2)] px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="service" className="label block mb-2 font-medium">
                Service Needed
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full rounded-lg border border-[var(--ink-14)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="Landing Page">Landing Page (from ₹9,999 / $120)</option>
                <option value="Complete Website">Complete Website (from ₹14,999 / $180)</option>
                <option value="Custom Web App & AI">Custom Web App & AI (from ₹24,999 / $300)</option>
                <option value="Custom Scope">Custom Scope / Consultation</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="label block mb-2 font-medium">
                Estimated Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full rounded-lg border border-[var(--ink-14)] bg-[var(--paper-2)] px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="< ₹10,000 / $120">&lt; ₹10,000 / $120</option>
                <option value="₹10,000 - ₹20,000 / $120 - $250">₹10,000 - ₹20,000 / $120 - $250</option>
                <option value="₹20,000 - ₹35,000 / $250 - $450">₹20,000 - ₹35,000 / $250 - $450</option>
                <option value="₹35,000+ / $450+">₹35,000+ / $450+</option>
                <option value="Flexible / Need quote">Flexible / Need quote</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="label block mb-2 font-medium">
              Project Details *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me a bit about what you want to build, any inspirations, desired timeline, or key features..."
              className="w-full rounded-lg border border-[var(--ink-18)] bg-[var(--paper-2)] p-3.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-ink inline-flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
            </button>

            <a
              href={mailtoUrl}
              className="sans text-xs text-ink-soft hover:text-accent transition-colors text-center sm:text-right"
            >
              Or open directly in your email client →
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
