export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: 'Systems & Database' | 'AI & Autonomous Agents' | 'Compilers & Languages' | 'Full-Stack & Platforms' | 'Privacy & Real-Time';
  description: string;
  fullStory: string;
  problemStatement?: string;
  solutionOverview?: string;
  architectureDetails: string[];
  metrics: { label: string; value: string; description?: string }[];
  techStack: string[];
  featured: boolean;
  githubUrl: string;
  liveUrl?: string;
  highlights: string[];
  challenges?: string[];
  keyTakeaways?: string[];
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: {
    name: string;
    level: string; // 'Expert' | 'Advanced' | 'Proficient'
    experienceYears: string;
    description: string;
    featured?: boolean;
    useCases?: string[];
  }[];
}

export interface JourneyMilestone {
  year: string;
  title: string;
  roleOrPhase: string;
  description: string;
  keyLearnings: string[];
  technologies: string[];
}

export interface PhilosophyPrinciple {
  title: string;
  icon: string;
  tagline: string;
  description: string;
  codeSnippet?: string;
}

export const PERSONAL_INFO = {
  name: 'Saffan',
  fullName: 'Saffan',
  title: 'Self-Taught Systems Architect & Software Engineer',
  shortBio:
    'Self-taught software engineer obsessed with low-level systems programming (C11, Go, Rust), custom database engines, AI agent orchestration, and ultra-high-performance web architecture.',
  longBio:
    'I took the unconventional, self-directed path into software engineering. Rather than relying on traditional academia, I taught myself computer science from first principles: building an ACID-compliant SQL database engine in pure C11 from scratch (NovaDB), designing custom language interpreters (Breeze), crafting autonomous AI agent platforms (ASTRAMIND, CodeCraftAI), and delivering production web apps. I build software that is fast, resilient, and beautiful.',
  location: 'Available Worldwide (Remote / Relocation)',
  status: 'Available for Full-Time Roles & High-Impact Engineering Contracts',
  email: 'saffanakbar942@gmail.com',
  github: 'https://github.com/Saff9',
  telegram: 'https://t.me/saffanme',
  discord: 'https://discord.gg/XWJ25UShKT',
  stats: [
    { label: 'Years of Deep Focus', value: '5+' },
    { label: 'Production Systems Built', value: '15+' },
    { label: 'Zero-Dependency C11 Engine', value: 'NovaDB' },
    { label: 'Lighthouse Performance', value: '100/100' },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'novadb',
    title: 'NovaDB SQL Engine',
    slug: 'novadb',
    tagline: 'Full-Featured, ACID-Compliant SQL Database Engine in Pure C11',
    category: 'Systems & Database',
    description:
      'A standalone, zero-dependency relational database engine written from scratch in standard C11. Features a custom B-Tree storage manager, WAL logging, SQL lexer/parser, and ACID transaction isolation using only libc, pthreads, and POSIX.',
    fullStory:
      'NovaDB was engineered to demystify database internals by avoiding high-level abstractions. Built entirely in ANSI C11 without external libraries, it implements its own slotted-page disk manager, buffer pool manager with LRU-2 eviction, Write-Ahead Logging (WAL) for crash recovery, and a multi-threaded query execution engine with recursive descent SQL parsing.',
    problemStatement:
      'Modern developers treat relational databases as black boxes, often struggling to debug low-level locking contention, page cache thrashing, and transaction deadlocks.',
    solutionOverview:
      'Engineered a complete database architecture from first principles: custom slotted-page disk layout, B+ Tree indexing, AST SQL compiler, lock manager with 2-Phase Locking (2PL), and strict ACID guarantees.',
    architectureDetails: [
      'Slotted-page disk storage engine with binary serialization and 4KB page alignment',
      'Buffer Pool Manager with LRU-K frame eviction and dirty page flushing',
      'Custom B+ Tree index supporting logarithmic search, range scans, and node splitting',
      'WAL (Write-Ahead Logging) manager guaranteeing durability with fsync synchronization',
      'Multi-threaded client socket connection pool via POSIX pthreads and non-blocking I/O',
    ],
    metrics: [
      { label: 'External Dependencies', value: '0 (Pure C11)', description: 'Built strictly with libc, pthreads, and POSIX' },
      { label: 'ACID Compliance', value: '100% Verified', description: 'Atomicity, Consistency, Isolation, and Durability' },
      { label: 'Indexed Lookup', value: 'O(log N)', description: 'B+ Tree logarithmic lookups and range scans' },
      { label: 'Binary Footprint', value: '< 2.5 MB', description: 'Ultra-lean native executable size' },
    ],
    techStack: ['C', 'Linux', 'POSIX', 'pthreads', 'B-Tree', 'SQL Engine', 'Docker'],
    featured: true,
    githubUrl: 'https://github.com/Saff9/NovaDB',
    liveUrl: 'https://github.com/Saff9/NovaDB',
    highlights: [
      'Engineered an ACID-compliant transaction manager with WAL logging and rollbacks',
      'Implemented B+ Tree indexing from scratch with concurrent read/write locks',
      'Built a recursive-descent SQL compiler with lexical tokenizer and execution planner',
    ],
    challenges: [
      'Handling concurrent B+ tree node splits and page rebalancing without global lock contention',
      'Guaranteeing crash recovery consistency across unexpected process terminations',
    ],
    keyTakeaways: [
      'Deep mastery of OS memory management, system calls (`mmap`, `fsync`, `pwrite`), and lock-free concurrency',
      'Complete understanding of query planning, cost models, and disk page layout structures',
    ],
  },
  {
    id: 'astramind',
    title: 'ASTRAMIND AI Platform',
    slug: 'astramind',
    tagline: 'Autonomous AI Intelligence & Multi-Modal Agent Orchestration Engine',
    category: 'AI & Autonomous Agents',
    description:
      'A production-grade AI platform featuring multi-agent task execution, dynamic knowledge retrieval, streaming inference, and enterprise document intelligence with high-speed response streaming.',
    fullStory:
      'ASTRAMIND was built to solve the challenges of building reliable, hallucination-resistant AI systems. It combines asynchronous Python microservices with an agentic DAG planner, vector embeddings, and an interactive Next.js web application with live streaming token responses.',
    problemStatement:
      'Standard LLM wrappers suffer from brittle single-prompt execution, high API cost waste, and lack of deterministic multi-step reasoning capabilities for complex workflows.',
    solutionOverview:
      'Engineered an agentic workflow architecture with multi-step task decomposition, memory recall graphs, parallel tool execution, and dynamic context caching.',
    architectureDetails: [
      'Asynchronous FastAPI inference engine with streaming Server-Sent Events (SSE)',
      'Deterministic agentic state graphs with validation and error-recovery loops',
      'Vector semantic search with dense embedding similarity ranking and memory buffers',
      'Modern Next.js web interface with real-time UI streaming and markdown code highlighting',
    ],
    metrics: [
      { label: 'Token Stream Latency', value: '< 80 ms', description: 'Time-to-first-token streaming latency' },
      { label: 'Agent Planning', value: 'Multi-Step DAG', description: 'Parallel and sequential task decomposition' },
      { label: 'Live Deployment', value: 'Vercel Edge', description: 'Production deployment serving real users' },
      { label: 'UI Responsiveness', value: '60 FPS', description: 'Smooth real-time markdown streaming UI' },
    ],
    techStack: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'React', 'TailwindCSS', 'Docker'],
    featured: true,
    githubUrl: 'https://github.com/Saff9/ASTRAMIND',
    liveUrl: 'https://astramind-lake.vercel.app',
    highlights: [
      'Shipped live production platform deployed on Vercel and cloud microservices',
      'Architected resilient multi-agent execution graphs with autonomous self-correction',
      'Built interactive streaming interface with real-time token rendering',
    ],
    challenges: [
      'Preventing infinite loops in autonomous tool-calling chains with strict execution depth guards',
      'Optimizing streaming token buffer throughput over HTTP/2 connections',
    ],
    keyTakeaways: [
      'Production LLM system design: agent loops, guardrails, and deterministic tool schemas',
      'Async Python concurrent pipeline design with high-concurrency event loops',
    ],
  },
  {
    id: 'breeze-lang',
    title: 'Breeze Programming Language',
    slug: 'breeze-lang',
    tagline: 'Intuitive, Modern Programming Language with Custom Lexer, Parser & Runtime',
    category: 'Compilers & Languages',
    description:
      'A custom programming language designed for readability and simplicity. Features a complete lexer, recursive-descent parser, Abstract Syntax Tree (AST) evaluator, and runtime environment built from scratch in TypeScript.',
    fullStory:
      'Breeze was created to explore programming language theory, compiler design, and AST evaluation mechanics. It translates user-friendly, expressive syntax into executable byte operations with lexical scoping, first-class functions, closures, dynamic typing, and clear runtime error diagnostics.',
    problemStatement:
      'Most beginner developers find programming syntax cryptic and verbose, creating unnecessary friction when learning fundamental algorithmic thinking.',
    solutionOverview:
      'Designed a clean, human-readable syntax and engineered a complete interpreter pipeline: Lexical Scanner -> Token Stream -> Recursive Descent AST Parser -> Tree-Walking Evaluator -> Runtime Environment.',
    architectureDetails: [
      'Lexical scanner with token classification, string interpolation, and comment stripping',
      'Recursive-descent AST parser generating structured syntactic expression trees',
      'Environment scope chain manager implementing lexical scoping and closure variable capture',
      'Built-in standard library with math operations, string manipulation, and I/O primitives',
    ],
    metrics: [
      { label: 'Language Pipeline', value: 'Lexer + Parser + AST', description: 'Complete end-to-end interpreter implementation' },
      { label: 'First-Class Functions', value: 'Supported', description: 'Closures, higher-order functions, and lexical scope' },
      { label: 'Architecture', value: 'Tree-Walking Evaluator', description: 'Zero external parser generator dependencies' },
      { label: 'Open Source', value: 'MIT Licensed', description: 'Full source code and test suite on GitHub' },
    ],
    techStack: ['TypeScript', 'Node.js', 'AST Parser', 'Compilers', 'Linux'],
    featured: true,
    githubUrl: 'https://github.com/Saff9/Breeze',
    liveUrl: 'https://github.com/Saff9/Breeze',
    highlights: [
      'Built custom tokenizer and grammar parser without relying on ANTLR or Lex/Yacc',
      'Implemented lexical scope resolution with nested environment pointers',
      'Designed custom error reporting system with exact line and column diagnostic highlights',
    ],
    challenges: [
      'Resolving operator precedence and associativity in complex arithmetic expressions (Pratt parsing)',
      'Managing variable reference scopes across nested closures without memory leaks',
    ],
    keyTakeaways: [
      'Compiler theory, formal grammar design, and syntax tree transformations',
      'Scope lifetime management and interpreter execution semantics',
    ],
  },
  {
    id: 'budgettechindia',
    title: 'BudgetTechIndia Platform',
    slug: 'budgettechindia',
    tagline: 'High-Performance Tech Hardware Comparison & Intelligence Engine',
    category: 'Full-Stack & Platforms',
    description:
      'A full-stack web platform empowering Indian tech consumers to find the best hardware, compare component specs, and analyze price-to-performance metrics with instant search and zero runtime bloat.',
    fullStory:
      'BudgetTechIndia was engineered as a lightning-fast, production-ready tech portal for consumer electronics and PC hardware. Built using Next.js, TypeScript, and modern responsive design, it achieves a 100/100 Lighthouse performance score with instant client-side filtering and SEO optimization.',
    problemStatement:
      'Tech hardware buying in India is fragmented across cluttered, ad-heavy websites that take seconds to load and offer poor comparison filters for budget-conscious consumers.',
    solutionOverview:
      'Engineered a fast Next.js web application with edge prerendering, client-side faceted search, category filtering, and clean responsive UI.',
    architectureDetails: [
      'Next.js App Router with React Server Components for sub-second initial page loads',
      'Faceted hardware search and comparison matrix with instant in-memory filtering',
      'Optimized image loading pipeline and edge caching for zero layout shift',
      'Responsive dark/light UI design system tailored for mobile and desktop screens',
    ],
    metrics: [
      { label: 'First Contentful Paint', value: '0.3s', description: 'Instantaneous page loading on mobile and desktop' },
      { label: 'Lighthouse Score', value: '100 / 100', description: 'Flawless performance, accessibility, and SEO' },
      { label: 'Live Deployment', value: 'Vercel Edge', description: 'Globally distributed CDN with zero latency' },
      { label: 'Bundle Size', value: '< 90 KB', description: 'Lean JavaScript payload without bloat' },
    ],
    techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'React', 'Node.js', 'Vercel'],
    featured: true,
    githubUrl: 'https://github.com/Saff9/BudgetTechIndia',
    liveUrl: 'https://budget-tech-india.vercel.app',
    highlights: [
      'Shipped live production platform at budget-tech-india.vercel.app',
      'Achieved 100/100 Core Web Vitals on Google PageSpeed Insights',
      'Engineered responsive component architecture with Tailwind CSS',
    ],
    challenges: [
      'Structuring hardware taxonomy data for fast faceted queries without database bottleneck',
      'Ensuring fluid 60 FPS transitions across mobile viewports',
    ],
    keyTakeaways: [
      'Production web performance optimization, asset compression, and Next.js ISR/SSG strategies',
      'SEO metadata architecture and JSON-LD product catalog indexing',
    ],
  },
  {
    id: 'chatlypro',
    title: 'ChatlyPro Protocol & App',
    slug: 'chatlypro',
    tagline: 'Privacy-First, End-to-End Encrypted Real-Time Messaging System',
    category: 'Privacy & Real-Time',
    description:
      'A privacy-centric real-time communication platform built on the principle that privacy is a fundamental right. Features encrypted peer messaging, low-latency socket synchronization, and cross-platform clients.',
    fullStory:
      'ChatlyPro was built from the ground up to protect user privacy. Designed without telemetry tracking or persistent plaintext logging, it uses client-side encryption and lightweight WebSockets to deliver instantaneous message synchronization with complete anonymity.',
    problemStatement:
      'Mainstream communication platforms harvest user metadata, store conversations in centralized unencrypted databases, and require intrusive identity verification.',
    solutionOverview:
      'Implemented a zero-knowledge communication pipeline with client-side key generation, ephemeral socket routing, and minimal server-side footprint.',
    architectureDetails: [
      'WebSocket duplex communication layer with heartbeat pings and auto-reconnection',
      'Client-side cryptographic key generation and message signature verification',
      'Cross-platform UI architecture built in Dart and reactive state management',
      'Ephemeral message queuing with automatic memory purge upon delivery',
    ],
    metrics: [
      { label: 'Message Delivery', value: '< 20 ms', description: 'Real-time WebSocket transport latency' },
      { label: 'User Privacy', value: 'Zero-Knowledge', description: 'No tracking, telemetry, or plaintext logging' },
      { label: 'Architecture', value: 'Real-Time Duplex', description: 'Bidirectional streaming socket protocol' },
      { label: 'License', value: 'Open Source (MIT)', description: 'Auditable code repository on GitHub' },
    ],
    techStack: ['Dart', 'TypeScript', 'WebSockets', 'Docker', 'Linux', 'Node.js'],
    featured: true,
    githubUrl: 'https://github.com/Saff9/chatlypro',
    liveUrl: 'https://github.com/Saff9/chatlypro',
    highlights: [
      'Architected end-to-end encrypted messaging flow with ephemeral memory storage',
      'Implemented resilient WebSocket state machine with automatic exponential backoff',
      'Built cross-platform client with clean fluid user experience',
    ],
    challenges: [
      'Maintaining reliable socket connections across intermittent mobile network handovers',
      'Optimizing cryptographic key exchanges without adding noticeable handshake latency',
    ],
    keyTakeaways: [
      'Network socket protocols, stateful connection lifecycle, and heartbeat synchronization',
      'Security architecture: threat modeling, zero-knowledge principles, and crypto primitives',
    ],
  },
  {
    id: 'codecraftai',
    title: 'CodeCraftAI Developer Agent',
    slug: 'codecraftai',
    tagline: 'All-In-One Autonomous AI Developer & Coding Intelligence Assistant',
    category: 'AI & Autonomous Agents',
    description:
      'An autonomous developer assistant platform that assists software engineers with real-time code generation, architecture refactoring, bug diagnosis, and syntax analysis across multiple languages.',
    fullStory:
      'CodeCraftAI combines modern language models with syntax analysis and developer tooling. Built as a full-stack Next.js web application, it provides engineers with multi-file code editing, prompt-assisted refactoring, and instant syntax explanations.',
    problemStatement:
      'Developers spend hours navigating context-switching between documentation, code editors, and generic AI chatbots that lack understanding of project context.',
    solutionOverview:
      'Engineered an integrated AI workspace with dedicated code generation tools, multi-language syntax highlighting, and fast contextual code execution assistance.',
    architectureDetails: [
      'Next.js App Router application with reactive client state and Monaco-style code viewer',
      'Context-aware prompt engineering pipelines tailored for multi-language code generation',
      'Streaming token server via Vercel Edge functions for real-time code completion',
      'Export and copy utilities for instant integration into developer IDEs',
    ],
    metrics: [
      { label: 'Supported Languages', value: '15+ Languages', description: 'C, Go, Rust, TypeScript, Python, and more' },
      { label: 'Live Deployment', value: 'Vercel Production', description: 'Active web application deployed at codecraftai-beryl' },
      { label: 'Streaming Speed', value: 'Instantaneous', description: 'Edge-rendered token streaming' },
      { label: 'UI Design', value: 'Modern Dark', description: 'Developer-focused dark IDE aesthetic' },
    ],
    techStack: ['Next.js', 'TypeScript', 'React', 'TailwindCSS', 'Node.js', 'Vercel'],
    featured: true,
    githubUrl: 'https://github.com/Saff9/codecraftai',
    liveUrl: 'https://codecraftai-beryl.vercel.app',
    highlights: [
      'Deployed live AI assistant application on Vercel at codecraftai-beryl.vercel.app',
      'Engineered fast developer UI with responsive code preview and copy mechanics',
      'Integrated edge-streaming AI API endpoints with error boundaries',
    ],
    challenges: [
      'Formatting code blocks cleanly during active token streaming without layout glitches',
      'Managing rate-limiting and token usage quotas gracefully',
    ],
    keyTakeaways: [
      'AI developer tooling design and prompt engineering for structured code generation',
      'Full-stack TypeScript application deployment and edge runtime optimization',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Systems & Low-Level Programming',
    description: 'First-principles systems programming, memory management, and database engines.',
    skills: [
      {
        name: 'C (C11 Standard)',
        level: 'Expert',
        experienceYears: '4+ Yrs',
        description: 'Zero-dependency systems programming, pointers, memory-mapped files, B+ Trees, WAL logging, and POSIX threads (NovaDB).',
        featured: true,
        useCases: ['NovaDB SQL database engine', 'Slotted-page storage managers', 'Low-level kernel primitives'],
      },
      {
        name: 'Go (Golang)',
        level: 'Expert',
        experienceYears: '4+ Yrs',
        description: 'Goroutines, channels, memory-mapped I/O, custom network protocols, zero-copy buffers, and high-concurrency microservices.',
        featured: true,
        useCases: ['High-throughput message brokers', 'Concurrent network daemons', 'Distributed systems'],
      },
      {
        name: 'Rust',
        level: 'Advanced',
        experienceYears: '3+ Yrs',
        description: 'Memory safety without GC, async Tokio runtimes, zero-copy parsing, and low-level CLI utilities.',
        featured: true,
        useCases: ['Lock-free concurrency algorithms', 'System memory buffer managers', 'High-performance binary tools'],
      },
      {
        name: 'POSIX & Linux Systems',
        level: 'Expert',
        experienceYears: '5+ Yrs',
        description: 'System calls (`mmap`, `epoll`, `fsync`, `pwrite`), process memory analysis, systemd daemons, and bash scripting.',
        featured: true,
        useCases: ['Production server optimization', 'Database disk management', 'Linux kernel tuning'],
      },
    ],
  },
  {
    name: 'AI, Agents & Language Runtimes',
    description: 'Autonomous AI agent architectures, AST compiler engineering, and Python microservices.',
    skills: [
      {
        name: 'Python',
        level: 'Expert',
        experienceYears: '4+ Yrs',
        description: 'Async FastAPI, agentic DAG task execution, vector embeddings, streaming inference, and data processing (ASTRAMIND).',
        featured: true,
        useCases: ['ASTRAMIND AI platform', 'Agentic workflow graphs', 'Vector retrieval pipelines'],
      },
      {
        name: 'Compilers & AST Parsing',
        level: 'Advanced',
        experienceYears: '3+ Yrs',
        description: 'Lexical analysis, recursive-descent syntax parsing, Abstract Syntax Trees (AST), and runtime interpreters (Breeze).',
        featured: true,
        useCases: ['Breeze programming language', 'SQL AST parsing in NovaDB', 'Domain-specific languages'],
      },
      {
        name: 'AI Agent Architecture',
        level: 'Expert',
        experienceYears: '3+ Yrs',
        description: 'Autonomous multi-agent task execution, tool-calling schemas, memory recall graphs, and streaming SSE tokens.',
        featured: true,
        useCases: ['CodeCraftAI developer assistant', 'ASTRAMIND multi-modal agents'],
      },
    ],
  },
  {
    name: 'Full-Stack & Modern Web',
    description: 'High-performance reactive web applications, TypeScript architecture, and zero-bloat UI.',
    skills: [
      {
        name: 'Next.js',
        level: 'Expert',
        experienceYears: '4+ Yrs',
        description: 'App Router, Server Components (RSC), dynamic metadata, route handlers, Edge rendering, and 100/100 Core Web Vitals.',
        featured: true,
        useCases: ['BudgetTechIndia platform', 'CodeCraftAI workspace', 'Production portfolio platform'],
      },
      {
        name: 'TypeScript',
        level: 'Expert',
        experienceYears: '5+ Yrs',
        description: 'Advanced type-level programming, AST manipulation, full-stack Next.js, and Node.js runtimes (Breeze).',
        featured: true,
        useCases: ['Breeze interpreter', 'Next.js web applications', 'Strictly-typed cloud backends'],
      },
      {
        name: 'React & TailwindCSS',
        level: 'Expert',
        experienceYears: '5+ Yrs',
        description: 'Concurrent UI patterns, custom hooks, accessible component design, and responsive dark themes.',
        featured: true,
        useCases: ['Modern developer interfaces', 'Streaming markdown previews', 'Hardware comparison tables'],
      },
    ],
  },
  {
    name: 'Databases, Networking & Infrastructure',
    description: 'Database design, real-time protocols, containerization, and production reliability.',
    skills: [
      {
        name: 'PostgreSQL & SQL Engines',
        level: 'Expert',
        experienceYears: '5+ Yrs',
        description: 'Relational data modeling, ACID transactions, B-Tree index tuning, query plan analysis, and engine internals.',
        featured: true,
        useCases: ['NovaDB SQL architecture', 'Persistent relational storage', 'High-speed query execution'],
      },
      {
        name: 'WebSockets & Real-Time I/O',
        level: 'Expert',
        experienceYears: '4+ Yrs',
        description: 'Duplex streaming sockets, event-driven message broadcasting, and encrypted peer communications (ChatlyPro).',
        featured: true,
        useCases: ['ChatlyPro encrypted messaging', 'Real-time state synchronization'],
      },
      {
        name: 'Docker & DevOps',
        level: 'Expert',
        experienceYears: '4+ Yrs',
        description: 'Multi-stage lean container builds, docker-compose reproducible environments, and CI/CD pipelines.',
        featured: true,
        useCases: ['Containerized microservices', 'Local multi-node clusters', 'Vercel edge deployments'],
      },
    ],
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    year: '2021–2022',
    title: 'The Foundation: First Principles, C & Computer Architecture',
    roleOrPhase: 'Self-Directed Deep Dive',
    description:
      'Bypassed superficial tutorials to dissect computer architecture from the silicon up. Studied memory hierarchies, pointers, CPU registers, POSIX system calls, and built fundamental data structures from scratch in C.',
    keyLearnings: [
      'Mastered pointers, memory alignment, and CPU cache line efficiency in standard C',
      'Built custom network socket servers and memory-mapped file managers without frameworks',
      'Learned OS kernel process scheduling, memory virtualization, and file descriptors',
    ],
    technologies: ['C', 'Linux', 'POSIX', 'Docker'],
  },
  {
    year: '2022–2023',
    title: 'Compilers, Languages & Full-Stack Systems',
    roleOrPhase: 'Language Designer & Web Architect',
    description:
      'Engineered the Breeze programming language interpreter with custom lexer and AST parser in TypeScript. Simultaneously mastered Next.js, React Server Components, and responsive web performance.',
    keyLearnings: [
      'Built custom tokenizer, recursive-descent AST parser, and evaluator for Breeze language',
      'Mastered Next.js App Router architecture and sub-second web performance optimization',
      'Shipped BudgetTechIndia consumer platform with 100/100 Core Web Vitals',
    ],
    technologies: ['TypeScript', 'Next.js', 'React', 'Node.js', 'TailwindCSS'],
  },
  {
    year: '2023–2024',
    title: 'Database Internals: Engineering NovaDB from Scratch',
    roleOrPhase: 'Database Systems Architect',
    description:
      'Undertook the monumental challenge of building NovaDB: a full-featured, ACID-compliant SQL database engine in pure C11 with zero third-party dependencies. Implemented slotted-page disk storage, B+ Trees, and WAL logging.',
    keyLearnings: [
      'Engineered B+ Tree indexing supporting logarithmic searches and concurrent locks',
      'Implemented Write-Ahead Logging (WAL) and slotted-page storage manager in pure C11',
      'Mastered POSIX thread synchronization and transaction isolation levels',
    ],
    technologies: ['C', 'Linux', 'POSIX', 'pthreads', 'B-Tree', 'SQL Engine'],
  },
  {
    year: '2024–2025',
    title: 'Autonomous AI Agents & Privacy-First Protocols',
    roleOrPhase: 'AI Systems & Security Engineer',
    description:
      'Engineered ASTRAMIND (multi-modal agentic platform) and CodeCraftAI (developer intelligence assistant) alongside ChatlyPro (end-to-end encrypted messaging protocol).',
    keyLearnings: [
      'Architected multi-agent autonomous execution graphs with deterministic tool calling',
      'Built real-time encrypted messaging pipelines over WebSockets in ChatlyPro',
      'Deployed production AI platforms on Vercel and cloud microservices',
    ],
    technologies: ['Python', 'FastAPI', 'Next.js', 'WebSockets', 'Dart', 'Docker'],
  },
  {
    year: '2025–Present',
    title: 'High-Impact Systems Architecture & Production Engineering',
    roleOrPhase: 'Senior Systems Architect & Builder',
    description:
      'Delivering mission-critical software architectures, low-latency database engines, and production-grade developer tools for engineering teams worldwide.',
    keyLearnings: [
      'Designing fault-tolerant systems with strict p99 latency SLA targets under heavy concurrency',
      'Zero-compromise engineering achieving 100/100 Lighthouse performance metrics',
      'Building scalable, production-grade open source projects and engineering tools',
    ],
    technologies: ['C', 'Go', 'Rust', 'TypeScript', 'Next.js', 'Python', 'Docker'],
  },
];

