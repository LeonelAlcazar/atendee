'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

type Props = {
  lead: string;
  rest: string;
  actions: readonly string[];
  actionDurationMs: number;
  pause: string;
  play: string;
};

export function HeroHeadline({ lead, rest, actions, actionDurationMs, pause, play }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const active = step % actions.length;
  const [motion, setMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const update = () => setMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!motion || !visible || paused || actions.length < 2) return;
    const timer = window.setInterval(() => setStep(current => current + 1), actionDurationMs);
    return () => window.clearInterval(timer);
  }, [motion, visible, paused, actions.length, actionDurationMs]);

  const label = paused ? play : pause;
  return (
    <div ref={root} className="relative @container">
      <h1 className="text-center text-display [font-size:min(var(--text-display),9.8cqw)]">
        <span className="block">{lead}</span>{' '}
        <span className="sr-only">{actions[0]}</span>
        {/* Every action shares the middle row, keeping the other two lines still. */}
        <span aria-hidden="true" data-advanced={step > 0} className="grid place-items-center">
          {actions.map((action, index) => (
            <span
              key={action}
              className={`col-start-1 row-start-1 ${index === active ? 'hero-action' : 'invisible'}`}
            >
              {action}
            </span>
          ))}
        </span>{' '}
        <span className="block text-faint">{rest}</span>
      </h1>
      {motion && actions.length > 1 && (
        <button
          type="button"
          onClick={() => setPaused(current => !current)}
          aria-label={label}
          title={label}
          className="absolute right-0 top-0 grid size-11 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink lg:bottom-0 lg:top-auto"
        >
          {paused ? <Play size={16} fill="currentColor" aria-hidden="true" /> : <Pause size={16} fill="currentColor" aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}
