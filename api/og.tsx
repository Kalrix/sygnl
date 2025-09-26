// /api/og.tsx
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const handle = (searchParams.get('handle') || 'yourname').toLowerCase();

  // Design tokens
  const W = 1200;
  const H = 630;
  const brand = '#00ffff';
  const bg = 'linear-gradient(135deg, #0b0b0f 0%, #141427 100%)';

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: bg,
          color: '#fff',
          // ✅ Only system-safe fonts to avoid tofu squares
          fontFamily:
            'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
          position: 'relative',
        }}
      >
        {/* Soft neon blobs for Gen-Z vibe */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -80,
            width: 520,
            height: 220,
            background: 'rgba(125, 95, 255, 0.35)',
            filter: 'blur(40px)',
            borderRadius: 999,
            transform: 'rotate(-8deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -120,
            width: 620,
            height: 260,
            background: 'rgba(0, 255, 255, 0.28)',
            filter: 'blur(42px)',
            borderRadius: 999,
            transform: 'rotate(10deg)',
          }}
        />

        {/* Headline */}
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            letterSpacing: 0.2,
            textAlign: 'center',
            marginBottom: 12,
            padding: '0 40px',
            textShadow: '0 6px 22px rgba(0,0,0,0.55)',
          }}
        >
          I secured my name on
        </div>

        {/* Handle */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: brand,
            letterSpacing: 0.3,
            textAlign: 'center',
            textShadow: '0 8px 26px rgba(0,255,255,0.18)',
            marginBottom: 18,
          }}
        >
          sygnl.in/{handle}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: '#cfcfcf',
            textAlign: 'center',
            maxWidth: 1000,
            lineHeight: 1.35,
            padding: '0 40px',
          }}
        >
          Bharat’s social platform · Every voice matters. Every creation pays.
        </div>

        {/* Badge */}
        <div
          style={{
            marginTop: 30,
            padding: '14px 28px',
            background: '#ffd700',
            color: '#121212',
            borderRadius: 999,
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: 0.2,
            boxShadow: '0 10px 30px rgba(255,215,0,0.25)',
          }}
        >
          🚀 First 50,000 get 1 year free
        </div>

        {/* Subtle diagonal lines overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient( -12deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 14px )',
            opacity: 0.18,
            pointerEvents: 'none',
          }}
        />
      </div>
    ),
    { width: W, height: H }
  );
}
