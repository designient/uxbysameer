import '../css/main.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initSectionReveals, initParallax } from './anims/reveals.js';
import { initPageTransitions } from './anims/transitions.js';
import { initSmoothScroll } from './utils/smoothScroll.js';
import { initCursor } from './utils/cursor.js';
import { initMagneticButtons } from './utils/magnetic.js';
import { initLocalTime, initMobileNav } from './components/misc.js';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const lenis = initSmoothScroll();

initPageTransitions();
initSectionReveals();
initParallax();
initCursor();
initMagneticButtons();
initLocalTime();
initMobileNav();

// Hero entrance for case study pages
if (!reducedMotion) {
  const tl = gsap.timeline({ delay: 0.2 });
  tl.from('.case-hero__back', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
    .from(
      '.case-hero__title',
      { opacity: 0, y: 60, duration: 1, ease: 'expo.out' },
      '-=0.4'
    )
    .from(
      '.case-hero__subtitle, .case-hero__stats > *',
      { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', stagger: 0.08 },
      '-=0.6'
    );
}

ScrollTrigger.refresh();
