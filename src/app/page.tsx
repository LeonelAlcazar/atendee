import { BlogTeaser } from '@/components/blog/BlogTeaser';
import { Hero } from '@/components/landing/Hero';
import { ServiciosTeaser } from '@/components/landing/ServiciosTeaser';
import { ComoFunciona } from '@/components/landing/ComoFunciona';
import { ControlHumano } from '@/components/landing/ControlHumano';
import { CasosTeaser } from '@/components/landing/CasosTeaser';
import { Faq } from '@/components/landing/Faq';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { JsonLd } from '@/components/jsonld';
import { pages } from '@/content/pages';
import { faq } from '@/content/faq';
import { createPageMetadata } from '@/lib/metadata';
import { pageGraph } from '@/lib/structured-data';
import { BuyerFit } from '@/components/landing/BuyerFit';

export const metadata = createPageMetadata(pages.home);

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiciosTeaser />
      <BuyerFit />
      <ComoFunciona />
      <ControlHumano />
      <CasosTeaser />
      <BlogTeaser />
      <Faq />
      <CtaFinal context="Hola, vi atende.com.ar y quiero saber si Atende sirve para mi negocio" />
      <JsonLd value={pageGraph({ ...pages.home, faq })} />
    </>
  );
}
