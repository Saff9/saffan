// ============================================================
// Projects — Saffan's shipped systems & technical case studies
// ============================================================

import type { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'streamboard',
    title: 'StreamBoard',
    slug: 'streamboard',
    tagline: 'Real-time telemetry and analytics platform with WebSocket streaming and high-frequency delta rendering.',
    tone: 'deep',
    category: 'Full-Stack & Platforms',
    year: '2024',
    fullStory:
      'StreamBoard was designed to solve a very specific problem: monitoring high-throughput telemetry data without turning the browser UI into a laggy slide-deck. We needed to stream hundreds of metrics every second over WebSockets, compute live rollups, and update canvas-based time-series charts at 60fps. The primary engineering bottleneck was DOM thrashing during state floods. By introducing virtualized rendering buffers, throttling redraw cycles to browser animation frames, and diffing series deltas rather than replacing entire datasets, the interface maintains seamless interactivity even under sustained load.',
    problemStatement:
      'High-frequency telemetry dashboards frequently choke the client main thread with continuous React state updates and heavy SVG re-renders, causing dropped frames and laggy controls.',
    solution:
      'Built a hybrid architecture: FastAPI and Redis manage asynchronous WebSocket ingestion with a sliding backpressure queue on the server, while a Next.js client renders virtualized metric tables and uses WebGL/Canvas differential drawing for 60fps charts.',
    architectureDetails: [
      'Next.js App Router separating static operational chrome from isolated client telemetry widgets.',
      'FastAPI async backend handling concurrent WebSocket connections with low per-client overhead.',
      'Sliding-window buffer on the server dropping stale metric points if a client connection experiences network stalls.',
      'Differential chart engine calculating dirty bounding boxes before repainting data series.',
      'Virtualized metric lists rendering only in-viewport rows to eliminate DOM node bloat.',
      'Redis Pub/Sub distributing incoming telemetry spikes across multiple worker processes.',
    ],
    metrics: [
      { label: 'Throughput', value: '250+ evt/s', note: 'Sustained per dashboard instance' },
      { label: 'Frame rate', value: '60 fps', note: 'Smooth 16ms render loop' },
      { label: 'p99 latency', value: '< 45ms', note: 'Server ingestion to client paint' },
      { label: 'Lighthouse', value: '98/100', note: 'Initial bundle & performance audit' },
    ],
    techStack: ['Next.js', 'React', 'Tailwind', 'FastAPI', 'Python', 'Redis', 'WebSocket'],
    githubUrl: 'https://github.com/Saff9',
    highlights: [
      'Engineered a non-blocking WebSocket stream pipeline supporting high-frequency telemetry.',
      'Implemented custom canvas differential repainting for zero-jank time-series graphs.',
      'Eliminated DOM pressure using viewport virtualization and frame-budgeted scheduling.',
    ],
    challenges: [
      'Preventing React re-renders from bogging down during concurrent metric bursts—solved with atomic ref-based canvas updates.',
      'Safeguarding the server event loop when clients experience network hiccups through active backpressure dropping.',
    ],
  },
  {
    id: 'agentflow',
    title: 'AgentFlow',
    slug: 'agentflow',
    tagline: 'Interactive graph-based visual orchestration studio for designing, debugging, and deploying multi-step autonomous AI workflows.',
    tone: 'problem',
    category: 'AI & Autonomous Agents',
    year: '2024',
    fullStory:
      'When building AI agent pipelines, managing manual tool wiring, structured retry policies, and state persistence in disparate scripts quickly becomes cumbersome. I built AgentFlow to make agent workflows transparent and visual. It provides an intuitive canvas where you can drag LLM models, custom API tools, condition branches, and persistent memory nodes together. The graph compiles into an executable JSON DAG that runs on a sandboxed backend, streaming execution states and intermediate tool outputs back to the user in real time via Server-Sent Events.',
    problemStatement:
      'Chaining autonomous LLMs with arbitrary external tools and stateful memory requires repetitive boilerplate and offers poor visibility into why an agent branched or failed.',
    solution:
      'Created an interactive node graph editor on the frontend connected to an Express execution engine that traverses DAG nodes, validates JSON Schema contracts, executes tool calls, and streams execution logs over SSE.',
    architectureDetails: [
      'Custom React canvas engine supporting pan, zoom, drag-and-drop, and cubic Bezier edge rendering.',
      'Express TypeScript execution engine executing nodes topological-order with conditional branch pruning.',
      'Real-time streaming via Server-Sent Events, visualizing step execution and token generation as they happen.',
      'Strict JSON Schema validation for tool inputs, auto-generating dynamic UI form inspectors on node selection.',
      'Redis-backed session memory nodes with TTL-based conversation state preservation.',
    ],
    metrics: [
      { label: 'Node library', value: '12 types', note: 'LLM, tools, routers, memory, HTTP' },
      { label: 'Stream TTFT', value: '< 350ms', note: 'Time to first token over SSE' },
      { label: 'Type safety', value: '100%', note: 'End-to-end Zod & TypeScript schemas' },
      { label: 'Lighthouse', value: '99/100', note: 'Fast first paint and crisp UI' },
    ],
    techStack: ['Next.js', 'React', 'Tailwind', 'Express', 'TypeScript', 'Redis', 'AI Agents'],
    githubUrl: 'https://github.com/Saff9',
    highlights: [
      'Visual workflow compiler converting node graphs into deterministic backend execution plans.',
      'Live execution feedback showing node status, intermediate tool arguments, and output streams.',
      'Dynamic schema inspector generating strongly-typed input forms directly from tool declarations.',
    ],
    challenges: [
      'Maintaining 60fps canvas panning and dragging while dozens of SVG connectors and DOM nodes are active.',
      'Coordinating asynchronous tool execution where downstream nodes must wait for streaming LLM outputs to parse.',
    ],
  },
  {
    id: 'devport',
    title: 'DevPort',
    slug: 'devport',
    tagline: 'Minimalist developer portfolio builder featuring instant live-preview editing, zero-config themes, and one-click Vercel deployment.',
    tone: 'results',
    category: 'Full-Stack & Platforms',
    year: '2023',
    fullStory:
      'Most developer portfolio starters force you to choose between two extremes: a generic static template that requires cloning and manually editing raw markdown files, or a complex CMS that feels like overkill. DevPort bridges that gap. It gives developers a sleek, split-screen live preview where they can enter their projects, skills, and personal story, preview responsive themes in real time, and immediately trigger a one-click deployment to Vercel via their API.',
    problemStatement:
      'Engineers frequently postpone creating a personal portfolio because setting up custom design, hosting configurations, and CMS integrations takes time away from actual coding.',
    solution:
      'A zero-friction builder built with Next.js App Router and Tailwind CSS. State is managed locally with URL-safe serialization, allowing developers to craft their portfolio and deploy in under five minutes.',
    architectureDetails: [
      'Split-screen live editing with synchronized mobile, tablet, and desktop viewports.',
      'State encoded into compressed URL hashes, enabling frictionless sharing without requiring a central database.',
      'Integration with the Vercel REST API for automated repository creation and instant production builds.',
      '5 hand-crafted minimalist developer themes with seamless dark and light mode adaptation.',
    ],
    metrics: [
      { label: 'Lighthouse', value: '100/100', note: 'Perfect scores across all categories' },
      { label: 'First load JS', value: '< 75 KB', note: 'Zero runtime bloat or heavy client dependencies' },
      { label: 'Deploy time', value: '< 60s', note: 'From click to live HTTPS URL' },
      { label: 'Themes', value: '5 designs', note: 'Modern, terminal, editorial, notebook, split' },
    ],
    techStack: ['Next.js', 'React', 'Tailwind', 'TypeScript', 'Vercel'],
    githubUrl: 'https://github.com/Saff9',
    highlights: [
      'Immediate visual feedback with live DOM updates on every keystroke.',
      'Streamlined deployment pipeline directly hooking into cloud hosting APIs.',
      'Ultra-lightweight static outputs guaranteeing perfect Google Web Vitals.',
    ],
    challenges: [
      'Ensuring large portfolio data payloads fit within URL length limits—engineered a deflate compression fallback.',
      'Designing flexible theme abstractions that seamlessly handle diverse content lengths without breaking layouts.',
    ],
  },
  {
    id: 'apiforge',
    title: 'APIForge',
    slug: 'apiforge',
    tagline: 'Production-ready FastAPI microservice foundation featuring async SQLAlchemy 2.0, Redis rate limiting, JWT auth, and Docker setup.',
    tone: 'essay',
    category: 'Full-Stack & Platforms',
    year: '2024',
    fullStory:
      'Every time you spin up a new backend service, you end up writing the exact same 300 lines of structural boilerplate: configuring asynchronous database sessions, setting up Alembic migrations, implementing secure password hashing and JWT refresh cycles, tuning Redis-backed sliding-window rate limiters, and formatting OpenAPI schemas. APIForge is my curated foundation that encapsulates modern Python backend best practices into a clean, modular repository.',
    problemStatement:
      'Building production APIs in Python often suffers from inconsistent async session handling, unvalidated inputs, and ad-hoc authentication patterns.',
    solution:
      'An enterprise-grade starter template pairing FastAPI with asyncpg, SQLAlchemy 2.0 declarative models, structured structlog logging, automatic OpenAPI documentation, and containerized Docker Compose environments.',
    architectureDetails: [
      'Async SQLAlchemy 2.0 with connection pooling tuned for concurrent web workers.',
      'Stateless JWT authentication paired with rotating refresh tokens stored in Redis.',
      'Sliding-window rate limiting middleware preventing API abuse using atomic Redis Lua scripts.',
      'Multi-stage Dockerfile optimized for minimal production image sizes and rapid caching.',
      'Comprehensive test suite using pytest-asyncio and HTTPX for integration testing.',
    ],
    metrics: [
      { label: 'Prebuilt routes', value: '18 endpoints', note: 'Auth, users, health, metrics, admin' },
      { label: 'Test coverage', value: '92%', note: 'Full integration & unit test suite' },
      { label: 'Boot time', value: '< 1.5s', note: 'Fast container startup & migration checks' },
      { label: 'License', value: 'MIT', note: 'Free and open for commercial or personal use' },
    ],
    techStack: ['FastAPI', 'Python', 'PostgreSQL', 'Redis', 'Docker'],
    githubUrl: 'https://github.com/Saff9',
    highlights: [
      'True async I/O pipeline using asyncpg for maximum database throughput.',
      'Hardened authentication flow with token revocation and role-based access control.',
      'Automated OpenAPI docs with rich request/response examples and error schemas.',
    ],
    challenges: [
      'Managing SQLAlchemy async sessions correctly across nested background tasks without thread leakage.',
      'Designing sliding-window rate limiting algorithms that stay accurate across distributed workers without race conditions.',
    ],
  },
  {
    id: 'chatai',
    title: 'ChatAI',
    slug: 'chatai',
    tagline: 'High-performance conversational AI interface with real-time SSE token streaming, direct-to-S3 document ingestion, and custom tool executions.',
    tone: 'problem',
    category: 'AI & Autonomous Agents',
    year: '2024',
    fullStory:
      'Chat interfaces frequently feel rigid when they can only exchange plain text. ChatAI was built to explore how a modern conversational interface should handle richer interactions: rendering tokens in real time without UI jumping, parsing markdown code snippets on the fly, and enabling the model to invoke external tools (such as live web search, code execution, or math evaluation) without terminating the streaming transport.',
    problemStatement:
      'Standard chat UIs struggle with token flickering, handle markdown parsing poorly during active streams, and lack seamless tool-call feedback loops.',
    solution:
      'A Next.js frontend with an incremental markdown stream parser connected to a TypeScript Express backend that orchestrates LLM function calling and client status updates over an uninterrupted SSE stream.',
    architectureDetails: [
      'Incremental token streaming utilizing Server-Sent Events over HTTP/2.',
      'Client-side stream buffer parsing incomplete markdown tags and code fences smoothly without layout shift.',
      'Direct-to-S3 file uploads using secure presigned URLs, bypassing application server memory limits.',
      'Extensible tool registry where functions declare typed parameters and receive execution callbacks.',
      'Redis caching for conversation memory with automatic expiration policies.',
    ],
    metrics: [
      { label: 'TTFT', value: '< 280ms', note: 'Streaming latency over HTTP/2' },
      { label: 'Available tools', value: '8 built-in', note: 'Web search, arithmetic, code runner, data extraction' },
      { label: 'Upload capacity', value: '25 MB', note: 'Direct presigned S3 pipeline' },
      { label: 'Audit score', value: '99/100', note: 'Accessibility, best practices, and speed' },
    ],
    techStack: ['Next.js', 'React', 'Tailwind', 'Express', 'TypeScript', 'Redis', 'AI Agents'],
    githubUrl: 'https://github.com/Saff9',
    highlights: [
      'Smooth streaming markdown parser that handles partial syntax tokens without visual glitches.',
      'Interactive tool invocation cards showing arguments and real-time execution outputs.',
      'Presigned upload architecture keeping heavy file binary streams off the API server.',
    ],
    challenges: [
      'Managing partial JSON chunks emitted during streaming tool calls before the complete arguments finish generating.',
      'Maintaining scroll pinning while long responses stream in, without hijacking user scroll intentions.',
    ],
  },
  {
    id: 'shiplink',
    title: 'ShipLink',
    slug: 'shiplink',
    tagline: 'High-speed URL management and click analytics engine with custom domain routing and sub-200ms materialized metric queries.',
    tone: 'results',
    category: 'Full-Stack & Platforms',
    year: '2023',
    fullStory:
      'ShipLink is an open-source link management service built for developers and marketing teams who require branded custom domains and detailed geographic click analytics. Instead of relying on slow real-time table scans for analytics queries, ShipLink utilizes PostgreSQL materialized views and Redis caching to ensure redirection happens under 15ms while dashboard analytics load instantly even across millions of records.',
    problemStatement:
      'Link shorteners often suffer from slow redirects or cumbersome dashboards that grind to a halt as click logs accumulate.',
    solution:
      'Built a low-latency redirection proxy with an Express API, PostgreSQL database with automated materialized aggregation views, and a Next.js administrative dashboard.',
    architectureDetails: [
      'Redirection endpoint optimized with Redis in-memory lookup achieving single-digit millisecond latency.',
      'Materialized views in PostgreSQL refreshed asynchronously to serve complex analytical aggregations.',
      'Custom domain support utilizing automated SSL certificate provisioning through Vercel API hooks.',
      'API authentication using cryptographic API keys with sliding-window rate limits.',
    ],
    metrics: [
      { label: 'Redirect latency', value: '< 15ms', note: 'Redis edge cache hit' },
      { label: 'Analytics speed', value: '< 180ms', note: 'Materialized aggregation queries' },
      { label: 'Lighthouse', value: '100/100', note: 'Clean and lightweight dashboard' },
      { label: 'Throughput', value: '5,000 req/s', note: 'Benchmarked on single small node' },
    ],
    techStack: ['Next.js', 'React', 'Tailwind', 'Express', 'TypeScript', 'PostgreSQL'],
    githubUrl: 'https://github.com/Saff9',
    highlights: [
      'Ultra-low-latency link redirects backed by in-memory Redis caching.',
      'Instant dashboard analytics powered by background materialized rollups.',
      'Automated custom domain verification and SSL provisioning.',
    ],
    challenges: [
      'Handling sudden viral traffic spikes without database connection exhaustion—mitigated by Redis caching and connection pool tuning.',
      'Keeping click aggregations up to date without locking analytics tables during heavy write activity.',
    ],
  },
];
