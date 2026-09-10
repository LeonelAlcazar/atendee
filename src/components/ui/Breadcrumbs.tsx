import Link from 'next/link';
import type { Breadcrumb } from '@/lib/structured-data';

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav
      aria-label="Ruta de navegación"
      className="mx-auto max-w-7xl px-5 pt-7 text-sm text-mute md:px-8"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={item.path} className="inline-flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link
                className="underline underline-offset-4 hover:text-ink"
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
