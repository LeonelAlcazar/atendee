'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { site } from '@/content/site';
import {
  buildLeadMessage,
  demoSystems,
  demoTasks,
  demoVolumes,
} from '@/lib/leads';
import { buildWaLink } from '@/lib/wa';
import { trackConversion } from '@/lib/conversions';
import { Button } from '@/components/ui/Button';

const field =
  'mt-2 min-h-12 w-full rounded-md border-2 border-ink bg-surface px-3 py-3 text-base';

export function DemoForm() {
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('');
  const preview = useRef<HTMLDivElement>(null);
  useEffect(() => setReady(true), []);
  useEffect(() => {
    if (message) preview.current?.focus();
  }, [message]);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const company = String(form.get('company') ?? '').trim();
    const input = event.currentTarget.elements.namedItem(
      'company',
    ) as HTMLInputElement;
    input.setCustomValidity(company ? '' : 'Ingresá el nombre de tu negocio.');
    if (!event.currentTarget.reportValidity()) return;
    setMessage(
      buildLeadMessage({
        company,
        task: String(form.get('task')),
        system: String(form.get('system')),
        volume: String(form.get('volume')),
        notes: String(form.get('notes') ?? ''),
      }),
    );
    trackConversion({
      event: 'atende_demo_prepared',
      page: '/demo',
      placement: 'demo-form',
    });
  }

  return (
    <div className="rounded-lg border-2 border-ink bg-bg p-5 shadow-[var(--shadow-brut)] sm:p-8">
      <h2 className="font-display text-2xl font-semibold">
        Contanos qué querés sacarte de encima
      </h2>
      <p className="mt-3 leading-relaxed text-mute">
        Armá tu mensaje y mandalo por WhatsApp o email. Los campos con * son
        obligatorios.
      </p>
      <form onSubmit={prepare} className="mt-6" onChange={() => setMessage('')}>
        <fieldset
          disabled={!ready}
          className="grid min-w-0 gap-5 disabled:opacity-60"
        >
          <legend className="sr-only">Datos para pedir una demo</legend>
          <label className="font-semibold" htmlFor="company">
            Tu negocio *
            <input
              id="company"
              name="company"
              autoComplete="organization"
              required
              maxLength={100}
              onInput={(event) => event.currentTarget.setCustomValidity('')}
              className={field}
            />
          </label>
          <label className="font-semibold" htmlFor="task">
            ¿Qué tarea querés sacarte de encima primero? *
            <select
              id="task"
              name="task"
              required
              defaultValue=""
              className={field}
            >
              <option value="" disabled>
                Elegí una tarea
              </option>
              {demoTasks.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="font-semibold" htmlFor="system">
            ¿Dónde llevás esa tarea hoy? *
            <select
              id="system"
              name="system"
              required
              defaultValue=""
              className={field}
            >
              <option value="" disabled>
                Elegí una opción
              </option>
              {demoSystems.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="font-semibold" htmlFor="volume">
            Consultas por WhatsApp al mes *
            <select
              id="volume"
              name="volume"
              required
              defaultValue=""
              className={field}
            >
              <option value="" disabled>
                Elegí un rango aproximado
              </option>
              {demoVolumes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="font-semibold" htmlFor="notes">
            Algo más que debamos saber{' '}
            <span className="font-normal text-mute">(opcional)</span>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              maxLength={600}
              className={field}
              aria-describedby="notes-help"
            />
            <span
              id="notes-help"
              className="mt-2 block text-sm font-normal text-mute"
            >
              Por ejemplo tu rubro, cómo se llama tu sistema o cuántas personas
              atienden. Hasta 600 caracteres.
            </span>
          </label>
          <p className="text-sm leading-relaxed text-mute">
            Los datos se preparan en tu navegador y se comparten cuando elegís
            enviarlos por WhatsApp o email.{' '}
            <Link
              href="/politica-de-privacidad"
              className="underline underline-offset-4"
            >
              Política de privacidad
            </Link>
            .
          </p>
          <button
            type="submit"
            className="min-h-12 rounded-md border-2 border-ink bg-coral px-5 py-3 font-display text-lg font-semibold shadow-[var(--shadow-brut-sm)] hover:bg-coral-soft"
          >
            Armar mi mensaje →
          </button>
        </fieldset>
      </form>
      <noscript>
        <p className="mt-5 leading-relaxed">
          Para armar el mensaje con este formulario necesitás JavaScript. También
          podés usar los enlaces de WhatsApp y email de esta página.
        </p>
      </noscript>
      {message && (
        <div
          ref={preview}
          tabIndex={-1}
          className="mt-8 rounded-md border-2 border-ink bg-mint p-5"
        >
          <h3 className="font-display text-xl font-semibold">
            Tu mensaje está listo para enviar
          </h3>
          <p className="mt-2 text-sm">
            Abrí el canal que prefieras y mandanos el mensaje.
          </p>
          <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed">
            {message}
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <Button
              href={buildWaLink(message)}
              data-cta="demo-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir WhatsApp ↗
            </Button>
            <Button
              href={`mailto:${site.email}?subject=${encodeURIComponent('Demo de Atende para mi negocio')}&body=${encodeURIComponent(message)}`}
              data-cta="demo-email"
              variant="outline"
            >
              Enviar por email
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
