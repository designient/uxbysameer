import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { deckIntro } from '../components/storyDeck.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

function flowerPath(petals = 7, steps = 140) {
  let d = '';
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = 72 + 24 * Math.abs(Math.cos((petals / 2) * t)) ** 0.8;
    d += `${i ? 'L' : 'M'}${(100 + r * Math.cos(t)).toFixed(1)} ${(100 + r * Math.sin(t)).toFixed(1)}`;
  }
  return `${d}Z`;
}

export function initHero() {
  document.querySelector('.hero__blob-shape path')?.setAttribute('d', flowerPath());

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const tl = gsap.timeline({ delay: 0.05 });

  tl.from('.hero__blob', { scale: 0.4, opacity: 0, rotation: -40, duration: 1.4, ease: 'expo.out' }, 0);

  document.querySelectorAll('.hero__line').forEach((line, i) => {
    const split = new SplitText(line, { type: 'chars', charsClass: 'char' });
    tl.from(split.chars, { yPercent: 115, duration: 0.9, ease: 'expo.out', stagger: 0.018 }, 0.1 + i * 0.1);
  });

  tl.from('.hero__sub', { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out' }, 0.5);
  deckIntro(tl, 0.35);
  tl.from('.hero__status', { opacity: 0, y: 24, duration: 0.7, ease: 'expo.out' }, 0.9);
  tl.from('.nav__inner > :not(.nav__brand)', { opacity: 0, y: -16, duration: 0.6, ease: 'power3.out', stagger: 0.06 }, 0.2);

  gsap.to('.hero__blob-shape', { rotation: 360, transformOrigin: '50% 50%', duration: 90, ease: 'none', repeat: -1 });

  gsap.to('.hero__title', {
    yPercent: -30,
    opacity: 0.2,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 },
  });
  gsap.to('.deck', {
    yPercent: 18,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 },
  });
}
