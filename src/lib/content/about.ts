// ============================================================
// About + page intros — Saffan's personal philosophy & values
// ============================================================

import type { AboutFacet, SoulItem } from './types';

export const ABOUT_FACETS: AboutFacet[] = [
  {
    role: 'How I build',
    blurb: 'I pair Next.js and TypeScript on the client with FastAPI or Express on the server. I keep architectures modular and state predictable.',
  },
  {
    role: 'What I focus on',
    blurb: 'Fast landing experiences, responsive dashboards, reliable REST/WebSocket backends, and practical AI agent integrations.',
  },
  {
    role: 'My view on AI',
    blurb: 'A chatbot that just summarizes text is rarely useful. Real value happens when models have strict schemas, functions to execute, and structured outputs.',
  },
  {
    role: 'Engineering speed',
    blurb: 'Performance is UX. I target 95+ Lighthouse scores by default—leveraging Server Components, minimal client JS, and edge caching.',
  },
  {
    role: 'How I learn',
    blurb: 'I study open-source source code directly. Documentation gives you the happy path; the actual source reveals edge cases and how things truly tick.',
  },
  {
    role: 'Quality & Craft',
    blurb: 'I care about clean TypeScript types, consistent design tokens, and smooth keyboard navigation. Small details define whether software feels premium.',
  },
];

export const SOUL_FUEL: SoulItem[] = [
  { title: 'Shipping early', body: 'A deployed project in real hands teaches tenfold more than theoretical architecture locked in a draft branch.' },
  { title: 'Sub-second UX', body: 'Software should feel as tactile and responsive as physical tools. Sluggish interfaces pull users out of flow.' },
  { title: 'Practical autonomy', body: 'Giving LLMs deterministic tools—databases, HTTP APIs, file readers—transforms them from toys into real force multipliers.' },
];

export const NERD_OUTS: SoulItem[] = [
  { title: 'Event streaming', body: 'Exploring SSE vs WebSockets, streaming markdown tokens, and handling backpressure without locking UI threads.' },
  { title: 'Next.js internals', body: 'Understanding Server Component serialization, hydration boundaries, and caching layers at the runtime level.' },
  { title: 'Agent orchestration', body: 'Designing clean tool registries, context window eviction, and structured retry logic for multi-step reasoning.' },
  { title: 'Core Web Vitals', body: 'Tracking LCP, INP, and CLS down to the exact asset bottlenecks and minimizing main-thread blocking time.' },
];

export const ENERGY_SOURCES: SoulItem[] = [
  { title: 'Real user feedback', body: 'Watching actual users interact with something you built and noticing where they glide or stumble.' },
  { title: 'Tight collaboration', body: 'Working closely with founders and builders who value direct communication, clear goals, and rapid iteration.' },
  { title: 'De-tangling complexity', body: 'Taking a messy workflow, breaking it down into fundamental invariants, and turning it into a simple, maintainable API.' },
  { title: 'Continuous craft', body: 'Looking back at code written six months ago and knowing you understand systems significantly better today.' },
];

export const WORK_INTRO = {
  eyebrow: 'Portfolio',
  title: 'Selected Work',
  subtitle: 'Full-stack applications, real-time dashboards, and autonomous agent systems built from first principles.',
};

export const STACK_INTRO = {
  eyebrow: 'Technologies',
  title: 'Tech Stack & Tools',
  subtitle: 'The languages, frameworks, and infrastructure I rely on daily to ship reliable, high-performance software.',
};
