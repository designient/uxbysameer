export function initCursor() {
  if (window.matchMedia('(max-width: 768px)').matches) return null;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  const cursor = document.querySelector('.cursor');
  if (!cursor) return null;

  let x = 0;
  let y = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    x = e.clientX;
    y = e.clientY;
    cursor.classList.add('is-visible');
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-visible');
  });

  const hoverTargets = 'a, button, .work-item, .btn-magnetic, .nav__link, .testimonials__btn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.add('is-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.remove('is-hover');
    }
  });

  document.addEventListener('mousedown', () => cursor.classList.add('is-click'));
  document.addEventListener('mouseup', () => cursor.classList.remove('is-click'));

  function tick() {
    currentX += (x - currentX) * 0.15;
    currentY += (y - currentY) * 0.15;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }
  tick();

  return cursor;
}
