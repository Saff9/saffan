// ============================================================
// Blog — Saffan's engineering notes and architectural case studies
// ============================================================

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'code'; lang: string; code: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  dek: string;
  date: string;       // ISO date (YYYY-MM-DD)
  readTime: string;   // e.g. "5 min"
  tags: string[];
  body: BlogBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'stop-useeffect-fetching',
    title: 'Why I Stopped Using useEffect for Data Fetching',
    dek: 'Next.js App Router and React Server Components fundamentally changed client-side fetching. Here is how I transitioned and what trade-offs remain.',
    date: '2024-11-12',
    readTime: '5 min',
    tags: ['React', 'Next.js', 'Architecture'],
    body: [
      {
        type: 'paragraph',
        text: 'For years, standard React development followed a familiar pattern: declare a useState for data, another for loading, another for error, and wire up an async fetch inside a useEffect hook. We added AbortControllers to silence unmount warnings and hoped the network response landed in the right order.',
      },
      {
        type: 'paragraph',
        text: 'When you step back, fetching initial data in useEffect is inherently suboptimal. It creates an unavoidable waterfall: the browser downloads the HTML, parses the JS bundle, mounts the component, and only then triggers the HTTP request. The user inevitably stares at a loading skeleton even when the server already had immediate access to the database.',
      },
      { type: 'heading', text: 'The Old Client-Side Pattern' },
      {
        type: 'code',
        lang: 'tsx',
        code: `// The classic useEffect fetch pattern with boilerplate
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    fetch(\`/api/users/\${userId}\`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setIsLoading(false);
      });

    return () => controller.abort();
  }, [userId]);

  if (isLoading) return <ProfileSkeleton />;
  return <ProfileCard user={user} />;
}`,
      },
      {
        type: 'paragraph',
        text: 'Beyond the network waterfall, this pattern introduced subtle bugs: rapid prop changes could lead to race conditions if responses resolved out of order, and caching across route navigations required external libraries like TanStack Query or SWR.',
      },
      { type: 'heading', text: 'The Modern Server Component Approach' },
      {
        type: 'code',
        lang: 'tsx',
        code: `// React Server Component: directly await your query on the server
async function UserProfile({ userId }: { userId: string }) {
  // Direct database query without shipping connection strings or ORMs to the client
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) notFound();

  return <ProfileCard user={user} />;
}

// In your page.tsx:
export default async function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <UserProfile userId={userId} />
    </Suspense>
  );
}`,
      },
      {
        type: 'paragraph',
        text: 'By fetching on the server, the initial HTML stream arrives pre-populated with content. There is zero client-side JavaScript sent for the query logic, zero waterfall delay, and search crawlers immediately index complete markup.',
      },
      { type: 'heading', text: 'Pragmatic Trade-Offs' },
      {
        type: 'list',
        items: [
          'Form Mutations: Writing data still requires interactive client handlers. Using React Server Actions with useTransition or useActionState provides a clean bridge, but optimistic UI requires deliberate planning.',
          'Real-time Streams: If data updates every few seconds via WebSockets or polling, you still need a focused client component island.',
          'Cache Invalidation: Next.js aggressive caching can surprise you. I prefer explicit { cache: "no-store" } or targeted revalidatePath calls over relying on implicit global cache heuristics.',
        ],
      },
      {
        type: 'paragraph',
        text: 'My guiding rule today: If data exists at request time and does not change on user input, fetch it in a Server Component. Reserve useEffect strictly for browser-only synchronization—such as listening to window resize, attaching intersection observers, or integrating third-party canvas widgets.',
      },
    ],
  },
  {
    slug: 'sse-vs-websocket',
    title: 'Server-Sent Events vs WebSockets: Choosing the Right Transport',
    dek: 'Both deliver real-time data to browsers, but they serve different architectural needs. Here is how I evaluate when to use SSE versus full-duplex WebSockets.',
    date: '2024-10-28',
    readTime: '6 min',
    tags: ['AI', 'Next.js', 'WebSockets', 'Architecture'],
    body: [
      {
        type: 'paragraph',
        text: 'Whenever I start building a real-time feature—whether it is streaming LLM token generation, live notification feeds, or an operational dashboard—the immediate architectural decision is transport: Server-Sent Events (SSE) or WebSockets?',
      },
      {
        type: 'paragraph',
        text: 'Engineers often gravitate toward WebSockets simply because bidirectional communication sounds more comprehensive. But in production systems, choosing the heavier protocol when a simpler standard solves the problem creates unnecessary maintenance overhead.',
      },
      { type: 'heading', text: 'Understanding the Core Distinction' },
      {
        type: 'paragraph',
        text: 'Server-Sent Events operate over standard HTTP. The client initiates a standard HTTP GET request with an "Accept: text/event-stream" header, and the server keeps the connection open, pushing text frames formatted with "data: ...". It is strictly unidirectional: server to client.',
      },
      {
        type: 'paragraph',
        text: 'WebSockets initiate as an HTTP request and immediately upgrade to an independent full-duplex TCP socket connection. Both client and server can transmit binary or text messages independently at any time.',
      },
      {
        type: 'code',
        lang: 'typescript',
        code: `// Native Server-Sent Events on the browser:
const eventSource = new EventSource('/api/events');

eventSource.onmessage = (event) => {
  const payload = JSON.parse(event.data);
  updateLiveFeed(payload);
};

// Automatic reconnection, exponential backoff, and HTTP/2 multiplexing work natively.`,
      },
      { type: 'heading', text: 'When Server-Sent Events Excel' },
      {
        type: 'list',
        items: [
          'LLM Token Streaming: Large language models generate tokens sequentially. The client requests once, and the server streams tokens until completion. SSE is tailor-made for this.',
          'Live Metric Dashboards: Financial tickers, server telemetry, and status monitors where data only flows downward to the viewer.',
          'Infrastructure Compatibility: Because SSE is standard HTTP, it seamlessly passes through corporate proxies, edge CDNs, and load balancers without requiring custom sticky session routing or TCP upgrade tunneling.',
        ],
      },
      { type: 'heading', text: 'When WebSockets Are Indispensable' },
      {
        type: 'list',
        items: [
          'Collaborative Canvases & Multiplayer: Simultaneous document editing (like Figma) or multiplayer gaming where high-frequency bidirectional updates occur dozens of times per second.',
          'Peer-to-Peer Chat: Interactive messaging where maintaining an open socket avoids the overhead of repeated HTTP request handshakes.',
          'Binary Media Streaming: When you need to stream raw audio or video buffers continuously in both directions.',
        ],
      },
      {
        type: 'quote',
        text: 'If your client is only reading what the server generates, choose Server-Sent Events. If the client sends dozens of messages per minute over the same channel, reach for WebSockets.',
      },
    ],
  },
  {
    slug: 'fastapi-vs-express',
    title: 'FastAPI vs Express: A Pragmatic Production Comparison',
    dek: 'Having built and shipped APIs on both Node.js and Python, here is how their ecosystems, async runtimes, and developer ergonomically compare.',
    date: '2024-09-15',
    readTime: '5 min',
    tags: ['Backend', 'Python', 'FastAPI', 'Node.js', 'Express'],
    body: [
      {
        type: 'paragraph',
        text: 'When choosing an API backend, debates often center around synthetic micro-benchmarks. In practice, both Node.js with Express and Python with FastAPI easily handle tens of thousands of requests per second for standard I/O-bound web traffic. The real differentiation lies in language ergonomics, type safety contracts, and ecosystem integration.',
      },
      { type: 'heading', text: 'The FastAPI Experience: Python with First-Class Types' },
      {
        type: 'code',
        lang: 'python',
        code: `from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel, EmailStr

class ProjectCreate(BaseModel):
    title: str
    slug: str
    budget: int

app = FastAPI(title="Projects API")

@app.post("/projects", status_code=201)
async def create_project(data: ProjectCreate):
    # Pydantic validates payload, generates OpenAPI docs, and provides autocomplete
    project_id = await db.insert_project(data.model_dump())
    return {"id": project_id, **data.model_dump()}`,
      },
      {
        type: 'paragraph',
        text: 'FastAPI shines because type hints are functional, not decorative. Pydantic validates incoming JSON payloads at runtime, serializes outgoing responses, and automatically generates interactive Swagger/OpenAPI documentation at /docs. If your project touches machine learning, vector embeddings, or Python data science libraries, FastAPI provides an effortless bridge.',
      },
      { type: 'heading', text: 'The Express + TypeScript Experience' },
      {
        type: 'code',
        lang: 'typescript',
        code: `import express, { Request, Response } from 'express';
import { z } from 'zod';

const ProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string(),
  budget: z.number().positive(),
});

const app = express();
app.use(express.json());

app.post('/projects', async (req: Request, res: Response) => {
  const result = ProjectSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }
  const project = await db.insert(result.data);
  return res.status(201).json(project);
});`,
      },
      {
        type: 'paragraph',
        text: 'Express paired with TypeScript and Zod yields an exceptionally flexible stack. It gives you complete control over middleware execution, seamless code-sharing with a Next.js frontend (sharing Zod schemas and type definitions between client and server), and access to the vast NPM package registry.',
      },
      { type: 'heading', text: 'My Decision Framework' },
      {
        type: 'list',
        items: [
          'Choose FastAPI when your project integrates ML pipelines, utilizes Python libraries (like PyTorch, LangChain, or Pandas), or when you want zero-boilerplate OpenAPI documentation out of the box.',
          'Choose Express when your frontend is TypeScript and you want end-to-end type safety with shared schemas, or when deploying to edge runtimes with minimal container footprint.',
        ],
      },
    ],
  },
  {
    slug: '98-lighthouse-not-luck',
    title: 'Achieving 98+ Lighthouse Scores: Architecture Over Tweaks',
    dek: 'Fast websites are not an accident or a last-minute audit checklist. Here is the architectural foundation I use to ensure instant Web Vitals.',
    date: '2024-08-30',
    readTime: '6 min',
    tags: ['Performance', 'Next.js', 'Web Vitals', 'Frontend'],
    body: [
      {
        type: 'paragraph',
        text: 'Achieving 98+ on Google Lighthouse and green Core Web Vitals across Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP) is rarely solved by running an optimization script right before launch. Performance is an architectural invariant that must be designed into your component tree from day one.',
      },
      { type: 'heading', text: 'Largest Contentful Paint: Zero Asset Penalties' },
      {
        type: 'paragraph',
        text: 'LCP measures when the largest visual element in the viewport renders. In modern web apps, poor LCP almost always traces back to two culprits: delayed web fonts blocking text render, and unoptimized or late-discovered hero imagery.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// Use next/font to eliminate external Google Font DNS lookups and FOUT:
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

// For hero imagery, prioritize fetching and declare exact aspect ratios:
<Image
  src="/hero-cover.webp"
  alt="Project dashboard preview"
  width={1200}
  height={630}
  priority
  className="h-auto w-full rounded-xl"
/>`,
      },
      { type: 'heading', text: 'Eliminating Layout Shift (CLS: 0.00)' },
      {
        type: 'paragraph',
        text: 'Cumulative Layout Shift happens when content loads asynchronously and pushes surrounding elements downward. Every dynamic element—interactive code blocks, avatars, banner alerts, and skeleton loaders—must have explicit dimensions or CSS aspect-ratio reservations before their content resolves.',
      },
      { type: 'heading', text: 'Interaction to Next Paint (INP) and Hydration' },
      {
        type: 'paragraph',
        text: 'The single most effective way to lower main thread blocking time is not micro-optimizing JavaScript loops—it is simply shipping less JavaScript. By keeping page layouts and static prose inside React Server Components, only the interactive buttons, copy actions, and mobile navigation menus hydrate on the client. The browser main thread remains completely idle, ready to respond to user taps and clicks instantaneously.',
      },
      {
        type: 'quote',
        text: 'Speed is not a feature you bolt on at the end. It is the natural consequence of respecting the browser runtime and keeping the client bundle lean.',
      },
    ],
  },
];
