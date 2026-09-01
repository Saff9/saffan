'use client';

import { useState } from 'react';
import { Github, ExternalLink, ArrowRight, Activity, Zap, CheckCircle2 } from 'lucide-react';
import { Project } from '@/lib/portfolio-data';
import ProjectModal from './ProjectModal';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 transition-all duration-300 card-glow-hover flex flex-col justify-between group space-y-6">
        {/* Top Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800/80">
              {project.category}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-indigo-300/90 font-mono mt-1">
              {project.tagline}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.description}
          </p>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {project.metrics.slice(0, 2).map((m, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-left space-y-0.5"
              >
                <div className="text-base font-black text-emerald-400 tracking-tight">
                  {m.value}
                </div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Architectural highlights list */}
          <div className="space-y-1.5 pt-1">
            {project.highlights.slice(0, 2).map((hl, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-bold shrink-0">✦</span>
                <span className="line-clamp-1">{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tech Stack & Action Trigger */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono text-[10px] font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-800/80 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-bold transition-all group/btn"
          >
            <span>Deep Architecture Review</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
