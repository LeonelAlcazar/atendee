import * as React from 'react';

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: 'left' | 'center';
  level?: 'h1' | 'h2';
  inverse?: boolean;
  className?: string;
};

// The heading carries the message: a short eyebrow, one big line, one or two
// lines of body at most. Wrap part of the title in text-faint (or text-white/55
// on forest) for the second tone.
export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = 'left',
  level = 'h2',
  inverse = false,
  className = '',
}: SectionHeaderProps) {
  const alignment =
    align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const Heading = level;
  return (
    <header className={`flex flex-col gap-4 md:gap-5 ${alignment} ${className}`}>
      {eyebrow && (
        <p
          className={`text-sm font-semibold ${inverse ? 'text-white/70' : 'text-coral-strong'}`}
        >
          {eyebrow}
        </p>
      )}
      <Heading className="max-w-4xl text-balance text-headline">{title}</Heading>
      {sub && (
        <p
          className={`max-w-2xl text-pretty text-lead ${inverse ? 'text-white/70' : 'text-muted'}`}
        >
          {sub}
        </p>
      )}
    </header>
  );
}
