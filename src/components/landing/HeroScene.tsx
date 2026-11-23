import type { CSSProperties } from 'react';
import { ChevronLeft, Link2 } from 'lucide-react';
import { TaskTicket } from '@/components/ui/TaskTicket';
import { landing } from '@/content/landing';

// When each step lands, in milliseconds. The whole scene plays once and ends
// under five seconds, so it never needs a pause control.
const timeline = {
  typing: [450, 2500],
  typingFor: 750,
  bubble: [0, 1150, 2050, 3200],
  toAgenda: 3350,
  slot: 3750,
  toDone: 3650,
  done: 4050,
} as const;

const at = (ms: number, extra?: Record<string, number>) =>
  ({ '--at': ms, ...extra }) as CSSProperties;

// On small screens the card sits over the phone, so it needs its own dark base.
const glass =
  'rounded-3xl bg-forest-deep/85 ring-1 ring-inset ring-white/15 backdrop-blur-xl lg:bg-white/[0.07]';

function TypingDots({ start }: { start: number }) {
  return (
    <span
      className="seq-typing absolute right-0 top-0 flex h-9 items-center gap-1 rounded-2xl rounded-br-md bg-forest px-3.5 opacity-0"
      style={at(start, { '--for': timeline.typingFor })}
      aria-hidden="true"
    >
      <span className="size-1.5 rounded-full bg-white" />
      <span className="size-1.5 rounded-full bg-white" />
      <span className="size-1.5 rounded-full bg-white" />
    </span>
  );
}

