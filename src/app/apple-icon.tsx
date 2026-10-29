import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Apple touch icon.
export default function AppleIcon() {
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
          fontSize: 120,
          fontWeight: 700,
          color: '#df5e4b',
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          borderRadius: 40,
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}
