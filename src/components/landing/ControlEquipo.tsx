import { ChevronDown } from 'lucide-react';
import { Tag } from '@/components/ui/Tag';
import { landing } from '@/content/landing';

const panel =
  'flex flex-col overflow-hidden rounded-lg border-2 border-ink bg-surface shadow-[var(--shadow-brut-sm)]';
const stage = 'flex min-h-28 flex-col justify-center gap-2 border-b-2 border-ink px-5 py-4';
const body = 'flex flex-1 flex-col px-5 py-5';
const heading =
  'font-display text-2xl font-semibold leading-[1.08] tracking-[-0.03em]';

export function ControlEquipo() {
  const { team } = landing;

  return (
    <section id="control" className="scroll-mt-20 border-b-2 border-ink bg-coral-soft/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="flex flex-col items-start gap-4">
            <Tag>{team.eyebrow}</Tag>
            <h2 className="font-display text-5xl font-semibold leading-[0.94] tracking-[-0.045em] md:text-7xl">
              <span className="block">{team.titleBefore}</span>{' '}
              <span className="block text-coral-strong">{team.titleAccent}</span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-ink/75">
            {team.description}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-12">
          <article className={`${panel} lg:col-span-7`}>
            <div className={`${stage} bg-bg`} aria-hidden="true">
              <p className="text-xs text-mute">{team.pause.label}</p>
              <p className="flex max-w-xs items-center justify-between rounded-md border-2 border-ink bg-surface px-3 py-2 font-display font-semibold">
                {team.pause.value}
                <ChevronDown size={18} />
              </p>
            </div>
            <div className={body}>
              <h3 className={heading}>{team.pause.title}</h3>
              <p className="mt-3 leading-relaxed text-mute">{team.pause.text}</p>
            </div>
          </article>

          <article className={`${panel} lg:col-span-5`}>
            <div className={`${stage} bg-forest text-bg`} aria-hidden="true">
              <p className="flex items-center gap-3 font-display font-semibold">
                <span className="text-bg/65">{team.off.on}</span>
                <span className="flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-bg px-0.5">
                  <span className="size-3.5 rounded-full bg-bg" />
                </span>
                <span>{team.off.off}</span>
              </p>
            </div>
            <div className={body}>
              <h3 className={heading}>{team.off.title}</h3>
              <p className="mt-3 leading-relaxed text-mute">{team.off.text}</p>
            </div>
          </article>

          <article className={`${panel} lg:col-span-5`}>
            <div className={`${stage} bg-bg`} aria-hidden="true">
              <p className="text-xs text-mute">{team.inbox.label}</p>
              <p className="flex flex-wrap gap-1.5">
                {team.inbox.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink bg-surface px-2.5 py-1 text-[13px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </p>
            </div>
            <div className={body}>
              <h3 className={heading}>{team.inbox.title}</h3>
              <p className="mt-3 leading-relaxed text-mute">{team.inbox.text}</p>
            </div>
          </article>

          <article className={`${panel} lg:col-span-7`}>
            <div className={`${stage} bg-bg`}>
              <p className="text-xs text-mute">
                {team.fallback.label} · {team.fallback.sampleCaption}
              </p>
              <p className="w-fit max-w-md rounded-md rounded-br-none border-2 border-ink bg-forest px-3 py-2 text-sm leading-snug text-bg">
                {team.fallback.sample}
              </p>
            </div>
            <div className={body}>
              <h3 className={heading}>{team.fallback.title}</h3>
              <p className="mt-3 leading-relaxed text-mute">{team.fallback.text}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
