import Link from 'next/link';
import { ArrowLeft, Home, Code2, BookOpen, Mail, Terminal, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bento-card rounded-3xl p-8 sm:p-12 text-center space-y-8 relative overflow-hidden shadow-2xl">

        {/* Ambient Top Glow */}
        <div className="w-32 h-32 rounded-full bg-white/[0.04] blur-3xl absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" />

        {/* 404 Giant Badge */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bento-subcard text-xs font-mono text-zinc-400">
            <Terminal className="w-3.5 h-3.5 text-zinc-300" />
            <span>HTTP_STATUS_404 · ADDR_UNRESOLVED</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black text-white tracking-tight font-mono leading-none">
            404
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            System Route Not Found
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            The requested resource, architecture specification, or endpoint does not exist in this cluster.
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <Link
            href="/"
            className="p-3.5 rounded-2xl bento-subcard hover:border-white/30 transition-all flex flex-col justify-between gap-3 group"
          >
            <Home className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            <div>
              <div className="text-xs font-bold text-white">Home</div>
              <div className="text-[10px] font-mono text-zinc-500">Overview</div>
            </div>
          </Link>

          <Link
            href="/projects"
            className="p-3.5 rounded-2xl bento-subcard hover:border-white/30 transition-all flex flex-col justify-between gap-3 group"
          >
            <Code2 className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            <div>
              <div className="text-xs font-bold text-white">Projects</div>
              <div className="text-[10px] font-mono text-zinc-500">6 Systems</div>
            </div>
          </Link>

          <Link
            href="/blog"
            className="p-3.5 rounded-2xl bento-subcard hover:border-white/30 transition-all flex flex-col justify-between gap-3 group"
          >
            <BookOpen className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            <div>
              <div className="text-xs font-bold text-white">Blog</div>
              <div className="text-[10px] font-mono text-zinc-500">Publications</div>
            </div>
          </Link>

          <Link
            href="/contact"
            className="p-3.5 rounded-2xl bento-subcard hover:border-white/30 transition-all flex flex-col justify-between gap-3 group"
          >
            <Mail className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            <div>
              <div className="text-xs font-bold text-white">Contact</div>
              <div className="text-[10px] font-mono text-zinc-500">Get in Touch</div>
            </div>
          </Link>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs shadow-lg transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 text-black" />
            <span>Return to Safety</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
