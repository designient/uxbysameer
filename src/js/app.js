import '../css/main.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HeroScene } from './scene/heroScene.js';
import { runPreloader } from './anims/preloader.js';
import {
  initHeroIntro,
  initSectionReveals,
  initStatCounters,
  initTimeline,
  initServicesStack,
  initParallax,
} from './anims/reveals.js';
import { initPageTransitions } from './anims/transitions.js';
import { initWorkPreviews } from './anims/workPreview.js';
import { initSmoothScroll } from './utils/smoothScroll.js';
import { initCursor } from './utils/cursor.js';
import { initMagneticButtons } from './utils/magnetic.js';
import { initRoleTicker } from './components/roleTicker.js';
import { initTestimonials } from './components/testimonials.js';
import {
  initLocalTime,
  initEmailCopy,
  initBackToTop,
  initMobileNav,
  initAnchorScroll,
} from './components/misc.js';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const canvas = document.getElementById('hero-canvas');
const scene = canvas ? new HeroScene(canvas, { reducedMotion }) : null;

// Drive scroll-based morphing of the particle field
if (scene && !reducedMotion) {
  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'max',
    onUpdate(self) {
      scene.setScroll(self.progress);
    },
  });
}

const sceneReady = scene ? scene.waitForReady() : Promise.resolve();

runPreloader(sceneReady).then(() => {
  const lenis = initSmoothScroll();

  initHeroIntro();
  initSectionReveals();
  initStatCounters();
  initTimeline();
  initServicesStack();
  initParallax();
  initWorkPreviews();
  initPageTransitions();
  initCursor();
  initMagneticButtons();
  initRoleTicker();
  initTestimonials();
  initLocalTime();
  initEmailCopy();
  initBackToTop(lenis);
  initMobileNav();
  initAnchorScroll(lenis);

  ScrollTrigger.refresh();
});
