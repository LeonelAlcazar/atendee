import type { Metadata, Viewport } from 'next';
import { Instrument_Sans } from 'next/font/google';
import Script from 'next/script';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { site } from '@/content/site';
import { JsonLd } from '@/components/jsonld';
import { pages } from '@/content/pages';
import { ConversionEvents } from '@/components/ConversionEvents';
import './globals.css';

// The only typeface. A variable font, so every weight from 400 to 700 is one file.
const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${pages.home.title} — ${site.name}`,
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
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ['/og.png'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#F0F0F0',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR" className={instrument.variable}>
      <body>
        <Script id="google-tag-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-M8GR9F2K"
          strategy="afterInteractive"
        />
        <JsonLd />
        <ConversionEvents />
        <a
          href="#contenido"
          className="fixed left-4 top-3 z-[100] inline-flex min-h-11 -translate-y-24 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white shadow-float transition-transform duration-200 focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
