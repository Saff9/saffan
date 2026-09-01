import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated, AUTH_COOKIE_NAME } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { BLOG_POSTS } from '@/lib/blog-data';
import { Database, ShieldCheck, FileText, Mail, LogOut, ArrowRight, CheckCircle2, AlertTriangle, Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const authed = isAuthenticated();
  if (!authed) {
    redirect('/login');
  }

  const sql = getDb();
  const dbConnected = !!sql;

  return (
    <div className="space-y-10 py-4">

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
              ADMINISTRATOR DASHBOARD
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Systems Management Center
          </h1>
        </div>

        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bento-subcard text-xs font-mono text-zinc-300 hover:text-white hover:border-white/30 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Neon Database Status */}
        <div className="p-6 rounded-3xl bento-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
              <Database className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bento-subcard text-zinc-400">
              PostgreSQL
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Neon Serverless DB</h3>
            <p className="text-xs font-mono text-zinc-400">
              {dbConnected ? 'Connected & Ready for Queries' : 'Local Fallback (Set DATABASE_URL in .env)'}
            </p>
          </div>
          <div className="pt-2 flex items-center gap-2 text-xs font-mono">
            {dbConnected ? (
              <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Active Database Pooler
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1.5 font-semibold">
                <AlertTriangle className="w-4 h-4" />
                Standby Mode
              </span>
            )}
          </div>
        </div>

        {/* Total Blog Articles */}
        <div className="p-6 rounded-3xl bento-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bento-subcard text-zinc-400">
              Publications
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-black font-mono text-white">{BLOG_POSTS.length}</div>
            <p className="text-xs font-mono text-zinc-400">Published Systems Deep-Dives</p>
          </div>
          <div className="pt-2">
            <Link href="/blog" className="text-xs font-mono text-white hover:underline flex items-center gap-1">
              <span>View Public Blog</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Auth Security */}
        <div className="p-6 rounded-3xl bento-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bento-subcard text-emerald-400">
              Verified
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Session Protection</h3>
            <p className="text-xs font-mono text-zinc-400">HTTP-Only SameSite Cookie Active</p>
          </div>
          <div className="pt-2 text-xs font-mono text-zinc-500">
            Environment Security: High
          </div>
        </div>

      </div>

      {/* Published Articles Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Articles &amp; Publications</h2>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-black font-extrabold text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage in Blog</span>
          </Link>
        </div>

        <div className="space-y-3">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="p-5 rounded-2xl bento-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 px-2 py-0.5 rounded-full bento-subcard">
                    {post.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{post.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-white">{post.title}</h3>
                <p className="text-xs text-zinc-400 max-w-xl line-clamp-1">{post.summary}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="px-3.5 py-1.5 rounded-xl bento-subcard text-xs font-mono text-white hover:bg-white/[0.08] transition-all"
                >
                  View Article →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
