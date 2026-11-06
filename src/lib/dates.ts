// Frontmatter holds calendar dates. Argentina has no daylight saving, so one
// fixed offset turns them into instants and keeps every date on one clock.
const argentinaOffsetHours = 3;

export function toSchemaDate(date: string) {
  return `${date}T09:00:00-03:00`;
}

export function argentinaToday(now = new Date()) {
  return new Date(now.getTime() - argentinaOffsetHours * 3_600_000)
    .toISOString()
    .slice(0, 10);
}
