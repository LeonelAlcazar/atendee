import { cp, mkdir } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const runtime = new URL('.next/standalone/', root);
await mkdir(new URL('.next/', runtime), { recursive: true });
await Promise.all([
  cp(new URL('public/', root), new URL('public/', runtime), {
    recursive: true,
  }),
  cp(new URL('.next/static/', root), new URL('.next/static/', runtime), {
    recursive: true,
  }),
]);
console.log(
  'Standalone runtime includes public assets, fonts, JavaScript and traced Markdown content.',
);
