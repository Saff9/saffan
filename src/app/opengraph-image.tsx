import { ImageResponse } from 'next/og';
import { PERSONAL_INFO } from '@/lib/portfolio-data';

export const alt = `${PERSONAL_INFO.name} | Web Developer & CS Student`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Open Graph share image — notebook aesthetic: cream paper card with
// terracotta border on dark void, handwritten name + tagline.
export default function OGImage() {
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
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 80,
            width: 1040,
            height: 470,
            background: '#fbf8f0',
            border: '10px solid #df5e4b',
            borderRadius: 32,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 999,
                background: '#df5e4b',
                display: 'flex',
              }}
            />
            <div
              style={{
                fontSize: 18,
                color: '#5a5550',
                letterSpacing: 3,
                textTransform: 'uppercase',
                display: 'flex',
              }}
            >
              {PERSONAL_INFO.status}
            </div>
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: '#2c2c2c',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              lineHeight: 1.05,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ display: 'flex' }}>i build websites,</span>
            <span style={{ display: 'flex', color: '#df5e4b' }}>software & AI agents.</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#5a5550',
              marginTop: 28,
              display: 'flex',
            }}
          >
            {PERSONAL_INFO.name} | {PERSONAL_INFO.title}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
