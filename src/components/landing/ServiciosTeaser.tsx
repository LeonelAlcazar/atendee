import Link from 'next/link';
import { servicios } from '@/content/servicios';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';

export function ServiciosTeaser() {
  return (
    <section className="border-b-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Qué hacemos"
          title={
            <>
              Tres formas de <span className="text-coral">automatizar</span> tu WhatsApp.
            </>
          }
          sub="Cada una resuelve un problema distinto. Podés elegir uno, dos o los tres."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {servicios.map((s, i) => (
            <Link key={s.id} href={`/servicios#${s.id}`} className="block">
              <Card hover className={i === 0 ? 'md:scale-[1.04]' : i === 2 ? 'md:scale-[0.96]' : ''}>
                <div className="flex flex-col gap-4">
                  <span className="font-display font-semibold text-5xl text-coral">
                    {s.number}
                  </span>
                  <h3 className="font-display font-semibold text-2xl tracking-[-0.02em]">
                    {s.title}
                  </h3>
                  <p className="font-body text-base text-mute">{s.short}</p>
                  <span className="font-mono text-xs uppercase tracking-[0.08em] mt-2 underline underline-offset-4 decoration-2">
                    Ver detalles →
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
