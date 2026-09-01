'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Code2,
  Cpu,
  Compass,
  Mail,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  Command,
  X,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from '@/lib/portfolio-data';
import TechIcon from './TechIcon';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  category: 'Pages' | 'Projects' | 'Technologies' | 'Quick Actions';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  url?: string;
  action?: () => void;
  badge?: string;
}

export default function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Flatten all searchable items
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // 1. Pages
    items.push(
      {
        id: 'page-home',
        category: 'Pages',
        title: 'Home Overview',
        subtitle: 'Main systems architecture summary and featured work',
        icon: <Command className="w-4 h-4 text-indigo-400" />,
        url: '/',
        badge: 'Main',
      },
      {
        id: 'page-projects',
        category: 'Pages',
        title: 'All Projects Gallery',
        subtitle: 'Complete list of 6 production systems, databases, and agents',
        icon: <Code2 className="w-4 h-4 text-cyan-400" />,
        url: '/projects',
        badge: '6 Projects',
      },
      {
        id: 'page-stack',
        category: 'Pages',
        title: 'Technical Stack & Capabilities',
        subtitle: 'C11, Go, Rust, TypeScript, Python, POSIX & infrastructure',
        icon: <Cpu className="w-4 h-4 text-emerald-400" />,
        url: '/stack',
        badge: '20+ Techs',
      },
      {
        id: 'page-journey',
        category: 'Pages',
        title: 'Self-Taught Journey',
        subtitle: 'First-principles systems engineering narrative & timeline',
        icon: <Compass className="w-4 h-4 text-amber-400" />,
        url: '/journey',
        badge: 'Story',
      },
      {
        id: 'page-blog',
        category: 'Pages',
        title: 'Engineering Blog & Systems Notes',
        subtitle: 'Deep-dives into database engines, compilers, and distributed systems',
        icon: <Layers className="w-4 h-4 text-emerald-400" />,
        url: '/blog',
        badge: 'Publications',
      },
      {
        id: 'page-contact',
        category: 'Pages',
        title: 'Contact & Hire',
        subtitle: 'Direct email, Telegram, Discord, and availability status',
        icon: <Mail className="w-4 h-4 text-violet-400" />,
        url: '/contact',
        badge: 'Available',
      },
      {
        id: 'page-login',
        category: 'Pages',
        title: 'Admin Sign In',
        subtitle: 'Authenticate author session for systems dashboard',
        icon: <Sparkles className="w-4 h-4 text-amber-400" />,
        url: '/login',
        badge: 'Admin',
      }
    );

    // 2. Projects (All 6 real projects)
    PROJECTS.forEach((project) => {
      items.push({
        id: `project-${project.id}`,
        category: 'Projects',
        title: project.title,
        subtitle: `${project.category} · ${project.tagline}`,
        icon: <TechIcon name={project.techStack[0]?.split(' ')[0]} size={16} />,
        url: `/projects/${project.slug}`,
        badge: project.metrics[0]?.value,
      });
    });

    // 3. Technologies & Skills
    SKILL_CATEGORIES.forEach((cat) => {
      cat.skills.forEach((skill) => {
        items.push({
          id: `tech-${skill.name}`,
          category: 'Technologies',
          title: skill.name,
          subtitle: `${skill.level} · ${skill.description.slice(0, 60)}...`,
          icon: <TechIcon name={skill.name.split(' ')[0]} size={16} />,
          url: `/stack#${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          badge: skill.experienceYears,
        });
      });
    });

    // 4. Quick Actions
    items.push(
      {
        id: 'action-github',
        category: 'Quick Actions',
        title: 'View GitHub Profile',
        subtitle: 'github.com/Saff9 · Open-source repositories',
        icon: <TechIcon name="GitHub" size={16} />,
        action: () => window.open(PERSONAL_INFO.github, '_blank'),
        badge: 'GitHub',
      },
      {
        id: 'action-discord',
        category: 'Quick Actions',
        title: 'Join Discord Community',
        subtitle: 'discord.gg/XWJ25UShKT · Developer community',
        icon: <TechIcon name="Discord" size={16} />,
        action: () => window.open(PERSONAL_INFO.discord, '_blank'),
        badge: 'Discord',
      },
      {
        id: 'action-telegram',
        category: 'Quick Actions',
        title: 'Message on Telegram',
        subtitle: 't.me/saffanme · Instant direct communication',
        icon: <TechIcon name="Telegram" size={16} />,
        action: () => window.open(PERSONAL_INFO.telegram, '_blank'),
        badge: 'Telegram',
      },
      {
        id: 'action-copy-email',
        category: 'Quick Actions',
        title: 'Copy Email Address',
        subtitle: PERSONAL_INFO.email,
        icon: <Mail className="w-4 h-4 text-emerald-400" />,
        action: () => {
          navigator.clipboard.writeText(PERSONAL_INFO.email);
        },
        badge: 'Copy',
      }
    );

    return items;
  }, []);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 10);
    const q = query.toLowerCase().trim();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.badge?.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          if (selected.url) {
            router.push(selected.url);
            onClose();
          } else if (selected.action) {
            selected.action();
            onClose();
          }
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#090d18] rounded-2xl border border-white/[0.08] shadow-2xl shadow-indigo-950/40 overflow-hidden space-y-2 p-3 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-3.5 py-2.5 bg-black/40 rounded-xl border border-white/[0.06]">
          <Search className="w-4 h-4 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search NovaDB, Breeze, ASTRAMIND, C11, Go, Discord..."
            className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-slate-600 font-medium"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-500 border border-white/[0.08]">
              ESC
            </kbd>
          )}
        </div>

        {/* Search Results */}
        <div className="max-h-[380px] overflow-y-auto space-y-1 p-1 scrollbar-thin">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-400">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-600">Try searching for &quot;NovaDB&quot;, &quot;C11&quot;, &quot;ASTRAMIND&quot;, &quot;Discord&quot;, or &quot;Projects&quot;</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => {
                    if (item.url) {
                      router.push(item.url);
                      onClose();
                    } else if (item.action) {
                      item.action();
                      onClose();
                    }
                  }}
                  className={`flex items-center justify-between gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-600/20 text-white border border-indigo-500/30'
                      : 'hover:bg-white/[0.04] text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold truncate text-white">{item.title}</span>
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-white/[0.04] text-slate-500 border border-white/[0.06]">
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.subtitle}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.badge && (
                      <span className="text-[10px] font-mono text-indigo-300/80 bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-800/40">
                        {item.badge}
                      </span>
                    )}
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-slate-700'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="pt-2 px-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-600">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>{filteredItems.length} matches</span>
        </div>
      </div>
    </div>
  );
}
