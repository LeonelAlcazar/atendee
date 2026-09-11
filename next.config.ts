import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: { '/*': ['./content/blog/**/*.md'] },
  outputFileTracingRoot: process.cwd(),
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
