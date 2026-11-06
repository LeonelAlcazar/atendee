import { Check } from 'lucide-react';

type TaskTicketProps = {
  label: string;
  detail?: string;
  size?: 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
};

// The finished task, drawn as a torn-off stub. It sits outside the inbox on
// purpose: the inbox does not show which action ran yet.
export function TaskTicket({
  label,
  detail,
  size = 'md',
  className = '',
  style,
}: TaskTicketProps) {
  const large = size === 'lg';
  return (
    <div
      className={`flex items-stretch overflow-hidden rounded-md border-2 border-ink bg-surface ${
        large ? 'shadow-[var(--shadow-brut)]' : 'shadow-[var(--shadow-brut-xs)]'
      } ${className}`}
      style={style}
    >
      <span
        className={`grid shrink-0 place-items-center border-r-2 border-dashed border-ink bg-mint ${
          large ? 'w-14' : 'w-9'
        }`}
        aria-hidden="true"
      >
        <Check size={large ? 24 : 16} strokeWidth={3} />
      </span>
      <p className={`min-w-0 ${large ? 'px-4 py-3' : 'px-3 py-2'}`}>
        <span
          className={`block font-display font-bold leading-tight tracking-[-0.015em] ${
            large ? 'text-lg sm:text-xl' : 'text-sm'
          }`}
        >
          {label}
        </span>
        {detail && (
          <span
            className={`mt-0.5 block leading-snug text-mute ${
              large ? 'text-sm' : 'text-xs'
            }`}
          >
            {detail}
          </span>
        )}
      </p>
    </div>
  );
}
