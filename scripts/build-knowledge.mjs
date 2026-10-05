// Converts the agent knowledge markdown into a JS module the Cloudflare Pages Function can import.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'src/js/data/agentKnowledge.md');
const target = resolve(root, 'functions/_lib/knowledge.js');

const md = readFileSync(source, 'utf8');
mkdirSync(dirname(target), { recursive: true });
writeFileSync(
  target,
  `// Generated from src/js/data/agentKnowledge.md by scripts/build-knowledge.mjs. Do not edit.\nexport default ${JSON.stringify(md)};\n`
);
console.log(`knowledge: ${source} -> ${target}`);
