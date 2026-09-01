'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Terminal as TerminalIcon,
  CornerDownLeft,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from '@/lib/portfolio-data';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export default function HeroTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome banner
    const welcomeOutput: CommandOutput = {
      command: 'welcome',
      output: (
        <div className="space-y-1.5 text-xs sm:text-sm text-zinc-300 font-mono">
          <p className="text-indigo-400 font-bold">
            Saffan OS v5.2.0-release (x86_64-saffan-linux-gnu)
          </p>
          <p className="text-zinc-400">
            Welcome to the interactive systems terminal. Type{' '}
            <span className="text-emerald-400 font-semibold underline cursor-pointer" onClick={() => handleCommand('help')}>
              help
            </span>{' '}
            to list all system commands.
          </p>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setHistory([welcomeOutput]);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdText: string) => {
    const rawCmd = cmdText.trim();
    if (!rawCmd) return;

    const cmd = rawCmd.toLowerCase();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-2 text-xs sm:text-sm text-zinc-300 font-mono">
            <p className="text-zinc-400">Available commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div><span className="text-emerald-400 font-bold">whoami</span> - Engineering profile</div>
              <div><span className="text-emerald-400 font-bold">projects</span> - Production projects (NovaDB, ASTRAMIND...)</div>
              <div><span className="text-emerald-400 font-bold">stack</span> / <span className="text-emerald-400 font-bold">skills</span> - Complete technical inventory</div>
              <div><span className="text-emerald-400 font-bold">journey</span> - Self-taught learning trajectory</div>
              <div><span className="text-emerald-400 font-bold">contact</span> - Direct communication channels</div>
              <div><span className="text-emerald-400 font-bold">stats</span> - Core performance benchmarks</div>
              <div><span className="text-indigo-400 font-bold">discord</span> - Join developer community</div>
              <div><span className="text-amber-400 font-bold">clear</span> - Clear terminal history</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
            <div className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
              <span>{PERSONAL_INFO.fullName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono">
                Self-Taught Systems Architect
              </span>
            </div>
            <p className="leading-relaxed text-zinc-300">{PERSONAL_INFO.longBio}</p>
            <p className="text-xs text-amber-400 font-mono">Location: {PERSONAL_INFO.location}</p>
          </div>
        );
        break;

      case 'skills':
      case 'stack':
        outputNode = (
          <div className="space-y-3 text-xs sm:text-sm font-mono">
            <p className="text-indigo-400 font-bold">Technical Stack &amp; First-Principles Tooling:</p>
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-amber-400 font-semibold text-xs">{cat.name}:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-200 border border-white/[0.08] text-[11px]"
                    >
                      {s.name} <span className="text-zinc-500">({s.level})</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-3 text-xs sm:text-sm font-mono">
            <p className="text-indigo-400 font-bold">Real Open-Source Production Systems:</p>
            {PROJECTS.map((p, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-zinc-950/80 border border-white/[0.07] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold text-xs sm:text-sm">
                    {idx + 1}. {p.title}
                  </span>
                  <span className="text-[10px] text-zinc-500">{p.category}</span>
                </div>
                <p className="text-zinc-300 text-xs font-sans">{p.description}</p>
                <div className="text-[11px] text-indigo-300">
                  Key Metric: {p.metrics[0].label} → {p.metrics[0].value}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'journey':
      case 'timeline':
        outputNode = (
          <div className="space-y-2 text-xs sm:text-sm font-mono">
            <p className="text-indigo-400 font-bold">Self-Directed Systems Engineering Timeline:</p>
            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-zinc-950/60 border border-white/[0.06]">
                <span className="text-amber-400 font-bold">2021-2022:</span> First Principles, C &amp; Linux Kernel Systems
              </div>
              <div className="p-2 rounded-xl bg-zinc-950/60 border border-white/[0.06]">
                <span className="text-amber-400 font-bold">2022-2023:</span> Compilers (Breeze) &amp; Reactive Web
              </div>
              <div className="p-2 rounded-xl bg-zinc-950/60 border border-white/[0.06]">
                <span className="text-amber-400 font-bold">2023-2024:</span> Database Internals (NovaDB C11)
              </div>
              <div className="p-2 rounded-xl bg-zinc-950/60 border border-white/[0.06]">
                <span className="text-amber-400 font-bold">2024-Present:</span> AI Multi-Agent Platforms (ASTRAMIND)
              </div>
            </div>
          </div>
        );
        break;

      case 'contact':
      case 'email':
      case 'hire':
      case 'sudo hire-saffan':
        outputNode = (
          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-2 text-xs sm:text-sm font-mono">
            <p className="text-emerald-400 font-bold">Direct Channels:</p>
            <div className="space-y-1 text-zinc-300">
              <p>Email: <span className="text-white font-semibold">{PERSONAL_INFO.email}</span></p>
              <p>Telegram: <span className="text-sky-400">{PERSONAL_INFO.telegram}</span></p>
              <p>Discord: <span className="text-indigo-400">{PERSONAL_INFO.discord}</span></p>
              <p>GitHub: <span className="text-zinc-200">{PERSONAL_INFO.github}</span></p>
            </div>
          </div>
        );
        break;

      case 'discord':
        outputNode = (
          <div className="p-3 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/30 text-xs font-mono text-zinc-200">
            <p className="text-indigo-300 font-bold">Discord Server:</p>
            <p className="text-white select-all">{PERSONAL_INFO.discord}</p>
          </div>
        );
        break;

      case 'stats':
        outputNode = (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            {PERSONAL_INFO.stats.map((s, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-zinc-950/70 border border-white/[0.06] text-center">
                <div className="text-base font-bold text-emerald-400">{s.value}</div>
                <div className="text-[10px] text-zinc-500">{s.label}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        outputNode = (
          <div className="text-xs text-rose-400 font-mono">
            Command not found: &ldquo;{cmdText}&rdquo;. Type <span className="text-emerald-400 font-bold">help</span> to list commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: outputNode, timestamp }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const copyTranscript = () => {
    const text = history.map((h) => `$ ${h.command}`).join('\n');
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto rounded-3xl overflow-hidden bento-card transition-all duration-300 ${
        isExpanded ? 'scale-[1.01] border-indigo-500/40 shadow-2xl' : ''
      }`}
    >
      {/* Terminal Titlebar */}
      <div className="px-4 py-3 bg-zinc-950/80 border-b border-white/[0.06] flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]/80 hover:opacity-100 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]/80 hover:opacity-100 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]/80 hover:opacity-100 transition-opacity" />
          </div>
          <span className="ml-2 font-mono text-xs text-zinc-400 font-semibold flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-indigo-400" />
            saffan@archlinux: ~ (bash interactive)
          </span>
        </div>

        <div className="flex items-center gap-2 text-zinc-400">
          <button
            onClick={copyTranscript}
            className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] text-xs transition-colors"
            title="Copy terminal session"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] text-xs transition-colors"
            title="Toggle terminal size"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div
        className={`p-5 sm:p-6 font-mono overflow-y-auto space-y-4 text-xs sm:text-sm text-zinc-200 transition-all ${
          isExpanded ? 'max-h-[500px]' : 'max-h-[360px]'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, index) => (
          <div key={index} className="space-y-1.5 animate-in fade-in duration-100">
            <div className="flex items-center gap-2 text-zinc-400 text-xs">
              <span className="text-emerald-400 font-bold">saffan@archlinux</span>
              <span className="text-zinc-600">:</span>
              <span className="text-indigo-400">~</span>
              <span className="text-zinc-500">$</span>
              <span className="text-white font-bold">{item.command}</span>
              <span className="ml-auto text-[10px] text-zinc-600">{item.timestamp}</span>
            </div>
            <div className="pl-4 border-l border-white/[0.08]">{item.output}</div>
          </div>
        ))}

        {/* Current Active Input Prompt */}
        <div className="flex items-center gap-2 text-xs sm:text-sm pt-1">
          <span className="text-emerald-400 font-bold shrink-0">saffan@archlinux</span>
          <span className="text-zinc-600 shrink-0">:</span>
          <span className="text-indigo-400 shrink-0">~</span>
          <span className="text-zinc-500 shrink-0">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 p-0 font-mono text-xs sm:text-sm placeholder:text-zinc-600 caret-emerald-400"
            placeholder="Type 'help', 'projects', 'stack', 'discord'..."
            autoComplete="off"
            spellCheck={false}
          />
          <CornerDownLeft className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
        </div>

        <div ref={terminalEndRef} />
      </div>

      {/* Suggestion Quick Chips */}
      <div className="px-4 py-2.5 bg-zinc-950/60 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-[11px] text-zinc-500 font-mono mr-1">Quick chips:</span>
        {['help', 'whoami', 'projects', 'stack', 'journey', 'discord', 'contact'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2.5 py-0.5 rounded-lg bg-white/[0.04] hover:bg-indigo-600/20 text-zinc-300 hover:text-indigo-300 border border-white/[0.06] font-mono text-[11px] transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
