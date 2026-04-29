import * as React from 'react';

type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  filled?: boolean;
};

export function Tag({
  filled = false,
  className = '',
  children,
  ...rest
}: TagProps) {
  const fill = filled ? 'bg-coral text-ink' : 'bg-transparent text-ink';
  return (
    <span
      className={`inline-block font-mono text-xs uppercase tracking-[0.08em] border-2 border-ink px-2 py-1 ${fill} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
