import { cases } from '../src/js/data/cases.js';
import { projects, testimonials } from '../src/js/data/content.js';

const AI_CASES = new Set(['gamana', 'ops-automation', 'portfolio-agent']);
const WORDS_PER_MINUTE = 220;

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const artAttr = (art, key) =>
  `data-art='${JSON.stringify(art).replace(/'/g, '&#39;')}' data-art-key="${esc(key)}"`;
const has = (v) => (Array.isArray(v) ? v.length > 0 : Boolean(v));

function media({ image, video, alt = '' }, art, key, cls) {
  const inner = video
    ? `<video src="${esc(video)}" muted loop playsinline preload="metadata" data-autoplay aria-hidden="true"></video>`
    : image
      ? `<img src="${esc(image)}" alt="${esc(alt)}" loading="lazy" />`
      : '';
  return `<div class="${cls} art" ${artAttr(art, key)}>${inner}</div>`;
}

const chips = (list) => `<ul class="case-chips">${list.map((t) => `<li class="chip">${esc(t)}</li>`).join('')}</ul>`;

function findTestimonial(name) {
  if (!name) return null;
  for (const group of Object.values(testimonials)) {
    const hit = group.items.find((t) => t.name === name);
    if (hit) return hit;
  }
  return null;
}

/** Each section: id, TOC label, field names it depends on, slot hint, and a body renderer. */
function sections(c) {
  const t = findTestimonial(c.testimonial);
  return [
    {
      id: 'problem',
      label: 'The problem',
      show: has(c.problem),
      hint: 'problem — the core problem in a short paragraph',
      body: () => `<p class="case-section__text">${esc(c.problem)}</p>`,
    },
    {
      id: 'context',
      label: 'Context',
      show: has(c.context),
      hint: 'context — background on the company, product and situation',
      body: () => `<p class="case-section__text">${esc(c.context)}</p>`,
    },
    {
      id: 'goals',
      label: 'Challenge & goals',
      show: has(c.goals),
      hint: 'goals — numbered goals or success criteria',
      body: () =>
        `<ol class="case-goals">${c.goals.map((g) => `<li>${esc(g)}</li>`).join('')}</ol>`,
    },
    {
      id: 'role',
      label: 'My role & team',
      show: has(c.role) || has(c.team) || has(c.tools),
      hint: 'role, team, tools — what you owned and who you worked with',
      body: () => `
        ${has(c.role) ? `<p class="case-section__text">${esc(c.role)}</p>` : ''}
        ${has(c.team) ? `<p class="case-label">Worked with</p>${chips(c.team)}` : ''}
        ${has(c.tools) ? `<p class="case-label">Tools</p>${chips(c.tools)}` : ''}`,
    },
    {
      id: 'insights',
      label: 'Research & insights',
      show: has(c.insights) || has(c.quote),
      hint: 'insights [{ title, text }] and quote { text, cite }',
      body: () => `
        ${has(c.insights) ? `<div class="case-insights">${c.insights
          .map((i, n) => `<article class="case-insight"><span class="case-insight__num">${String(n + 1).padStart(2, '0')}</span><h3 class="case-insight__title">${esc(i.title)}</h3><p class="case-insight__text">${esc(i.text)}</p></article>`)
          .join('')}</div>` : ''}
        ${has(c.quote) ? `<blockquote class="case-quote"><p class="t-serif">“${esc(c.quote.text)}”</p>${c.quote.cite ? `<cite>${esc(c.quote.cite)}</cite>` : ''}</blockquote>` : ''}`,
    },
    {
      id: 'numbers',
      label: 'Key numbers',
      show: has(c.numbers),
      hint: 'numbers [{ value, label }] — data that framed the problem',
      body: () => `<div class="case-numbers">${c.numbers
        .map((n) => `<div class="case-number"><p class="case-number__value">${esc(n.value)}</p><p class="case-number__label">${esc(n.label)}</p></div>`)
        .join('')}</div>`,
    },
    {
      id: 'reframe',
      label: 'The reframe',
      show: has(c.reframe),
      hint: 'reframe — the "How might we..." question',
      body: () => `<p class="case-reframe t-serif">${esc(c.reframe)}</p>`,
    },
    {
      id: 'solution',
      label: 'The solution',
      show: has(c.features),
      hint: 'features [{ title, text, image, video, caption }] — one block per idea',
      body: () => `<div class="case-features">${c.features
        .map((f, n) => `
          <figure class="case-feature">
            ${media(f, c.visual.art, `case-${c.slug}-f${n}`, 'case-feature__media')}
            <figcaption class="case-feature__body">
              <h3 class="case-feature__title">${esc(f.title)}</h3>
              <p class="case-section__text">${esc(f.text)}</p>
              ${f.caption ? `<p class="case-feature__caption">${esc(f.caption)}</p>` : ''}
            </figcaption>
          </figure>`)
        .join('')}</div>`,
    },
    {
      id: 'process',
      label: 'What I did',
      show: has(c.process),
      hint: 'process — what you did, as short bullets',
      body: () =>
        `<ul class="case-section__list">${c.process.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`,
    },
    {
      id: 'flow',
      label: 'How it works',
      show: has(c.flow),
      slot: AI_CASES.has(c.slug),
      hint: 'flow [{ title, text }] — how the agent or automation works, step by step',
      body: () => `<ol class="case-flow">${c.flow
        .map((s, n) => `<li class="case-flow__step"><span class="case-flow__num">${String(n + 1).padStart(2, '0')}</span><h3 class="case-flow__title">${esc(s.title)}</h3><p class="case-flow__text">${esc(s.text)}</p></li>`)
        .join('')}</ol>`,
    },
    {
      id: 'failed',
      label: 'What didn’t work',
      show: has(c.failed),
      hint: 'failed [{ title, text }] — iterations that failed and what you learned',
      body: () => c.failed
        .map((f) => `<div class="case-failed"><h3 class="case-feature__title">${esc(f.title)}</h3><p class="case-section__text">${esc(f.text)}</p></div>`)
        .join(''),
    },
    {
      id: 'impact',
      label: 'Impact',
      show: has(c.impact) || has(c.outcome),
      hint: 'impact [{ value, label }] and outcome',
      body: () => `
        ${has(c.impact) ? `<div class="case-numbers case-numbers--impact">${c.impact
          .map((n) => `<div class="case-number"><p class="case-number__value">${esc(n.value)}</p><p class="case-number__label">${esc(n.label)}</p></div>`)
          .join('')}</div>` : ''}
        ${has(c.outcome) ? `<p class="case-section__text">${esc(c.outcome)}</p>` : ''}
        ${has(c.impactNote) ? `<p class="case-note">${esc(c.impactNote)}</p>` : ''}`,
    },
    {
      id: 'testimonial',
      label: 'In their words',
      show: Boolean(t),
      slot: false,
      body: () => `<blockquote class="case-quote"><p class="t-serif">“${esc(t.quote)}”</p><cite>${esc(t.name)} · ${esc(t.role)}</cite></blockquote>`,
    },
    {
      id: 'reflection',
      label: 'Reflection',
      show: has(c.reflection),
      hint: 'reflection — what you’d do differently and what’s next',
      body: () => `<p class="case-section__text">${esc(c.reflection)}</p>`,
    },
  ];
}