function Phone() {
  const { scene } = landing.hero;
  let reply = 0;

  return (
    <div className="rounded-[2.9rem] bg-[#161616] p-2 shadow-[0_50px_90px_-30px_rgb(0_0_0/0.65),inset_0_0_0_1.5px_rgb(255_255_255/0.14)]">
      <div className="relative overflow-hidden rounded-[2.4rem] bg-bg">
        <div
          className="relative flex h-10 items-center justify-between bg-surface px-7 text-xs font-semibold"
          aria-hidden="true"
        >
          <span className="tabular-nums">{scene.clock}</span>
          <span className="absolute left-1/2 top-2.5 h-[1.375rem] w-[5.25rem] -translate-x-1/2 rounded-full bg-[#161616]" />
          <span className="flex items-end gap-[3px]">
            <span className="h-1.5 w-[3px] rounded-sm bg-ink" />
            <span className="h-2 w-[3px] rounded-sm bg-ink" />
            <span className="h-2.5 w-[3px] rounded-sm bg-ink" />
            <span className="ml-1.5 h-2.5 w-5 rounded-[4px] border border-muted p-px">
              <span className="block h-full w-3/4 rounded-[2px] bg-ink" />
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2.5 border-b border-line bg-surface px-3 pb-2.5 pt-0.5">
          <ChevronLeft size={22} className="-mx-1 text-muted" aria-hidden="true" />
          <span
            className="grid size-9 shrink-0 place-items-center rounded-full bg-forest-tint text-sm font-semibold text-forest"
            aria-hidden="true"
          >
            {scene.contact.charAt(0)}
          </span>
          <p className="flex min-w-0 flex-col text-left leading-tight">
            <span className="text-[0.9375rem] font-semibold">{scene.contact}</span>
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />
              {scene.contactStatus}
            </span>
          </p>
        </div>

        <div className="flex h-[27rem] flex-col gap-2 px-3 py-3.5 text-left text-[0.9375rem] leading-snug">
          {scene.messages.map((message, index) => {
            const step = timeline.bubble[index];
            if (message.from === 'them')
              return (
                <p
                  key={message.text}
                  className={`max-w-[84%] self-start rounded-2xl rounded-bl-md bg-surface px-3.5 py-2 shadow-[0_1px_1px_rgb(32_32_32/0.06)] ${
                    step ? 'seq' : ''
                  }`}
                  style={step ? at(step) : undefined}
                >
                  {message.text}
                </p>
              );
            const typingStart = timeline.typing[reply++];
            return (
              <div key={message.text} className="relative max-w-[84%] self-end">
                <TypingDots start={typingStart} />
                <p
                  className="seq rounded-2xl rounded-br-md bg-forest px-3.5 py-2 text-white"
                  style={at(step)}
                >
                  {message.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Agenda() {
  const { agenda } = landing.hero.scene;

  return (
    <div className={`${glass} p-3.5 text-left text-white lg:p-5`}>
      <p className="flex items-baseline justify-between gap-3 px-0.5">
        <span className="text-[0.9375rem] font-semibold lg:text-base">{agenda.title}</span>
        <span className="text-sm text-white/70">{agenda.day}</span>
      </p>
      <ul className="mt-3 grid grid-cols-3 gap-2 lg:mt-4 lg:grid-cols-1 lg:gap-2.5">
        {agenda.slots.map((slot) => (
          <li key={slot.time} className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-3">
            <span className="px-0.5 text-xs tabular-nums text-white/70 lg:w-10 lg:text-sm">
              {slot.time}
            </span>
            {slot.state === 'booked' ? (
              <span className="relative flex h-10 flex-1 items-center rounded-xl border border-dashed border-white/25 px-2.5 text-sm text-white/70 lg:h-11 lg:px-3">
                {/* Free until the reply lands, then taken. */}
                <span aria-hidden="true">{agenda.freeLabel}</span>
                <span
                  className="seq-pop absolute -inset-px flex items-center gap-2 rounded-xl bg-surface px-2.5 text-sm font-semibold text-ink lg:px-3"
                  style={at(timeline.slot)}
                >
                  <span className="size-2 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                  <span className="truncate">
                    {slot.label}
                    <span className="hidden font-normal text-muted lg:inline"> · {slot.detail}</span>
                  </span>
                </span>
              </span>
            ) : (
              <span
                className={`flex h-10 flex-1 items-center rounded-xl px-2.5 text-sm lg:h-11 lg:px-3 ${
                  slot.state === 'busy'
                    ? 'bg-white/10 text-white/70'
                    : 'border border-dashed border-white/25 text-white/70'
                }`}
              >
                {slot.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HeroScene() {
  const { scene } = landing.hero;

  return (
    <div className="px-3 pt-10 md:px-6 md:pt-12">
      <figure className="relative mx-auto h-[38.5rem] max-w-[90rem] overflow-hidden rounded-4xl bg-forest sm:h-[39rem] lg:h-[29rem]">
        <figcaption className="sr-only">{scene.label}</figcaption>

        {/* Depth: a soft light from above and a coral glow under the phone. */}
        <div
          className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgb(255_255_255/0.1),transparent_65%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(50%_100%_at_50%_100%,rgb(230_72_44/0.3),transparent_70%)]"
          aria-hidden="true"
        />
        {/* The connection: the chat writes to the agenda, and the task comes
            back done. A dot crosses each line once, right before its card lands. */}
        <div
          className="absolute left-[calc(max(2rem,50%-32rem)+17rem)] right-[calc(50%+9.75rem)] top-1/2 hidden overflow-hidden border-t border-dashed border-white/25 py-1 lg:block"
          aria-hidden="true"
        >
          <span className="seq-travel -mt-[7px] block opacity-0" style={at(timeline.toAgenda, { '--from': 100, '--to': 0 })}>
            <span className="block size-1.5 rounded-full bg-coral shadow-[0_0_10px_2px_rgb(230_72_44/0.8)]" />
          </span>
        </div>
        <div
          className="absolute left-[calc(50%+9.75rem)] right-[calc(max(2rem,50%-32rem)+17rem)] top-1/2 hidden overflow-hidden border-t border-dashed border-white/25 py-1 lg:block"
          aria-hidden="true"
        >
          <span className="seq-travel -mt-[7px] block opacity-0" style={at(timeline.toDone, { '--from': 0, '--to': 100 })}>
            <span className="block size-1.5 rounded-full bg-coral shadow-[0_0_10px_2px_rgb(230_72_44/0.8)]" />
          </span>
        </div>

        <div className="absolute left-1/2 top-7 w-[18.5rem] -translate-x-1/2 md:top-8 lg:w-[19.5rem]">
          <Phone />
        </div>

        <div className="absolute inset-x-3 bottom-3 mx-auto grid max-w-md gap-2 lg:contents">
          <div className="lg:absolute lg:left-[max(2rem,calc(50%-32rem))] lg:top-1/2 lg:w-[17rem] lg:-translate-y-1/2">
            <Agenda />
          </div>
          <div className="lg:absolute lg:right-[max(2rem,calc(50%-32rem))] lg:top-1/2 lg:w-[17rem] lg:-translate-y-1/2">
            <p className="mb-3 hidden items-center gap-2 px-1 text-sm font-medium text-white/70 lg:flex">
              <Link2 size={16} aria-hidden="true" />
              {scene.connection}
            </p>
            <TaskTicket
              label={scene.done.label}
              detail={scene.done.detail}
              size="lg"
              className="seq-pop shadow-float ring-0"
              style={at(timeline.done)}
            />
          </div>
        </div>
      </figure>
    </div>
  );
}
