'use client';

import type * as React from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { buildWaLink, waRef } from '@/lib/wa';

type Common = {
  context: string;
  // Where on the page the link sits, in Spanish: "pie", "cierre", "preguntas".
  placement: string;
  children: React.ReactNode;
  className?: string;
  'data-cta'?: string;
  'aria-label'?: string;
};

// The team's WhatsApp, with a reference to the page and placement in the
// prefilled text. Shared layout pieces only know the page on the client side
// of the tree; the server render already carries the path.
export function WaLink({ context, placement, children, ...rest }: Common) {
  const pathname = usePathname();
  return (
    <a
      href={buildWaLink(context, waRef(pathname, placement))}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
}

export function WaButton({
  context,
  placement,
  children,
  variant,
  size,
  ...rest
}: Common & {
  variant?: React.ComponentProps<typeof Button>['variant'];
  size?: React.ComponentProps<typeof Button>['size'];
}) {
  const pathname = usePathname();
  return (
    <Button
      href={buildWaLink(context, waRef(pathname, placement))}
      variant={variant}
      size={size}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </Button>
  );
}
