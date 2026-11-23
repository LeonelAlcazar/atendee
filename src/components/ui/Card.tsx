import * as React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  padded?: boolean;
  hover?: boolean;
  tone?: 'surface' | 'forest';
};

export function Card({
  padded = true,
  hover = false,
  tone = 'surface',
  className = '',
  children,
  ...rest
}: CardProps) {
  const padding = padded ? 'p-7 md:p-9' : '';
  const hoverFx = hover
    ? 'transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-float'
    : '';
  const surface =
    tone === 'forest' ? 'bg-forest text-white' : 'bg-surface shadow-card';
  return (
    <div
      className={`rounded-3xl ${surface} ${padding} ${hoverFx} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
