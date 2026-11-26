'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { estimateResponses, type EstimatePlan } from '@/lib/response-estimate';
import { buildWaLink, waRef } from '@/lib/wa';

const number = new Intl.NumberFormat('es-AR');
// Large, calm number fields without spinners. The label wraps the field, so the
// field resets the label's weight.
const inputStyle =
  'mt-2 block h-14 w-full rounded-xl bg-surface px-4 text-xl font-medium tabular-nums text-ink ring-1 ring-inset ring-line-strong transition-shadow duration-200 placeholder:font-normal placeholder:text-muted hover:ring-ink/30 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';

export function ResponseEstimator({ plans }: { plans: EstimatePlan[] }) {
  const [ready, setReady] = useState(false);
  const [chats, setChats] = useState('');
  const [replies, setReplies] = useState('');
  useEffect(() => setReady(true), []);

  const estimate = estimateResponses(Number(chats), Number(replies), plans);
  const message = estimate
    ? `Hola, quiero cotizar Atende. Estimo ${number.format(estimate.total)} respuestas del asistente al mes para ${number.format(Number(chats))} conversaciones.${estimate.match ? ` Vi el plan ${estimate.match.name}.` : ''} ¿Qué plan y conexión necesita mi negocio?`
    : 'Hola, quiero saber qué plan y qué conexión necesita mi negocio para atender por WhatsApp.';

  return (
    <section
      id="calculadora"
      aria-labelledby="titulo-calculadora"
      className="scroll-mt-20 px-3 md:px-6"
    >
      <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-4xl bg-forest px-4 py-16 text-white sm:px-5 md:px-8 md:py-24">
        <div
          className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgb(255_255_255/0.1),transparent_65%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 id="titulo-calculadora" className="max-w-xl text-balance text-headline">
              <span className="block">¿Cuántas respuestas necesita</span>{' '}
              <span className="block text-white/60">tu negocio al mes?</span>
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-lead text-white/75">
              Multiplicá las conversaciones que atendería el asistente por las veces que contestaría en un chat típico. Cada respuesta usa una unidad del plan.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-white/70">
              Por ejemplo, con la agenda conectada, ofrecer un horario y confirmar el turno lleva 2 respuestas. Si ese chat se repite 300 veces, estimá 600 respuestas al mes.
            </p>
          </div>
          <div className="min-w-0 rounded-3xl bg-surface px-4 py-5 text-ink shadow-float sm:p-8">
            <fieldset disabled={!ready} className="grid min-w-0 gap-5 disabled:opacity-60 sm:grid-cols-2">
              <legend className="sr-only">Calculadora de respuestas de WhatsApp</legend>
              <label className="block text-[0.9375rem] font-semibold" htmlFor="chats-al-mes">
                Conversaciones al mes
                <input
                  id="chats-al-mes"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  step="1"
                  placeholder="Ej. 300"
                  className={inputStyle}
                  value={chats}
                  onChange={(event) => setChats(event.target.value)}
                />
              </label>
              <label className="block text-[0.9375rem] font-semibold" htmlFor="respuestas-por-chat">
                Respuestas por chat
                <input
                  id="respuestas-por-chat"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  step="1"
                  placeholder="Ej. 2"
                  className={inputStyle}
                  value={replies}
                  onChange={(event) => setReplies(event.target.value)}
                />
              </label>
            </fieldset>
            <noscript><p className="mt-4 text-muted">Activá JavaScript para calcular con tus números.</p></noscript>
            <div aria-live="polite" aria-atomic="true" className="mt-6 border-t border-line pt-6">
              {estimate ? (
                <>
                  <p className="break-words text-title tabular-nums">{number.format(estimate.total)} respuestas por mes</p>
                  {estimate.match ? (
                    <p className="mt-2 leading-relaxed text-muted">
                      El plan {estimate.match.name} cubre ese volumen con hasta {number.format(estimate.match.monthlyAgentResponseLimit)} respuestas mensuales incluidas. La conexión con tu sistema se cotiza aparte.
                    </p>
                  ) : (
                    <p className="mt-2 leading-relaxed text-muted">
                      Consultanos cómo cubrir ese volumen con los planes y créditos disponibles para tu espacio.
                    </p>
                  )}
                </>
              ) : (
                <p className="leading-relaxed text-muted">
                  Ingresá dos números enteros mayores que cero para comparar tu estimación con los planes publicados.
                </p>
              )}
            </div>
            <Button
              href={buildWaLink(message, waRef('/precios', 'calculadora'))}
              data-cta="pricing-estimate-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full sm:w-auto"
            >
              Consultar mi plan por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
