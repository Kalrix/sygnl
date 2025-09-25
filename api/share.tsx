// /api/share.ts
export const config = { runtime: 'edge' };

const SITE = 'https://sygnl.in';

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const handle =
    url.searchParams.get('handle') ||
    url.pathname.split('/').pop() ||
    'yourname';

  // cache-buster v=1 helps when iterating on the design
  const og = `${SITE}/api/og?handle=${encodeURIComponent(handle)}&v=1`;
  const title = `I secured my name on sygnl — secure yours now`;
  const desc = `Bharat’s social platform. Every voice matters. Every creation pays. First 50,000 get 1 year free premium.`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="sygnl" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:url" content="${SITE}/share/${encodeURIComponent(handle)}" />
<meta property="og:image" content="${og}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${og}" />

<!-- Redirect real users to the app; crawlers will keep the meta -->
<meta http-equiv="refresh" content="0; url=/" />
</head>
<body></body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    },
  });
}
