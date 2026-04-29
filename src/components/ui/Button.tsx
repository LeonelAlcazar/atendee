import * as React from 'react';

type Variant = 'primary' | 'outline';
type Size = 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
};

type AnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
    href: string;
  };

const base =
  'inline-flex items-center justify-center gap-2 border-2 border-ink ' +
  'font-medium tracking-tight transition-transform duration-150 ' +
  'shadow-[var(--shadow-brut)] active:translate-x-[2px] active:translate-y-[2px] ' +
  'active:shadow-none focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

const variants: Record<Variant, string> = {
  primary:
    'bg-forest text-bg hover:translate-x-[-2px] hover:translate-y-[-2px] ' +
    'hover:shadow-[var(--shadow-brut-coral)]',
  outline:
    'bg-transparent text-ink hover:bg-forest hover:text-bg',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-3 text-base',
  lg: 'px-7 py-4 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  ...rest
}: AnchorProps) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
