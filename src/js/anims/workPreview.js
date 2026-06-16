import { gsap } from 'gsap';

/**
 * Cursor-following preview card for work items with an animated
 * gradient distortion drawn on a lightweight 2D canvas (keeps the
 * page on a single WebGL context — the hero scene).
 */
export function initWorkPreviews() {
  if (window.matchMedia('(max-width: 768px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const preview = document.querySelector('.work-item__preview');
  if (!preview) return;

  const canvas = preview.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const W = 320;
  const H = 220;
  canvas.width = W * 2;
  canvas.height = H * 2;
  ctx.scale(2, 2);

  let activeColor = null;
  let rafId = null;
  let t = 0;

  const pos = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  function draw() {
    if (!activeColor) return;
    t += 0.015;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#fdfcfa';
    ctx.fillRect(0, 0, W, H);

    // Layered drifting radial blobs create a liquid-distortion feel
    for (let i = 0; i < 3; i++) {
      const cx = W * (0.3 + 0.4 * Math.sin(t * (0.7 + i * 0.3) + i * 2.1));
      const cy = H * (0.4 + 0.35 * Math.cos(t * (0.5 + i * 0.4) + i * 1.7));
      const r = 90 + 40 * Math.sin(t + i);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, activeColor + Math.round(140 - i * 30).toString(16).padStart(2, '0'));
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    // Scanline-style wave bands for texture
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = activeColor;
    for (let y = 0; y < H; y += 6) {
      const offset = Math.sin(y * 0.05 + t * 3) * 8;
      ctx.fillRect(offset, y, W, 1);
    }
    ctx.globalAlpha = 1;

    pos.x += (target.x - pos.x) * 0.12;
    pos.y += (target.y - pos.y) * 0.12;
    preview.style.left = `${pos.x + 24}px`;
    preview.style.top = `${pos.y - H / 2}px`;

    rafId = requestAnimationFrame(draw);
  }

  document.querySelectorAll('.work-item').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      activeColor = item.dataset.color || '#2418ec';
      preview.classList.add('is-visible');
      if (!rafId) {
        pos.x = target.x;
        pos.y = target.y;
        draw();
      }
    });

    item.addEventListener('mouseleave', () => {
      preview.classList.remove('is-visible');
      activeColor = null;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });

    item.addEventListener('mousemove', (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    });
  });
}
