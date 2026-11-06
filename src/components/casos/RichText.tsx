import Link from 'next/link';
import type { ReactNode } from 'react';

const linkPattern = /\[([^\]]+)\]\(((?:\/|#)[^)\s]*)\)/g;
const linkClass = 'font-semibold underline underline-offset-4 hover:text-coral-strong';

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
        <a key={match.index} href={href} className={linkClass}>
          {label}
        </a>
      ) : (
        <Link key={match.index} href={href} className={linkClass}>
          {label}
        </Link>
      ),
    );
    cursor = match.index + whole.length;
  }
  parts.push(text.slice(cursor));
  return <>{parts}</>;
}
