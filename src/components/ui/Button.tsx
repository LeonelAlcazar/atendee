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
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border-2 border-ink ' +
  'font-display font-semibold tracking-[-0.015em] transition-[transform,box-shadow,background-color,color] duration-150 ' +
  'shadow-[var(--shadow-brut-sm)] active:translate-x-[2px] active:translate-y-[2px] ' +
  'active:shadow-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-coral !text-ink hover:translate-x-[-2px] hover:translate-y-[-2px] ' +
    'hover:bg-coral-soft hover:shadow-[var(--shadow-brut)]',
  outline:
    'bg-surface text-ink hover:translate-x-[-2px] hover:translate-y-[-2px] ' +
    'hover:bg-forest hover:text-bg hover:shadow-[var(--shadow-brut-coral)]',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm md:text-base',
  lg: 'px-6 py-3.5 text-base md:px-7 md:text-lg',
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
