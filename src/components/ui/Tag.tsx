import * as React from 'react';

type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  filled?: boolean;
  inverse?: boolean;
};

export function Tag({
  filled = false,
  inverse = false,
  className = '',
  children,
  ...rest
}: TagProps) {
  const fill = inverse
    ? 'border-bg/70 bg-bg/10 text-bg'
    : filled
      ? 'border-coral bg-coral-soft text-ink'
      : 'border-ink/70 bg-surface text-ink';
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] md:text-xs ${fill} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
