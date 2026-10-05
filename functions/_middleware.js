// Site-wide gate while the site is in development. Active only when the
// SITE_PASSWORD secret is set; delete the secret to make the site public.

import { signatureSVG } from '../src/js/data/signature.js';

const COOKIE = 'site_access';
const ACCESS_PATH = '/__access';
const PUBLIC_PATHS = new Set([
  '/favicon.svg',
  '/og-image.png',
  '/robots.txt',
  '/llms.txt',
  '/avatar.jpg',
  '/newsletter',
  '/newsletter/',
  '/newsletter.html',
]);
// Vite's hashed CSS/JS bundles; the public newsletter page can't render without them.
const PUBLIC_PREFIXES = ['/assets/'];
const MAX_AGE = 60 * 60 * 24 * 30;

async function token(password) {
  const data = new TextEncoder().encode(`uxbysameer:${password}`);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function readCookie(request, name) {
  const header = request.headers.get('Cookie') || '';
  const match = header.split(/;\s*/).find((c) => c.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : null;
}

function safeNext(value) {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : '/';
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const password = env.SITE_PASSWORD;
  if (!password) return next();

  const url = new URL(request.url);
  if (url.pathname === '/sitemap.xml') return gatedSitemap();
  if (PUBLIC_PATHS.has(url.pathname) || PUBLIC_PREFIXES.some((p) => url.pathname.startsWith(p))) return next();

  const expected = await token(password);

  if (url.pathname === ACCESS_PATH && request.method === 'POST') {
    const form = await request.formData().catch(() => null);
    const attempt = form?.get('password');
    const target = safeNext(form?.get('next'));
    if (typeof attempt === 'string' && (await token(attempt)) === expected) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: target,
          'Set-Cookie': `${COOKIE}=${expected}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }
    return comingSoon(target, true);
  }

  if (readCookie(request, COOKIE) === expected) return next();

  if (url.pathname.startsWith('/api/')) {
    return new Response('Not available yet.', { status: 401 });
  }
  // Only the homepage is indexable; every other locked URL serves the same page and would be a duplicate.
  return comingSoon(url.pathname + url.search, false, url.pathname === '/');
}

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

const ORIGIN = 'https://uxbysameer.com';
const SEO_TITLE = 'Sameer Ul Haque — AI-Native Product Designer & Agent Builder';
const SEO_DESCRIPTION =
  'Sameer Ul Haque is an AI-Native Product Designer in Bengaluru who designs AI products and builds the agents that run them. 14+ years, 105+ products shipped, Top 1% ADPList mentor. New portfolio launching soon.';
const SITE_UPDATED = '2026-10-05';

const STRUCTURED_DATA = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${ORIGIN}/#website`,
      url: `${ORIGIN}/`,
      name: 'uxbysameer',
      alternateName: 'Sameer Ul Haque',
      inLanguage: 'en',
      publisher: { '@id': `${ORIGIN}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${ORIGIN}/#profile`,
      url: `${ORIGIN}/`,
      name: SEO_TITLE,
      description: SEO_DESCRIPTION,
      inLanguage: 'en',
      dateModified: SITE_UPDATED,
      isPartOf: { '@id': `${ORIGIN}/#website` },
      mainEntity: { '@id': `${ORIGIN}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${ORIGIN}/#person`,
      name: 'Sameer Ul Haque',
      alternateName: 'uxbysameer',
      jobTitle: 'AI-Native Product Designer',
      description: 'AI-Native Product Designer who builds agents and automations.',
      url: `${ORIGIN}/`,
      image: `${ORIGIN}/avatar.jpg`,
      email: 'mailto:uxbysameer@gmail.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressCountry: 'IN' },
      sameAs: ['https://www.linkedin.com/in/uxbysameer', 'https://adplist.org/mentors/sameer-ul-haque-Bn4u'],
      knowsAbout: ['Product design', 'AI UX', 'AI agents', 'Automation', 'n8n', 'Make', 'Design mentoring'],
    },
  ],
}).replace(/</g, '\\u003c');

function gatedSitemap() {
  const urls = ['/', '/newsletter']
    .map((p) => `  <url><loc>${ORIGIN}${p}</loc><lastmod>${SITE_UPDATED}</lastmod></url>`)
    .join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}

function comingSoon(next, failed, indexable = false) {
  const robots = indexable && !failed ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, follow';
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${SEO_TITLE}</title>
<meta name="description" content="${SEO_DESCRIPTION}" />
<meta name="robots" content="${robots}" />
<meta name="author" content="Sameer Ul Haque" />
<link rel="canonical" href="${ORIGIN}/" />
<meta name="theme-color" content="#efede8" />
<meta name="color-scheme" content="light" />
<meta property="og:type" content="profile" />
<meta property="og:site_name" content="uxbysameer" />
<meta property="og:locale" content="en_US" />
<meta property="og:url" content="${ORIGIN}/" />
<meta property="og:title" content="${SEO_TITLE}" />
<meta property="og:description" content="I design AI products and build the agents that run them. 14+ years, 105+ products shipped, Top 1% ADPList mentor. New portfolio launching soon." />
<meta property="og:image" content="${ORIGIN}/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Sameer Ul Haque — AI-Native Product Designer" />
<meta property="profile:first_name" content="Sameer" />
<meta property="profile:last_name" content="Ul Haque" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${SEO_TITLE}" />
<meta name="twitter:description" content="I design AI products and build the agents that run them. New portfolio launching soon." />
<meta name="twitter:image" content="${ORIGIN}/og-image.png" />
<meta name="twitter:image:alt" content="Sameer Ul Haque — AI-Native Product Designer" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable summary" />
<link rel="sitemap" type="application/xml" href="/sitemap.xml" />
<script type="application/ld+json">${STRUCTURED_DATA}</script>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..100,800..900&family=Instrument+Serif&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  :root{--bg:#efede8;--text:#111;--muted:#6b6862;--violet:#4b22d6;--pink:#f5b8f0;--line:rgba(17,17,17,.12)}
  html,body{height:100%}
  body{min-height:100vh;display:flex;flex-direction:column;background:var(--bg);color:var(--text);font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
  header,footer{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:24px clamp(20px,4vw,56px);font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase}
  .brand{display:flex;align-items:center;gap:12px}
  .avatar{width:40px;height:40px;border-radius:50%;overflow:hidden;background:conic-gradient(from 200deg,var(--violet),var(--pink),#ff6a2b,var(--violet));display:grid;place-items:center;color:#fff;font-weight:500}
  .sig{display:block;width:min(520px,80vw);height:auto;margin-bottom:36px;overflow:visible;color:var(--text)}
  .chip{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border:1px solid var(--line);border-radius:999px}
  .dot{width:8px;height:8px;border-radius:50%;background:#ff6a2b;animation:pulse 1.6s ease-in-out infinite}
  @keyframes pulse{50%{opacity:.35}}
  main{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px clamp(20px,4vw,56px)}
  .kicker{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:24px}
  h1{color:var(--violet);text-transform:uppercase;line-height:.9;font-size:clamp(2.6rem,8vw,6.5rem)}
  h1 span{display:block}
  .sans{font-family:Archivo,sans-serif;font-weight:900;font-stretch:78%;letter-spacing:-.02em}
  .serif{font-family:'Instrument Serif',serif;font-weight:400;letter-spacing:-.02em}
  p.lead{max-width:44rem;margin-top:28px;font-size:clamp(1rem,1.4vw,1.15rem);line-height:1.6;color:var(--muted);text-wrap:balance}
  p.lead span{display:block;text-wrap:balance}
  .links{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:32px}
  .btn{display:inline-flex;align-items:center;padding:14px 22px;border-radius:999px;border:1px solid var(--text);color:var(--text);text-decoration:none;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;transition:background .2s,color .2s}
  .btn:hover,.btn--solid{background:var(--text);color:var(--bg)}
  .btn--solid:hover{background:var(--violet);border-color:var(--violet)}
  details{margin-top:48px;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.06em;color:var(--muted)}
  summary{cursor:pointer;list-style:none;text-transform:uppercase}
  summary::-webkit-details-marker{display:none}
  form{display:flex;gap:8px;margin-top:14px;justify-content:center}
  input{padding:12px 16px;border-radius:999px;border:1px solid var(--line);background:#fff;font:inherit;min-width:200px}
  input:focus-visible,.btn:focus-visible,summary:focus-visible{outline:2px solid var(--violet);outline-offset:3px}
  button{cursor:pointer}
  .error{margin-top:10px;color:#e8322f}
  @media (max-width:560px){header .chip{display:none}form{flex-direction:column;align-items:stretch}}
  @media (prefers-reduced-motion:reduce){.dot{animation:none}}
  .avatar img{width:100%;height:100%;object-fit:cover}
</style>
</head>
<body>
<header>
  <div class="brand"><span class="avatar"><img src="/avatar.jpg" alt="Sameer Ul Haque" width="40" height="40" /></span><span>AI-Native<br />Product Designer</span></div>
  <span class="chip"><span class="dot"></span>Under construction</span>
</header>
<main>
  ${signatureSVG({ className: 'sig', strokeWidth: 10 })}
  <script>
    (() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const paths = [...document.querySelectorAll('.sig path')];
      const CAP_GAP = 30, DELAY = 300, STAGGER = 200, DURATION = 320;
      const hidden = paths.map((p) => {
        const length = p.getTotalLength();
        p.style.strokeDasharray = length + ' ' + (length + CAP_GAP * 2);
        p.style.strokeDashoffset = length + CAP_GAP;
        return length + CAP_GAP;
      });
      const ease = (k) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
      const start = performance.now() + DELAY;
      const frame = (now) => {
        let done = true;
        paths.forEach((p, i) => {
          const k = Math.min(1, Math.max(0, (now - start - i * STAGGER) / DURATION));
          p.style.strokeDashoffset = hidden[i] * (1 - ease(k));
          if (k < 1) done = false;
        });
        if (!done) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    })();
  </script>
  <p class="kicker">Sameer Ul Haque · New portfolio in progress</p>
  <h1>
    <span class="sans">I design AI products</span>
    <span class="serif">&amp; build the agents</span>
    <span class="serif">that run them</span>
  </h1>
  <p class="lead"><span>I'm rebuilding this site around AI-native product design, agents and automation.</span> <span>It's launching soon. Until then, reach me directly.</span></p>
  <div class="links">
    <a class="btn btn--solid" href="mailto:uxbysameer@gmail.com">Email me</a>
    <a class="btn" href="/newsletter">Read the newsletter</a>
    <a class="btn" href="https://www.linkedin.com/in/uxbysameer" target="_blank" rel="noopener">LinkedIn ↗</a>
    <a class="btn" href="https://adplist.org/mentors/sameer-ul-haque-Bn4u" target="_blank" rel="noopener">Mentorship on ADPList ↗</a>
  </div>
  <details${failed ? ' open' : ''}>
    <summary>Have access?</summary>
    <form method="post" action="${ACCESS_PATH}">
      <input type="hidden" name="next" value="${escapeAttr(next)}" />
      <label for="pw" style="position:absolute;left:-9999px">Password</label>
      <input id="pw" type="password" name="password" placeholder="Password" autocomplete="current-password" required${failed ? ' autofocus' : ''} />
      <button class="btn btn--solid" type="submit">Enter</button>
    </form>
    ${failed ? '<p class="error" role="alert">That password didn’t work.</p>' : ''}
  </details>
</main>
<footer><span>Bengaluru · Open to remote worldwide</span><span>© ${new Date().getFullYear()}</span></footer>
</body>
</html>`;
  return new Response(html, {
    status: failed ? 401 : 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Language': 'en',
      'X-Robots-Tag': robots,
      Link: `<${ORIGIN}/>; rel="canonical"`,
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    },
  });
}
