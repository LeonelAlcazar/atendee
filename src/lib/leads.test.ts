import { describe, expect, it } from 'vitest';
import { buildLeadMessage } from './leads';
import { buildWaLink } from './wa';

describe('qualified sales inquiry', () => {
  it('preserves Spanish text, company context and line breaks through WhatsApp encoding', () => {
    const message = buildLeadMessage({
      company: '  Muñoz & Hijos  ',
      volume: 'Entre 100 y 500',
      need: 'Consultas de venta',
      notes: 'CRM: ¿se puede conectar?\nEquipo de 3 personas.',
    });
    const url = new URL(buildWaLink(message));
    expect(url.hostname).toBe('wa.me');
    expect(url.searchParams.get('text')).toBe(message);
    expect(message).toContain('Empresa: Muñoz & Hijos\n');
    expect(message).toContain('Equipo de 3 personas.');
    expect(message).toContain('Origen: atende.com.ar/demo');
  });
  it('omits blank optional notes and limits free text in outbound URLs', () => {
    const details = {
      company: 'A'.repeat(150),
      volume: 'Todavía no lo sé',
      need: 'Consultas de venta',
      notes: '   ',
    };
    expect(buildLeadMessage(details)).not.toContain('Contexto:');
    expect(buildLeadMessage(details)).not.toContain('A'.repeat(101));
    expect(
      buildLeadMessage({ ...details, notes: 'B'.repeat(700) }),
    ).not.toContain('B'.repeat(601));
  });
});
