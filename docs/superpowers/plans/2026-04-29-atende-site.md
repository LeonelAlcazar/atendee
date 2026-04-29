# atende.com.ar Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully static Next.js marketing site for atende — a WhatsApp automation service — with three pages, a hand-built neo-brutalist design system, and every CTA funneling to WhatsApp `+543512901337`.

**Architecture:** Next.js 15 App Router with `output: 'export'` for static SSG. Hand-built UI primitives (no shadcn/Radix — that's the AI-slop guard). All Spanish copy lives in `src/content/*` modules; `src/content/site.ts` is the single source of truth for phone/domain. WhatsApp link helper has unit tests; pages are verified by building + manual visual check.

**Tech Stack:** Next.js 15, React 19, TypeScript (strict), Tailwind CSS v4, Framer Motion, Lucide React, Vitest (for the wa.ts util), self-hosted Google Fonts via `next/font`.

**Spec:** `docs/superpowers/specs/2026-04-29-atende-site-design.md`

---

## File Structure

```
automation-page/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                            # /
│   │   ├── servicios/page.tsx
│   │   ├── casos-de-uso/page.tsx
│   │   ├── not-found.tsx
│   │   ├── globals.css
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Tag.tsx
│   │   │   ├── ChatMockup.tsx
│   │   │   └── SectionHeader.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── ServiciosTeaser.tsx
│   │   │   ├── ComoFunciona.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── CasosTeaser.tsx
│   │   │   ├── Faq.tsx
│   │   │   └── CtaFinal.tsx
│   │   ├── servicios/
│   │   │   └── ServiceBlock.tsx
│   │   ├── casos/
│   │   │   └── CaseBlock.tsx
│   │   └── jsonld.tsx
│   ├── content/
│   │   ├── site.ts
│   │   ├── servicios.ts
│   │   ├── casos.ts
│   │   ├── faq.ts
│   │   └── stats.ts
│   └── lib/
│       ├── wa.ts
│       └── wa.test.ts
├── public/
│   ├── og.png                  (placeholder; designed by user later)
│   ├── favicon.ico
│   ├── icon.svg
│   └── illustrations/
│       ├── hand-jitter.svg     (filter def, included once via globals.css)
│       └── chat-arrow.svg
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── vitest.config.ts
├── .gitignore
├── package.json
└── README.md
```

---

## Task 1: Project Initialization

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/package.json`
- Create: `/home/leonel/Documents/code/automation-page/.gitignore`

- [ ] **Step 1: Initialize Next.js project skeleton (manual, not via create-next-app)**

We avoid `create-next-app` because its defaults pull in too much boilerplate. Instead, write the minimal `package.json` directly.

Create `package.json`:

```json
{
  "name": "atende",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "next": "15.1.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "@types/node": "^22.10.5",
    "@types/react": "^19.0.2",
    "@types/react-dom": "^19.0.2",
    "@tailwindcss/postcss": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "postcss": "^8.4.49",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: Create .gitignore**

```
node_modules/
.next/
out/
.env*.local
.DS_Store
*.log
coverage/
.vercel
```

- [ ] **Step 3: Initialize git and install dependencies**

Run:
```bash
cd /home/leonel/Documents/code/automation-page
git init
npm install
```

Expected: `node_modules/` populated, `package-lock.json` created.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .gitignore
git commit -m "chore: initialize project with Next.js 15 + Tailwind v4"
```

---

## Task 2: TypeScript & Build Configuration

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/tsconfig.json`
- Create: `/home/leonel/Documents/code/automation-page/next.config.ts`
- Create: `/home/leonel/Documents/code/automation-page/postcss.config.mjs`
- Create: `/home/leonel/Documents/code/automation-page/next-env.d.ts`

- [ ] **Step 1: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 2: Create next.config.ts**

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 3: Create postcss.config.mjs**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

- [ ] **Step 4: Create next-env.d.ts**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 5: Commit**

```bash
git add tsconfig.json next.config.ts postcss.config.mjs next-env.d.ts
git commit -m "chore: configure TypeScript, Next.js static export, and PostCSS"
```

---

## Task 3: Vitest Configuration

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/vitest.config.ts`

- [ ] **Step 1: Create vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 2: Commit**

```bash
git add vitest.config.ts
git commit -m "chore: add Vitest config"
```

---

## Task 4: Site Content — Single Source of Truth

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/content/site.ts`

- [ ] **Step 1: Create site.ts**

```ts
export const site = {
  name: 'atende',
  domain: 'atende.com.ar',
  url: 'https://atende.com.ar',
  tagline: 'Tu negocio atendido mientras dormís.',
  description:
    'Bots de atención, turnos y ventas por WhatsApp para PyMEs argentinas. Sin apps, sin contratos, sin que tus clientes aprendan nada nuevo.',
  whatsapp: {
    number: '543512901337',
    display: '+54 351 290 1337',
  },
  email: 'hola@atende.com.ar',
  location: 'Córdoba, Argentina',
  legalName: 'atende',
  trustStrip: [
    'Sin instalación',
    'Sin contratos',
    'Setup en 48h',
    'Soporte humano',
  ] as const,
} as const;

export type Site = typeof site;
```

- [ ] **Step 2: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(content): add site config as single source of truth"
```

---

## Task 5: WhatsApp Link Helper (with TDD)

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/lib/wa.ts`
- Create: `/home/leonel/Documents/code/automation-page/src/lib/wa.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/wa.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { buildWaLink } from './wa';

describe('buildWaLink', () => {
  it('returns the bare wa.me link with no context', () => {
    expect(buildWaLink()).toBe('https://wa.me/543512901337');
  });

  it('appends url-encoded context as ?text= prefilled message', () => {
    const link = buildWaLink('Hola, vi atende.com.ar');
    expect(link).toBe(
      'https://wa.me/543512901337?text=Hola%2C%20vi%20atende.com.ar',
    );
  });

  it('handles unicode and special characters', () => {
    const link = buildWaLink('¿Cuánto sale?');
    expect(link).toContain('https://wa.me/543512901337?text=');
    expect(decodeURIComponent(link.split('?text=')[1])).toBe('¿Cuánto sale?');
  });

  it('strips leading/trailing whitespace before encoding', () => {
    const link = buildWaLink('   hola   ');
    expect(link).toBe('https://wa.me/543512901337?text=hola');
  });

  it('returns bare link if context is only whitespace', () => {
    expect(buildWaLink('   ')).toBe('https://wa.me/543512901337');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: 5 failing tests (`buildWaLink` not defined).

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/wa.ts`:

```ts
import { site } from '@/content/site';

export function buildWaLink(context?: string): string {
  const base = `https://wa.me/${site.whatsapp.number}`;
  if (!context) return base;
  const trimmed = context.trim();
  if (!trimmed) return base;
  return `${base}?text=${encodeURIComponent(trimmed)}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: 5 passing tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/wa.ts src/lib/wa.test.ts
git commit -m "feat(lib): add WhatsApp link builder with prefilled context"
```

---

## Task 6: Servicios Content

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/content/servicios.ts`

- [ ] **Step 1: Create servicios.ts**

```ts
export type ChatMessage = {
  from: 'them' | 'us';
  text: string;
};

export type Servicio = {
  id: 'atencion' | 'turnos' | 'ventas';
  number: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  conversation: ChatMessage[];
  ctaContext: string;
};

export const servicios: Servicio[] = [
  {
    id: 'atencion',
    number: '01',
    title: 'Atención automática',
    short: 'Respondé las preguntas frecuentes 24/7, sin tener a alguien siempre conectado.',
    description:
      'Un bot que responde lo que tus clientes preguntan todos los días: horarios, ubicación, precios, estado de un pedido. Cuando hace falta, deriva la conversación a una persona sin que el cliente note el cambio.',
    bullets: [
      'Respuestas a preguntas frecuentes en segundos',
      'Derivación a humano cuando la consulta lo requiere',
      'Respuestas distintas según horario (abierto / cerrado)',
      'Historial completo de cada conversación',
    ],
    conversation: [
      { from: 'them', text: '¿A qué hora abren hoy?' },
      { from: 'us', text: 'Hola! Hoy atendemos de 9 a 18hs. ¿Querés sacar turno?' },
      { from: 'them', text: 'Sí, para mañana a la mañana' },
      { from: 'us', text: 'Te paso a Carolina del equipo así te confirma 👇' },
    ],
    ctaContext: 'Hola, quiero saber más sobre Atención automática',
  },
  {
    id: 'turnos',
    number: '02',
    title: 'Turnos por WhatsApp',
    short: 'Tus clientes piden turno por chat. Vos lo ves en tu calendario.',
    description:
      'El cliente escribe, elige día y hora, y queda agendado. Le llega un recordatorio automático antes del turno. Si tiene que cancelar, también lo hace por WhatsApp.',
    bullets: [
      'Reserva paso a paso por WhatsApp',
      'Sincroniza con Google Calendar o tu sistema actual',
      'Recordatorios automáticos 24h y 2h antes',
      'Cancelaciones y reprogramaciones sin llamadas',
    ],
    conversation: [
      { from: 'them', text: 'Quiero un turno para corte' },
      { from: 'us', text: 'Genial. ¿Para qué día?' },
      { from: 'them', text: 'Jueves a la tarde' },
      { from: 'us', text: 'Tengo 16:30 o 18:00. ¿Cuál te queda mejor?' },
      { from: 'them', text: '18hs' },
      { from: 'us', text: 'Listo ✅ Te espero el jueves a las 18hs.' },
    ],
    ctaContext: 'Hola, quiero saber más sobre Turnos por WhatsApp',
  },
  {
    id: 'ventas',
    number: '03',
    title: 'Ventas y seguimiento',
    short: 'Convertí consultas en ventas y recuperá las que se enfrían.',
    description:
      'Califica cada consulta, manda catálogos, fichas técnicas, presupuestos. Si el cliente deja de responder, retoma la conversación con un mensaje a medida unos días después.',
    bullets: [
      'Catálogo y fichas enviadas al instante',
      'Calificación automática de leads',
      'Re-engagement de consultas que se enfriaron',
      'Reportes simples de qué funciona y qué no',
    ],
    conversation: [
      { from: 'them', text: 'Hola, ví el departamento del centro' },
      { from: 'us', text: 'Hola! Te paso ficha completa y fotos 📎' },
      { from: 'us', text: '¿Te gustaría coordinar una visita esta semana?' },
      { from: 'them', text: 'Lo charlo y te aviso' },
      { from: 'us', text: 'Dale, te escribo el viernes así no se pierde 👌' },
    ],
    ctaContext: 'Hola, quiero saber más sobre Ventas y seguimiento',
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/content/servicios.ts
git commit -m "feat(content): add servicios copy and example conversations"
```

---

## Task 7: Casos de Uso Content

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/content/casos.ts`

- [ ] **Step 1: Create casos.ts**

```ts
import type { ChatMessage } from './servicios';

export type Caso = {
  id: string;
  industry: string;
  problem: string;
  solution: string;
  conversation: ChatMessage[];
};

export const casos: Caso[] = [
  {
    id: 'clinicas',
    industry: 'Clínicas y consultorios',
    problem: 'Las recepcionistas pasan el día respondiendo "¿a qué hora atienden?" y "¿tienen turno para esta semana?".',
    solution: 'atende responde horarios, da turnos y manda recordatorios. La recepción atiende solo lo que necesita atención humana.',
    conversation: [
      { from: 'them', text: '¿Atienden obra social Galeno?' },
      { from: 'us', text: 'Sí, atendemos Galeno. ¿Querés que te dé turno?' },
      { from: 'them', text: 'Sí, con la Dra. López' },
      { from: 'us', text: 'Tengo martes 10:30 o jueves 15:00.' },
    ],
  },
  {
    id: 'peluquerias',
    industry: 'Peluquerías y estéticas',
    problem: 'Pierden turnos porque nadie atiende durante un servicio. La agenda en papel genera dobles reservas.',
    solution: 'El bot toma turnos durante el horario de trabajo y manda recordatorio el día anterior. Sin doble reserva, sin huecos.',
    conversation: [
      { from: 'them', text: 'Hola, para corte y color' },
      { from: 'us', text: 'Buenísimo! ¿Qué día te queda?' },
      { from: 'them', text: 'Sábado' },
      { from: 'us', text: 'Tenemos 11hs o 14:30. Color demora ~2hs.' },
    ],
  },
  {
    id: 'inmobiliarias',
    industry: 'Inmobiliarias',
    problem: 'Cada consulta requiere mandar fotos, ficha técnica, dirección. Los corredores responden lo mismo 20 veces por día.',
    solution: 'atende manda automáticamente toda la info de la propiedad consultada y agenda visitas. El corredor entra solo cuando hay interés real.',
    conversation: [
      { from: 'them', text: 'Hola, ví el depto de Nueva Córdoba' },
      { from: 'us', text: 'Te paso ficha + fotos 📎' },
      { from: 'us', text: '¿Te interesa coordinar visita?' },
      { from: 'them', text: 'Sí, sábado a la tarde' },
    ],
  },
  {
    id: 'comercios',
    industry: 'Comercios de barrio',
    problem: 'No tienen tiempo para responder mientras atienden el local. Los pedidos por WhatsApp se mezclan con todo lo demás.',
    solution: 'El bot toma pedidos, calcula totales y avisa cuando están listos. El comercio ve solo el pedido cerrado, no el ida y vuelta.',
    conversation: [
      { from: 'them', text: 'Hola, quiero hacer un pedido' },
      { from: 'us', text: 'Dale! ¿Qué necesitás?' },
      { from: 'them', text: '2 docenas de empanadas, mitad carne mitad pollo' },
      { from: 'us', text: '✅ $X. Listo en 25 min. ¿Pasás a buscar o delivery?' },
    ],
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/content/casos.ts
git commit -m "feat(content): add casos de uso for 4 verticals"
```

---

## Task 8: FAQ Content

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/content/faq.ts`

- [ ] **Step 1: Create faq.ts**

```ts
export type FaqItem = {
  q: string;
  a: string;
};

export const faq: FaqItem[] = [
  {
    q: '¿Necesito WhatsApp Business API?',
    a: 'Sí, es lo que permite automatizar de forma oficial. Nosotros nos ocupamos de toda la configuración con Meta, vos solo nos pasás el número.',
  },
  {
    q: '¿Pierdo el control de mi número?',
    a: 'No. El número sigue siendo tuyo. Vos decidís cuándo el bot responde y cuándo derivás a una persona. Podés desactivar la automatización cuando quieras.',
  },
  {
    q: '¿Cuánto tarda el setup?',
    a: 'Entre 48 y 72hs hábiles desde que tenemos toda la información. Incluye: aprobación con Meta, diseño del flujo y pruebas con vos.',
  },
  {
    q: '¿Funciona con mi sistema de turnos actual?',
    a: 'Sí. Integramos con Google Calendar, sistemas de gestión médica y la mayoría de softwares de turnos del mercado. Si usás algo distinto, lo evaluamos en la primera charla.',
  },
  {
    q: '¿Qué pasa si un cliente quiere hablar con una persona?',
    a: 'El bot detecta cuándo derivar y pasa la conversación a tu equipo. También podés intervenir manualmente en cualquier chat en cualquier momento.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Depende del volumen y la complejidad del flujo. Charlemos por WhatsApp y te pasamos un presupuesto a medida en el día.',
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/content/faq.ts
git commit -m "feat(content): add FAQ entries"
```

---

## Task 9: Stats Content (Placeholder Numbers)

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/content/stats.ts`

- [ ] **Step 1: Create stats.ts**

```ts
export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

// PLACEHOLDER NUMBERS — replace with real, defensible figures before launch.
// See spec section 12, item 1.
export const stats: Stat[] = [
  { value: 80, suffix: '%', prefix: '+', label: 'Consultas resueltas sin humano' },
  { value: 60, suffix: '%', prefix: '-', label: 'Tiempo promedio de respuesta' },
  { value: 24, suffix: '/7', label: 'Atención sin pausa' },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/content/stats.ts
git commit -m "feat(content): add stats with placeholder numbers"
```

---

## Task 10: Global Styles & Tailwind v4 Theme

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/app/globals.css`

- [ ] **Step 1: Create globals.css**

Tailwind v4 config lives in CSS via `@theme`. The globals file defines palette, font tokens, brutalist resets, and the global hand-jitter SVG filter.

```css
@import 'tailwindcss';

@theme {
  --color-bg: #f8f5ef;
  --color-ink: #141414;
  --color-forest: #0f3d2e;
  --color-coral: #ff5d3b;
  --color-mute: #6b6760;

  --font-display: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Inter Tight', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;

  --shadow-brut-sm: 3px 3px 0 0 var(--color-ink);
  --shadow-brut: 6px 6px 0 0 var(--color-ink);
  --shadow-brut-lg: 8px 8px 0 0 var(--color-ink);
  --shadow-brut-coral: 6px 6px 0 0 var(--color-coral);
}

* {
  border-color: var(--color-ink);
}

html {
  background: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

body {
  background: var(--color-bg);
  min-height: 100vh;
}

::selection {
  background: var(--color-coral);
  color: var(--color-bg);
}

/* Native details/summary brutalist reset */
summary {
  list-style: none;
  cursor: pointer;
}
summary::-webkit-details-marker {
  display: none;
}

/* Hand-drawn jitter filter, applied to .jitter SVGs */
.jitter {
  filter: url(#jitter);
}

/* Prevent horizontal overflow from large hero type */
html, body {
  overflow-x: hidden;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(style): add Tailwind v4 theme tokens and brutalist resets"
```

---

## Task 11: Root Layout (Fonts, Metadata, Shell)

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/app/layout.tsx`

- [ ] **Step 1: Create layout.tsx**

```tsx
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
        {/* Global SVG filter for hand-drawn jitter */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(app): add root layout with fonts, metadata, shell"
```

---

## Task 12: UI Primitive — Button

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/ui/Button.tsx`

- [ ] **Step 1: Create Button.tsx**

```tsx
import * as React from 'react';

type Variant = 'primary' | 'outline';
type Size = 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
};

type AnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
    href: string;
  };

const base =
  'inline-flex items-center justify-center gap-2 border-2 border-ink ' +
  'font-medium tracking-tight transition-transform duration-150 ' +
  'shadow-[var(--shadow-brut)] active:translate-x-[2px] active:translate-y-[2px] ' +
  'active:shadow-none focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

const variants: Record<Variant, string> = {
  primary:
    'bg-forest text-bg hover:translate-x-[-2px] hover:translate-y-[-2px] ' +
    'hover:shadow-[var(--shadow-brut-coral)]',
  outline:
    'bg-transparent text-ink hover:bg-forest hover:text-bg',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-3 text-base',
  lg: 'px-7 py-4 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  ...rest
}: AnchorProps) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "feat(ui): add Button primitive (anchor-only, brutalist)"
```

---

## Task 13: UI Primitive — Card

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/ui/Card.tsx`

- [ ] **Step 1: Create Card.tsx**

```tsx
import * as React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  padded?: boolean;
  hover?: boolean;
};

export function Card({
  padded = true,
  hover = false,
  className = '',
  children,
  ...rest
}: CardProps) {
  const padding = padded ? 'p-8 md:p-10' : '';
  const hoverFx = hover
    ? 'transition-transform duration-150 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[var(--shadow-brut-lg)]'
    : '';
  return (
    <div
      className={`bg-bg border-2 border-ink shadow-[var(--shadow-brut)] ${padding} ${hoverFx} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Card.tsx
git commit -m "feat(ui): add Card primitive"
```

---

## Task 14: UI Primitive — Tag

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/ui/Tag.tsx`

- [ ] **Step 1: Create Tag.tsx**

```tsx
import * as React from 'react';

type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  filled?: boolean;
};

export function Tag({
  filled = false,
  className = '',
  children,
  ...rest
}: TagProps) {
  const fill = filled ? 'bg-coral text-ink' : 'bg-transparent text-ink';
  return (
    <span
      className={`inline-block font-mono text-xs uppercase tracking-[0.08em] border-2 border-ink px-2 py-1 ${fill} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Tag.tsx
git commit -m "feat(ui): add Tag primitive"
```

---

## Task 15: UI Primitive — SectionHeader

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/ui/SectionHeader.tsx`

- [ ] **Step 1: Create SectionHeader.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/SectionHeader.tsx
git commit -m "feat(ui): add SectionHeader primitive"
```

---

## Task 16: UI Primitive — ChatMockup

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/ui/ChatMockup.tsx`

- [ ] **Step 1: Create ChatMockup.tsx**

```tsx
import * as React from 'react';
import type { ChatMessage } from '@/content/servicios';

type ChatMockupProps = {
  messages: ChatMessage[];
  className?: string;
};

export function ChatMockup({ messages, className = '' }: ChatMockupProps) {
  return (
    <div
      className={`bg-bg border-2 border-ink shadow-[var(--shadow-brut)] p-4 md:p-5 max-w-sm ${className}`}
      role="img"
      aria-label="Ejemplo de conversación de WhatsApp"
    >
      {/* Phone bezel header */}
      <div className="flex items-center gap-2 pb-3 border-b-2 border-ink mb-4">
        <div className="size-8 border-2 border-ink bg-forest" />
        <div className="flex flex-col">
          <span className="font-mono text-xs uppercase">atende</span>
          <span className="font-mono text-[10px] text-mute">en línea</span>
        </div>
      </div>
      {/* Messages */}
      <div className="flex flex-col gap-2.5">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === 'us' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] border-2 border-ink shadow-[var(--shadow-brut-sm)] px-3 py-2 text-sm ${
                m.from === 'us' ? 'bg-forest text-bg' : 'bg-bg text-ink'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ChatMockup.tsx
git commit -m "feat(ui): add ChatMockup primitive"
```

---

## Task 17: Layout — Header

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/layout/Header.tsx`

- [ ] **Step 1: Create Header.tsx**

```tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import { buildWaLink } from '@/lib/wa';

const nav = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/casos-de-uso', label: 'Casos de uso' },
  { href: '/#faq', label: 'FAQ' },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-bg border-b-2 border-ink transition-[padding] ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display font-semibold text-2xl md:text-3xl tracking-[-0.02em]"
          aria-label="atende — inicio"
        >
          atende<span className="text-coral">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-body text-base">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hover:text-coral transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            href={buildWaLink('Hola, vi atende.com.ar y quiero saber más')}
            variant="primary"
            size="md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </Button>
        </div>

        <MobileMenu nav={nav} />
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat(layout): add sticky Header with desktop nav"
```

---

## Task 18: Layout — MobileMenu

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/layout/MobileMenu.tsx`

- [ ] **Step 1: Create MobileMenu.tsx**

```tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { buildWaLink } from '@/lib/wa';

type Nav = { href: string; label: string }[];

export function MobileMenu({ nav }: { nav: Nav }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="md:hidden border-2 border-ink p-2 shadow-[var(--shadow-brut-sm)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        aria-label="Abrir menú"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu size={20} />
      </button>

      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-bg flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b-2 border-ink">
            <span className="font-display font-semibold text-2xl">
              atende<span className="text-coral">.</span>
            </span>
            <button
              type="button"
              className="border-2 border-ink p-2 shadow-[var(--shadow-brut-sm)]"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2 px-5 py-8 flex-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="font-display font-semibold text-4xl tracking-[-0.02em] py-3 border-b-2 border-ink"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="p-5 border-t-2 border-ink">
            <Button
              href={buildWaLink('Hola, vi atende.com.ar y quiero saber más')}
              variant="primary"
              size="lg"
              className="w-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/MobileMenu.tsx
git commit -m "feat(layout): add full-screen mobile menu"
```

---

## Task 19: Layout — Footer

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/layout/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

```tsx
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { site } from '@/content/site';
import { buildWaLink } from '@/lib/wa';

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-bg mt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <span className="font-display font-semibold text-3xl tracking-[-0.02em]">
            atende<span className="text-coral">.</span>
          </span>
          <p className="font-body text-base text-mute max-w-sm">
            Bots de atención, turnos y ventas por WhatsApp para PyMEs argentinas.
          </p>
          <Button
            href={buildWaLink('Hola, vi el footer de atende.com.ar')}
            variant="primary"
            size="md"
            className="self-start"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
            Navegación
          </span>
          <Link href="/" className="hover:text-coral">Inicio</Link>
          <Link href="/servicios" className="hover:text-coral">Servicios</Link>
          <Link href="/casos-de-uso" className="hover:text-coral">Casos de uso</Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
            Contacto
          </span>
          <a
            href={buildWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-coral"
          >
            WhatsApp · {site.whatsapp.display}
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-coral">
            {site.email}
          </a>
          <span className="text-mute text-sm">{site.location}</span>
        </div>
      </div>

      <div className="border-t-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 font-mono text-xs uppercase tracking-[0.08em] text-mute">
          {site.legalName} · {site.location} · 2026
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat(layout): add Footer"
```

---

## Task 20: Landing — Hero

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/landing/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

```tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { site } from '@/content/site';
import { buildWaLink } from '@/lib/wa';

const heroChat = [
  { from: 'them' as const, text: '¿Atienden hoy?' },
  { from: 'us' as const, text: 'Hola! Sí, hasta las 20hs. ¿En qué te ayudo?' },
  { from: 'them' as const, text: 'Quiero turno para mañana' },
  { from: 'us' as const, text: 'Tengo 11hs o 16:30. ¿Cuál preferís?' },
];

export function Hero() {
  return (
    <section className="relative border-b-2 border-ink">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24 grid gap-12 md:grid-cols-[1.4fr_1fr] items-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col gap-6"
        >
          <Tag>WHATSAPP BUSINESS · ARGENTINA</Tag>

          <h1 className="font-display font-semibold tracking-[-0.025em] leading-[0.92] text-5xl md:text-7xl lg:text-[6.5rem]">
            Tu negocio <span className="text-coral">atendido</span> mientras dormís.
          </h1>

          <p className="font-body text-lg md:text-xl text-mute max-w-xl">
            {site.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              href={buildWaLink('Hola, vi atende.com.ar y quiero saber más')}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </Button>
            <Button href="#como-funciona" variant="outline" size="lg">
              Ver cómo funciona
            </Button>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-6 font-mono text-xs uppercase tracking-[0.08em] text-mute">
            {site.trustStrip.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="size-1.5 bg-coral" aria-hidden /> {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="md:justify-self-end"
        >
          <ChatMockup messages={heroChat} />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/Hero.tsx
git commit -m "feat(landing): add Hero section"
```

---

## Task 21: Landing — ServiciosTeaser

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/landing/ServiciosTeaser.tsx`

- [ ] **Step 1: Create ServiciosTeaser.tsx**

```tsx
import Link from 'next/link';
import { servicios } from '@/content/servicios';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';

export function ServiciosTeaser() {
  return (
    <section className="border-b-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Qué hacemos"
          title={
            <>
              Tres formas de <span className="text-coral">automatizar</span> tu WhatsApp.
            </>
          }
          sub="Cada una resuelve un problema distinto. Podés elegir uno, dos o los tres."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {servicios.map((s, i) => (
            <Link key={s.id} href={`/servicios#${s.id}`} className="block">
              <Card hover className={i === 0 ? 'md:scale-[1.04]' : i === 2 ? 'md:scale-[0.96]' : ''}>
                <div className="flex flex-col gap-4">
                  <span className="font-display font-semibold text-5xl text-coral">
                    {s.number}
                  </span>
                  <h3 className="font-display font-semibold text-2xl tracking-[-0.02em]">
                    {s.title}
                  </h3>
                  <p className="font-body text-base text-mute">{s.short}</p>
                  <span className="font-mono text-xs uppercase tracking-[0.08em] mt-2 underline underline-offset-4 decoration-2">
                    Ver detalles →
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/ServiciosTeaser.tsx
git commit -m "feat(landing): add ServiciosTeaser"
```

---

## Task 22: Landing — ComoFunciona

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/landing/ComoFunciona.tsx`

- [ ] **Step 1: Create ComoFunciona.tsx**

```tsx
import { SectionHeader } from '@/components/ui/SectionHeader';

const steps = [
  {
    n: '01',
    title: 'Charlamos',
    text: 'Te conocemos, vemos tu volumen actual y qué necesitás resolver.',
  },
  {
    n: '02',
    title: 'Diseñamos el flujo',
    text: 'Armamos los mensajes, las preguntas, las derivaciones. Lo aprobás vos.',
  },
  {
    n: '03',
    title: 'Conectamos tu WhatsApp',
    text: 'Configuramos WhatsApp Business API con Meta. Tu número, tu marca.',
  },
  {
    n: '04',
    title: 'Mejoramos con datos',
    text: 'Cada mes vemos qué se resuelve solo, qué no, y ajustamos.',
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="border-b-2 border-ink py-20 md:py-28 bg-forest text-bg">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Cómo funciona"
          title={
            <>
              De charla informal a <span className="text-coral">bot funcionando</span> en 48hs.
            </>
          }
          className="[&_.text-mute]:text-bg/70 [&_h2]:text-bg"
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="bg-bg text-ink border-2 border-ink shadow-[var(--shadow-brut)] p-6 flex flex-col gap-3"
            >
              <span className="font-display font-semibold text-4xl text-coral">{s.n}</span>
              <h3 className="font-display font-semibold text-xl tracking-[-0.02em]">{s.title}</h3>
              <p className="font-body text-sm text-mute">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/ComoFunciona.tsx
git commit -m "feat(landing): add ComoFunciona"
```

---

## Task 23: Landing — Stats

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/landing/Stats.tsx`

- [ ] **Step 1: Create Stats.tsx**

```tsx
'use client';

import * as React from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { stats } from '@/content/stats';
import { SectionHeader } from '@/components/ui/SectionHeader';

function Counter({ to }: { to: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{val}</span>;
}

export function Stats() {
  return (
    <section className="border-b-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Por qué atende"
          title={
            <>
              Menos consultas que respondés vos.{' '}
              <span className="text-coral">Más ventas que cierran solas.</span>
            </>
          }
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {stats.map((s) => (
            <li
              key={s.label}
              className="bg-bg border-2 border-ink shadow-[var(--shadow-brut)] p-8 flex flex-col gap-3"
            >
              <div className="font-display font-semibold text-7xl md:text-8xl text-coral leading-none tracking-[-0.03em]">
                {s.prefix}
                <Counter to={s.value} />
                {s.suffix}
              </div>
              <p className="font-body text-base text-ink">{s.label}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.08em] text-mute">
          * Cifras estimadas basadas en clientes actuales. Tus resultados varían según volumen y rubro.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/Stats.tsx
git commit -m "feat(landing): add Stats with count-up animation"
```

---

## Task 24: Landing — CasosTeaser

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/landing/CasosTeaser.tsx`

- [ ] **Step 1: Create CasosTeaser.tsx**

```tsx
import Link from 'next/link';
import { casos } from '@/content/casos';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function CasosTeaser() {
  return (
    <section className="border-b-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Casos de uso"
          title={
            <>
              Funciona en <span className="text-coral">cualquier rubro</span> donde tus clientes ya te escriben.
            </>
          }
        />

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {casos.map((c) => (
            <li
              key={c.id}
              className="border-2 border-ink p-6 flex flex-col gap-2 hover:bg-coral/10 transition-colors"
            >
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
                Para
              </span>
              <h3 className="font-display font-semibold text-2xl tracking-[-0.02em]">
                {c.industry}
              </h3>
              <p className="font-body text-base text-mute">{c.problem}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href="/casos-de-uso"
            className="inline-block font-mono text-sm uppercase tracking-[0.08em] underline underline-offset-4 decoration-2 hover:text-coral"
          >
            Ver todos los casos →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/CasosTeaser.tsx
git commit -m "feat(landing): add CasosTeaser"
```

---

## Task 25: Landing — Faq

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/landing/Faq.tsx`

- [ ] **Step 1: Create Faq.tsx**

```tsx
import { faq } from '@/content/faq';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Plus } from 'lucide-react';

export function Faq() {
  return (
    <section id="faq" className="border-b-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="Lo que más nos preguntan."
        />

        <ul className="mt-12 flex flex-col">
          {faq.map((f, i) => (
            <li key={i} className={i === 0 ? 'border-y-2 border-ink' : 'border-b-2 border-ink'}>
              <details className="group">
                <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer">
                  <span className="font-display font-semibold text-xl md:text-2xl tracking-[-0.02em]">
                    {f.q}
                  </span>
                  <Plus
                    size={24}
                    className="shrink-0 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <div className="pb-6 font-body text-base md:text-lg text-mute">
                  {f.a}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/Faq.tsx
git commit -m "feat(landing): add FAQ accordion using native details"
```

---

## Task 26: Landing — CtaFinal

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/landing/CtaFinal.tsx`

- [ ] **Step 1: Create CtaFinal.tsx**

```tsx
import { Button } from '@/components/ui/Button';
import { buildWaLink } from '@/lib/wa';

type Props = {
  context: string;
  reassurance?: string;
};

export function CtaFinal({
  context,
  reassurance = 'Te respondemos en minutos, en horario comercial.',
}: Props) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8 text-center flex flex-col items-center gap-8">
        <h2 className="font-display font-semibold tracking-[-0.025em] text-6xl md:text-8xl leading-[0.9]">
          Empezá <span className="text-coral">hoy</span>.
        </h2>
        <p className="font-body text-lg md:text-xl text-mute max-w-xl">
          Charlamos por WhatsApp, vemos qué necesitás y te pasamos un presupuesto a medida en el día.
        </p>
        <Button
          href={buildWaLink(context)}
          variant="primary"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hablar por WhatsApp
        </Button>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
          {reassurance}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/CtaFinal.tsx
git commit -m "feat(landing): add CtaFinal"
```

---

## Task 27: JSON-LD Component

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/jsonld.tsx`

- [ ] **Step 1: Create jsonld.tsx**

```tsx
import { site } from '@/content/site';

const data = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${site.url}#business`,
      name: site.name,
      url: site.url,
      description: site.description,
      telephone: `+${site.whatsapp.number}`,
      email: site.email,
      areaServed: 'AR',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Córdoba',
        addressCountry: 'AR',
      },
    },
    {
      '@type': 'Service',
      name: 'Automatización de WhatsApp para PyMEs',
      provider: { '@id': `${site.url}#business` },
      areaServed: 'AR',
      description: site.description,
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/jsonld.tsx
git commit -m "feat(seo): add JSON-LD LocalBusiness + Service schema"
```

---

## Task 28: Landing Page

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/app/page.tsx`

- [ ] **Step 1: Create page.tsx**

```tsx
import { Hero } from '@/components/landing/Hero';
import { ServiciosTeaser } from '@/components/landing/ServiciosTeaser';
import { ComoFunciona } from '@/components/landing/ComoFunciona';
import { Stats } from '@/components/landing/Stats';
import { CasosTeaser } from '@/components/landing/CasosTeaser';
import { Faq } from '@/components/landing/Faq';
import { CtaFinal } from '@/components/landing/CtaFinal';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiciosTeaser />
      <ComoFunciona />
      <Stats />
      <CasosTeaser />
      <Faq />
      <CtaFinal context="Hola, vi atende.com.ar y quiero saber más" />
    </>
  );
}
```

- [ ] **Step 2: Verify build succeeds**

Run: `npm run build`
Expected: build completes, `out/index.html` exists.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(app): assemble landing page"
```

---

## Task 29: Servicios — ServiceBlock Component

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/servicios/ServiceBlock.tsx`

- [ ] **Step 1: Create ServiceBlock.tsx**

```tsx
import type { Servicio } from '@/content/servicios';
import { Button } from '@/components/ui/Button';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { Tag } from '@/components/ui/Tag';
import { buildWaLink } from '@/lib/wa';

export function ServiceBlock({
  servicio,
  reverse = false,
}: {
  servicio: Servicio;
  reverse?: boolean;
}) {
  return (
    <section
      id={servicio.id}
      className="border-b-2 border-ink py-20 md:py-28 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          className={`grid gap-12 md:grid-cols-2 items-start ${
            reverse ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="font-display font-semibold text-7xl text-coral leading-none">
                {servicio.number}
              </span>
              <Tag>Servicio</Tag>
            </div>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[0.95]">
              {servicio.title}
            </h2>
            <p className="font-body text-lg text-mute max-w-xl">{servicio.description}</p>

            <div className="mt-2">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
                Qué te llevás
              </span>
              <ul className="mt-3 flex flex-col gap-2">
                {servicio.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 font-body text-base">
                    <span className="mt-2 size-2 bg-ink shrink-0" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <Button
                href={buildWaLink(servicio.ctaContext)}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir este servicio
              </Button>
            </div>
          </div>

          <div className="md:justify-self-end">
            <ChatMockup messages={servicio.conversation} />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/servicios/ServiceBlock.tsx
git commit -m "feat(servicios): add ServiceBlock"
```

---

## Task 30: Servicios Page

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/app/servicios/page.tsx`

- [ ] **Step 1: Create servicios/page.tsx**

```tsx
import type { Metadata } from 'next';
import { servicios } from '@/content/servicios';
import { ServiceBlock } from '@/components/servicios/ServiceBlock';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CtaFinal } from '@/components/landing/CtaFinal';

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Atención automática, turnos por WhatsApp y ventas y seguimiento. Tres servicios diseñados para PyMEs argentinas que viven en WhatsApp.',
};

export default function ServiciosPage() {
  return (
    <>
      <section className="border-b-2 border-ink py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Servicios"
            title={
              <>
                Tres servicios. <span className="text-coral">Una sola conversación</span>.
              </>
            }
            sub="Cada uno funciona por separado o combinado. Todos viven dentro de tu WhatsApp."
          />
        </div>
      </section>

      {servicios.map((s, i) => (
        <ServiceBlock key={s.id} servicio={s} reverse={i % 2 === 1} />
      ))}

      <CtaFinal context="Hola, vi la página de servicios y quiero saber más" />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build completes, `out/servicios.html` (or `out/servicios/index.html` depending on trailingSlash) exists.

- [ ] **Step 3: Commit**

```bash
git add src/app/servicios/page.tsx
git commit -m "feat(app): add Servicios page"
```

---

## Task 31: Casos — CaseBlock Component

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/components/casos/CaseBlock.tsx`

- [ ] **Step 1: Create CaseBlock.tsx**

```tsx
import type { Caso } from '@/content/casos';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { Tag } from '@/components/ui/Tag';

export function CaseBlock({
  caso,
  reverse = false,
}: {
  caso: Caso;
  reverse?: boolean;
}) {
  return (
    <section className="border-b-2 border-ink py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          className={`grid gap-10 md:grid-cols-[1.3fr_1fr] items-start ${
            reverse ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div className="flex flex-col gap-5">
            <Tag filled>Caso</Tag>
            <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-[-0.025em] leading-[0.95]">
              {caso.industry}
            </h2>

            <div className="grid gap-4 md:grid-cols-2 mt-2">
              <div className="border-2 border-ink p-5 bg-bg">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
                  Problema
                </span>
                <p className="font-body text-base mt-2">{caso.problem}</p>
              </div>
              <div className="border-2 border-ink p-5 bg-forest text-bg shadow-[var(--shadow-brut-coral)]">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-bg/70">
                  Cómo lo resolvemos
                </span>
                <p className="font-body text-base mt-2">{caso.solution}</p>
              </div>
            </div>
          </div>

          <div className="md:justify-self-end">
            <ChatMockup messages={caso.conversation} />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/casos/CaseBlock.tsx
git commit -m "feat(casos): add CaseBlock"
```

---

## Task 32: Casos de Uso Page

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/app/casos-de-uso/page.tsx`

- [ ] **Step 1: Create casos-de-uso/page.tsx**

```tsx
import type { Metadata } from 'next';
import { casos } from '@/content/casos';
import { CaseBlock } from '@/components/casos/CaseBlock';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { buildWaLink } from '@/lib/wa';

export const metadata: Metadata = {
  title: 'Casos de uso',
  description:
    'Ejemplos reales de cómo atende automatiza WhatsApp en clínicas, peluquerías, inmobiliarias y comercios.',
};

export default function CasosDeUsoPage() {
  return (
    <>
      <section className="border-b-2 border-ink py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Casos de uso"
            title={
              <>
                Distintos rubros, <span className="text-coral">la misma idea</span>:
                que tu WhatsApp trabaje sin vos.
              </>
            }
            sub="Cuatro ejemplos de cómo se ve atende en negocios reales. Si tu rubro no está, lo armamos a medida."
          />
        </div>
      </section>

      {casos.map((c, i) => (
        <CaseBlock key={c.id} caso={c} reverse={i % 2 === 1} />
      ))}

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center flex flex-col items-center gap-6">
          <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-[-0.025em] leading-[0.95]">
            ¿No ves tu rubro? <span className="text-coral">Lo armamos a medida.</span>
          </h2>
          <Button
            href={buildWaLink('Hola, mi rubro no está en los casos pero quiero saber si me sirve')}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </Button>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: `out/casos-de-uso.html` exists.

- [ ] **Step 3: Commit**

```bash
git add src/app/casos-de-uso/page.tsx
git commit -m "feat(app): add Casos de uso page"
```

---

## Task 33: 404 Page

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/app/not-found.tsx`

- [ ] **Step 1: Create not-found.tsx**

```tsx
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] grid place-items-center px-5 md:px-8 py-20">
      <div className="max-w-2xl text-center flex flex-col items-center gap-6">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
          Error 404
        </span>
        <h1 className="font-display font-semibold text-7xl md:text-9xl tracking-[-0.025em] leading-[0.9]">
          No <span className="text-coral">atendemos</span> esto.
        </h1>
        <p className="font-body text-lg text-mute max-w-md">
          La página que buscás no existe — o ya no existe. Volvé al inicio o escribinos.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button href="/" variant="primary" size="md">
            Volver al inicio
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat(app): add 404 page"
```

---

## Task 34: Sitemap & Robots

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/src/app/sitemap.ts`
- Create: `/home/leonel/Documents/code/automation-page/src/app/robots.ts`

- [ ] **Step 1: Create sitemap.ts**

```ts
import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/servicios`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/casos-de-uso`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
```

- [ ] **Step 2: Create robots.ts**

```ts
import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat(seo): add sitemap and robots"
```

---

## Task 35: Static Assets — Favicon & Icon

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/public/icon.svg`
- Create: `/home/leonel/Documents/code/automation-page/public/og.png` (placeholder)

- [ ] **Step 1: Create icon.svg**

A simple "a." mark in forest on cream:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#F8F5EF"/>
  <text x="50%" y="58%"
    text-anchor="middle"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font-weight="700"
    font-size="44"
    fill="#0F3D2E">a</text>
  <circle cx="50" cy="49" r="4" fill="#FF5D3B"/>
</svg>
```

- [ ] **Step 2: Create placeholder og.png**

A 1200×630 placeholder is acceptable for now — generate via:

```bash
# Use ImageMagick if available; otherwise leave a 1×1 png placeholder.
# The user will design the real OG image before launch (spec section 12).
convert -size 1200x630 xc:'#F8F5EF' \
  -fill '#0F3D2E' -font Helvetica-Bold -pointsize 96 \
  -gravity center -annotate +0+0 'atende.' \
  /home/leonel/Documents/code/automation-page/public/og.png 2>/dev/null \
  || printf '\x89PNG\r\n\x1a\n' > /home/leonel/Documents/code/automation-page/public/og.png
```

If `convert` is unavailable, the fallback creates a minimal placeholder file. The user is expected to replace this before launch.

- [ ] **Step 3: Commit**

```bash
git add public/icon.svg public/og.png
git commit -m "feat(assets): add favicon and OG image placeholder"
```

---

## Task 36: README

**Files:**
- Create: `/home/leonel/Documents/code/automation-page/README.md`

- [ ] **Step 1: Create README.md**

````markdown
# atende.com.ar

Static marketing site for atende — WhatsApp automation for Argentinian PyMEs.

## Stack

- Next.js 15 (App Router) with `output: 'export'` (fully static)
- TypeScript, strict
- Tailwind CSS v4 (CSS-based config)
- Self-hosted Google Fonts (Instrument Sans, Inter Tight, IBM Plex Mono)
- Framer Motion (hero entrance + stat counters only)
- Vitest (for `src/lib/wa.ts`)

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Static output lands in `out/`. Deploy that directory to any static host.

## Test

```bash
npm test
```

## Editing copy

All Spanish copy lives in `src/content/`:

- `site.ts` — phone number, domain, tagline (single source of truth)
- `servicios.ts` — three services + example conversations
- `casos.ts` — vertical case examples
- `faq.ts` — landing page FAQ
- `stats.ts` — stat numbers (placeholder; replace before launch)

Components contain zero hardcoded copy. To change the WhatsApp number or domain, edit `site.ts`.

## Pre-launch checklist

See `docs/superpowers/specs/2026-04-29-atende-site-design.md` section 12 for the items that need real data before going live.
````

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README"
```

---

## Task 37: End-to-End Build Verification

- [ ] **Step 1: Clean rebuild**

Run:
```bash
cd /home/leonel/Documents/code/automation-page
rm -rf .next out
npm run build
```

Expected: build succeeds with no errors. `out/` contains:
- `index.html`
- `servicios.html` (or `servicios/index.html`)
- `casos-de-uso.html`
- `404.html`
- `sitemap.xml`
- `robots.txt`
- `_next/` directory with assets

- [ ] **Step 2: Run all tests**

Run: `npm test`
Expected: all 5 tests in `wa.test.ts` pass.

- [ ] **Step 3: Run dev server and visually verify**

Run: `npm run dev`

In a browser, manually verify:
- `/` — hero renders with chat mockup, all 7 sections present, no console errors
- `/servicios` — three service blocks render alternating
- `/casos-de-uso` — four case blocks render alternating
- `/some-bad-path` — 404 page renders
- Mobile (DevTools responsive 375×667) — header collapses, mobile menu opens full-screen, all sections readable
- Disable JS in DevTools — FAQ still works (native `<details>`), CTAs still work (anchor tags)

If any check fails, fix in the relevant component file and re-verify.

- [ ] **Step 4: Lighthouse check**

Run: `npm run build && npx serve out -p 4173`

Open `http://localhost:4173` in Chrome, run Lighthouse mobile audit.

Expected (per spec acceptance criteria): Performance ≥ 95, A11y ≥ 95, Best Practices = 100, SEO = 100.

If A11y < 95: check color contrast (coral on cream may need darkening), missing alt text on illustrations, focus rings on buttons.
If Performance < 95: check image sizes, font subsetting, JS bundle size.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: verify build and Lighthouse" --allow-empty
```

---

## Summary

37 tasks producing:
- 3 fully static pages + custom 404
- 5 hand-built UI primitives
- Single content layer (`src/content/`)
- Tested WhatsApp link helper
- SEO (sitemap, robots, JSON-LD, OG)
- README + spec + plan committed

**Total estimated time:** 6–8 hours for an engineer following the plan linearly.

**Pre-launch open items** (from spec §12):
1. Replace placeholder stats in `src/content/stats.ts`
2. Confirm or change `hola@atende.com.ar` in `src/content/site.ts`
3. Set legal/razón social in `src/content/site.ts`
4. Optional testimonials/logos
5. Designed OG image at `public/og.png`
