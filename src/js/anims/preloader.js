import { gsap } from 'gsap';

export function runPreloader(sceneReadyPromise) {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return Promise.resolve();

  const counter = preloader.querySelector('.preloader__counter');
  const nameInner = preloader.querySelector('.preloader__name-inner');
  const bar = preloader.querySelector('.preloader__bar');
  const barFill = preloader.querySelector('.preloader__bar-fill');

  document.documentElement.style.overflow = 'hidden';

  const state = { progress: 0 };

  function setProgress(value) {
    counter.textContent = String(Math.round(value)).padStart(3, '0');
    barFill.style.width = `${value}%`;
  }

  function tweenTo(target, duration) {
    return gsap.to(state, {
      progress: target,
      duration,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(state.progress),
    });
  }

  return new Promise((resolve) => {
    const tl = gsap.timeline();

    // Count to 90, hold for the Three.js scene, then finish to 100
    tl.add(tweenTo(90, 1.4)).add(async () => {
      await sceneReadyPromise;
      await tweenTo(100, 0.4);

      const out = gsap.timeline({
        onComplete() {
          preloader.style.display = 'none';
          document.documentElement.style.overflow = '';
          resolve();
        },
      });

      out
        .to(nameInner, { y: 0, duration: 0.9, ease: 'expo.out' })
        .to(nameInner, { y: '-110%', duration: 0.7, ease: 'expo.in', delay: 0.5 })
        .to([counter, bar], { opacity: 0, duration: 0.4 }, '<')
        .to(preloader, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' });
    });
  });
}
