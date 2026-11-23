import { Check } from 'lucide-react';

type TaskTicketProps = {
  label: string;
  detail?: string;
  size?: 'md' | 'lg';
  /** surface on light backgrounds, glass on forest. */
  tone?: 'surface' | 'glass';
  className?: string;
  style?: React.CSSProperties;
};

// The finished task: a coral check and what got done. Coral is kept for this
// moment and for the main action.
export function TaskTicket({
  label,
  detail,
  size = 'md',
  tone = 'surface',
  className = '',
  style,
}: TaskTicketProps) {
  const large = size === 'lg';
  const glass = tone === 'glass';
  return (
    <div
      className={`flex items-center rounded-2xl ${
        large ? 'gap-3.5 p-3 pr-5' : 'gap-3 p-2.5 pr-4'
      } ${
        glass
          ? 'bg-white/10 text-white ring-1 ring-inset ring-white/15 backdrop-blur-md'
          : 'bg-surface text-ink shadow-card ring-1 ring-line'
      } ${className}`}
      style={style}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-full bg-coral text-white ${
          large ? 'size-11' : 'size-8'
        }`}
        aria-hidden="true"
      >
        <Check size={large ? 22 : 16} strokeWidth={3} />
      </span>
      <p className="min-w-0">
        <span
          className={`block font-semibold leading-tight tracking-[-0.015em] ${
            large ? 'text-lg' : 'text-[0.9375rem]'
          }`}
        >
          {label}
        </span>
        {detail && (
          <span
            className={`mt-0.5 block leading-snug ${glass ? 'text-white/70' : 'text-muted'} ${
              large ? 'text-sm' : 'text-[0.8125rem]'
            }`}
          >
            {detail}
          </span>
        )}
      </p>
    </div>
  );
}
