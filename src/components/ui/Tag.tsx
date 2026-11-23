import * as React from 'react';

type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  filled?: boolean;
  inverse?: boolean;
};

// A small pill label. Default on light surfaces, filled for the coral accent,
// inverse on forest.
export function Tag({
  filled = false,
  inverse = false,
  className = '',
  children,
  ...rest
}: TagProps) {
  const tone = inverse
    ? 'bg-white/10 text-white ring-1 ring-inset ring-white/15'
    : filled
      ? 'bg-coral-tint text-coral-strong'
      : 'bg-surface text-muted ring-1 ring-inset ring-line';
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[0.8125rem] font-medium leading-5 ${tone} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
