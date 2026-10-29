import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Browser favicon — hand-drawn terracotta S on dark void.
// File-based metadata icon takes precedence over <link> tags and is
// automatically cache-busted by Next.js, so stale Z.ai favicons can't linger.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1a',
          fontSize: 22,
          fontWeight: 700,
          color: '#df5e4b',
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}
