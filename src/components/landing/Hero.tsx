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
