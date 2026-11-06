import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { ChatMockup } from '@/components/ui/ChatMockup';
import type {
  BlockTone,
  CalloutBlock,
  ChatBlock,
  ChecklistBlock,
  CompareBlock,
  NotesBlock,
  ProseBlock,
  RubroBlock,
  StepsBlock,
  TableBlock,
  TicketBlock,
} from '@/content/rubros';
import { RichText } from './RichText';

const tones: Record<BlockTone, string> = {
  plain: '',
  surface: 'bg-surface',
  mint: 'bg-mint/60',
  sky: 'bg-sky/60',
  sun: 'bg-sun/45',
  coral: 'bg-coral-soft/70',
  forest: 'bg-forest text-bg',
};

function Section({ block, children }: { block: RubroBlock; children: ReactNode }) {
  return (
    <section
      id={block.id}
      aria-labelledby={`${block.id}-title`}
      className={`scroll-mt-20 border-b-2 border-ink py-14 md:py-20 ${tones[block.tone ?? 'plain']}`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">{children}</div>
    </section>
  );
}

function Heading({ block }: { block: RubroBlock }) {
  const inverse = block.tone === 'forest';
  return (
    <header className="max-w-3xl">
      <h2
        id={`${block.id}-title`}
        className="font-display text-3xl font-semibold leading-[1.02] tracking-[-0.03em] text-balance md:text-5xl"
      >
        {block.title}
      </h2>
      {block.intro && (
        <p className={`mt-4 text-lg leading-relaxed ${inverse ? 'text-bg/80' : 'text-ink/75'}`}>
          {block.intro}
        </p>
      )}
    </header>
  );
}

function Paragraphs({ items, inverse = false }: { items: string[]; inverse?: boolean }) {
  return (
    <div className={`space-y-4 text-lg leading-relaxed ${inverse ? 'text-bg/85' : 'text-ink/80'}`}>
      {items.map((text) => (
        <p key={text}>
          <RichText text={text} />
        </p>
      ))}
    </div>
  );
}

function Note({ text }: { text: string }) {
  return (
    <p className="mt-5 max-w-3xl leading-relaxed text-ink/75">
      <RichText text={text} />
    </p>
  );
}

// Rows stack as labelled cards on phones. Explicit roles keep table semantics
// when the display value changes.
function TableView({ block }: { block: TableBlock }) {
  return (
    <Section block={block}>
      <Heading block={block} />
      <div className="mt-8 overflow-hidden rounded-lg border-2 border-ink bg-surface shadow-[var(--shadow-brut-sm)]">
        <table role="table" className="w-full border-collapse text-left max-md:block">
          <caption className="sr-only">{block.caption}</caption>
          <thead role="rowgroup" className="max-md:sr-only">
            <tr role="row" className="bg-forest text-bg">
              {block.columns.map((column) => (
                <th
                  key={column}
                  role="columnheader"
                  scope="col"
                  className="px-4 py-3 align-bottom font-mono text-xs font-medium uppercase tracking-[0.06em] md:px-5"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup" className="max-md:block">
            {block.rows.map((row) => (
              <tr
                key={row[0]}
                role="row"
                className="border-t border-ink/25 first:border-t-0 max-md:block max-md:p-4"
              >
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th
                      key={block.columns[index]}
                      role="rowheader"
                      scope="row"
                      className="px-4 py-4 text-left align-top font-display text-base font-semibold leading-snug max-md:block max-md:p-0 max-md:text-lg md:px-5 md:w-[28%]"
                    >
                      {cell}
                    </th>
                  ) : (
                    <td
                      key={block.columns[index]}
                      role="cell"
                      data-label={block.columns[index]}
                      className="px-4 py-4 align-top leading-relaxed text-ink/80 max-md:mt-3 max-md:block max-md:p-0 max-md:before:mb-0.5 max-md:before:block max-md:before:font-mono max-md:before:text-[11px] max-md:before:uppercase max-md:before:tracking-[0.06em] max-md:before:text-mute max-md:before:content-[attr(data-label)] md:px-5"
                    >
                      <RichText text={cell} />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.note && <Note text={block.note} />}
    </Section>
  );
}

function StepsView({ block }: { block: StepsBlock }) {
  const columns = block.steps.length === 4 ? 'md:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-3';
  return (
    <Section block={block}>
      <Heading block={block} />
      <ol className={`mt-9 grid gap-5 ${columns}`}>
        {block.steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-lg border-2 border-ink bg-surface p-6 shadow-[var(--shadow-brut-sm)]"
          >
            <span className="font-mono text-sm text-coral-strong">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 font-display text-xl font-semibold leading-tight tracking-[-0.02em]">
              {step.title}
            </h3>
            <p className="mt-3 leading-relaxed text-ink/80">
              <RichText text={step.text} />
            </p>
          </li>
        ))}
      </ol>
      {block.note && <Note text={block.note} />}
    </Section>
  );
}

function ChatView({ block }: { block: ChatBlock }) {
  return (
    <Section block={block}>
      <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div>
          <Heading block={block} />
          <div className="mt-6 max-w-2xl">
            <Paragraphs items={block.paragraphs} />
          </div>
        </div>
        <ChatMockup
          messages={block.messages}
          caption={block.caption}
          result={block.result}
          className="w-full lg:justify-self-end"
        />
      </div>
    </Section>
  );
}

function CalloutView({ block }: { block: CalloutBlock }) {
  return (
    <Section block={block}>
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Heading block={block} />
        <Paragraphs items={block.paragraphs} inverse={block.tone === 'forest'} />
      </div>
    </Section>
  );
}

function ProseView({ block }: { block: ProseBlock }) {
  return (
    <Section block={block}>
      <Heading block={block} />
      <div className="mt-6 max-w-3xl">
        <Paragraphs items={block.paragraphs} />
      </div>
    </Section>
  );
}

function NotesView({ block }: { block: NotesBlock }) {
  return (
    <Section block={block}>
      <Heading block={block} />
      <ul className="mt-9 grid gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
        {block.items.map((item) => (
          <li key={item.title} className="border-t-2 border-ink pt-4">
            <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.02em]">
              {item.title}
            </h3>
            <p className="mt-2 leading-relaxed text-ink/80">
              <RichText text={item.text} />
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ChecklistView({ block }: { block: ChecklistBlock }) {
  return (
    <Section block={block}>
      <Heading block={block} />
      <div className="mt-9 grid gap-x-12 gap-y-8 md:grid-cols-2">
        {block.groups.map((group, index) => (
          <div key={group.title ?? index}>
            {group.title && (
              <h3 className="mb-4 font-display text-2xl font-semibold tracking-[-0.02em]">{group.title}</h3>
            )}
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-relaxed">
                  <span
                    className="mt-1 grid size-5 shrink-0 place-items-center rounded border-2 border-ink bg-surface"
                    aria-hidden="true"
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="min-w-0">
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {block.note && <Note text={block.note} />}
    </Section>
  );
}

function CompareView({ block }: { block: CompareBlock }) {
  const columns = block.sides.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2';
  return (
    <Section block={block}>
      <Heading block={block} />
      <div className={`mt-9 grid gap-5 ${columns}`}>
        {block.sides.map((side) => (
          <div
            key={side.title}
            className="rounded-lg border-2 border-ink bg-surface shadow-[var(--shadow-brut-sm)]"
          >
            <h3 className="rounded-t-[6px] border-b-2 border-ink bg-forest px-5 py-3 font-display text-xl font-semibold tracking-[-0.02em] text-bg">
              {side.title}
            </h3>
            <ul className="list-disc space-y-2.5 py-5 pl-9 pr-5 leading-relaxed text-ink/80">
              {side.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {block.note && <Note text={block.note} />}
    </Section>
  );
}

function TicketView({ block }: { block: TicketBlock }) {
  const { ticket } = block;
  return (
    <Section block={block}>
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Heading block={block} />
          <div className="mt-6 max-w-2xl">
            <Paragraphs items={block.paragraphs} />
          </div>
        </div>
        <figure className="rounded-lg border-2 border-ink bg-bg p-5 font-mono text-sm shadow-[var(--shadow-brut)]">
          <figcaption className="text-xs text-mute">{ticket.label}</figcaption>
          <dl className="mt-4 grid gap-1.5 border-y-2 border-dashed border-ink/40 py-3">
            {ticket.header.map((row) => (
              <div key={row.label} className="flex flex-wrap justify-between gap-x-4">
                <dt className="text-mute">{row.label}</dt>
                <dd className="text-right font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="divide-y divide-ink/15">
            {ticket.lines.map((line) => (
              <li key={line.item} className="py-3">
                <div className="flex justify-between gap-4">
                  <span className="min-w-0">{line.item}</span>
                  <span className="shrink-0 font-medium">{line.quantity}</span>
                </div>
                {line.note && <p className="mt-1 text-xs text-coral-strong">{line.note}</p>}
              </li>
            ))}
          </ul>
          <dl className="grid gap-1.5 border-t-2 border-dashed border-ink/40 pt-3">
            {ticket.footer.map((row) => (
              <div key={row.label} className="flex flex-wrap justify-between gap-x-4">
                <dt className="text-mute">{row.label}</dt>
                <dd className="text-right font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
        </figure>
      </div>
    </Section>
  );
}

function Block({ block }: { block: RubroBlock }) {
  switch (block.kind) {
    case 'table':
      return <TableView block={block} />;
    case 'steps':
      return <StepsView block={block} />;
    case 'chat':
      return <ChatView block={block} />;
    case 'callout':
      return <CalloutView block={block} />;
    case 'prose':
      return <ProseView block={block} />;
    case 'notes':
      return <NotesView block={block} />;
    case 'checklist':
      return <ChecklistView block={block} />;
    case 'compare':
      return <CompareView block={block} />;
    case 'ticket':
      return <TicketView block={block} />;
  }
}

export function RubroBlocks({ blocks }: { blocks: RubroBlock[] }) {
  return (
    <>
      {blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </>
  );
}
