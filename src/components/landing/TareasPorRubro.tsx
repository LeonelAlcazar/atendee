import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TaskTicket } from '@/components/ui/TaskTicket';
import { landing } from '@/content/landing';

const rowGrid =
  'lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.05fr)_1.5rem] lg:items-center lg:gap-8';

export function TareasPorRubro() {
  const { tasks } = landing;

  return (
    <section id="rubros" className="scroll-mt-20 border-b-2 border-ink bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <SectionHeader
            eyebrow={tasks.eyebrow}
            title={
              <>
                <span className="block">{tasks.titleBefore}</span>{' '}
                <span className="block text-coral">{tasks.titleAccent}</span>
              </>
            }
          />
          <p className="max-w-xl text-lg leading-relaxed text-mute">
            {tasks.description}
          </p>
        </div>

        <div className="mt-12 border-b-2 border-ink md:mt-16">
          <div
            className={`${rowGrid} hidden border-y-2 border-ink py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-mute`}
            aria-hidden="true"
          >
            {tasks.columns.map((column) => (
              <span key={column}>{column}</span>
            ))}
          </div>

          <ul>
            {tasks.items.map((item, index) => (
              <li
                key={item.slug}
                className={`group relative py-6 lg:py-5 ${
                  index === 0 ? 'border-t-2 border-ink lg:border-t-0' : 'border-t border-ink/25'
                }`}
              >
                <div className={`${rowGrid} flex flex-col gap-4`}>
                  <h3 className="font-display text-2xl font-semibold leading-[1.08] tracking-[-0.03em] transition-colors group-hover:text-coral-strong lg:text-[1.65rem]">
                    <Link
                      href={`/casos-de-uso/${item.slug}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {item.trade}
                    </Link>
                  </h3>
                  <p className="w-fit max-w-[90%] rounded-md rounded-bl-none border-2 border-ink bg-bg px-3 py-2 text-[15px] leading-snug lg:max-w-full">
                    {item.message}
                  </p>
                  <TaskTicket
                    label={item.result}
                    detail={item.connection}
                    className="ml-auto w-fit max-w-[92%] lg:ml-0 lg:max-w-full"
                  />
                  <span
                    className="hidden font-mono text-lg transition-transform group-hover:translate-x-1 lg:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-x-10 gap-y-2 text-sm leading-relaxed lg:flex-row lg:items-center lg:justify-between">
          <p className="text-mute">{tasks.note}</p>
          <p className="flex flex-wrap items-center gap-x-3 font-medium">
            <Link
              href="/casos-de-uso"
              className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-coral-strong"
            >
              {tasks.allLink}
            </Link>
            <span className="text-mute">{tasks.byTaskLabel}</span>
            {tasks.byTask.map((item) => (
              <Link
                key={item.slug}
                href={`/servicios/${item.slug}`}
                className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-coral-strong"
              >
                {item.label}
              </Link>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
