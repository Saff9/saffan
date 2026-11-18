import { ImageResponse } from 'next/og';
import { PERSONAL_INFO } from '@/lib/portfolio-data';

export const alt = 'Saffan — Web Developer, Work & Services';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Open Graph share image — brand-first so search/social cards say Saffan, not host noise.
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
              marginBottom: 20,
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
              Web Developer · Work · Services
            </div>
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: '#2c2c2c',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              lineHeight: 1,
              display: 'flex',
            }}
          >
            {PERSONAL_INFO.name}
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#df5e4b',
              marginTop: 16,
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              display: 'flex',
            }}
          >
            websites, software & AI agents.
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#5a5550',
              marginTop: 28,
              display: 'flex',
            }}
          >
            Saffan Work · Saffan Services · Portfolio
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
