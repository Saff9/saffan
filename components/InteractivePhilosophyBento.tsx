'use client';

import { useState } from 'react';
import { Cpu, Zap, Sparkles, Compass } from 'lucide-react';
import { PHILOSOPHY_PRINCIPLES } from '@/lib/portfolio-data';

const ICONS = [
  { icon: Cpu,      color: 'text-indigo-400', bg: 'bg-indigo-950/60 border-indigo-800/40' },
  { icon: Zap,      color: 'text-amber-400',  bg: 'bg-amber-950/60  border-amber-800/40'  },
  { icon: Sparkles, color: 'text-cyan-400',   bg: 'bg-cyan-950/60   border-cyan-800/40'   },
  { icon: Compass,  color: 'text-emerald-400',bg: 'bg-emerald-950/60 border-emerald-800/40'},
];

export default function InteractivePhilosophyBento() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {PHILOSOPHY_PRINCIPLES.map((item, idx) => {
        const { icon: Icon, color, bg } = ICONS[idx % ICONS.length];
        const isHov = hovered === idx;

        return (
          <div
            key={idx}
            className={`bento-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between gap-4 cursor-default transition-all duration-300 ${
              isHov ? 'scale-[1.01] border-white/20' : ''
            }`}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Principle {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className={`text-lg sm:text-xl font-black text-white mt-1 transition-colors ${isHov ? color : ''}`}>
                    {item.title}
                  </h3>
                </div>
                <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 transition-all ${bg} ${isHov ? 'scale-105' : ''}`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
              </div>

              <p className={`text-xs font-mono font-semibold ${color} leading-relaxed`}>
                {item.tagline}
              </p>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Hover accent line */}
            <div className={`h-px transition-all duration-500 ${isHov ? `bg-gradient-to-r from-transparent via-current to-transparent ${color}` : 'bg-transparent'}`} />
          </div>
        );
      })}
    </div>
  );
}
