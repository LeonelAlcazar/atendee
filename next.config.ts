import type { NextConfig } from 'next';

// Guides merged into a broader one. scripts/check-site.mjs reads this list.
export const guideRedirects = [
  {
    source: '/blog/como-automatizar-whatsapp-institutos-de-idiomas',
    destination: '/blog/como-automatizar-whatsapp-academias-y-cursos',
    permanent: true,
  },
  {
    source: '/blog/como-automatizar-whatsapp-proveedores-agro',
    destination: '/blog/como-automatizar-whatsapp-distribuidoras',
    permanent: true,
  },
  {
    source: '/blog/como-automatizar-whatsapp-taller-mecanico',
    destination: '/blog/como-automatizar-whatsapp-servicios-tecnicos',
    permanent: true,
  },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: { '/*': ['./content/blog/**/*.md'] },
  outputFileTracingRoot: process.cwd(),
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  async redirects() {
    return guideRedirects;
  },
};

export default nextConfig;
