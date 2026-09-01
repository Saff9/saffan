'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertOctagon, RotateCcw, Home, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/portfolio-data';

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Runtime error caught by boundary:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-xl bento-card rounded-3xl p-8 sm:p-12 text-center space-y-8 relative overflow-hidden shadow-2xl">

        {/* Status Badge */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-mono text-red-400">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>UNEXPECTED_SYSTEM_ANOMALY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Execution Interrupted
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            An unhandled runtime exception occurred during component evaluation. The system state has been preserved.
          </p>

          {error.digest && (
            <div className="p-2 rounded-xl bento-subcard text-[11px] font-mono text-zinc-500 max-w-xs mx-auto">
              Digest: {error.digest}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs shadow-lg transition-all hover:scale-105 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-black" />
            <span>Re-execute Component</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bento-subcard text-zinc-300 hover:text-white text-xs font-semibold transition-all"
          >
            <Home className="w-4 h-4 text-zinc-400" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Report Link */}
        <div className="pt-4 border-t border-white/[0.08] text-center">
          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Bug%20Report%20on%20Portfolio`}
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-500" />
            <span>Report issue to {PERSONAL_INFO.email}</span>
          </a>
        </div>

      </div>
    </div>
  );
}
