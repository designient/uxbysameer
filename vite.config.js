import { resolve } from 'path';
import { defineConfig } from 'vite';
import { signatureSVG } from './src/js/data/signature.js';

const pages = {
  main: 'index.html',
  hire: 'hire.html',
  workWithMe: 'work-with-me.html',
  learn: 'learn.html',
  newsletter: 'newsletter.html',
  gamana: 'work/gamana.html',
  opsAutomation: 'work/ops-automation.html',
  portfolioAgent: 'work/portfolio-agent.html',
  cashel: 'work/cashel.html',
  catalyse: 'work/catalyse.html',
  cybonet: 'work/cybonet.html',
};

const CASE_MARKER = '<!--case-->';
const CASE_SOURCES = ['src/js/data/cases.js', 'src/js/data/content.js', 'scripts/caseTemplate.mjs'];

/** Renders src/js/data/cases.js into each work/*.html at the <!--case--> marker. */
function caseStudies() {
  let dev = false;
  let server;
  return {
    name: 'case-studies',
    configResolved(config) {
      dev = config.command === 'serve';
    },
    configureServer(s) {
      server = s;
    },
    handleHotUpdate({ file, server: s }) {
      if (CASE_SOURCES.some((src) => file.endsWith(src))) {
        s.ws.send({ type: 'full-reload' });
      }
    },
    transformIndexHtml: {
      order: 'pre',
      async handler(html, ctx) {
        const match = ctx.path.match(/^\/work\/([\w-]+)\.html$/);
        if (!match || !html.includes(CASE_MARKER)) return html;
        const mod = server
          ? await server.ssrLoadModule('/scripts/caseTemplate.mjs')
          : await import('./scripts/caseTemplate.mjs');
        return html.replace(CASE_MARKER, mod.renderCase(match[1], { dev }));
      },
    },
  };
}

/** Inlines the hand-drawn signature at <!--logo--> (nav) and <!--logo-lg--> (preloader) so it renders before any JS runs. */
function signatureLogo() {
  return {
    name: 'signature-logo',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html
          .replace('<!--logo-->', signatureSVG())
          .replace('<!--logo-lg-->', signatureSVG({ className: 'preloader__sig' })),
    },
  };
}

const NEWSLETTER_MARKER = '<!--newsletter-->';
const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/** Renders the newsletter editions from content.js into newsletter.html at the <!--newsletter--> marker. */
function newsletterEditions() {
  let server;
  return {
    name: 'newsletter-editions',
    configureServer(s) {
      server = s;
    },
    transformIndexHtml: {
      order: 'pre',
      async handler(html) {
        if (!html.includes(NEWSLETTER_MARKER)) return html;
        const { newsletter } = server
          ? await server.ssrLoadModule('/src/js/data/content.js')
          : await import('./src/js/data/content.js');
        const total = newsletter.editions.length;
        const cards = newsletter.editions
          .map((e, i) => {
            const num = String(total - i).padStart(2, '0');
            return `
          <article class="edition">
            <a class="edition__link" href="${escapeHtml(e.url)}" target="_blank" rel="noopener">
              <span class="edition__media art" data-art="${escapeHtml(JSON.stringify(e.art))}" data-art-key="edition-${num}" aria-hidden="true">
                <span class="edition__num">${num}</span>
              </span>
              <span class="edition__body">
                <span class="edition__kicker">Edition ${num} · <time>${escapeHtml(e.date)}</time></span>
                <span class="edition__title">${escapeHtml(e.title)}</span>
                <span class="edition__dek">${escapeHtml(e.dek)}</span>
                <span class="edition__cta">Read on LinkedIn ↗</span>
              </span>
            </a>
          </article>`;
          })
          .join('');
        return html.replace(NEWSLETTER_MARKER, `<div class="editions" data-reveal-stagger>${cards}\n        </div>`);
      },
    },
  };
}

export default defineConfig({
  plugins: [caseStudies(), signatureLogo(), newsletterEditions()],
  server: {
    proxy: {
      // `npm run dev:api` serves the Cloudflare function on 8788; the chat falls back gracefully if it isn't running.
      '/api': {
        target: 'http://localhost:8788',
        changeOrigin: true,
        configure(proxy) {
          proxy.on('proxyReq', (req) => req.setHeader('origin', 'http://localhost:8788'));
        },
      },
    },
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(Object.entries(pages).map(([name, file]) => [name, resolve(__dirname, file)])),
    },
  },
});
