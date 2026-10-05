// Hand-drawn "uxbysameer" signature, one stroke per path in drawing order.
// Shared by the nav (inlined at build by vite.config.js) and the coming-soon page.

export const SIGNATURE_VIEWBOX = '8 8 610 184';

export const SIGNATURE_PATHS = [
  // u
  'M22 74 C18 100 18 124 38 122 C56 120 62 96 64 74 C63 98 62 116 74 123',
  // x
  'M88 74 C100 90 108 106 122 123',
  'M124 72 C108 88 98 106 86 125',
  // b
  'M150 18 C146 58 144 94 146 123 C150 100 166 82 180 90 C196 100 186 128 158 125',
  // y, looping into the underline swash
  'M204 74 C200 100 206 120 222 119 C238 118 244 96 247 74 C247 118 244 156 224 172 C206 186 186 172 204 158 C290 138 460 162 604 120',
  // s
  'M290 80 C280 70 260 76 266 92 C272 106 294 108 288 120 C282 132 260 128 256 118',
  // a
  'M342 88 C332 72 306 80 306 102 C306 124 332 126 340 102 L342 80 C341 100 340 118 354 123',
  // m
  'M368 123 L369 84 C373 80 388 72 392 90 L393 123 C394 98 396 78 412 80 C424 82 422 102 423 123',
  // ee
  'M442 104 C456 104 470 98 467 86 C464 74 440 78 440 100 C440 122 462 126 476 112 C490 104 502 98 500 86 C497 74 476 78 476 100 C476 122 498 126 512 112',
  // r
  'M526 123 L527 82 C531 92 540 76 558 80',
];

export function signatureSVG({ className = 'signature', strokeWidth = 12 } = {}) {
  const paths = SIGNATURE_PATHS.map((d) => `<path d="${d}"/>`).join('');
  return `<svg class="${className}" viewBox="${SIGNATURE_VIEWBOX}" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
}
