import { BlogTeaser } from '@/components/blog/BlogTeaser';
import { JsonLd } from '@/components/jsonld';
import { ComoSeConecta } from '@/components/landing/ComoSeConecta';
import { ControlEquipo } from '@/components/landing/ControlEquipo';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { EstadoHoy } from '@/components/landing/EstadoHoy';
import { Faq } from '@/components/landing/Faq';
import { Hero } from '@/components/landing/Hero';
import { TareasPorRubro } from '@/components/landing/TareasPorRubro';
import { faq } from '@/content/faq';
import { pages } from '@/content/pages';
import { createPageMetadata } from '@/lib/metadata';
import { pageGraph } from '@/lib/structured-data';

export const metadata = createPageMetadata(pages.home);

export default function HomePage() {
  return (
    <>
      <Hero />
      <TareasPorRubro />
      <EstadoHoy />
      <ComoSeConecta />
      <ControlEquipo />
      <BlogTeaser />
      <Faq />
      <CtaFinal context="Hola, vi atende.com.ar y quiero saber qué tarea puede terminar Atende en mi negocio" />
      <JsonLd value={pageGraph({ ...pages.home, faq })} />
    </>
  );
}
