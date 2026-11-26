import { JsonLd } from '@/components/jsonld';
import { Control } from '@/components/landing/Control';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { Extras } from '@/components/landing/Extras';
import { Faq } from '@/components/landing/Faq';
import { Flood } from '@/components/landing/Flood';
import { Hero } from '@/components/landing/Hero';
import { HomeLinks } from '@/components/landing/HomeLinks';
import { Showcase } from '@/components/landing/Showcase';
import { Start } from '@/components/landing/Start';
import { faq } from '@/content/faq';
import { pages } from '@/content/pages';
import { createPageMetadata } from '@/lib/metadata';
import { pageGraph } from '@/lib/structured-data';

export const metadata = createPageMetadata(pages.home);

// One idea per screen: the finished task, the flood it replaces, the task by
// rubro, what comes after, who is in charge, how to start, and the ask.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Flood />
      <Showcase />
      <Extras />
      <Control />
      <Start />
      <HomeLinks />
      <Faq />
      <CtaFinal context="Hola, vi atende.com.ar y quiero saber qué tarea puede terminar Atende en mi negocio" />
      <JsonLd value={pageGraph({ ...pages.home, faq })} />
    </>
  );
}
