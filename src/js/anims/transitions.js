import { gsap } from 'gsap';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initPageTransitions() {
  const overlay = document.querySelector('.page-transition');
  if (!overlay) return;

  const panels = overlay.querySelectorAll('.page-transition__panel');

  // Animate out the curtain on page load if arriving from an internal transition
  if (sessionStorage.getItem('transitioning') === '1') {
    sessionStorage.removeItem('transitioning');
    if (!reducedMotion) {
      gsap.set(panels, { scaleY: 1, transformOrigin: 'top' });
      overlay.classList.add('is-active');
      gsap.to(panels, {
        scaleY: 0,
        duration: 0.7,
        ease: 'expo.inOut',
        stagger: 0.06,
        delay: 0.1,
        onComplete: () => overlay.classList.remove('is-active'),
      });
    }
  }

  if (reducedMotion) return;

  document.querySelectorAll('a[data-transition]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http')) return;

      e.preventDefault();
      sessionStorage.setItem('transitioning', '1');

      overlay.classList.add('is-active');
      gsap.set(panels, { scaleY: 0, transformOrigin: 'bottom' });
      gsap.to(panels, {
        scaleY: 1,
        duration: 0.6,
        ease: 'expo.inOut',
        stagger: 0.06,
        onComplete: () => {
          window.location.href = href;
        },
      });
    });
  });
}
