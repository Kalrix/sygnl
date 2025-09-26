const SITE = process.env.SITE_URL || "https://sygnl.in";

module.exports = async (req, res) => {
  const url = new URL(req.url, SITE);
  const qpHandle = url.searchParams.get("handle");
  const pathHandle = url.pathname.split("/").pop();
  const handle = (qpHandle || pathHandle || "yourname").toLowerCase();

  const title = `🎉 ${handle} secured their name on sygnl.in — claim yours now!`;
  const desc =
    "Bharat’s social platform. Every voice matters. Every creation pays. First 50,000 get 1 year free premium.";

  const og = `${SITE}/og/og-default.png`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${title}</title>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="sygnl"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${desc}"/>
<meta property="og:url" content="${SITE}/share/${encodeURIComponent(handle)}"/>
<meta property="og:image" content="${og}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>

<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${title}"/>
<meta name="twitter:description" content="${desc}"/>
<meta name="twitter:image" content="${og}"/>

<meta http-equiv="refresh" content="0; url=/" />
</head>
<body></body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  res.status(200).send(html);
};
