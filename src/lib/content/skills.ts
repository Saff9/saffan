// ============================================================
// Skills — Saffan's core engineering competencies & tools
// ============================================================

import type { SkillCategory } from './types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Frontend Engineering',
    blurb: 'Modern web user interfaces with strict types, responsive layouts, and zero-jank frame rates.',
    skills: [
      {
        name: 'Next.js',
        level: 'Advanced',
        years: '2 yrs',
        note: 'App Router, Server Components, streaming SSR, edge middleware, and static generation.',
        shipped: ['StreamBoard', 'DevPort', 'ChatAI', 'This site'],
      },
      {
        name: 'React',
        level: 'Advanced',
        years: '3 yrs',
        note: 'Hooks, concurrent features, memoization boundaries, ref-based animations, and custom canvas UIs.',
        shipped: ['StreamBoard', 'DevPort', 'AgentFlow'],
      },
      {
        name: 'TypeScript',
        level: 'Advanced',
        years: '3 yrs',
        note: 'Strict mode, discriminated unions, generic type inference, and runtime Zod validation.',
        shipped: ['Every project'],
      },
      {
        name: 'Tailwind CSS',
        level: 'Advanced',
        years: '2 yrs',
        note: 'Utility-first styling, design token systems, fluid typography, dark mode, and custom animations.',
        shipped: ['StreamBoard', 'DevPort', 'ChatAI', 'This site'],
      },
    ],
  },
  {
    name: 'Backend & Systems',
    blurb: 'High-throughput APIs, streaming endpoints, and scalable microservices.',
    skills: [
      {
        name: 'FastAPI',
        level: 'Proficient',
        years: '1.5 yrs',
        note: 'Async Python, Pydantic v2 schemas, WebSocket streaming, and automated OpenAPI documentation.',
        shipped: ['APIForge', 'StreamBoard'],
      },
      {
        name: 'Node.js & Express',
        level: 'Advanced',
        years: '3 yrs',
        note: 'Non-blocking I/O, middleware pipelines, Server-Sent Events, and token authentication.',
        shipped: ['AgentFlow', 'ChatAI', 'ShipLink'],
      },
      {
        name: 'Python',
        level: 'Proficient',
        years: '2 yrs',
        note: 'Async programming, API design, data processing, and integrating modern AI libraries.',
        shipped: ['APIForge', 'StreamBoard'],
      },
    ],
  },
  {
    name: 'AI Engineering & Agents',
    blurb: 'Turning generative models into dependable, tool-executing software agents.',
    skills: [
      {
        name: 'AI Agent Architecture',
        level: 'Proficient',
        years: '1 yr',
        note: 'Function calling schemas, multi-step tool execution, structured outputs, and fallback loops.',
        shipped: ['AgentFlow', 'ChatAI'],
      },
      {
        name: 'LLM Streaming & Integration',
        level: 'Proficient',
        years: '1 yr',
        note: 'Server-Sent Events streaming, real-time markdown parsing, prompt tuning, and token budgeting.',
        shipped: ['AgentFlow', 'ChatAI'],
      },
      {
        name: 'Vector Search & Memory',
        level: 'Proficient',
        years: '1 yr',
        note: 'Semantic embeddings, cosine similarity search, and Redis conversational state management.',
        shipped: ['AgentFlow'],
      },
    ],
  },
  {
    name: 'Databases & Infrastructure',
    blurb: 'Data modeling, caching strategies, and deployment automation.',
    skills: [
      {
        name: 'PostgreSQL',
        level: 'Advanced',
        years: '2 yrs',
        note: 'Relational schema design, indexes, migrations with Alembic/Prisma, and materialized aggregation views.',
        shipped: ['APIForge', 'ShipLink'],
      },
      {
        name: 'Redis',
        level: 'Proficient',
        years: '1.5 yrs',
        note: 'Sub-millisecond key-value caching, Pub/Sub event broadcasting, and sliding-window rate limiters.',
        shipped: ['StreamBoard', 'AgentFlow', 'ChatAI', 'APIForge'],
      },
      {
        name: 'Docker',
        level: 'Proficient',
        years: '1.5 yrs',
        note: 'Multi-stage container builds, local development orchestration via Docker Compose.',
        shipped: ['APIForge', 'StreamBoard'],
      },
      {
        name: 'Vercel & Cloud Deployments',
        level: 'Advanced',
        years: '2 yrs',
        note: 'Edge network deployment, custom domain DNS, preview environments, and continuous delivery.',
        shipped: ['DevPort', 'AgentFlow', 'ChatAI', 'This site'],
      },
    ],
  },
];
