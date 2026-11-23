'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { TaskTicket } from '@/components/ui/TaskTicket';

export type ShowcaseItem = {
  slug: string;
  short: string;
  name: string;
  message: string;
  reply: string;
  result: string;
  connection: string;
};

type Props = {
  items: readonly ShowcaseItem[];
  labels: { tablist: string; pause: string; play: string; linkPrefix: string };
};

const at = (ms: number) => ({ '--at': ms }) as React.CSSProperties;

// One rubro at a time: the message comes in, the task ends done. Every panel is
// in the server HTML, and only its visibility changes. It advances on its own
// while it is on screen, and the pause button, hover, focus or picking a rubro
// stop it. With reduced motion nothing advances and nothing animates.
export function RubroShowcase({ items, labels }: Props) {
  const id = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = React.useState(0);
  const [motion, setMotion] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const [stopped, setStopped] = React.useState(false);
  const [held, setHeld] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(!query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.45 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const autoplay = motion && inView && !stopped;

  // On small screens the rubros scroll sideways: keep the open one in view
  // without moving the page.
  React.useEffect(() => {
    const tab = tabRefs.current[active];
    const list = tab?.parentElement;
    if (!tab || !list || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: tab.offsetLeft - 20, behavior: 'smooth' });
  }, [active]);

  const pick = (index: number) => {
    setActive((index + items.length) % items.length);
    setStopped(true);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const move: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (!(event.key in move)) return;
    event.preventDefault();
    const next = (move[event.key] + items.length) % items.length;
    pick(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      ref={rootRef}
      data-showcase=""
      data-play={motion && inView}
      data-autoplay={autoplay}
      data-paused={held}
      className="grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-stretch lg:gap-12"
    >
      <div
        role="tablist"
        aria-label={labels.tablist}
        onKeyDown={onKeyDown}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:-mx-8 md:px-8 lg:mx-0 lg:flex-col lg:justify-center lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.slug}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => pick(index)}
              className={`min-h-11 shrink-0 rounded-full px-4 text-left text-[0.9375rem] font-medium transition-colors duration-300 lg:rounded-xl lg:px-0 lg:py-3.5 lg:text-title ${
                selected
                  ? 'bg-ink text-white lg:bg-transparent lg:text-ink'
                  : 'bg-surface text-muted hover:text-ink lg:bg-transparent lg:text-faint'
              }`}
            >
              <span className="lg:hidden">{item.short}</span>
              <span className="hidden lg:inline">{item.name}</span>
            </button>
          );
        })}
      </div>

      <div
        className="relative grid rounded-4xl bg-surface shadow-card"
        onPointerEnter={(event) => event.pointerType === 'mouse' && setHeld(true)}
        onPointerLeave={() => setHeld(false)}
        onFocus={(event) => event.target.matches(':focus-visible') && setHeld(true)}
        onBlur={() => setHeld(false)}
      >
        {/* One segment per rubro, like a status bar: the open one fills while
            it plays, and its end moves to the next. */}
        <div
          className="absolute inset-x-5 top-5 z-10 flex gap-1.5 sm:inset-x-8 sm:top-7 lg:inset-x-10 lg:top-9"
          aria-hidden="true"
        >
          {items.map((item, index) => (
            <span key={item.slug} className="h-[3px] flex-1 overflow-hidden rounded-full bg-line">
              {index < active && <span className="block h-full bg-ink/30" />}
              {index === active && (
                <span
                  className="tab-progress block h-full origin-left bg-ink"
                  onAnimationEnd={() => setActive((active + 1) % items.length)}
                />
              )}
            </span>
          ))}
        </div>
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <div
              key={item.slug}
              role="tabpanel"
              id={`${id}-panel-${index}`}
              aria-labelledby={`${id}-tab-${index}`}
              data-active={selected}
              className={`col-start-1 row-start-1 flex min-h-[25rem] flex-col p-5 pt-12 transition-opacity duration-300 sm:p-8 sm:pt-14 lg:min-h-[28rem] lg:p-10 lg:pt-16 ${
                selected ? '' : 'invisible opacity-0'
              }`}
            >
              <p className="text-sm font-semibold text-muted lg:hidden">{item.name}</p>
              <div className="mt-4 flex flex-1 flex-col justify-center gap-2.5 text-[1.0625rem] leading-snug lg:mt-0 lg:text-lg">
                <p
                  className="seq max-w-[88%] self-start rounded-3xl rounded-bl-md bg-bg px-4 py-2.5 sm:max-w-[75%] lg:px-5 lg:py-3"
                  style={at(150)}
                >
                  {item.message}
                </p>
                <p
                  className="seq max-w-[88%] self-end rounded-3xl rounded-br-md bg-forest px-4 py-2.5 text-white sm:max-w-[75%] lg:px-5 lg:py-3"
                  style={at(1100)}
                >
                  {item.reply}
                </p>
                <TaskTicket
                  label={item.result}
                  detail={item.connection}
                  size="lg"
                  className="seq-pop mt-3 self-end"
                  style={at(1900)}
                />
              </div>
              <Link
                href={`/casos-de-uso/${item.slug}`}
                className="mt-5 inline-flex min-h-11 items-center gap-1.5 self-start pr-14 text-[0.9375rem] font-semibold text-coral-strong underline-offset-4 hover:underline"
              >
                {labels.linkPrefix} {item.name.charAt(0).toLowerCase() + item.name.slice(1)}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          );
        })}

        {motion && (
          <button
            type="button"
            onClick={() => setStopped(!stopped)}
            aria-label={stopped ? labels.play : labels.pause}
            className="absolute bottom-5 right-5 grid size-11 place-items-center rounded-full bg-bg text-ink transition-colors duration-200 hover:bg-ink hover:text-white sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10"
          >
            {stopped ? (
              <Play size={16} fill="currentColor" aria-hidden="true" />
            ) : (
              <Pause size={16} fill="currentColor" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
