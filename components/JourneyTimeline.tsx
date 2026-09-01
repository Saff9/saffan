'use client';

import { useEffect, useRef, useState } from 'react';
import { JOURNEY_MILESTONES } from '@/lib/portfolio-data';
import TechIcon from './TechIcon';

const TECH_ICON_MAP: Record<string, string> = {
  C: 'C', Go: 'Go', Rust: 'Rust', TypeScript: 'TypeScript', Python: 'Python',
  React: 'React', 'Node.js': 'Node.js', PostgreSQL: 'PostgreSQL',
  Docker: 'Docker', 'Next.js': 'Next.js', Linux: 'Linux', POSIX: 'POSIX',
  pthreads: 'pthreads', 'B-Tree': 'B-Tree', 'SQL Engine': 'SQL Engine',
  WebSockets: 'WebSockets', Dart: 'Dart',
};

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('[data-timeline-item]');
    if (!items) return;

    const observers: IntersectionObserver[] = [];
    items.forEach((el, idx) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(Array.from(prev).concat(idx)));
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical connecting line */}
      <div className="absolute left-[19px] sm:left-[23px] top-6 bottom-6 w-px bg-gradient-to-b from-indigo-500/40 via-violet-500/20 to-emerald-500/40" />

      <div className="space-y-0">
        {JOURNEY_MILESTONES.map((milestone, idx) => {
          const isVisible = visibleItems.has(idx);

          return (
            <div
              key={idx}
              data-timeline-item
              className={`relative flex gap-6 sm:gap-8 pb-10 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {/* Timeline dot */}
              <div className="flex flex-col items-center shrink-0 pt-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-zinc-950 border border-white/[0.1] flex items-center justify-center ring-4 ring-white/[0.04] z-10 shrink-0 shadow-lg shadow-black/60">
                  <span className="font-black text-[10px] sm:text-xs font-mono text-indigo-400">
                    {milestone.year.split('–')[0]}
                  </span>
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 bento-card p-6 sm:p-7 rounded-3xl space-y-4 mb-0">
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                      {milestone.year}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-600">·</span>
                    <span className="text-[11px] font-mono text-zinc-400">{milestone.roleOrPhase}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white">{milestone.title}</h3>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">{milestone.description}</p>

                {/* Key learnings */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                    Key Technical Breakthroughs:
                  </span>
                  {milestone.keyLearnings.map((learning, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-emerald-400" />
                      <span>{learning}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
                  {milestone.technologies.map((tech) => {
                    const iconName = TECH_ICON_MAP[tech] ?? TECH_ICON_MAP[tech.split(' ')[0]] ?? tech;
                    return (
                      <span
                        key={tech}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bento-subcard text-zinc-300 font-mono text-[11px] font-semibold"
                      >
                        <TechIcon name={iconName} size={12} />
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
