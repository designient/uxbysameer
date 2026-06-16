import '../css/main.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { runPreloader } from './anims/preloader.js';
import { initEditorialHero } from './anims/heroEditorial.js';
import {
  initSectionReveals,
  initStatCounters,
  initTimeline,
  initServicesPanels,
  initParallax,
} from './anims/reveals.js';
import { initPageTransitions } from './anims/transitions.js';
import { initWorkPreviews } from './anims/workPreview.js';
import { initSmoothScroll } from './utils/smoothScroll.js';
import { initCursor } from './utils/cursor.js';
import { initMagneticButtons } from './utils/magnetic.js';
import { initTestimonials } from './components/testimonials.js';
import {
  initLocalTime,
  initEmailCopy,
  initBackToTop,
  initMobileNav,
  initAnchorScroll,
} from './components/misc.js';

gsap.registerPlugin(ScrollTrigger);

runPreloader().then(() => {
  const lenis = initSmoothScroll();

  initEditorialHero();
  initSectionReveals();
  initStatCounters();
  initTimeline();
  initServicesPanels();
  initParallax();
  initWorkPreviews();
  initPageTransitions();
  initCursor();
  initMagneticButtons();
  initTestimonials();
  initLocalTime();
  initEmailCopy();
  initBackToTop(lenis);
  initMobileNav();
  initAnchorScroll(lenis);

  ScrollTrigger.refresh();
});
