// /api/og.ts
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const handle = (searchParams.get('handle') || 'yourname').toLowerCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'black',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
        }}
      >
        <h1 style={{ fontSize: 66, fontWeight: 800, margin: 0 }}>
          I secured my name on
        </h1>
        <h2 style={{ fontSize: 60, fontWeight: 900, color: '#00ffff', margin: '10px 0' }}>
          sygnl.in/{handle}
        </h2>
        <p style={{ fontSize: 28, color: '#cfcfcf', marginTop: 10 }}>
          Bharat’s social platform · First 50,000 get 1 year free premium
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
