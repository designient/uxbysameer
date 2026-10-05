import { gsap } from 'gsap';
import { prepareStrokes } from '../components/logo.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Homepage preloader: the signature draws itself in step with the counter, then flies
 * into the nav logo's exact position and size while the loader fades away.
 */
export function runPreloader(logo) {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return Promise.resolve();

  const counter = preloader.querySelector('.preloader__counter');
  const bar = preloader.querySelector('.preloader__bar');
  const barFill = preloader.querySelector('.preloader__bar-fill');
  const bg = preloader.querySelector('.preloader__bg');
  const sig = preloader.querySelector('.preloader__sig');
  const target = document.querySelector('.nav__brand .signature');

  document.documentElement.style.overflow = 'hidden';

  const paths = sig && !reducedMotion ? [...sig.querySelectorAll('path')] : [];
  const hidden = prepareStrokes(paths);
  const total = hidden.reduce((a, b) => a + b, 0);
  const starts = hidden.map((_, i) => hidden.slice(0, i).reduce((a, b) => a + b, 0));

  const drawTo = (progress) => {
    const drawn = progress * total;
    paths.forEach((p, i) => {
      const k = Math.min(1, Math.max(0, (drawn - starts[i]) / hidden[i]));
      p.style.strokeDashoffset = `${hidden[i] * (1 - k)}`;
    });
  };
  drawTo(0);

  const state = { progress: 0 };

  // Resolves as the signature takes off so the hero intro plays under the fading loader.
  return new Promise((resolve) => {
    const finish = () => {
      logo?.reveal();
      preloader.style.display = 'none';
      document.documentElement.style.overflow = '';
      resolve();
    };

    gsap.to(state, {
      progress: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate() {
        counter.textContent = String(Math.round(state.progress)).padStart(3, '0');
        barFill.style.width = `${state.progress}%`;
        drawTo(state.progress / 100);
      },
      onComplete() {
        if (reducedMotion || !sig || !target) {
          gsap.to(preloader, { opacity: 0, duration: 0.4, delay: 0.2, onComplete: finish });
          return;
        }

        const from = sig.getBoundingClientRect();
        const to = target.getBoundingClientRect();

        gsap
          .timeline({ delay: 0.35, onStart: resolve, onComplete: finish })
          .to([counter, bar], { opacity: 0, duration: 0.3 })
          .to(
            sig,
            {
              x: to.left - from.left,
              y: to.top - from.top,
              scale: to.width / from.width,
              duration: 0.9,
              ease: 'expo.inOut',
            },
            0
          )
          .to(bg, { opacity: 0, duration: 0.7, ease: 'power2.inOut' }, 0.2);
      },
    });
  });
}
