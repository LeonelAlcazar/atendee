import { Hero } from '@/components/landing/Hero';
import { ServiciosTeaser } from '@/components/landing/ServiciosTeaser';
import { ComoFunciona } from '@/components/landing/ComoFunciona';
import { ControlHumano } from '@/components/landing/ControlHumano';
import { CasosTeaser } from '@/components/landing/CasosTeaser';
import { Faq } from '@/components/landing/Faq';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { JsonLd } from '@/components/jsonld';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiciosTeaser />
      <ComoFunciona />
      <ControlHumano />
      <CasosTeaser />
      <Faq />
      <CtaFinal context="Hola, vi atende.com.ar y quiero saber si Atende sirve para mi negocio" />
      <JsonLd />
    </>
  );
}
