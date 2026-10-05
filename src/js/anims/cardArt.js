import { gsap } from 'gsap';

const W = 300;
const H = 400;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const patterns = {
  checker([a, b]) {
    const cell = 56;
    let rows = '';
    for (let r = -3; r < H / cell + 4; r++) {
      const skew = Math.sin(r * 0.9) * 18;
      let cells = '';
      for (let c = -4; c < W / cell + 5; c++) {
        if ((r + c) % 2 === 0) cells += `<rect x="${c * cell}" y="0" width="${cell}" height="${cell}"/>`;
      }
      rows += `<g transform="translate(${Math.sin(r * 0.6) * 14},${r * cell}) skewX(${skew})">${cells}</g>`;
    }
    return { bg: a, body: `<g fill="${b}">${rows}</g>` };
  },

  stripes([a, b]) {
    const band = 34;
    let paths = '';
    for (let i = -4; i < H / band + 6; i += 2) {
      const y = i * band;
      let d = `M-120 ${y}`;
      for (let x = -120; x <= W + 120; x += 40) {
        d += ` L${x + 20} ${y + (Math.floor(x / 40) % 2 === 0 ? -22 : 22)} L${x + 40} ${y}`;
      }
      paths += `<path d="${d}" stroke-width="${band}" />`;
    }
    return { bg: a, body: `<g fill="none" stroke="${b}" stroke-linejoin="miter">${paths}</g>` };
  },

  rings([a, b]) {
    let circles = '';
    for (let i = 19; i > 0; i--) {
      circles += `<circle cx="210" cy="130" r="${i * 30}" fill="${i % 2 ? b : a}"/>`;
    }
    return { bg: a, body: `<g data-spin>${circles}</g>` };
  },

  dots([a, b]) {
    const step = 22;
    let dots = '';
    for (let y = -step * 3; y < H + step * 3; y += step) {
      for (let x = -step * 3; x < W + step * 3; x += step) {
        const d = Math.hypot(x - W * 0.35, y - H * 0.4);
        const r = 2 + 7 * (0.5 + 0.5 * Math.sin(d * 0.045));
        dots += `<circle cx="${x}" cy="${y}" r="${r.toFixed(1)}"/>`;
      }
    }
    return { bg: a, body: `<g fill="${b}">${dots}</g>` };
  },

  waves([a, b]) {
    const band = 46;
    let paths = '';
    for (let i = -3; i < H / band + 4; i++) {
      const y = i * band;
      let d = `M-120 ${y}`;
      for (let x = -120; x <= W + 120; x += 10) {
        d += ` L${x} ${(y + Math.sin(x * 0.03 + i * 0.8) * 16).toFixed(1)}`;
      }
      d += ` L${W + 120} ${y + band} L-120 ${y + band} Z`;
      paths += `<path d="${d}" fill="${i % 2 ? a : b}"/>`;
    }
    return { bg: a, body: paths };
  },

  nodes([a, b], seed) {
    const rand = rng(seed);
    const pts = Array.from({ length: 34 }, () => [rand() * (W + 120) - 60, rand() * (H + 120) - 60]);
    let lines = '';
    pts.forEach(([x1, y1], i) => {
      pts.slice(i + 1).forEach(([x2, y2]) => {
        if (Math.hypot(x2 - x1, y2 - y1) < 105) {
          lines += `<line x1="${x1.toFixed(0)}" y1="${y1.toFixed(0)}" x2="${x2.toFixed(0)}" y2="${y2.toFixed(0)}"/>`;
        }
      });
    });
    const nodes = pts
      .map(([x, y], i) => `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${i % 7 === 0 ? 9 : 3.5}" ${i % 7 === 0 ? 'data-pulse' : ''}/>`)
      .join('');
    return {
      bg: a,
      body: `<g stroke="${b}" stroke-opacity="0.45" stroke-width="1.2">${lines}</g><g fill="${b}">${nodes}</g>`,
    };
  },
};

export function artSVG(art, key = '') {
  const draw = patterns[art.pattern] || patterns.checker;
  const { bg, body } = draw(art.colors, hash(key || art.pattern));
  return `<svg class="art__svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><rect width="${W}" height="${H}" fill="${bg}"/><g class="art__drift">${body}</g></svg>`;
}

/** Fill every [data-art] element with its pattern; `data-art` holds JSON `{pattern, colors}`. */
export function mountArt(root = document) {
  root.querySelectorAll('[data-art]:not([data-art-mounted])').forEach((el) => {
    const art = JSON.parse(el.dataset.art);
    el.insertAdjacentHTML('afterbegin', artSVG(art, el.dataset.artKey));
    el.dataset.artMounted = '';
    animate(el);
  });
}

function animate(el) {
  if (reducedMotion) return;
  const drift = el.querySelector('.art__drift');
  const tweens = [];
  const spin = el.querySelector('[data-spin]');

  if (spin) {
    tweens.push(gsap.to(spin, { rotation: 360, svgOrigin: '210 130', duration: 80, ease: 'none', repeat: -1 }));
  } else {
    tweens.push(
      gsap.to(drift, { x: 'random(-26, 26)', y: 'random(-34, 34)', duration: 'random(7, 11)', ease: 'sine.inOut', repeat: -1, yoyo: true })
    );
  }

  el.querySelectorAll('[data-pulse]').forEach((node, i) => {
    tweens.push(gsap.to(node, { attr: { r: 14 }, opacity: 0.55, duration: 1.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.3 }));
  });

  tweens.forEach((t) => t.pause());
  new IntersectionObserver(([entry]) => {
    tweens.forEach((t) => (entry.isIntersecting ? t.resume() : t.pause()));
  }).observe(el);
}
