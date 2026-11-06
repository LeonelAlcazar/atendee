import { pages } from '@/content/pages';
import { actionStatus, type ActionStatus } from '@/content/status';

type StatusTableProps = {
  caption?: string;
  className?: string;
};

const groups: {
  status: ActionStatus;
  name: string;
  note: string;
  band: string;
  marker: string;
}[] = [
  {
    status: 'included',
    name: 'Incluido',
    note: 'Viene con los planes con IA.',
    band: 'bg-mint',
    marker: 'bg-mint-strong',
  },
  {
    status: 'on-request',
    name: 'A pedido',
    note: 'Lo armamos para tu negocio.',
    band: 'bg-sun',
    marker: 'bg-surface',
  },
];

const updatedLabel = new Intl.DateTimeFormat('es-AR', {
  dateStyle: 'long',
  timeZone: 'UTC',
}).format(new Date(`${pages.integrations.updated}T00:00:00Z`));

export function StatusTable({
  caption = 'Qué hace Atende hoy, acción por acción',
  className = '',
}: StatusTableProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border-2 border-ink bg-surface shadow-[var(--shadow-brut)] ${className}`}
    >
      <table className="w-full table-fixed border-collapse text-left">
        <caption className="border-b-2 border-ink bg-surface px-3 py-3.5 text-left sm:px-5">
          <span className="block font-display text-lg font-semibold leading-tight tracking-[-0.02em] sm:text-xl">
            {caption}
          </span>
          <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.06em] text-mute">
            Actualizado el{' '}
            <time dateTime={pages.integrations.updated}>{updatedLabel}</time>
          </span>
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Acción</th>
            <th scope="col">Estado hoy</th>
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group.status}>
            <tr className={`${group.band} border-b-2 border-ink`}>
              <th
                scope="rowgroup"
                colSpan={2}
                className="px-3 py-2.5 text-left font-normal sm:px-5"
              >
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span className="flex items-center gap-2 font-display text-base font-bold tracking-[-0.015em]">
                    <span
                      className={`size-3 shrink-0 border-2 border-ink ${group.marker}`}
                      aria-hidden="true"
                    />
                    {group.name}
                  </span>
                  <span className="text-sm text-ink/75">{group.note}</span>
                </span>
              </th>
            </tr>
            {actionStatus
              .filter((row) => row.status === group.status)
              .map((row) => (
                <tr key={row.action} className="border-b border-ink/20">
                  <th
                    scope="row"
                    className="w-[56%] px-3 py-3 align-top text-[15px] font-medium leading-snug sm:w-[60%] sm:px-5 sm:text-base"
                  >
                    {row.action}
                  </th>
                  <td className="px-3 py-3 align-top text-sm leading-snug text-mute sm:px-5 sm:text-[15px]">
                    {row.label}
                  </td>
                </tr>
              ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
