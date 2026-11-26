import * as React from 'react';

// primary: the one coral action per view. outline: the quiet second choice on
// light surfaces. dark: a neutral solid. glass: the second choice on forest.
type Variant = 'primary' | 'outline' | 'dark' | 'glass';
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
  'inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold leading-tight ' +
  'tracking-[-0.01em] transition-[transform,background-color,box-shadow,color] duration-200 ease-smooth ' +
  'active:scale-[0.97]';

// White on coral-fill is 4.6:1. Brand coral would fail under small white text.
const variants: Record<Variant, string> = {
  primary: 'bg-coral-fill !text-white shadow-cta hover:bg-coral-strong',
  outline:
    'bg-surface text-ink ring-1 ring-inset ring-line-strong hover:ring-ink/40',
  dark: 'bg-ink !text-white hover:bg-black',
  glass:
    'bg-white/10 !text-white ring-1 ring-inset ring-white/25 hover:bg-white/20',
};

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 py-2 text-[0.9375rem]',
  lg: 'min-h-13 px-7 py-3 text-[1.0625rem]',
};

// For a real <button> that has to look like one of these links (a form submit).
export function buttonClass(variant: Variant = 'primary', size: Size = 'md') {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

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
