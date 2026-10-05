import { gsap } from 'gsap';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hidden strokes sit this far past the path start so round caps don't show as dots.
const CAP_GAP = 30;

/** Sets each path's dash pattern from its real length; returns the offset that fully hides it. */
export function prepareStrokes(paths) {
  return paths.map((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length + CAP_GAP * 2}`;
    return length + CAP_GAP;
  });
}

/** Draws each stroke of the signature in turn, with time proportional to its length. */
function draw(paths, lengths, total) {
  const sum = lengths.reduce((a, b) => a + b, 0);
  const tl = gsap.timeline();
  paths.forEach((path, i) => {
    tl.fromTo(
      path,
      { strokeDashoffset: lengths[i] },
      { strokeDashoffset: 0, duration: (lengths[i] / sum) * total, ease: 'power1.inOut' },
      i === 0 ? 0 : '>-0.02'
    );
  });
  return tl;
}

/**
 * Self-drawing signature logo. Hidden until `play()` draws it, or `reveal()` shows it
 * instantly (used when the preloader's signature lands on it); hovering the brand link
 * redraws it quickly.
 */
export function initLogo() {
  const svg = document.querySelector('.nav__brand .signature');
  if (!svg || reducedMotion) return { play() {}, reveal() {} };

  const paths = [...svg.querySelectorAll('path')];
  const lengths = prepareStrokes(paths);
  paths.forEach((p, i) => (p.style.strokeDashoffset = `${lengths[i]}`));

  let current = null;
  const run = (total) => {
    current?.kill();
    current = draw(paths, lengths, total);
  };

  svg.closest('.nav__brand')?.addEventListener('mouseenter', () => run(0.8));

  return {
    play: () => run(1.4),
    reveal: () => {
      current?.kill();
      paths.forEach((p) => (p.style.strokeDashoffset = '0'));
    },
  };
}
