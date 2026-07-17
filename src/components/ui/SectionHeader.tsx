import * as React from 'react';
import { Tag } from './Tag';

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: 'left' | 'center';
  level?: 'h1' | 'h2';
  inverse?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = 'left',
  level = 'h2',
  inverse = false,
  className = '',
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const Heading = level;
  return (
    <header className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && <Tag inverse={inverse}>{eyebrow}</Tag>}
      <Heading className="max-w-4xl font-display text-4xl font-semibold leading-[0.94] tracking-[-0.04em] text-balance md:text-6xl">
        {title}
      </Heading>
      {sub && (
        <p className={`max-w-2xl font-body text-lg leading-relaxed md:text-xl ${inverse ? 'text-bg/70' : 'text-mute'}`}>
          {sub}
        </p>
      )}
    </header>
  );
}
