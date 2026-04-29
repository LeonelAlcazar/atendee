import * as React from 'react';
import { Tag } from './Tag';

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <header className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && <Tag>{eyebrow}</Tag>}
      <h2 className="font-display font-semibold tracking-[-0.02em] text-4xl md:text-6xl leading-[0.95]">
        {title}
      </h2>
      {sub && (
        <p className="font-body text-lg md:text-xl text-mute max-w-2xl">
          {sub}
        </p>
      )}
    </header>
  );
}