function readingMinutes(html) {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Returns the full <main> inner HTML for a case slug. In dev, empty sections render as slots. */
export function renderCase(slug, { dev = false } = {}) {
  const index = cases.findIndex((c) => c.slug === slug);
  if (index === -1) throw new Error(`No case study data for "${slug}"`);
  const c = cases[index];
  const at = (offset) => cases[(index + offset) % cases.length];
  const projectFor = (s) => projects.find((p) => p.slug === s);

  const rendered = sections(c)
    .filter((s) => s.show || (dev && s.slot !== false))
    .map((s) =>
      s.show
        ? `<section class="case-section" id="${s.id}" data-toc="${esc(s.label)}" data-reveal>
            <h2 class="case-section__title">${esc(s.label)}</h2>
            <div class="case-section__body">${s.body()}</div>
          </section>`
        : `<section class="case-section case-section--slot" id="${s.id}" data-toc="${esc(s.label)}">
            <h2 class="case-section__title">${esc(s.label)}</h2>
            <div class="case-slot">Add: ${esc(s.hint)}<span>src/js/data/cases.js · dev only, hidden in production</span></div>
          </section>`
    );

  const article = rendered.join('\n');
  const minutes = readingMinutes(article);
  const tocItems = [...article.matchAll(/id="([^"]+)" data-toc="([^"]+)"/g)];

  const hookHtml = has(c.hook)
    ? `<p class="case-hero__hook">${esc(c.hook)}</p>`
    : dev
      ? `<div class="case-slot case-slot--inline">Add: hook — one or two sentences that set up the story</div>`
      : '';

  const summary = c.summary && (c.summary.problem || c.summary.approach || c.summary.outcome)
    ? `<div class="case-summary">
        ${[['Problem', c.summary.problem], ['Approach', c.summary.approach], ['Outcome', c.summary.outcome]]
          .filter(([, v]) => v)
          .map(([k, v]) => `<div class="case-summary__item"><p class="case-stat__label">${k}</p><p class="case-summary__text">${esc(v)}</p></div>`)
          .join('')}
      </div>`
    : '';

  const related = [at(2), at(3)]
    .filter((r) => r.slug !== c.slug)
    .map((r) => {
      const p = projectFor(r.slug);
      return `
        <a class="work-card" href="/work/${r.slug}.html" data-transition>
          <div class="work-card__media art" ${artAttr(p?.art || r.visual.art, `more-${r.slug}`)}>
            ${p?.image ? `<img src="${esc(p.image)}" alt="${esc(r.title)} preview" loading="lazy" />` : ''}
            <span class="work-card__arrow" aria-hidden="true">↗</span>
          </div>
          <div>
            <h3 class="work-card__title">${esc(r.title)}</h3>
            <p class="work-card__subtitle">${esc(r.subtitle)}</p>
          </div>
        </a>`;
    })
    .join('');

  const next = at(1);

  return `
    <section class="case-hero">
      <div class="container">
        <a href="/#work" class="case-hero__back">← Back to work</a>
        <h1 class="case-hero__title">${esc(c.title)}</h1>
        <p class="case-hero__subtitle">${esc(c.subtitle)}</p>
        ${hookHtml}
        <div class="case-hero__stats">
          ${c.meta.map((m) => `<div class="case-stat"><p class="case-stat__label">${esc(m.label)}</p><p class="case-stat__value">${esc(m.value)}</p></div>`).join('')}
          <div class="case-stat"><p class="case-stat__label">Read</p><p class="case-stat__value">${minutes} min</p></div>
        </div>
        ${summary}
      </div>
    </section>

    <section class="case-content">
      <div class="container">
        ${media(c.visual, c.visual.art, `case-${c.slug}`, 'case-visual')}
        <div class="case-layout">
          <nav class="case-toc" aria-label="On this page">
            <p class="case-stat__label">On this page</p>
            <ol>${tocItems.map(([, id, label]) => `<li><a href="#${id}" data-toc-link>${label}</a></li>`).join('')}</ol>
          </nav>
          <article class="case-article">
            ${article}
            ${c.nda ? `<p class="case-note case-note--nda">To comply with my non-disclosure agreement, I have omitted and obfuscated confidential information in this case study.</p>` : ''}
          </article>
        </div>

        <div class="cta-band" data-reveal style="margin-top: var(--space-xl)">
          <h2 class="cta-band__title"><span class="t-sans">Want something</span><span class="t-serif">like this?</span></h2>
          <div class="btn-row">
            <a class="btn btn--solid" href="/work-with-me.html" data-transition>Work with me</a>
            <a class="btn btn--solid" href="/hire.html" data-transition>Hire me full-time</a>
          </div>
        </div>

        ${related ? `<div class="case-more" data-reveal>
          <p class="case-stat__label">More work</p>
          <div class="case-more__grid">${related}</div>
        </div>` : ''}
      </div>
    </section>

    <a href="/work/${next.slug}.html" class="case-next" data-transition>
      <div class="container">
        <p class="case-next__label">Next project</p>
        <h2 class="case-next__title">${esc(next.title)} →</h2>
      </div>
    </a>`;
}

export const caseSlugs = cases.map((c) => c.slug);
