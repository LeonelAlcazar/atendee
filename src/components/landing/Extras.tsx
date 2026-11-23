import { ArrowDown, Play, Repeat, Tag as TagIcon } from 'lucide-react';
import { landing } from '@/content/landing';

const tile = 'flex flex-col overflow-hidden rounded-4xl bg-surface shadow-card';
const stage =
  'flex h-44 flex-col justify-center gap-2.5 bg-gradient-to-b from-forest-tint/70 to-surface px-6 sm:h-52 sm:px-7';
const copy = 'px-6 pb-7 pt-1 sm:px-7 sm:pb-8';
const chip =
  'inline-flex h-8 items-center gap-1.5 rounded-full bg-surface px-3 text-[0.8125rem] font-medium text-ink shadow-card';
const sent =
  'max-w-[90%] self-end rounded-[1.25rem] rounded-br-md bg-forest px-4 py-2.5 text-[0.9375rem] leading-snug text-white';

// Bar heights of the voice note, in pixels.
const wave = [8, 14, 22, 12, 18, 26, 16, 10, 20, 24, 12, 16, 8, 14, 20, 10];

// The jobs that come after the first answer. Each tile is one small scene.
export function Extras() {
  const { extras } = landing;

  return (
    <section className="pb-24 md:pb-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="text-balance text-headline">
          <span className="block">{extras.titleLead}</span>{' '}
          <span className="block text-faint">{extras.titleRest}</span>
        </h2>

        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
          <article className={tile}>
            <div className={stage} aria-hidden="true">
              <p className="flex flex-wrap gap-2">
                <span className={chip}>
                  <Repeat size={14} />
                  {extras.recurring.rule}
                </span>
                <span className={chip}>
                  <TagIcon size={14} />
                  {extras.recurring.audience}
                </span>
              </p>
              <p className={sent}>{extras.recurring.sample}</p>
            </div>
            <div className={copy}>
              <h3 className="text-title">{extras.recurring.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{extras.recurring.text}</p>
            </div>
          </article>

          <article className={tile}>
            <div className={stage} aria-hidden="true">
              <p className="flex items-center gap-2">
                <span className={chip}>
                  <span className="size-2 rounded-full bg-coral" />
                  {extras.ready.source}: {extras.ready.event}
                </span>
                <ArrowDown size={16} className="text-muted" />
              </p>
              <p className={sent}>{extras.ready.sample}</p>
            </div>
            <div className={copy}>
              <h3 className="text-title">{extras.ready.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{extras.ready.text}</p>
            </div>
          </article>

          <article className={tile}>
            <div className={stage} aria-hidden="true">
              <p className="flex w-fit max-w-[90%] items-center gap-3 rounded-[1.25rem] rounded-bl-md bg-surface py-2 pl-2 pr-4 shadow-card">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-white">
                  <Play size={14} fill="currentColor" />
                </span>
                <span className="flex h-7 items-center gap-[3px]">
                  {wave.map((height, index) => (
                    <span
                      key={index}
                      className={`w-[3px] rounded-full ${index < 6 ? 'bg-ink' : 'bg-ink/25'}`}
                      style={{ height }}
                    />
                  ))}
                </span>
                <span className="text-xs tabular-nums text-muted">{extras.voice.length}</span>
              </p>
              <p className={sent}>{extras.voice.sample}</p>
            </div>
            <div className={copy}>
              <h3 className="text-title">{extras.voice.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{extras.voice.text}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
