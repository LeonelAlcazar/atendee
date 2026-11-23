import { Check, Link2, Link2Off, UserRound } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { Tag } from '@/components/ui/Tag';
import { TaskTicket } from '@/components/ui/TaskTicket';
import type {
  CalloutBlock,
  ChatBlock,
  ChecklistBlock,
  CompareBlock,
  NotesBlock,
  ProseBlock,
  Rubro,
  RubroBlock,
  StepsBlock,
  TableBlock,
  TicketBlock,
} from '@/content/rubros';
import { RichText } from './RichText';

// Sections are separated by space, so a block's tone no longer paints a band.
function Section({ block, children }: { block: RubroBlock; children: ReactNode }) {
  return (
    <section
      id={block.id}
      aria-labelledby={`${block.id}-title`}
      className="scroll-mt-20 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">{children}</div>
    </section>
  );
}

function Heading({ block }: { block: RubroBlock }) {
  return (
    <header className="max-w-4xl">
      <h2 id={`${block.id}-title`} className="text-balance text-headline">
        {block.title}
      </h2>
      {block.intro && (
        <p className="mt-4 max-w-3xl text-pretty text-lead text-muted md:mt-5">{block.intro}</p>
      )}
    </header>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-muted md:text-lg">
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
    <p className="mt-6 max-w-3xl text-[0.9375rem] leading-relaxed text-muted md:mt-8">
      <RichText text={text} />
    </p>
  );
}

// Names what the scene runs on: the connection, or that there is none.
function ChatCaption({ text, inverse = false }: { text: string; inverse?: boolean }) {
  const Icon = /sin conexión/i.test(text) ? UserRound : Link2;
  return (
    <p
      className={`flex items-center gap-2 px-1 text-sm font-medium ${
        inverse ? 'text-white/70' : 'text-muted'
      }`}
    >
      <Icon size={16} className="shrink-0" aria-hidden="true" />
      {text}
    </p>
  );
}

const at = (ms: number) => ({ '--at': ms }) as CSSProperties;

