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

// Scale all panel titles down (uniformly) so the longest word fits its column
function fitServiceTitles() {
  const titles = [...document.querySelectorAll('.service-panel__title')];
  if (!titles.length) return;

  titles.forEach((t) => (t.style.fontSize = ''));
  const baseSize = parseFloat(getComputedStyle(titles[0]).fontSize);
  let scale = 1;

  titles.forEach((title) => {
    const available = title.closest('.service-panel__head').clientWidth - 4;
    title.querySelectorAll('.service-panel__title-line').forEach((line) => {
      const cs = getComputedStyle(line);
      const probe = document.createElement('span');
      probe.textContent = line.textContent;
      probe.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;';
      probe.style.fontFamily = cs.fontFamily;
      probe.style.fontWeight = cs.fontWeight;
      probe.style.fontSize = cs.fontSize;
      probe.style.letterSpacing = cs.letterSpacing;
      probe.style.textTransform = cs.textTransform;
      document.body.appendChild(probe);
      const w = probe.getBoundingClientRect().width;
      probe.remove();
      if (w > available) scale = Math.min(scale, available / w);
    });
  });

  if (scale < 1) {
    const size = `${Math.floor(baseSize * scale * 100) / 100}px`;
    titles.forEach((t) => (t.style.fontSize = size));
  }
}

export function initServicesPanels() {
  const panels = document.querySelectorAll('.service-panel');
  if (!panels.length) return;

  fitServiceTitles();
  if (document.fonts?.ready) document.fonts.ready.then(fitServiceTitles);
  window.addEventListener('resize', fitServiceTitles);

  if (reducedMotion) return;

  panels.forEach((panel) => {
    const lines = panel.querySelectorAll('.service-panel__title-line');
    const capabilities = panel.querySelectorAll('.service-panel__capabilities li');
    const desc = panel.querySelector('.service-panel__desc');
    const number = panel.querySelector('.service-panel__number');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: 'top 80%',
        once: true,
      },
    });

    lines.forEach((line) => {
      const split = new SplitText(line, { type: 'words,chars', charsClass: 'char' });
      tl.from(
        split.chars,
        { yPercent: 110, duration: 0.7, ease: 'expo.out', stagger: 0.02 },
        '<0.1'
      );
    });

    tl.from(number, { opacity: 0, y: 12, duration: 0.5, ease: 'power3.out' }, 0)
      .from(
        capabilities,
        { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out', stagger: 0.05 },
        '-=0.5'
      )
      .from(desc, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.35');
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
