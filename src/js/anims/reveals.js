import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initHeroIntro() {
  if (reducedMotion) return;

  const tl = gsap.timeline({ delay: 0.1 });

  const title = document.querySelector('.hero__title');
  if (title) {
    const split = new SplitText(title, { type: 'words,chars', wordsClass: 'word', charsClass: 'char' });
    tl.from(split.chars, {
      yPercent: 110,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.018,
    });
  }

  const eyebrow = document.querySelector('.hero__eyebrow span');
  if (eyebrow) {
    tl.from(eyebrow, { yPercent: 110, duration: 0.7, ease: 'expo.out' }, '-=0.7');
  }

  const subtitle = document.querySelector('.hero__subtitle');
  if (subtitle) {
    const split = new SplitText(subtitle, { type: 'lines', linesClass: 'line' });
    tl.from(
      split.lines,
      { yPercent: 100, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08 },
      '-=0.5'
    );
  }

  tl.from(
    ['.hero__roles', '.hero__scroll'],
    { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', stagger: 0.1 },
    '-=0.4'
  );
}

export function initSectionReveals() {
  if (reducedMotion) return;

  document.querySelectorAll('[data-reveal-title]').forEach((el) => {
    const split = new SplitText(el, { type: 'lines', linesClass: 'line' });
    split.lines.forEach((line) => {
      const inner = document.createElement('span');
      inner.className = 'line-inner';
      inner.innerHTML = line.innerHTML;
      line.innerHTML = '';
      line.appendChild(inner);
    });

    gsap.from(el.querySelectorAll('.line-inner'), {
      yPercent: 110,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

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
  document.querySelectorAll('.stat__number').forEach((el) => {
    const target = parseInt(el.dataset.value, 10);
    const suffix = el.dataset.suffix || '';

    if (reducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    const state = { value: 0 };
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

export function initServicesStack() {
  if (reducedMotion) return;

  const cards = document.querySelectorAll('.service-card');
  cards.forEach((card, i) => {
    if (i === cards.length - 1) return;
    gsap.to(card, {
      scale: 0.95,
      opacity: 0.6,
      ease: 'none',
      scrollTrigger: {
        trigger: cards[i + 1],
        start: 'top bottom',
        end: 'top top+=120',
        scrub: true,
      },
    });
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
