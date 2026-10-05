import '../css/main.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initSectionReveals, initStatCounters, initTimeline, initParallax } from './anims/reveals.js';
import { initPageTransitions } from './anims/transitions.js';
import { mountArt } from './anims/cardArt.js';
import { initSmoothScroll } from './utils/smoothScroll.js';
import { initCursor } from './utils/cursor.js';
import { initMagneticButtons } from './utils/magnetic.js';
import { initTestimonials } from './components/testimonials.js';
import { initCaseToc, initCaseMedia } from './components/caseToc.js';
import { initLogo } from './components/logo.js';
import { site } from './data/content.js';
import {
  initAvatar,
  initLocalTime,
  initEmailCopy,
  initMobileNav,
  initAnchorScroll,
} from './components/misc.js';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lenis = initSmoothScroll();

initAvatar();
const logo = initLogo();
gsap.delayedCall(0.35, logo.play);
mountArt();
initPageTransitions();
initSectionReveals();
initStatCounters();
initTimeline();
initParallax();
initCursor();
initMagneticButtons();
initTestimonials();
initLocalTime();
initEmailCopy();
initMobileNav();
initAnchorScroll(lenis);
initCaseToc();
initCaseMedia();

// Waitlist has no backend yet: hand off to the visitor's mail client with the details prefilled.
document.querySelectorAll('[data-waitlist]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = new FormData(form).get('email');
    const subject = encodeURIComponent(form.dataset.waitlist);
    const body = encodeURIComponent(`Hi Sameer,\n\nPlease add me to the waitlist.\n\nEmail: ${email}\n`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  });
});

if (!reducedMotion) {
  const tl = gsap.timeline({ delay: 0.15 });
  const steps = [
    ['.case-hero__back, .page-hero .section-label', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, 0],
    ['.page-hero__title > span, .case-hero__title', { yPercent: 60, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }, 0.2],
    [
      '.page-hero__lede, .page-hero .btn-row, .case-hero__subtitle, .case-hero__hook, .case-hero__stats > *, .case-summary',
      { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', stagger: 0.06 },
      0.5,
    ],
  ];
  steps.forEach(([selector, vars, at]) => {
    const els = document.querySelectorAll(selector);
    if (els.length) tl.from(els, vars, at);
  });
}

ScrollTrigger.refresh();
