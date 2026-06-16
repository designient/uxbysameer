import { gsap } from 'gsap';

export function runPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return Promise.resolve();

  const counter = preloader.querySelector('.preloader__counter');
  const nameInner = preloader.querySelector('.preloader__name-inner');
  const bar = preloader.querySelector('.preloader__bar');
  const barFill = preloader.querySelector('.preloader__bar-fill');

  document.documentElement.style.overflow = 'hidden';

  const state = { progress: 0 };

  return new Promise((resolve) => {
    gsap.to(state, {
      progress: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate() {
        counter.textContent = String(Math.round(state.progress)).padStart(3, '0');
        barFill.style.width = `${state.progress}%`;
      },
      onComplete() {
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
      },
    });
  });
}
