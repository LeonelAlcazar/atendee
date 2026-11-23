import Link from 'next/link';
import type { ReactNode } from 'react';

const linkPattern = /\[([^\]]+)\]\(((?:\/|#)[^)\s]*)\)/g;

// Inline links inside body copy. The underline stays: coral-strong next to
// muted text is not enough contrast to mark a link by color alone.
export const inlineLinkClass =
  'font-semibold text-coral-strong underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-ink';

// Renders content strings with [label](/path) links. Only internal paths and
// page anchors are matched, so bracketed placeholders stay as plain text.
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(linkPattern)) {
    const [whole, label, href] = match;
    parts.push(text.slice(cursor, match.index));
    parts.push(
      href.startsWith('#') ? (
        <a key={match.index} href={href} className={inlineLinkClass}>
          {label}
        </a>
      ) : (
        <Link key={match.index} href={href} className={inlineLinkClass}>
          {label}
        </Link>
      ),
    );
    cursor = match.index + whole.length;
  }
  parts.push(text.slice(cursor));
  return <>{parts}</>;
}
