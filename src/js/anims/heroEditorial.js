import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const SWAP_WORDS = ['build', 'ship', 'scale'];
let swapTimer = null;

function fitTextToWidth(el, mainWidth, titleSize, startRatio = 0.45) {
  let size = titleSize * startRatio;
  el.style.fontSize = `${size}px`;

  while (el.scrollWidth > mainWidth && size > 10) {
    size -= 1;
    el.style.fontSize = `${size}px`;
  }

  while (el.scrollWidth <= mainWidth && size < titleSize) {
    size += 1;
    el.style.fontSize = `${size}px`;
    if (el.scrollWidth > mainWidth) {
      size -= 1;
      el.style.fontSize = `${size}px`;
      break;
    }
  }

  return size;
}

function syncSlotWidth(slot, slotInner) {
  if (!slot || !slotInner) return;
  slot.style.width = 'auto';
  let maxW = 0;
  [...slotInner.children].forEach((span) => {
    maxW = Math.max(maxW, span.offsetWidth);
  });
  slot.style.width = `${Math.ceil(maxW) + 4}px`;
}

/** Lock stack width to "I design" so every right-aligned line ends at the same edge. */
function fitHeadlineStack() {
  const stack = document.querySelector('.hero__title-stack');
  const main = document.querySelector('.hero__line--main .hero__line-text');
  const sub = document.querySelector('.hero__line-sub');
  const accentInner = document.querySelector('.hero__accent-inner');
  const slot = document.querySelector('.hero__word-slot');
  const slotInner = document.querySelector('.hero__word-slot-inner');
  const title = document.querySelector('.hero__title');
  if (!main || !title || !stack) return;

  const mainWidth = main.getBoundingClientRect().width;
  if (!mainWidth) return;

  stack.style.width = `${Math.ceil(mainWidth)}px`;

  const titleSize = parseFloat(getComputedStyle(title).fontSize);

  if (sub) fitTextToWidth(sub, mainWidth, titleSize, 0.45);

  if (accentInner && slot && slotInner) {
    let size = titleSize * 0.75;
    const measureAccent = () => {
      accentInner.style.fontSize = `${size}px`;
      syncSlotWidth(slot, slotInner);
      return accentInner.scrollWidth;
    };

    while (measureAccent() > mainWidth && size > 10) size -= 1;
    while (measureAccent() <= mainWidth && size < titleSize) {
      size += 1;
      if (measureAccent() > mainWidth) {
        size -= 1;
        measureAccent();
        break;
      }
    }
    gsap.set(slotInner, { y: 0, yPercent: 0 });
  }
}

export function initEditorialHero() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const slotInner = document.querySelector('.hero__word-slot-inner');
  if (slotInner) {
    slotInner.innerHTML = [...SWAP_WORDS, SWAP_WORDS[0]]
      .map((w) => `<span>${w}</span>`)
      .join('');
  }

  fitHeadlineStack();
  window.addEventListener('resize', fitHeadlineStack);
  document.fonts?.ready?.then(fitHeadlineStack);

  if (reducedMotion) return;

  const lineTexts = document.querySelectorAll(
    '.hero__title .hero__line-text, .hero__accent-em'
  );
  const tl = gsap.timeline({ delay: 0.1 });

  lineTexts.forEach((text, i) => {
    const split = new SplitText(text, { type: 'chars', charsClass: 'char' });
    tl.from(
      split.chars,
      {
        yPercent: 115,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.025,
      },
      i * 0.12
    );
  });

  tl.from('.hero__word-slot', { yPercent: 115, duration: 0.9, ease: 'expo.out' }, 0.24)
    .from('.hero__line-sub', { yPercent: 115, opacity: 0, duration: 0.8, ease: 'expo.out' }, 0.3)
    .from('.hero__meta-row > *', { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out', stagger: 0.08 }, '-=0.6');

  const subtitle = document.querySelector('.hero__subtitle');
  if (subtitle) {
    const split = new SplitText(subtitle, { type: 'lines', linesClass: 'line' });
    tl.from(
      split.lines,
      { yPercent: 100, opacity: 0, duration: 0.7, ease: 'expo.out', stagger: 0.07 },
      '-=0.5'
    );
  }

  tl.from('.hero__scroll', { opacity: 0, duration: 0.5 }, '-=0.3').from(
    '.hero__marquee',
    { yPercent: 100, opacity: 0, duration: 0.8, ease: 'expo.out' },
    '-=0.6'
  );

  if (slotInner) {
    let index = 0;
    let swapping = false;

    const stepHeight = () => slotInner.children[0]?.offsetHeight || 0;

    const advanceWord = () => {
      if (swapping) return;
      const stepH = stepHeight();
      if (!stepH) return;

      swapping = true;
      index += 1;

      gsap.to(slotInner, {
        y: -index * stepH,
        duration: 0.5,
        ease: 'expo.inOut',
        overwrite: true,
        onComplete() {
          if (index === SWAP_WORDS.length) {
            index = 0;
            gsap.set(slotInner, { y: 0 });
          }
          swapping = false;
        },
      });
    };

    if (swapTimer) clearInterval(swapTimer);
    swapTimer = setInterval(advanceWord, 1600);
  }

  document.querySelectorAll('.hero__title .hero__line').forEach((line, i) => {
    gsap.to(line, {
      xPercent: i % 2 === 0 ? -6 : 6,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  });
}
