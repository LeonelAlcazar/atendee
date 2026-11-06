import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { checkClaims } from '../src/lib/claims';

// Scope: customer-facing copy. Legal pages have their own review.
const roots = [
  'src/content',
  'src/app',
  'src/components',
  'src/lib',
  'content/blog',
];
const excluded = [
  'src/app/terminos-y-condiciones/',
  'src/app/politica-de-privacidad/',
  'src/components/legal/',
  // Quotes every banned phrase in its rules.
  'src/lib/claims.ts',
];
const files = roots
  .flatMap((root) =>
    readdirSync(root, { recursive: true, encoding: 'utf8' }).map((file) =>
      path.join(root, file),
    ),
  )
  .filter((file) => /\.(ts|tsx|md)$/.test(file) && !/\.test\.tsx?$/.test(file))
  .filter((file) => !excluded.some((prefix) => file.startsWith(prefix)));

const reports = files.map((file) =>
  checkClaims(file, readFileSync(file, 'utf8')),
);
const findings = reports.flatMap((report) => report.findings);
const invalid = reports.flatMap((report, index) =>
  report.invalidDirectives.map((line) => `${files[index]}:${line}`),
);
const unused = reports.flatMap((report, index) =>
  report.unusedDirectives.map((line) => `${files[index]}:${line}`),
);
for (const finding of findings)
  console.error(
    `${finding.file}:${finding.line} [${finding.rule}] ${finding.text}\n  ${finding.fix}`,
  );
for (const location of invalid)
  console.error(`${location} claims-allow needs a reason`);
for (const location of unused)
  console.warn(`${location} claims-allow matches nothing; remove it`);
console.log(
  `Checked claims in ${files.length} files: ${findings.length} findings, ${reports.flatMap((report) => report.allowed).length} documented exceptions.`,
);
if (findings.length || invalid.length) process.exitCode = 1;
