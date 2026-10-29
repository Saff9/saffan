// SVG architecture sketches — one per project slug.
// viewBox 0 0 600 280; rounded rects (rx=6) + stroke-linecap round
// for a hand-drawn feel. Decorative — captions carry the meaning.

import type { ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────
// Geometry helper — emits a single path string for a line + V
// arrowhead at the tip. Used for straight arrows in inline SVG
// architecture sketches. Curved arrows draw their head as a
// separate `<path d="M.. L.. L.."/>` V (see AstramindDiagram).
// ─────────────────────────────────────────────────────────────
function arrow(x1: number, y1: number, x2: number, y2: number, head = 8): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return `M${x1} ${y1} L${x2} ${y2}`;
  const ux = dx / len;
  const uy = dy / len;
  const backX = x2 - ux * head;
  const backY = y2 - uy * head;
  const px = -uy;
  const py = ux;
  const w = head * 0.45;
  return (
    `M${x1} ${y1} L${x2} ${y2} ` +
    `M${backX + px * w} ${backY + py * w} L${x2} ${y2} L${backX - px * w} ${backY - py * w}`
  );
}

// Frame wrapper — every diagram shares the same outer chrome:
// `.diagram > .diagram-title + svg + .diagram-caption`. Pulling
// this into one component keeps the 6 diagrams visually identical
// and trims ~6 lines of repetition per diagram.
function DiagramFrame({
  title,
  caption,
  children,
}: {
  title: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <div className="diagram">
      <div className="diagram-title">{title}</div>
      {children}
      <div className="caption diagram-caption">{caption}</div>
    </div>
  );
}

