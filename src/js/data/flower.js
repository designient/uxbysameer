// Pink flower drawn behind the homepage hero and the coming-soon headline (200x200 viewBox).
export function flowerPath(petals = 7, steps = 140) {
  let d = '';
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = 72 + 24 * Math.abs(Math.cos((petals / 2) * t)) ** 0.8;
    d += `${i ? 'L' : 'M'}${(100 + r * Math.cos(t)).toFixed(1)} ${(100 + r * Math.sin(t)).toFixed(1)}`;
  }
  return `${d}Z`;
}
