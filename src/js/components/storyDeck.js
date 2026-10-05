import { gsap } from 'gsap';
import { stories } from '../data/content.js';
import { artSVG, mountArt } from '../anims/cardArt.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobileQuery = window.matchMedia('(max-width: 760px)');

const escapeAttr = (s) => s.replace(/'/g, '&#39;');

export function initStoryDeck(lenis) {
  const deck = document.querySelector('.deck');
  const sheet = document.querySelector('.sheet');
  if (!deck || !sheet) return;

  deck.innerHTML = stories
    .map(
      (s, i) => `
      <button class="deck__card" type="button" data-index="${i}" aria-label="Open chapter ${i + 1}: ${s.label}">
        <span class="deck__art art" data-art='${escapeAttr(JSON.stringify(s.art))}' data-art-key="${s.id}"></span>
        <span class="deck__label"><span class="deck__num">${String(i + 1).padStart(2, '0')}</span>${s.label}</span>
      </button>`
    )
    .join('');
  mountArt(deck);

  const cards = [...deck.querySelectorAll('.deck__card')];
  const layout = () => fan(deck, cards);
  layout();
  window.addEventListener('resize', layout);
  mobileQuery.addEventListener('change', layout);

  if (!reducedMotion) {
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        if (mobileQuery.matches) return;
        gsap.to(card, { y: Number(card.dataset.y) - 36, rotation: Number(card.dataset.r) * 0.4, scale: 1.05, duration: 0.5, ease: 'expo.out' });
      });
      card.addEventListener('mouseleave', () => {
        if (mobileQuery.matches) return;
        gsap.to(card, { y: Number(card.dataset.y), rotation: Number(card.dataset.r), scale: 1, duration: 0.6, ease: 'expo.out' });
      });
    });
  }

  const chapter = createSheet(sheet, lenis);
  cards.forEach((card) => card.addEventListener('click', () => chapter.open(Number(card.dataset.index), card)));
}

function fan(deck, cards) {
  const n = cards.length;
  if (mobileQuery.matches) {
    deck.classList.add('is-row');
    cards.forEach((card) => {
      card.dataset.x = card.dataset.y = card.dataset.r = 0;
      gsap.set(card, { clearProps: 'transform,left,zIndex' });
    });
    return;
  }

  deck.classList.remove('is-row');
  const width = deck.clientWidth;
  const cardW = cards[0].offsetWidth;
  const spread = Math.min((width - cardW) / (n - 1), cardW * 0.78);

  cards.forEach((card, i) => {
    const t = i - (n - 1) / 2;
    const x = t * spread;
    const y = Math.abs(t) ** 2 * 14;
    const r = t * 7;
    Object.assign(card.dataset, { x, y, r });
    gsap.set(card, { left: '50%', xPercent: -50, x, y, rotation: r, zIndex: i + 1, transformOrigin: '50% 100%' });
  });
}

/** Intro: cards rise from below in sequence. Called by the hero timeline. */
export function deckIntro(tl, at = 0) {
  if (reducedMotion) return;
  const cards = document.querySelectorAll('.deck__card');
  if (!cards.length) return;
  if (mobileQuery.matches) {
    tl.from(cards, { y: 80, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, at);
    return;
  }
  tl.from(cards, { y: '+=420', rotation: 0, duration: 1.3, ease: 'expo.out', stagger: 0.08 }, at);
}

function createSheet(sheet, lenis) {
  const panel = sheet.querySelector('.sheet__panel');
  const media = sheet.querySelector('.sheet__media');
  const kicker = sheet.querySelector('.sheet__kicker');
  const sans = sheet.querySelector('.sheet__sans');
  const serif = sheet.querySelector('.sheet__serif');
  const body = sheet.querySelector('.sheet__body');
  const facts = sheet.querySelector('.sheet__facts');
  const cta = sheet.querySelector('.sheet__cta');
  const content = sheet.querySelector('.sheet__content');
  let index = 0;
  let opener = null;
  let closing = false;

  function render(i) {
    index = (i + stories.length) % stories.length;
    const s = stories[index];
    media.innerHTML = s.photo
      ? `<img src="${s.photo}" alt="" loading="lazy" />`
      : artSVG(s.art, s.id);
    kicker.textContent = `Chapter ${String(index + 1).padStart(2, '0')} / ${String(stories.length).padStart(2, '0')}`;
    sans.textContent = s.titleSans;
    serif.textContent = s.titleSerif;
    body.innerHTML = s.body.map((p) => `<p>${p}</p>`).join('');
    facts.innerHTML = s.facts.map((f) => `<li>${f}</li>`).join('');
    cta.textContent = s.cta.label;
    cta.href = s.cta.href;
    if (s.cta.external) {
      cta.target = '_blank';
      cta.rel = 'noopener';
    } else {
      cta.removeAttribute('target');
      cta.removeAttribute('rel');
    }
    content.scrollTop = 0;
  }

  function step(dir) {
    if (reducedMotion) return render(index + dir);
    gsap.to([media, content], {
      opacity: 0,
      x: -24 * dir,
      duration: 0.22,
      ease: 'power2.in',
      onComplete() {
        render(index + dir);
        gsap.fromTo([media, content], { opacity: 0, x: 24 * dir }, { opacity: 1, x: 0, duration: 0.45, ease: 'expo.out' });
      },
    });
  }

  function open(i, from) {
    opener = from;
    render(i);
    sheet.showModal();
    lenis?.stop();
    document.documentElement.classList.add('sheet-open');
    if (!reducedMotion) {
      gsap.fromTo(panel, { y: 80, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'expo.out' });
    }
  }

  function close(after) {
    if (closing) return;
    closing = true;
    const done = () => {
      sheet.close();
      lenis?.start();
      document.documentElement.classList.remove('sheet-open');
      if (typeof after === 'function') after();
      else opener?.focus();
      closing = false;
    };
    if (reducedMotion) return done();
    gsap.to(panel, { y: 60, opacity: 0, scale: 0.97, duration: 0.35, ease: 'power2.in', onComplete: done });
  }

  sheet.querySelector('.sheet__close').addEventListener('click', () => close());
  sheet.querySelector('[data-sheet-prev]').addEventListener('click', () => step(-1));
  sheet.querySelector('[data-sheet-next]').addEventListener('click', () => step(1));
  sheet.addEventListener('cancel', (e) => {
    e.preventDefault();
    close();
  });
  sheet.addEventListener('click', (e) => {
    if (e.target === sheet) close();
  });
  sheet.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
  cta.addEventListener('click', (e) => {
    const href = cta.getAttribute('href');
    if (!href.startsWith('#')) return;
    e.preventDefault();
    close(() => {
      const target = document.querySelector(href);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.4 });
      else target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      target.querySelector('input, textarea')?.focus({ preventScroll: true });
    });
  });

  return { open, close };
}
