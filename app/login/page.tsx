'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate. Check .env credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bento-card rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">

        {/* Top Header */}
        <div className="space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-5 h-5 text-black" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Admin Authentication
            </h1>
            <p className="text-xs font-mono text-zinc-400">
              Secured access for author &amp; systems dashboard
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-300 font-mono animate-fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-zinc-300">Admin Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="saffanakbar942@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bento-subcard text-white text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
              />
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-zinc-300">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bento-subcard text-white text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors font-mono"
              />
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs shadow-lg transition-all hover:scale-[1.01] disabled:opacity-50 cursor-pointer"
          >
            <span>{loading ? 'Authenticating…' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-white/[0.08] text-center">
          <Link href="/" className="text-xs font-mono text-zinc-400 hover:text-white transition-colors">
            ← Return to Home Overview
          </Link>
        </div>

      </div>
    </div>
  );
}
