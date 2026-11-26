'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

// On the home the hero form is the one primary action, so the header's demo
// link steps back to the quiet style. Everywhere else it stays coral.
export function HeaderDemo() {
  const pathname = usePathname();
  return (
    <Button
      href="/demo"
      data-cta="header-demo"
      variant={pathname === '/' ? 'outline' : 'primary'}
      size="md"
    >
      Pedí una demo
    </Button>
  );
}
