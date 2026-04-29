import { SectionHeader } from '@/components/ui/SectionHeader';

const steps = [
  {
    n: '01',
    title: 'Charlamos',
    text: 'Te conocemos, vemos tu volumen actual y qué necesitás resolver.',
  },
  {
    n: '02',
    title: 'Diseñamos el flujo',
    text: 'Armamos los mensajes, las preguntas, las derivaciones. Lo aprobás vos.',
  },
  {
    n: '03',
    title: 'Conectamos tu WhatsApp',
    text: 'Configuramos WhatsApp Business API con Meta. Tu número, tu marca.',
  },
  {
    n: '04',
    title: 'Mejoramos con datos',
    text: 'Cada mes vemos qué se resuelve solo, qué no, y ajustamos.',
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="border-b-2 border-ink py-20 md:py-28 bg-forest text-bg">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Cómo funciona"
          title={
            <>
              De charla informal a <span className="text-coral">bot funcionando</span> en 48hs.
            </>
          }
          className="[&_.text-mute]:text-bg/70 [&_h2]:text-bg"
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="bg-bg text-ink border-2 border-ink shadow-[var(--shadow-brut)] p-6 flex flex-col gap-3"
            >
              <span className="font-display font-semibold text-4xl text-coral">{s.n}</span>
              <h3 className="font-display font-semibold text-xl tracking-[-0.02em]">{s.title}</h3>
              <p className="font-body text-sm text-mute">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
