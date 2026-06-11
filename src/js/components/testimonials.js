import { gsap } from 'gsap';
import { testimonials } from '../data/content.js';

export function initTestimonials() {
  const slider = document.querySelector('.testimonials__slider');
  if (!slider) return;

  const card = slider.querySelector('.testimonial');
  const quoteEl = card.querySelector('.testimonial__quote');
  const nameEl = card.querySelector('.testimonial__name');
  const roleEl = card.querySelector('.testimonial__role');
  const dotsWrap = slider.querySelector('.testimonials__dots');
  const prevBtn = slider.querySelector('[data-prev]');
  const nextBtn = slider.querySelector('[data-next]');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = 0;
  let autoTimer = null;

  testimonials.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testimonials__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.children;

  function render(i) {
    const t = testimonials[i];
    quoteEl.textContent = `"${t.quote}"`;
    nameEl.textContent = t.name;
    roleEl.textContent = t.role;
    [...dots].forEach((d, di) => d.classList.toggle('is-active', di === i));
  }

  function goTo(i, fromAuto = false) {
    index = (i + testimonials.length) % testimonials.length;

    if (reducedMotion) {
      render(index);
    } else {
      gsap.to(card, {
        opacity: 0,
        y: 16,
        duration: 0.3,
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
    autoTimer = setInterval(() => goTo(index + 1, true), 6000);
  }

  prevBtn?.addEventListener('click', () => goTo(index - 1));
  nextBtn?.addEventListener('click', () => goTo(index + 1));

  // Drag/swipe support
  let startX = null;
  card.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
  });
  card.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
    startX = null;
  });

  render(0);
  restartAuto();
}
