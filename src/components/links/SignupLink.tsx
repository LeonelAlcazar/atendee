'use client';

import type * as React from 'react';
import { usePathname } from 'next/navigation';
import { buildSignupLink, pageRef, signupRef } from '@/lib/signup';

// "Crear mi espacio" in shared pieces such as the footer: the ref names the
// page it sits on ("precios-footer"), already in the server render.
export function SignupLink({
  placement,
  children,
  ...rest
}: {
  placement: string;
  children: React.ReactNode;
  className?: string;
  'data-cta'?: string;
}) {
  const pathname = usePathname();
  return (
    <a href={buildSignupLink(signupRef(pageRef(pathname), placement))} {...rest}>
      {children}
    </a>
  );
}
