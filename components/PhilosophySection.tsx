'use client';

import { Cpu, Zap, Sparkles, Compass } from 'lucide-react';
import { PHILOSOPHY_PRINCIPLES } from '@/lib/portfolio-data';

export default function PhilosophySection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Compass':
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {PHILOSOPHY_PRINCIPLES.map((principle, idx) => (
        <div
          key={idx}
          className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 card-glow-hover flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-800/80 text-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/10">
              {getIcon(principle.icon)}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {principle.title}
              </h3>
              <p className="text-xs sm:text-sm text-indigo-400 font-mono mt-0.5">
                {principle.tagline}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {principle.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
