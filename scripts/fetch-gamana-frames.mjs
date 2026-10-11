// Exports the Gamana phone frames listed in src/js/data/cases.js from Figma
// into public/images/work/gamana/ as 804px-wide WebP, cropped to 402x874 @2x.
//
//   FIGMA_TOKEN=figd_xxx node scripts/fetch-gamana-frames.mjs
//
// Token: Figma > Settings > Security > Personal access tokens (scope: File content, read-only).
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { cases } from '../src/js/data/cases.js';

const FILE_KEY = 'e423LFMeLwtwxjNcew9XMz';
const token = process.env.FIGMA_TOKEN;
if (!token) { console.error('Set FIGMA_TOKEN first.'); process.exit(1); }

const outDir = path.resolve('public/images/work/gamana');
await mkdir(outDir, { recursive: true });

const gamana = cases.find((c) => c.slug === 'gamana');
const jobs = (gamana.decisions || []).flatMap((d) => d.screens || []).filter((s) => s.node && s.image);
const ids = jobs.map((s) => s.node);

const res = await fetch(`https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids.join(','))}&format=png&scale=2`, {
  headers: { 'X-Figma-Token': token },
});
if (!res.ok) { console.error('Figma API', res.status, await res.text()); process.exit(1); }
const { images, err } = await res.json();
if (err) { console.error(err); process.exit(1); }

let ok = 0;
for (const s of jobs) {
  const url = images[s.node];
  const file = path.join(outDir, path.basename(s.image));
  if (!url) { console.warn('no render for', s.node); continue; }
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  let img = sharp(buf).resize({ width: 804 });
  const { height } = await img.clone().toBuffer({ resolveWithObject: true }).then((r) => r.info);
  if (height > 1748) img = sharp(await img.toBuffer()).extract({ left: 0, top: 0, width: 804, height: 1748 });
  await writeFile(file, await img.webp({ quality: 82 }).toBuffer());
  console.log('✓', s.node, '→', path.relative(process.cwd(), file));
  ok++;
}
console.log(`${ok}/${jobs.length} frames written.`);
