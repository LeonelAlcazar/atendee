import { ArrowRight, Link2 } from 'lucide-react';
import Link from 'next/link';
import { Tag } from '@/components/ui/Tag';
import type { Rubro } from '@/content/rubros';

// One rubro on the index: the task it finishes, the scene and what it connects
// to. The link covers the whole card, so the card lifts as one target.
export function RubroCard({ rubro }: { rubro: Rubro }) {
  const { hub } = rubro;
  // The arrow stays with the last word when the label wraps.
  const words = `Ver ${rubro.name.toLowerCase()}`.split(' ');
  const last = words.pop();
  const lead = words.join(' ');
  return (
    <article className="group relative flex flex-col rounded-3xl bg-surface p-7 shadow-card transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-float md:p-9">
      <Tag className="self-start">{hub.tag}</Tag>
      <h2 className="mt-6 text-balance text-title">{rubro.name}</h2>
      <p className="mt-3 text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em]">{hub.task}</p>
      <p className="mt-2 leading-relaxed text-muted">{hub.scene}</p>
      <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-muted">
        <Link2 size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
        <span>
          <span className="font-semibold text-ink">Se conecta a:</span> {hub.needs}.
        </span>
      </p>
      <Link
        href={`/casos-de-uso/${rubro.slug}`}
        className="mt-auto block self-start pb-2.5 pt-7 font-semibold leading-snug text-coral-strong underline-offset-4 after:absolute after:inset-0 after:rounded-3xl hover:underline"
      >
        {lead}{' '}
        <span className="whitespace-nowrap">
          {last}
          <ArrowRight
            size={16}
            className="ml-1.5 inline-block align-[-0.15em] transition-transform duration-200 ease-smooth group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </Link>
    </article>
  );
}
