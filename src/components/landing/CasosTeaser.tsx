import Link from 'next/link';
import { casos } from '@/content/casos';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function CasosTeaser() {
  return (
    <section className="border-b-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Casos de uso"
          title={
            <>
              Funciona en <span className="text-coral">cualquier rubro</span> donde tus clientes ya te escriben.
            </>
          }
        />

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {casos.map((c) => (
            <li
              key={c.id}
              className="border-2 border-ink p-6 flex flex-col gap-2 hover:bg-coral/10 transition-colors"
            >
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
                Para
              </span>
              <h3 className="font-display font-semibold text-2xl tracking-[-0.02em]">
                {c.industry}
              </h3>
              <p className="font-body text-base text-mute">{c.problem}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href="/casos-de-uso"
            className="inline-block font-mono text-sm uppercase tracking-[0.08em] underline underline-offset-4 decoration-2 hover:text-coral"
          >
            Ver todos los casos →
          </Link>
        </div>
      </div>
    </section>
  );
}
