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