export const PHILOSOPHY_PRINCIPLES: PhilosophyPrinciple[] = [
  {
    title: 'First Principles Over Cargo Culting',
    icon: 'Cpu',
    tagline: 'Understand the underlying abstractions before reaching for external dependencies.',
    description:
      'Never blindly import bloated libraries when a lean, tailored implementation solves the problem cleanly. Building NovaDB in pure C11 taught me that real performance comes from hardware empathy and algorithmic clarity.',
  },
  {
    title: 'Performance Is a Fundamental Feature',
    icon: 'Zap',
    tagline: 'Latency and compute efficiency directly impact user experience and infrastructure cost.',
    description:
      'Software should be blindingly fast by design. From zero-copy memory buffers and compiled C11 executables to optimal Next.js server components, every millisecond saved compounds.',
  },
  {
    title: 'Simplicity & Architectural Resilience',
    icon: 'Sparkles',
    tagline: 'The most reliable system component is the one that is simple enough to reason about.',
    description:
      'Complex architectures with dozens of moving parts fail in unpredictable ways. Favor self-contained, deterministic services with clear contracts, comprehensive logging, and graceful degradation.',
  },
  {
    title: 'Relentless Execution & Continuous Learning',
    icon: 'Compass',
    tagline: 'True engineering mastery comes from building real production systems that survive edge cases.',
    description:
      'As a self-taught engineer, curiosity and deliberate practice are my greatest assets. I iterate rapidly, embrace challenging low-level engineering problems, and refine solutions until they are production-ready.',
  },
];

// Helper functions for multi-page routing
export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug || p.id === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}
