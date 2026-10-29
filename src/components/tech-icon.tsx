import type { SVGProps } from 'react';
// Real brand icons via simple-icons (path data) + a few custom SVGs for
// brands simple-icons doesn't carry (VSCode trademark, generic AI agent).
import {
  siNextdotjs,
  siReact,
  siTailwindcss,
  siFastapi,
  siExpress,
  siTypescript,
  siJavascript,
  siPython,
  siVercel,
  siDocker,
  siGit,
  siGithubactions,
  siNodedotjs,
  siVite,
  siPostgresql,
  siRedis,
  siLinux,
  siNeovim,
  siVscodium,
  siPrisma,
} from 'simple-icons';

export interface TechIconDef {
  path: string;
  /** Brand hex color (used when `colored` is true) */
  hex: string;
  /** Display label */
  label: string;
}

// Map of tech name → icon definition. Keys are lowercase canonical names.
const ICONS: Record<string, TechIconDef> = {
  'next.js': { path: siNextdotjs.path, hex: '#000000', label: 'Next.js' },
  'nextjs': { path: siNextdotjs.path, hex: '#000000', label: 'Next.js' },
  'react': { path: siReact.path, hex: '#61DAFB', label: 'React' },
  'tailwind': { path: siTailwindcss.path, hex: '#06B6D4', label: 'Tailwind CSS' },
  'tailwindcss': { path: siTailwindcss.path, hex: '#06B6D4', label: 'Tailwind CSS' },
  'fastapi': { path: siFastapi.path, hex: '#009688', label: 'FastAPI' },
  'express': { path: siExpress.path, hex: '#000000', label: 'Express' },
  'typescript': { path: siTypescript.path, hex: '#3178C6', label: 'TypeScript' },
  'javascript': { path: siJavascript.path, hex: '#F7DF1E', label: 'JavaScript' },
  'python': { path: siPython.path, hex: '#3776AB', label: 'Python' },
  'node.js': { path: siNodedotjs.path, hex: '#339933', label: 'Node.js' },
  'nodejs': { path: siNodedotjs.path, hex: '#339933', label: 'Node.js' },
  'vercel': { path: siVercel.path, hex: '#000000', label: 'Vercel' },
  'docker': { path: siDocker.path, hex: '#2496ED', label: 'Docker' },
  'git': { path: siGit.path, hex: '#F05032', label: 'Git' },
  'github actions': { path: siGithubactions.path, hex: '#2088FF', label: 'GitHub Actions' },
  'vite': { path: siVite.path, hex: '#646CFF', label: 'Vite' },
  'postgresql': { path: siPostgresql.path, hex: '#4169E1', label: 'PostgreSQL' },
  'redis': { path: siRedis.path, hex: '#DC382D', label: 'Redis' },
  'linux': { path: siLinux.path, hex: '#FCC624', label: 'Linux' },
  'neovim': { path: siNeovim.path, hex: '#57A143', label: 'Neovim' },
  'vscode': { path: siVscodium.path, hex: '#007ACC', label: 'VS Code' },
  'visual studio code': { path: siVscodium.path, hex: '#007ACC', label: 'VS Code' },
  'prisma': { path: siPrisma?.path ?? '', hex: '#2D3748', label: 'Prisma' },
};

// Custom SVG for "AI agents" — a simple robot/circuit motif.
const AI_AGENT_PATH =
  'M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.3l7.5 3.75v7.5L12 19.3 4.5 15.55v-7.5L12 4.3zM8 9h8v6H8V9zm2 2v2h4v-2h-4z';

// Fallback: generic code bracket.
const FALLBACK_PATH = 'M8 3L3 12l5 9M16 3l5 9-5 9';

/**
 * Render a real brand icon as inline SVG.
 *
 * Usage: <TechIcon name="next.js" size={20} /> or <TechIcon name="react" colored />
 *
 * By default renders in `currentColor` so it inherits text color.
 * Pass `colored` to use the brand's hex color.
 */
export function TechIcon({
  name,
  size = 20,
  colored = false,
  className,
  ...rest
}: {
  name: string;
  size?: number;
  colored?: boolean;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, 'name'>) {
  const key = name.toLowerCase().trim();
  let def = ICONS[key];

  // Special case: "ai agents" / "ai" → custom robot icon.
  if (key === 'ai agents' || key === 'ai' || key === 'agents') {
    def = { path: AI_AGENT_PATH, hex: '#df5e4b', label: 'AI Agents' };
  }

  if (!def) {
    def = { path: FALLBACK_PATH, hex: '#5a5550', label: name };
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={colored ? def.hex : 'currentColor'}
      aria-label={def.label}
      className={className}
      {...rest}
    >
      <path d={def.path} />
    </svg>
  );
}

/**
 * Get the canonical label for a tech name (for display text next to icons).
 */
export function techLabel(name: string): string {
  const key = name.toLowerCase().trim();
  if (key === 'ai agents' || key === 'ai' || key === 'agents') return 'AI Agents';
  return ICONS[key]?.label ?? name;
}
