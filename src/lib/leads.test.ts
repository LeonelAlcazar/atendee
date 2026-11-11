import { describe, expect, it } from 'vitest';
import {
  buildDemoLink,
  buildLeadMessage,
  demoSystems,
  demoTasks,
  demoVolumes,
  getDemoContext,
} from './leads';
import { rubros } from '@/content/rubros';
import { buildWaLink } from './wa';

describe('qualified sales inquiry', () => {
  it('prepares an honest draft with only the business and task', () => {
    expect(
      buildLeadMessage({ company: '  Mi comercio  ', task: demoTasks[2] }),
    ).toBe(
      [
        'Hola, quiero pedir una demo de Atende para mi negocio.',
        'Negocio: Mi comercio',
        `Tarea que quiero sacarme de encima: ${demoTasks[2]}`,
        'Origen: atende.com.ar/demo',
      ].join('\n'),
    );
  });

  it('leaves unanswered optional questions out of the draft', () => {
    const message = buildLeadMessage({
      company: 'Mi comercio',
      task: demoTasks[2],
      system: '  ',
      volume: '',
      notes: '\n ',
    });
    expect(message).not.toMatch(/Hoy la llevo|Consultas por WhatsApp|Contexto:/);
    expect(message).not.toMatch(/undefined|null/);
  });

  it('preserves Spanish text, business context and line breaks through WhatsApp encoding', () => {
    const message = buildLeadMessage({
      company: '  Muñoz & Hijos  ',
      task: 'Consultar stock y registrar pedidos',
      system: 'Una planilla',
      volume: 'Entre 100 y 500',
      notes: 'CRM: ¿se puede conectar?\nEquipo de 3 personas.',
    });
    const url = new URL(buildWaLink(message));
    expect(url.hostname).toBe('wa.me');
    expect(url.searchParams.get('text')).toBe(message);
    expect(message).toContain('Negocio: Muñoz & Hijos\n');
    expect(message).toContain(
      'Tarea que quiero sacarme de encima: Consultar stock y registrar pedidos\n',
    );
    expect(message).toContain('Hoy la llevo en: Una planilla\n');
    expect(message).toContain('Equipo de 3 personas.');
    expect(message).toContain('Origen: atende.com.ar/demo');
  });
  it('omits blank optional notes and limits free text in outbound URLs', () => {
    const details = {
      company: 'A'.repeat(150),
      task: 'Tomar reservas',
      system: 'Otro',
      volume: 'Todavía no lo sé',
      notes: '   ',
    };
    expect(buildLeadMessage(details)).not.toContain('Contexto:');
    expect(buildLeadMessage(details)).not.toContain('A'.repeat(101));
    expect(
      buildLeadMessage({ ...details, notes: 'B'.repeat(700) }),
    ).not.toContain('B'.repeat(601));
  });
  it('asks about tasks first, and offers an exit for undecided businesses', () => {
    expect(demoTasks[0]).toContain('turnos');
    expect(demoTasks).toContain('Todavía no lo sé');
    expect(demoVolumes).toContain('Todavía no lo sé');
    expect(demoSystems).toContain('Papel o de memoria');
  });
});

describe('demo source context', () => {
  it('preserves legacy links and task presets for every published rubro', () => {
    for (const rubro of rubros) {
      const url = new URL(buildDemoLink(rubro.slug), 'https://www.atende.com.ar');
      expect(url.pathname).toBe('/demo');
      expect(url.searchParams.get('rubro')).toBe(rubro.slug);
      const context = getDemoContext(url.searchParams);
      expect(context?.path).toBe(`/casos-de-uso/${rubro.slug}`);
      expect(demoTasks).toContain(context?.task);
    }
    expect(
      getDemoContext(new URLSearchParams('rubro=restaurantes-y-hoteles'))?.task,
    ).toBe('Tomar reservas');
  });

  it.each([
    ['turnos-whatsapp', 'Reservar, reprogramar o cancelar turnos'],
    ['ventas-whatsapp', 'Consultar stock y registrar pedidos'],
    ['atencion-automatica-whatsapp', 'Responder consultas y derivar a mi equipo'],
  ])('preserves the existing service task for %s', (source, task) => {
    const url = new URL(buildDemoLink(source), 'https://www.atende.com.ar');
    expect(url.searchParams.get('desde')).toBe(source);
    expect(getDemoContext(url.searchParams)).toEqual({
      source,
      path: `/servicios/${source}`,
      task,
    });
  });

  it('preserves integrations and pricing sources without guessing a task, and leaves generic entry neutral', () => {
    for (const source of ['integraciones', 'precios']) {
      const url = new URL(buildDemoLink(source), 'https://www.atende.com.ar');
      expect(getDemoContext(url.searchParams)).toEqual({
        source,
        path: `/${source}`,
      });
    }
    expect(buildDemoLink()).toBe('/demo');
    expect(getDemoContext(new URLSearchParams())).toBeUndefined();
  });

  it('includes only the catalogued public page and keeps the task the visitor chose', () => {
    const message = buildLeadMessage({
      company: 'Mi hotel',
      task: demoTasks[5],
      source: 'restaurantes-y-hoteles',
    });
    expect(message).toContain(
      `Tarea que quiero sacarme de encima: ${demoTasks[5]}`,
    );
    expect(message).toContain(
      'Referencia: atende.com.ar/casos-de-uso/restaurantes-y-hoteles',
    );
  });

  it('ignores unknown and inherited query values instead of copying them into drafts', () => {
    for (const source of [
      'otra-cosa',
      '__proto__',
      'constructor',
      'https://example.com/?email=persona@example.com',
    ]) {
      expect(
        getDemoContext(new URLSearchParams({ desde: source })),
      ).toBeUndefined();
      expect(
        getDemoContext(new URLSearchParams({ rubro: source })),
      ).toBeUndefined();
      expect(buildDemoLink(source)).toBe('/demo');
      expect(
        buildLeadMessage({ company: 'Mi negocio', task: demoTasks[7], source }),
      ).not.toContain('Referencia:');
    }
  });

  it('reads only known source context instead of arbitrary task, identity or note query values', () => {
    expect(
      getDemoContext(
        new URLSearchParams({
          desde: 'ventas-whatsapp',
          task: 'Texto arbitrario',
          company: 'No debe prellenarse',
          notes: 'Datos privados de prueba',
          url: 'https://example.com/?email=persona@example.com',
        }),
      ),
    ).toEqual({
      source: 'ventas-whatsapp',
      path: '/servicios/ventas-whatsapp',
      task: 'Consultar stock y registrar pedidos',
    });
    expect(
      getDemoContext(new URLSearchParams({ task: demoTasks[2] })),
    ).toBeUndefined();
  });

  it('rejects duplicate and invalid selected sources rather than mixing conflicting context', () => {
    for (const query of [
      'desde=ventas-whatsapp&desde=precios',
      'rubro=restaurantes-y-hoteles&rubro=servicios-profesionales',
      'rubro=ventas-whatsapp',
      'desde=desconocido&rubro=restaurantes-y-hoteles',
    ]) {
      expect(getDemoContext(new URLSearchParams(query))).toBeUndefined();
    }
    expect(
      getDemoContext(
        new URLSearchParams('desde=precios&rubro=restaurantes-y-hoteles'),
      ),
    ).toEqual({ source: 'precios', path: '/precios' });
  });
});
