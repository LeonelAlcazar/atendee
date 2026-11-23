import type { ReactNode } from 'react';
import { Tag } from '@/components/ui/Tag';
import type { DetailStatus } from '@/content/servicios';

export type FactRow = {
  label: ReactNode;
  text: ReactNode;
  status?: DetailStatus;
};

// The same dots as the status table: forest is included, coral is built to order.
const statusDot: Record<DetailStatus, string> = {
  Incluido: 'bg-forest',
  'A pedido': 'bg-coral',
};

// A label and its fact, one per row, on a white sheet: the quiet table of the
// design system. /precios, /nosotros and /que-es-atende render it too, so the
// props stay as they are. The rows split into two columns by the width of the
// sheet, not the screen, so it also fits a half-width column.
export function FactRows({
  rows,
  className = '',
}: {
  rows: FactRow[];
  className?: string;
}) {
  return (
    <dl
      className={`@container overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-line ${className}`}
    >
      {rows.map((row, index) => (
        <div
          key={index}
          className="grid gap-1.5 border-b border-line px-5 py-5 last:border-b-0 sm:px-7 @lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] @lg:gap-8 @3xl:gap-12 @3xl:py-6"
        >
          <dt className="text-[1.0625rem] font-semibold leading-[1.625rem] tracking-[-0.015em]">
            {row.label}
          </dt>
          <dd className="m-0 max-w-2xl leading-relaxed text-muted">
            {row.status && (
              <span className="mb-2.5 flex">
                <Tag>
                  <span
                    className={`size-2 shrink-0 rounded-full ${statusDot[row.status]}`}
                    aria-hidden="true"
                  />
                  {row.status}
                </Tag>
              </span>
            )}
            {row.text}
          </dd>
        </div>
      ))}
    </dl>
  );
}
