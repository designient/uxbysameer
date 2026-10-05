import { gsap } from 'gsap';
import { testimonials } from '../data/content.js';

/** Tabbed testimonial slider. `data-groups` on the root limits which groups render (comma-separated). */
export function initTestimonials() {
  const root = document.querySelector('[data-testimonials]');
  if (!root) return;

  const wanted = root.dataset.groups?.split(',').map((g) => g.trim());
  const groups = Object.entries(testimonials).filter(
    ([key, g]) => g.items.length && (!wanted || wanted.includes(key))
  );
  if (!groups.length) {
    root.closest('section')?.setAttribute('hidden', '');
    return;
  }

  const tabsWrap = root.querySelector('.tabs');
  const card = root.querySelector('.testimonial');
  const quoteEl = card.querySelector('.testimonial__quote');
  const nameEl = card.querySelector('.testimonial__name');
  const roleEl = card.querySelector('.testimonial__role');
  const dotsWrap = root.querySelector('.testimonials__dots');
  const controls = root.querySelector('.testimonials__controls');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let items = [];
  let index = 0;
  let autoTimer = null;

  if (groups.length > 1) {
    tabsWrap.innerHTML = groups
      .map(([key, g], i) => `<button class="tab" role="tab" type="button" data-group="${key}" aria-selected="${i === 0}">${g.label}</button>`)
      .join('');
    tabsWrap.querySelectorAll('.tab').forEach((tab) =>
      tab.addEventListener('click', () => {
        tabsWrap.querySelectorAll('.tab').forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
        selectGroup(tab.dataset.group);
      })
    );
  } else {
    tabsWrap.remove();
  }

  function selectGroup(key) {
    items = testimonials[key].items;
    dotsWrap.innerHTML = items
      .map((_, i) => `<button class="testimonials__dot" type="button" aria-label="Testimonial ${i + 1}"></button>`)
      .join('');
    [...dotsWrap.children].forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    controls.hidden = items.length < 2;
    goTo(0);
  }

  function render(i) {
    const t = items[i];
    quoteEl.textContent = `“${t.quote}”`;
    nameEl.textContent = t.name;
    roleEl.textContent = t.role;
    [...dotsWrap.children].forEach((d, di) => d.classList.toggle('is-active', di === i));
  }

  function goTo(i, fromAuto = false) {
    index = (i + items.length) % items.length;
    if (reducedMotion) {
      render(index);
    } else {
      gsap.to(card, {
        opacity: 0,
        y: 16,
        duration: 0.25,
        ease: 'power2.in',
        onComplete() {
          render(index);
          gsap.to(card, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
        },
      });
    }
    if (!fromAuto) restartAuto();
  }

  function restartAuto() {
    clearInterval(autoTimer);
    if (items.length > 1 && !reducedMotion) {
      autoTimer = setInterval(() => goTo(index + 1, true), 7000);
    }
  }

  root.querySelector('[data-prev]')?.addEventListener('click', () => goTo(index - 1));
  root.querySelector('[data-next]')?.addEventListener('click', () => goTo(index + 1));

  let startX = null;
  card.addEventListener('pointerdown', (e) => (startX = e.clientX));
  card.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
    startX = null;
  });

  selectGroup(groups[0][0]);
}
