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
  marker: string;
}[] = [
  {
    status: 'included',
    name: 'Incluido',
    note: 'La bandeja la maneja tu equipo. Para las respuestas automáticas necesitás el asistente activo.',
    marker: 'bg-forest',
  },
  {
    status: 'on-request',
    name: 'A pedido',
    note: 'Lo armamos para tu negocio.',
    marker: 'bg-coral',
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
      className={`overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-line ${className}`}
    >
      <table className="w-full table-fixed border-collapse text-left">
        <caption className="border-b border-line px-4 py-5 text-left sm:px-7">
          <span className="block text-title">{caption}</span>
          <span className="mt-1.5 block text-sm text-muted">
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
            <tr className="border-b border-line bg-bg/60">
              <th
                scope="rowgroup"
                colSpan={2}
                className="px-4 py-3 text-left font-normal sm:px-7"
              >
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span className="flex items-center gap-2 text-base font-semibold tracking-[-0.015em]">
                    <span
                      className={`size-2.5 shrink-0 rounded-full ${group.marker}`}
                      aria-hidden="true"
                    />
                    {group.name}
                  </span>
                  <span className="text-sm text-muted">{group.note}</span>
                </span>
              </th>
            </tr>
            {actionStatus
              .filter((row) => row.status === group.status)
              .map((row) => (
                <tr key={row.action} className="border-b border-line [tbody:last-child>&:last-child]:border-b-0">
                  <th
                    scope="row"
                    className="w-[56%] px-4 py-3.5 align-top text-[0.9375rem] font-medium leading-snug sm:w-[60%] sm:px-7 sm:text-base"
                  >
                    {row.action}
                  </th>
                  <td className="px-4 py-3.5 align-top text-sm leading-snug text-muted sm:px-7 sm:text-[0.9375rem]">
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
