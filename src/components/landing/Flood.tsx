import type { CSSProperties } from 'react';
import { landing } from '@/content/landing';

// The problem, in one screen: the same messages, all day. The rows slide with
// the scroll (see .drift), so nothing moves on its own.
export function Flood() {
  const { flood } = landing;

  return (
    <section className="overflow-x-clip py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
        <h2 className="text-balance text-headline">
          <span className="block">{flood.titleLead}</span>{' '}
          <span className="block text-faint">{flood.titleRest}</span>
        </h2>
      </div>

      <div className="mt-12 flex flex-col gap-3 [mask-image:linear-gradient(90deg,transparent,black_14%,black_86%,transparent)] md:mt-16 md:gap-4">
        {flood.rows.map((row, index) => {
          const reverse = index % 2 === 1;
          return (
            <div
              key={row[0]}
              className="drift flex w-max gap-3 md:gap-4"
              style={
                {
                  marginLeft: `${-6 - index * 5}rem`,
                  '--drift-from': reverse ? '-14%' : '0%',
                  '--drift-to': reverse ? '0%' : '-14%',
                } as CSSProperties
              }
            >
              {/* The row repeats so it always overflows both edges. Only the
                  first run is read out. */}
              {[0, 1, 2].map((run) => (
                <ul
                  key={run}
                  className="flex gap-3 md:gap-4"
                  aria-hidden={run > 0 ? true : undefined}
                >
                  {row.map((message) => (
                    <li
                      key={message}
                      className="whitespace-nowrap rounded-[1.25rem] rounded-bl-md bg-surface px-4 py-2.5 text-[0.9375rem] shadow-card md:px-5 md:py-3 md:text-lg"
                    >
                      {message}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          );
        })}
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-pretty px-5 text-center text-lead text-muted md:mt-16">
        {flood.description}
      </p>
    </section>
  );
}
