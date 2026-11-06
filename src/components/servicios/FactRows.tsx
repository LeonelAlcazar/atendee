import type { ReactNode } from 'react';
import type { DetailStatus } from '@/content/servicios';

export type FactRow = {
  label: ReactNode;
  text: ReactNode;
  status?: DetailStatus;
};

const statusStyle: Record<DetailStatus, string> = {
  Incluido: 'bg-mint',
  'A pedido': 'bg-sun',
  'No llega': 'bg-coral-soft',
};

export function FactRows({
  rows,
  className = '',
}: {
  rows: FactRow[];
  className?: string;
}) {
  return (
    <dl
      className={`overflow-hidden rounded-lg border-2 border-ink bg-surface shadow-[var(--shadow-brut)] ${className}`}
    >
      {rows.map((row, index) => (
        <div
          key={index}
          className="grid gap-1.5 border-b border-ink/20 px-4 py-4 last:border-b-0 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-8 md:px-6 md:py-5"
        >
          <dt className="font-display text-lg font-semibold leading-snug tracking-[-0.015em]">
            {row.label}
          </dt>
          <dd className="m-0 leading-relaxed text-mute">
            {row.status && (
              <span
                className={`mb-2 mr-2 inline-flex items-center rounded-full border border-ink px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink ${statusStyle[row.status]}`}
              >
                {row.status}
              </span>
            )}
            {row.text}
          </dd>
        </div>
      ))}
    </dl>
  );
}
