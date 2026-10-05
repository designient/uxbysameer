import '../css/main.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { runPreloader } from './anims/preloader.js';
import { initHero } from './anims/hero.js';
import { initSectionReveals, initStatCounters, initParallax } from './anims/reveals.js';
import { initPageTransitions } from './anims/transitions.js';
import { mountArt } from './anims/cardArt.js';
import { initSmoothScroll } from './utils/smoothScroll.js';
import { initCursor } from './utils/cursor.js';
import { initMagneticButtons } from './utils/magnetic.js';
import { initStoryDeck } from './components/storyDeck.js';
import { renderWork, renderLab } from './components/homeSections.js';
import { initAgentChat } from './components/agentChat.js';
import { initTestimonials } from './components/testimonials.js';
import { initLogo } from './components/logo.js';
import {
  initAvatar,
  initLocalTime,
  initEmailCopy,
  initBackToTop,
  initMobileNav,
  initAnchorScroll,
} from './components/misc.js';

gsap.registerPlugin(ScrollTrigger);

const lenis = initSmoothScroll();
lenis?.stop();

// Render data-driven markup before the preloader lifts so the intro can animate it.
initAvatar();
const logo = initLogo();
initStoryDeck(lenis);
renderWork();
renderLab();
mountArt();

runPreloader(logo).then(() => {
  lenis?.start();
  initHero();
  initSectionReveals();
  initStatCounters();
  initParallax();
  initPageTransitions();
  initCursor();
  initMagneticButtons();
  initAgentChat();
  initTestimonials();
  initLocalTime();
  initEmailCopy();
  initBackToTop(lenis);
  initMobileNav();
  initAnchorScroll(lenis);

  ScrollTrigger.refresh();
});
