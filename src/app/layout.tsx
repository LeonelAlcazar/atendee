import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, Inter_Tight, IBM_Plex_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/jsonld';
import { site } from '@/content/site';
import './globals.css';

const display = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const body = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'es_AR',
    type: 'website',
    images: ['/og.png'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#F8F5EF',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-AR"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <svg
          aria-hidden="true"
          width="0"
          height="0"
          style={{ position: 'absolute' }}
        >
          <filter id="jitter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="2"
              seed="3"
            />
            <feDisplacementMap in="SourceGraphic" scale="2" />
          </filter>
        </svg>
        <Header />
        <main>{children}</main>
        <Footer />
        <JsonLd />
      </body>
    </html>
  );
}
