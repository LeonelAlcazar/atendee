import { cleanParam, isSignupHref, utmKeys, type Utm } from './signup';

// First-touch campaign parameters, kept for the visit in sessionStorage and
// added to sign-up links, so the app can save where an espacio came from.
// Only utm_* values: no identifiers, cookies or typed text.
const storageKey = 'atende:first-touch';

export function parseUtm(search: string): Utm | null {
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search);
  } catch {
    return null;
  }
  const utm: Utm = {};
  for (const key of utmKeys) {
    const value = cleanParam(params.get(key), 150);
    if (value) utm[key] = value;
  }
  return Object.keys(utm).length ? utm : null;
}

function read(storage: Storage): Utm | null {
  try {
    const raw = storage.getItem(storageKey);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    const utm: Utm = {};
    for (const key of utmKeys) {
      const item = cleanParam((value as Record<string, unknown>)[key], 150);
      if (item) utm[key] = item;
    }
    return Object.keys(utm).length ? utm : null;
  } catch {
    return null;
  }
}

// Stores the landing page's UTMs once per visit and returns what is stored.
// When storage is blocked, the current page's UTMs still apply.
export function rememberFirstTouch(search: string, storage?: Storage | null): Utm | null {
  const current = parseUtm(search);
  if (!storage) return current;
  const stored = read(storage);
  if (stored) return stored;
  if (current) {
    try {
      storage.setItem(storageKey, JSON.stringify(current));
    } catch {
      // A full or blocked storage keeps the current page's values only.
    }
  }
  return current;
}

// Adds the stored UTMs to a sign-up link, without overwriting what is there.
export function withFirstTouch(href: string, utm: Utm | null): string {
  if (!utm || !isSignupHref(href)) return href;
  const url = new URL(href);
  for (const key of utmKeys) {
    const value = utm[key];
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return url.href;
}

export function browserFirstTouch(): Utm | null {
  if (typeof window === 'undefined') return null;
  let storage: Storage | null = null;
  try {
    storage = window.sessionStorage;
  } catch {
    storage = null;
  }
  try {
    return rememberFirstTouch(window.location.search, storage);
  } catch {
    return null;
  }
}
