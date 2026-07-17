import * as React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  padded?: boolean;
  hover?: boolean;
};

export function Card({
  padded = true,
  hover = false,
  className = '',
  children,
  ...rest
}: CardProps) {
  const padding = padded ? 'p-8 md:p-10' : '';
  const hoverFx = hover
    ? 'transition-[transform,box-shadow,background-color] duration-150 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:bg-surface hover:shadow-[var(--shadow-brut-lg)]'
    : '';
  return (
    <div
      className={`rounded-lg border-2 border-ink bg-surface shadow-[var(--shadow-brut)] ${padding} ${hoverFx} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
