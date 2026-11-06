import { describe, expect, it } from 'vitest';
import { argentinaToday, toSchemaDate } from './dates';

describe('editorial dates', () => {
  it('turns a calendar date into a timezone-aware schema date', () => {
    expect(toSchemaDate('2026-11-06')).toBe('2026-11-06T09:00:00-03:00');
    expect(new Date(toSchemaDate('2026-11-06')).toISOString()).toBe(
      '2026-11-06T12:00:00.000Z',
    );
  });
  it('reads today on the Argentine calendar', () => {
    expect(argentinaToday(new Date('2026-11-06T02:59:59Z'))).toBe('2026-11-05');
    expect(argentinaToday(new Date('2026-11-06T03:00:00Z'))).toBe('2026-11-06');
  });
});
