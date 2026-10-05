import { projects, lab } from '../data/content.js';
import { mountArt } from '../anims/cardArt.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const artAttr = (art, key) => `data-art='${JSON.stringify(art).replace(/'/g, '&#39;')}' data-art-key="${key}"`;
const tags = (list) => `<ul class="tags">${list.map((t) => `<li>${t}</li>`).join('')}</ul>`;

function video(src) {
  return `<video src="${src}" muted loop playsinline preload="metadata" ${reducedMotion ? '' : 'autoplay'} aria-hidden="true"></video>`;
}

export function renderWork() {
  const grid = document.querySelector('[data-work-grid]');
  if (!grid) return;

  grid.innerHTML = projects
    .map(
      (p) => `
      <a class="work-card${p.featured ? ' work-card--featured' : ''}" href="${p.href}" data-transition>
        <div class="work-card__media art" ${artAttr(p.art, p.slug)}>
          ${p.image ? `<img src="${p.image}" alt="${p.title} preview" loading="lazy" />` : ''}
          <span class="work-card__arrow" aria-hidden="true">↗</span>
        </div>
        <div>
          <h3 class="work-card__title">${p.title}</h3>
          <p class="work-card__subtitle">${p.subtitle}</p>
          ${tags(p.tags)}
        </div>
      </a>`
    )
    .join('');
  mountArt(grid);
}

export function renderLab() {
  const grid = document.querySelector('[data-lab-grid]');
  if (!grid) return;

  grid.innerHTML = lab
    .map(
      (item, i) => `
      <article class="lab-card">
        <div class="lab-card__media art" ${artAttr(item.art, `lab-${i}`)}>
          ${item.video ? video(item.video) : ''}
        </div>
        <div class="lab-card__body">
          <p class="lab-card__kind">${item.kind}</p>
          <h3 class="lab-card__title">${item.title}</h3>
          <p class="lab-card__outcome">${item.outcome}</p>
          ${tags(item.stack)}
          <a class="lab-card__link" href="${item.href}" ${item.href.startsWith('/') ? 'data-transition' : ''}>Explore →</a>
        </div>
      </article>`
    )
    .join('');
  mountArt(grid);
}
