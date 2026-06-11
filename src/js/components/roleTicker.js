import { gsap } from 'gsap';
import { roles } from '../data/content.js';

export function initRoleTicker() {
  const ticker = document.querySelector('.hero__role-ticker-inner');
  if (!ticker) return;

  ticker.innerHTML = [...roles, roles[0]]
    .map((r) => `<span>${r}</span>`)
    .join('');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const items = ticker.children;
  const lineHeight = items[0].offsetHeight || 24;
  let index = 0;

  setInterval(() => {
    index += 1;
    gsap.to(ticker, {
      y: -index * lineHeight,
      duration: 0.7,
      ease: 'expo.inOut',
      onComplete() {
        if (index === roles.length) {
          index = 0;
          gsap.set(ticker, { y: 0 });
        }
      },
    });
  }, 2600);
}
