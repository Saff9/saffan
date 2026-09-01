'use client';

import { X, ExternalLink, Github, CheckCircle2, Cpu, Zap, Activity } from 'lucide-react';
import { Project } from '@/lib/portfolio-data';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-3xl max-h-[90vh] bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
              {project.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white pt-1">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              {project.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Key Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-0.5">
              <div className="text-base sm:text-lg font-black text-emerald-400">{m.value}</div>
              <div className="text-[11px] text-slate-400 font-medium">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Deep Engineering Story */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-indigo-400">
            <Zap className="w-4 h-4" />
            The Engineering Challenge &amp; Solution
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.fullStory}
          </p>
        </div>

        {/* Architectural Details */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-indigo-400">
            <Cpu className="w-4 h-4" />
            Architectural Highlights
          </h3>
          <div className="space-y-2">
            {project.architectureDetails.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Matrix */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Technologies &amp; Protocols
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
              >
                <span>Live Interactive Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
