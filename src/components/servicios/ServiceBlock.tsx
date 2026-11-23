import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Link2 } from 'lucide-react';
import type { ChatMessage, Servicio } from '@/content/servicios';
import { Button } from '@/components/ui/Button';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { buildWaLink } from '@/lib/wa';

// Small pieces shared by /servicios, /servicios/<slug> and /integraciones.

/** The chat that ends with the finished task, on a soft stage, with the
 * connection it depends on named underneath. */
export function ChatScene({
  messages,
  result,
  connection,
  className = '',
}: {
  messages: ChatMessage[];
  result: { label: string; detail: string };
  connection?: string;
  className?: string;
}) {
  return (
    <figure
      className={`flex flex-col items-center rounded-4xl bg-gradient-to-b from-forest-tint to-forest-tint/30 px-4 pb-5 pt-8 sm:px-10 sm:pb-7 sm:pt-12 ${className}`}
    >
      <ChatMockup messages={messages} result={result} className="w-full" />
      {connection && (
        <figcaption className="mt-5 flex items-center gap-2 text-sm font-medium text-muted">
          <Link2 size={16} className="shrink-0" aria-hidden="true" />
          {connection}
        </figcaption>
      )}
    </figure>
  );
}

/** What the assistant leaves done, one check per line. */
export function DoneList({
  items,
  className = '',
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-col gap-4 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3.5 text-lg leading-snug">
          <span
            className="grid size-7 shrink-0 place-items-center rounded-full bg-forest text-white"
            aria-hidden="true"
          >
            <Check size={15} strokeWidth={3} />
          </span>
          <span className="pt-0.5">{item}</span>
        </li>
      ))}
    </ul>
  );
}

const linkTone = {
  coral: 'text-coral-strong',
  ink: 'text-ink',
  white: 'text-white',
} as const;

/** A text link with a trailing arrow, as on the home. The arrow flows with
 * the text, so it stays after the last word when the link wraps. */
export function ArrowLink({
  href,
  tone = 'coral',
  className = '',
  children,
}: {
  href: string;
  tone?: keyof typeof linkTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-block min-h-11 py-2.5 font-semibold leading-6 underline-offset-4 hover:underline ${linkTone[tone]} ${className}`}
    >
      {children}
      <ArrowRight
        size={16}
        className="ml-1.5 inline-block align-[-0.1875rem]"
        aria-hidden="true"
      />
    </Link>
  );
}

/** A white tile that links somewhere: a title, an optional line and a round
 * arrow. */
export function TileLink({
  href,
  title,
  text,
}: {
  href: string;
  title: ReactNode;
  text?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full items-start justify-between gap-5 rounded-3xl bg-surface p-6 shadow-card transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-float md:p-7"
    >
      <span className="flex flex-col gap-1.5">
        <span className="text-lg font-semibold leading-snug tracking-[-0.015em]">{title}</span>
        {text && <span className="leading-snug text-muted">{text}</span>}
      </span>
      <span
        className="grid size-9 shrink-0 place-items-center rounded-full bg-bg transition-colors duration-200 group-hover:bg-ink group-hover:text-white"
        aria-hidden="true"
      >
        <ArrowRight size={16} />
      </span>
    </Link>
  );
}

/** A list of links on hairlines, each with an arrow at the end. */
export function LinkRows({
  links,
  className = '',
}: {
  links: { href: string; label: ReactNode }[];
  className?: string;
}) {
  return (
    <ul className={`border-t border-line-strong ${className}`}>
      {links.map((link) => (
        <li key={link.href} className="border-b border-line">
          <Link
            href={link.href}
            className="group flex min-h-14 items-center justify-between gap-4 py-3 font-medium leading-snug transition-colors duration-200 hover:text-coral-strong"
          >
            {link.label}
            <ArrowRight
              size={18}
              className="shrink-0 text-muted transition-[transform,color] duration-200 ease-smooth group-hover:translate-x-0.5 group-hover:text-coral-strong"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

// One solution on the /servicios hub: the action, the chat that ends done,
// what it leaves done and the way to ask for it.
export function ServiceBlock({
  servicio,
  reverse = false,
}: {
  servicio: Servicio;
  reverse?: boolean;
}) {
  return (
    <section id={servicio.id} className="scroll-mt-24 py-12 md:py-18">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow={servicio.title}
          title={servicio.headline}
          sub={servicio.short}
        />

        <div className="mt-8 grid items-center gap-10 md:mt-12 lg:grid-cols-2 lg:gap-16">
          <ChatScene
            messages={servicio.conversation}
            result={servicio.result}
            connection={servicio.caption}
            className={reverse ? 'lg:order-2' : ''}
          />

          <div>
            <DoneList items={servicio.bullets} />
            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
              <Button
                href={buildWaLink(servicio.ctaContext)}
                data-cta={`solutions-hub-${servicio.id}-whatsapp`}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                Consultar por WhatsApp
              </Button>
              <ArrowLink href={`/servicios/${servicio.slug}`} tone="ink">
                Ver cómo funciona y qué necesita
                <span className="sr-only"> {servicio.title}</span>
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
