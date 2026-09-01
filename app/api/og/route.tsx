import { PERSONAL_INFO } from '@/lib/portfolio-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const svg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bgGlow" cx="20%" cy="20%" r="60%">
        <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#050507" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#818cf8"/>
      </linearGradient>
    </defs>
    
    <rect width="1200" height="630" fill="#050507"/>
    <rect width="1200" height="630" fill="url(#bgGlow)"/>
    
    <!-- Header -->
    <rect x="80" y="70" width="52" height="52" rx="16" fill="#4f46e5"/>
    <text x="96" y="106" fill="#ffffff" font-family="monospace" font-size="28" font-weight="900">S</text>
    <text x="150" y="96" fill="#ffffff" font-family="sans-serif" font-size="26" font-weight="bold">${PERSONAL_INFO.fullName}</text>
    <text x="150" y="118" fill="#71717a" font-family="monospace" font-size="14">${PERSONAL_INFO.title}</text>
    
    <!-- Pill -->
    <rect x="80" y="180" width="460" height="38" rx="19" fill="#1e1b4b" stroke="#4f46e5" stroke-width="1"/>
    <text x="100" y="204" fill="#a5b4fc" font-family="monospace" font-size="14" font-weight="bold">✦ Systems Architect · NovaDB · Breeze · ASTRAMIND</text>
    
    <!-- Title -->
    <text x="80" y="300" fill="url(#textGrad)" font-family="sans-serif" font-size="52" font-weight="900" letter-spacing="-1">
      Building Systems From The Metal Up.
    </text>
    <text x="80" y="360" fill="#d4d4d8" font-family="sans-serif" font-size="24">
      ACID SQL Database in C11, Custom Language Compiler &amp; AI Agents.
    </text>
    
    <!-- Footer -->
    <line x1="80" y1="490" x2="1120" y2="490" stroke="#27272a" stroke-width="1"/>
    <text x="80" y="540" fill="#71717a" font-family="monospace" font-size="16">github.com/Saff9 · discord.gg/XWJ25UShKT · t.me/saffanme</text>
    <text x="1040" y="540" fill="#10b981" font-family="monospace" font-size="16" font-weight="bold">● Available</text>
  </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}
