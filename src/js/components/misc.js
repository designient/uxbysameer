export function initLocalTime() {
  const el = document.querySelector('[data-local-time]');
  if (!el) return;

  function update() {
    const time = new Date().toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    el.textContent = `Bengaluru, India — ${time} IST`;
  }

  update();
  setInterval(update, 30000);
}

export function initEmailCopy() {
  const btn = document.querySelector('[data-copy-email]');
  if (!btn) return;

  const valueEl = btn.querySelector('.contact__link-value');
  const original = valueEl.textContent;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(btn.dataset.copyEmail).then(() => {
      valueEl.textContent = 'Copied to clipboard ✓';
      setTimeout(() => {
        valueEl.textContent = original;
      }, 2000);
    });
  });
}

export function initBackToTop(lenis) {
  const btn = document.querySelector('.footer__back-top');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

export function initMobileNav() {
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.nav__menu-btn');
  if (!nav || !btn) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    const open = nav.classList.contains('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('is-open'));
  });
}

export function initAnchorScroll(lenis) {
  if (!lenis) return;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -72, duration: 1.4 });
    });
  });
}
