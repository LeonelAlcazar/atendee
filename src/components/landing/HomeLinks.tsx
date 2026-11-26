import Link from 'next/link';
import { landing } from '@/content/landing';

// A quiet row under the steps: the services, prices, integrations and the
// cornerstone guides, so the home body links where a buyer reads next.
export function HomeLinks() {
  const { links } = landing;

  return (
    <nav aria-labelledby="mas-sobre-atende" className="pt-12 md:pt-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 id="mas-sobre-atende" className="text-sm font-semibold text-muted">
          {links.title}
        </h2>
        <ul className="mt-1 flex flex-wrap gap-x-6 text-[0.9375rem]">
          {links.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center text-ink underline decoration-ink/20 underline-offset-4 transition-colors duration-200 hover:decoration-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
