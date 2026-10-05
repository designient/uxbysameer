import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initSectionReveals() {
  if (reducedMotion) return;

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });

  document.querySelectorAll('[data-reveal-stagger]').forEach((parent) => {
    gsap.from(parent.children, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: parent,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

export function initStatCounters() {
  document.querySelectorAll('.stat__number[data-value]').forEach((el) => {
    const target = parseInt(el.dataset.value, 10);
    const suffix = el.dataset.suffix || '';

    if (reducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    const state = { value: 0 };
    el.textContent = `0${suffix}`;
    gsap.to(state, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate() {
        el.textContent = Math.round(state.value) + suffix;
      },
    });
  });
}

export function initTimeline() {
  const lineFill = document.querySelector('.experience__line-fill');
  const items = document.querySelectorAll('.timeline-item');

  if (lineFill && !reducedMotion) {
    gsap.to(lineFill, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.experience__timeline',
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 0.5,
      },
    });
  }

  items.forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 70%',
      onEnter: () => item.classList.add('is-active'),
    });

    if (!reducedMotion) {
      gsap.from(item, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          once: true,
        },
      });
    }
  });
}

export function initParallax() {
  if (reducedMotion) return;

  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.2;
    gsap.to(el, {
      yPercent: -speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}