// The rubro's hero scene, on forest like the home: the chat, what it runs on,
// the finished task, and what happens without the connection.
export function RubroScene({ chat, fallback }: { chat: Rubro['chat']; fallback: string }) {
  return (
    <div className="px-3 pt-10 md:px-6 md:pt-14">
      <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-4xl bg-forest px-4 py-8 sm:px-8 md:py-14 lg:py-20">
        <div
          className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgb(255_255_255/0.1),transparent_65%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(50%_100%_at_50%_100%,rgb(230_72_44/0.3),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-sm gap-6 lg:max-w-none lg:grid-cols-[24rem_minmax(0,26rem)] lg:items-center lg:justify-center lg:gap-16">
          <ChatMockup messages={chat.messages} className="w-full" />
          <div className="flex flex-col gap-3">
            <ChatCaption text={chat.caption} inverse />
            <TaskTicket
              label={chat.result.label}
              detail={chat.result.detail}
              size="lg"
              className="seq-pop shadow-float ring-0"
              style={at(450)}
            />
            <p className="mt-3 flex gap-3 rounded-3xl bg-white/[0.07] p-5 text-[0.9375rem] leading-relaxed text-white/80 ring-1 ring-inset ring-white/15">
              <Link2Off size={18} className="mt-0.5 shrink-0 text-white/60" aria-hidden="true" />
              <span className="min-w-0">{fallback}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Below the breakpoint, rows stack as labelled cards: on phones every value
// stacks, and on tablets a four-column table keeps its values side by side under
// the row title. Explicit roles keep table semantics when the display changes.
// The ranges never overlap, so no utility has to win over another.
const tableLayouts = {
  // Up to three columns: a real table from md.
  md: {
    table: 'max-md:block',
    head: 'max-md:sr-only',
    body: 'max-md:block',
    row: 'max-md:block max-md:px-5 max-md:py-6',
    rowHeader: 'md:w-[28%] md:px-7 md:py-5 md:leading-relaxed max-md:block max-md:text-lg',
    cell: 'md:px-7 md:py-5 max-md:mt-3 max-md:block max-md:before:mb-0.5 max-md:before:block max-md:before:text-sm max-md:before:font-semibold max-md:before:text-ink max-md:before:content-[attr(data-label)]',
  },
  // Four columns: a real table from lg.
  lg: {
    table: 'max-lg:block',
    head: 'max-lg:sr-only',
    body: 'max-lg:block',
    row: 'max-md:block max-md:px-5 md:max-lg:grid md:max-lg:grid-cols-3 md:max-lg:gap-x-8 md:max-lg:px-7 max-lg:py-6',
    rowHeader: 'lg:w-[20%] lg:px-7 lg:py-5 lg:leading-relaxed max-lg:block max-lg:text-lg md:max-lg:col-span-3',
    cell: 'lg:px-7 lg:py-5 max-lg:mt-3 max-lg:block max-lg:before:mb-0.5 max-lg:before:block max-lg:before:text-sm max-lg:before:font-semibold max-lg:before:text-ink max-lg:before:content-[attr(data-label)]',
  },
};

function TableView({ block }: { block: TableBlock }) {
  const layout = tableLayouts[block.columns.length > 3 ? 'lg' : 'md'];
  return (
    <Section block={block}>
      <Heading block={block} />
      <div className="mt-8 overflow-x-auto rounded-3xl bg-surface shadow-card ring-1 ring-line md:mt-12">
        <table role="table" className={`w-full border-collapse text-left ${layout.table}`}>
          <caption className="sr-only">{block.caption}</caption>
          <thead role="rowgroup" className={layout.head}>
            <tr role="row" className="border-b border-line bg-bg/60">
              {block.columns.map((column) => (
                <th
                  key={column}
                  role="columnheader"
                  scope="col"
                  className="px-7 py-3.5 align-bottom text-sm font-semibold text-muted"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup" className={layout.body}>
            {block.rows.map((row) => (
              <tr
                key={row[0]}
                role="row"
                className={`border-b border-line last:border-b-0 ${layout.row}`}
              >
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th
                      key={block.columns[index]}
                      role="rowheader"
                      scope="row"
                      className={`text-left align-top text-[0.9375rem] font-semibold leading-snug tracking-[-0.01em] ${layout.rowHeader}`}
                    >
                      {cell}
                    </th>
                  ) : (
                    <td
                      key={block.columns[index]}
                      role="cell"
                      data-label={block.columns[index]}
                      className={`align-top text-[0.9375rem] leading-relaxed text-muted ${layout.cell}`}
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

// Numbered like the home's steps: a hairline, a faint number, the title.
function StepsView({ block }: { block: StepsBlock }) {
  const columns = block.steps.length === 4 ? 'md:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-3';
  return (
    <Section block={block}>
      <Heading block={block} />
      <ol className={`mt-8 grid gap-x-10 md:mt-14 md:gap-y-12 ${columns}`}>
        {block.steps.map((step, index) => (
          <li
            key={step.title}
            className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-2 border-t border-line-strong py-6 md:block md:py-0 md:pt-7"
          >
            <span
              className="text-4xl font-semibold leading-none tracking-[-0.04em] text-faint md:text-6xl"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <div>
              <h3 className="text-balance text-title md:mt-6">{step.title}</h3>
              <p className="mt-2 max-w-sm leading-relaxed text-muted">
                <RichText text={step.text} />
              </p>
            </div>
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
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-20">
        <div>
          <Heading block={block} />
          <div className="mt-6 max-w-2xl md:mt-8">
            <Paragraphs items={block.paragraphs} />
          </div>
        </div>
        <div className="w-full max-w-sm lg:justify-self-end">
          <ChatCaption text={block.caption} />
          <ChatMockup messages={block.messages} result={block.result} className="mt-3 w-full" />
        </div>
      </div>
    </Section>
  );
}

// A statement worth stopping for: one white card, the paragraphs side by side.
function CalloutView({ block }: { block: CalloutBlock }) {
  const columns = block.paragraphs.length > 2 ? 'lg:grid-cols-3' : 'md:grid-cols-2';
  return (
    <Section block={block}>
      <div className="rounded-4xl bg-surface px-6 py-10 shadow-card sm:px-10 md:py-14 lg:px-14">
        <Heading block={block} />
        <div
          className={`mt-8 grid gap-x-10 gap-y-4 text-base leading-relaxed text-muted md:mt-10 md:text-lg ${columns}`}
        >
          {block.paragraphs.map((text) => (
            <p key={text}>
              <RichText text={text} />
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProseView({ block }: { block: ProseBlock }) {
  return (
    <Section block={block}>
      <Heading block={block} />
      <div className="mt-6 max-w-3xl md:mt-8">
        <Paragraphs items={block.paragraphs} />
      </div>
    </Section>
  );
}

function NotesView({ block }: { block: NotesBlock }) {
  return (
    <Section block={block}>
      <Heading block={block} />
      <ul className="mt-8 grid gap-x-10 md:mt-14 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
        {block.items.map((item) => (
          <li key={item.title} className="border-t border-line-strong py-6 md:py-0 md:pt-7">
            <h3 className="text-balance text-title">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">
              <RichText text={item.text} />
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

// Untitled groups are one list split in two columns, so on phones they read
// as one: no gap between them, and a hairline where the first one ends.
function ChecklistView({ block }: { block: ChecklistBlock }) {
  const titled = block.groups.some((group) => group.title);
  return (
    <Section block={block}>
      <Heading block={block} />
      <div
        className={`mt-8 grid gap-x-12 rounded-4xl bg-surface p-6 shadow-card sm:p-9 md:mt-12 md:grid-cols-2 lg:p-12 ${
          titled ? 'gap-y-8' : ''
        }`}
      >
        {block.groups.map((group, index) => (
          <div
            key={group.title ?? index}
            className={
              !titled && index < block.groups.length - 1
                ? 'max-md:[&_li:last-child]:border-b'
                : undefined
            }
          >
            {group.title && <h3 className="mb-2 text-title">{group.title}</h3>}
            <ul>
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-line py-3.5 leading-relaxed last:border-b-0"
                >
                  <span
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-forest-tint text-forest"
                    aria-hidden="true"
                  >
                    <Check size={14} strokeWidth={2.75} />
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
      <div className={`mt-8 grid gap-4 md:mt-12 md:gap-5 ${columns}`}>
        {block.sides.map((side) => (
          <div key={side.title} className="rounded-3xl bg-surface p-7 shadow-card md:p-9">
            <h3 className="text-balance text-title">{side.title}</h3>
            <ul className="mt-5 space-y-3">
              {side.points.map((point) => (
                <li key={point} className="flex gap-3 leading-relaxed text-muted">
                  <span
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-forest"
                    aria-hidden="true"
                  />
                  <span className="min-w-0">{point}</span>
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

// The order as it lands in the business's system: the done check, who it is
// for, the lines and how it ships.
function TicketView({ block }: { block: TicketBlock }) {
  const { ticket } = block;
  return (
    <Section block={block}>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
        <div>
          <Heading block={block} />
          <div className="mt-6 max-w-2xl md:mt-8">
            <Paragraphs items={block.paragraphs} />
          </div>
        </div>
        <figure className="w-full max-w-md rounded-4xl bg-surface p-6 shadow-float sm:p-8 lg:justify-self-end">
          <figcaption className="flex items-center gap-3">
            <span
              className="grid size-10 shrink-0 place-items-center rounded-full bg-coral text-white"
              aria-hidden="true"
            >
              <Check size={20} strokeWidth={3} />
            </span>
            <span className="text-title">{ticket.label}</span>
          </figcaption>
          <dl className="mt-6 grid gap-2.5 border-y border-dashed border-line-strong py-4 text-[0.9375rem]">
            {ticket.header.map((row) => (
              <div key={row.label} className="flex flex-wrap justify-between gap-x-4">
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-right font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="divide-y divide-line">
            {ticket.lines.map((line) => (
              <li key={line.item} className="py-4">
                <div className="flex justify-between gap-4 text-[0.9375rem] leading-snug">
                  <span className="min-w-0">{line.item}</span>
                  <span className="shrink-0 font-semibold tabular-nums">{line.quantity}</span>
                </div>
                {line.note && (
                  <Tag filled className="mt-2">
                    {line.note}
                  </Tag>
                )}
              </li>
            ))}
          </ul>
          <dl className="grid gap-2.5 border-t border-dashed border-line-strong pt-4 text-[0.9375rem]">
            {ticket.footer.map((row) => (
              <div key={row.label} className="flex flex-wrap justify-between gap-x-4">
                <dt className="text-muted">{row.label}</dt>
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
