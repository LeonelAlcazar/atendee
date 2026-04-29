'use client';

import * as React from 'react';
import { useInView, animate } from 'framer-motion';
import { stats } from '@/content/stats';
import { SectionHeader } from '@/components/ui/SectionHeader';

function Counter({ to }: { to: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{val}</span>;
}

export function Stats() {
  return (
    <section className="border-b-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Por qué atende"
          title={
            <>
              Menos consultas que respondés vos.{' '}
              <span className="text-coral">Más ventas que cierran solas.</span>
            </>
          }
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {stats.map((s) => (
            <li
              key={s.label}
              className="bg-bg border-2 border-ink shadow-[var(--shadow-brut)] p-8 flex flex-col gap-3"
            >
              <div className="font-display font-semibold text-7xl md:text-8xl text-coral leading-none tracking-[-0.03em]">
                {s.prefix}
                <Counter to={s.value} />
                {s.suffix}
              </div>
              <p className="font-body text-base text-ink">{s.label}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.08em] text-mute">
          * Cifras estimadas basadas en clientes actuales. Tus resultados varían según volumen y rubro.
        </p>
      </div>
    </section>
  );
}