// SVG wrapper — shared viewBox + decorative attrs.
function DiagramSvg({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 600 280"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function NovaDBDiagram() {
  // Layered stack — now used for APIForge (FastAPI boilerplate architecture)
  const layers = [
    { label: 'FastAPI App', accent: false },
    { label: 'Auth Middleware · JWT', accent: false },
    { label: 'Rate Limiting · Redis', accent: true },
    { label: 'Route Handlers', accent: false },
    { label: 'SQLAlchemy · Async', accent: true },
    { label: 'PostgreSQL', accent: false },
    { label: 'OpenAPI Docs · /docs', accent: false },
  ];
  const boxW = 300;
  const boxH = 26;
  const gap = 11;
  const totalH = layers.length * boxH + (layers.length - 1) * gap;
  const startY = (280 - totalH) / 2;
  const x = (600 - boxW) / 2;
  return (
    <DiagramFrame
      title="architecture"
      caption="FastAPI boilerplate — auth, rate limiting, and database are the critical path."
    >
      <DiagramSvg>
        {layers.map((l, i) => {
          const y = startY + i * (boxH + gap);
          return (
            <g key={i}>
              <rect
                className={l.accent ? 'accent' : undefined}
                x={x}
                y={y}
                width={boxW}
                height={boxH}
                rx={6}
              />
              <text x={300} y={y + 17} textAnchor="middle">
                {l.label}
              </text>
              {i < layers.length - 1 && (
                <path d={arrow(300, y + boxH, 300, y + boxH + gap, 6)} />
              )}
            </g>
          );
        })}
      </DiagramSvg>
    </DiagramFrame>
  );
}

function BreezeDiagram() {
  // Horizontal pipeline — now used for DevPort (template → edit → preview → deploy)
  const stages = [
    { label: 'Template', caption: 'Pick a start' },
    { label: 'Edit', caption: 'Live preview' },
    { label: 'Content', caption: 'JSON blob' },
    { label: 'Deploy', caption: 'Vercel API' },
    { label: 'Live', caption: 'Your URL' },
  ];
  const boxW = 92;
  const boxH = 44;
  const gap = 22;
  const totalW = stages.length * boxW + (stages.length - 1) * gap;
  const startX = (600 - totalW) / 2;
  const y = 110;
  return (
    <DiagramFrame
      title="pipeline"
      caption="Pick a template → edit live → deploy to Vercel with one click."
    >
      <DiagramSvg>
        {stages.map((s, i) => {
          const bx = startX + i * (boxW + gap);
          const nextX = startX + (i + 1) * (boxW + gap);
          return (
            <g key={i}>
              <rect x={bx} y={y} width={boxW} height={boxH} rx={6} />
              <text x={bx + boxW / 2} y={y + 27} textAnchor="middle">
                {s.label}
              </text>
              <text
                x={bx + boxW / 2}
                y={y + boxH + 22}
                textAnchor="middle"
                style={{ fill: 'var(--ink-soft)', fontSize: '10px' }}
              >
                {s.caption}
              </text>
              {i < stages.length - 1 && (
                <path d={arrow(bx + boxW, y + boxH / 2, nextX, y + boxH / 2, 7)} />
              )}
            </g>
          );
        })}
      </DiagramSvg>
    </DiagramFrame>
  );
}

function AstramindDiagram() {
  // Agent state graph: Plan → Act → Observe → loop back to Plan.
  // Exit: budget exhausted → Stop (accent, the "loud failure" node).
  return (
    <DiagramFrame
      title="agent state graph"
      caption="A bounded loop. The exit is not a smarter prompt — it is a hard budget."
    >
      <DiagramSvg>
        <rect x={60} y={50} width={130} height={50} rx={6} />
        <text x={125} y={80} textAnchor="middle">
          Plan
        </text>
        <rect x={235} y={50} width={130} height={50} rx={6} />
        <text x={300} y={80} textAnchor="middle">
          Act
        </text>
        <rect x={410} y={50} width={130} height={50} rx={6} />
        <text x={475} y={80} textAnchor="middle">
          Observe
        </text>

        {/* Plan → Act → Observe (straight) */}
        <path d={arrow(190, 75, 235, 75, 7)} />
        <path d={arrow(365, 75, 410, 75, 7)} />

        {/* Loop: Observe bottom-left (440,100) → curve → Plan bottom-center (125,100) */}
        <path d="M440 100 C 440 180, 125 180, 125 100" />
        <path d="M119 107 L125 100 L131 107" />
        <text
          x={300}
          y={195}
          textAnchor="middle"
          style={{ fill: 'var(--ink-soft)', fontSize: '10px' }}
        >
          loop · if budget remains
        </text>

        {/* Exit: Observe bottom-center (475,100) → Stop top (475,210) */}
        <path className="stroke-accent" d={arrow(475, 100, 475, 207, 8)} />
        <text x={490} y={140} style={{ fill: 'var(--accent)', fontSize: '10px' }}>
          budget
        </text>
        <text x={490} y={154} style={{ fill: 'var(--accent)', fontSize: '10px' }}>
          exhausted
        </text>

        <rect className="accent" x={410} y={210} width={130} height={44} rx={6} />
        <text x={475} y={237} textAnchor="middle">
          stop · loud fail
        </text>
      </DiagramSvg>
    </DiagramFrame>
  );
}

function BudgetTechDiagram() {
  // Lighthouse bar chart — four 100s. Terracotta bars (inline style
  // to override the faint default accent fill — the chart needs to read).
  const bars = [
    { label: 'Performance', value: 100 },
    { label: 'Accessibility', value: 100 },
    { label: 'Best Practices', value: 100 },
    { label: 'SEO', value: 100 },
  ];
  const barW = 100;
  const gap = 30;
  const totalW = bars.length * barW + (bars.length - 1) * gap;
  const startX = (600 - totalW) / 2;
  const baselineY = 230;
  const maxBarH = 150;
  return (
    <DiagramFrame
      title="lighthouse"
      caption="Four 100s. Not a brag — the floor for a site with no trackers and server-rendered HTML."
    >
      <DiagramSvg>
        <line x1={startX - 10} y1={baselineY} x2={startX + totalW + 10} y2={baselineY} />
        {bars.map((b, i) => {
          const bx = startX + i * (barW + gap);
          const h = (b.value / 100) * maxBarH;
          const by = baselineY - h;
          return (
            <g key={i}>
              <rect
                x={bx}
                y={by}
                width={barW}
                height={h}
                rx={4}
                style={{ fill: 'rgba(223,94,75,0.7)', stroke: 'var(--accent)' }}
              />
              <text
                x={bx + barW / 2}
                y={by - 8}
                textAnchor="middle"
                style={{ fill: 'var(--accent)', fontSize: '14px', fontWeight: 600 }}
              >
                {b.value}
              </text>
              <text x={bx + barW / 2} y={baselineY + 20} textAnchor="middle">
                {b.label}
              </text>
            </g>
          );
        })}
      </DiagramSvg>
    </DiagramFrame>
  );
}

function ChatlyProDiagram() {
  // Reconnect state machine, clockwise cycle:
  // Connected (accent) → Disconnected → Backoff (accent) → Reconnect → Connected.
  // Chat + tool-calling flow — now used for ChatAI
  return (
    <DiagramFrame
      title="chat + tool-calling"
      caption="User sends message → AI streams response → AI calls a tool → result feeds back."
    >
      <DiagramSvg>
        {/* Top: User (accent) */}
        <rect className="accent" x={240} y={30} width={120} height={50} rx={6} />
        <text x={300} y={60} textAnchor="middle">
          User
        </text>

        {/* Right: AI streaming */}
        <rect x={440} y={115} width={120} height={50} rx={6} />
        <text x={500} y={145} textAnchor="middle">
          AI Stream
        </text>

        {/* Bottom: Tool call (accent — the interesting part) */}
        <rect className="accent" x={240} y={200} width={120} height={50} rx={6} />
        <text x={300} y={230} textAnchor="middle">
          Tool Call
        </text>

        {/* Left: Result */}
        <rect x={40} y={115} width={120} height={50} rx={6} />
        <text x={100} y={145} textAnchor="middle">
          Result
        </text>

        {/* Clockwise diagonal arrows */}
        <path d={arrow(360, 70, 440, 120, 8)} />
        <text x={380} y={90} style={{ fill: 'var(--ink-soft)', fontSize: '10px' }}>
          socket dies
        </text>

        <path d={arrow(490, 165, 365, 215, 8)} />
        <text x={415} y={205} style={{ fill: 'var(--ink-soft)', fontSize: '10px' }}>
          wait 2^n
        </text>

        <path d={arrow(235, 215, 165, 170, 8)} />
        <text x={175} y={200} style={{ fill: 'var(--ink-soft)', fontSize: '10px' }}>
          retry
        </text>

        <path d={arrow(155, 120, 235, 65, 8)} />
        <text x={160} y={85} style={{ fill: 'var(--ink-soft)', fontSize: '10px' }}>
          ok
        </text>

        {/* Center decision note */}
        <text
          x={300}
          y={138}
          textAnchor="middle"
          style={{ fill: 'var(--ink-soft)', fontSize: '10px' }}
        >
          msg in flight?
        </text>
        <text
          x={300}
          y={153}
          textAnchor="middle"
          style={{ fill: 'var(--ink-soft)', fontSize: '10px' }}
        >
          replay on reconnect
        </text>
      </DiagramSvg>
    </DiagramFrame>
  );
}

function CodeCraftDiagram() {
  // URL shortener flow — now used for ShipLink
  const stages = [
    { label: 'Long URL', caption: 'User input' },
    { label: 'Shorten', caption: 'Generate slug' },
    { label: 'Store', caption: 'PostgreSQL' },
    { label: 'Redirect', caption: '301 + analytics' },
  ];
  const boxW = 110;
  const boxH = 50;
  const gap = 30;
  const totalW = stages.length * boxW + (stages.length - 1) * gap;
  const startX = (600 - totalW) / 2;
  const y = 110;
  return (
    <DiagramFrame
      title="flow"
      caption="Long URL in, short URL out. Click tracked, analytics pre-computed."
    >
      <DiagramSvg>
        {stages.map((s, i) => {
          const bx = startX + i * (boxW + gap);
          const nextX = startX + (i + 1) * (boxW + gap);
          return (
            <g key={i}>
              <rect x={bx} y={y} width={boxW} height={boxH} rx={6} />
              <text x={bx + boxW / 2} y={y + 22} textAnchor="middle">
                {s.label}
              </text>
              <text
                x={bx + boxW / 2}
                y={y + 38}
                textAnchor="middle"
                style={{ fill: 'var(--ink-soft)', fontSize: '10px' }}
              >
                {s.caption}
              </text>
              {i < stages.length - 1 && (
                <path d={arrow(bx + boxW, y + boxH / 2, nextX, y + boxH / 2, 8)} />
              )}
            </g>
          );
        })}
      </DiagramSvg>
    </DiagramFrame>
  );
}

export function ProjectDiagram({ slug }: { slug: string }) {
  switch (slug) {
    case 'streamboard':
      return <BudgetTechDiagram />; // bar chart — analytics metrics
    case 'agentflow':
      return <AstramindDiagram />; // state graph — agent workflow
    case 'devport':
      return <BreezeDiagram />; // pipeline — template → edit → deploy
    case 'apiforge':
      return <NovaDBDiagram />; // layered stack — API architecture
    case 'chatai':
      return <ChatlyProDiagram />; // state machine — chat + tool-calling
    case 'shiplink':
      return <CodeCraftDiagram />; // flow — URL → short → redirect
    default:
      return null;
  }
}
