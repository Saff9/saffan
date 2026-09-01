'use client';

import { useState } from 'react';

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
  showLabel?: boolean;
}

const SIMPLE_ICONS_MAP: Record<string, { slug: string; hex: string }> = {
  C: { slug: 'c', hex: '659AD2' },
  'C (C11 Standard)': { slug: 'c', hex: '659AD2' },
  C11: { slug: 'c', hex: '659AD2' },
  Go: { slug: 'go', hex: '00ADD8' },
  'Go (Golang)': { slug: 'go', hex: '00ADD8' },
  Rust: { slug: 'rust', hex: 'DEA584' },
  TypeScript: { slug: 'typescript', hex: '3178C6' },
  Python: { slug: 'python', hex: '3776AB' },
  React: { slug: 'react', hex: '61DAFB' },
  'Next.js': { slug: 'nextdotjs', hex: 'FFFFFF' },
  'Node.js': { slug: 'nodedotjs', hex: '5FA04E' },
  PostgreSQL: { slug: 'postgresql', hex: '4169E1' },
  Redis: { slug: 'redis', hex: 'DC382D' },
  Docker: { slug: 'docker', hex: '2496ED' },
  Linux: { slug: 'linux', hex: 'FCC624' },
  FastAPI: { slug: 'fastapi', hex: '009688' },
  GitHub: { slug: 'github', hex: 'FFFFFF' },
  Discord: { slug: 'discord', hex: '5865F2' },
  Telegram: { slug: 'telegram', hex: '26A5E4' },
  Dart: { slug: 'dart', hex: '0175C2' },
  TailwindCSS: { slug: 'tailwindcss', hex: '06B6D4' },
  AWS: { slug: 'amazonaws', hex: 'FF9900' },
  Vercel: { slug: 'vercel', hex: 'FFFFFF' },
  WebSockets: { slug: 'socketdotio', hex: 'FFFFFF' },
  GraphQL: { slug: 'graphql', hex: 'E10098' },
  gRPC: { slug: 'grpc', hex: '244C5A' },
  Qdrant: { slug: 'qdrant', hex: 'DC2626' },
  Prisma: { slug: 'prisma', hex: '2D3748' },
  MongoDB: { slug: 'mongodb', hex: '47A248' },
  Git: { slug: 'git', hex: 'F05032' },
};

export default function TechIcon({ name, size = 18, className = '', showLabel = false }: TechIconProps) {
  const [imgError, setImgError] = useState(false);
  const info = SIMPLE_ICONS_MAP[name] || SIMPLE_ICONS_MAP[name.split(' ')[0]];

  const monogram = name.slice(0, 2).toUpperCase();

  return (
    <span className={`inline-flex items-center gap-1.5 shrink-0 ${className}`}>
      {info && !imgError ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={`https://cdn.simpleicons.org/${info.slug}/${info.hex}`}
          alt={name}
          width={size}
          height={size}
          loading="lazy"
          className="shrink-0 transition-transform group-hover:scale-110"
          style={{ width: size, height: size }}
          onError={() => setImgError(true)}
        />
      ) : (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: size,
            height: size,
            borderRadius: 6,
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            fontFamily: 'ui-monospace, monospace',
            fontWeight: 800,
            fontSize: Math.max(8, Math.round(size * 0.42)),
            color: '#818cf8',
            flexShrink: 0,
          }}
        >
          {monogram}
        </span>
      )}
      {showLabel && (
        <span className="font-mono text-xs font-semibold text-zinc-300">{name}</span>
      )}
    </span>
  );
}
