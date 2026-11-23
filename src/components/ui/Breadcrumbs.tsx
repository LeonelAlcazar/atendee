import Link from 'next/link';
import type { Breadcrumb } from '@/lib/structured-data';

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav
      aria-label="Ruta de navegación"
      className="mx-auto max-w-7xl px-5 pt-3 text-sm text-muted md:px-8"
    >
      <ol className="flex flex-wrap items-center gap-x-1.5">
        {items.map((item, index) => (
          <li key={item.path} className="inline-flex items-center gap-1.5">
            {index > 0 && (
              <span aria-hidden="true" className="text-faint">
                /
              </span>
            )}
            {index === items.length - 1 ? (
              <span aria-current="page" className="text-ink">
                {item.name}
              </span>
            ) : (
              <Link
                className="inline-flex min-h-11 min-w-11 items-center underline-offset-4 transition-colors hover:text-ink hover:underline"
                href={item.path}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
