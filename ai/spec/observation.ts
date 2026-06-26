export interface Observation {
  title: string;
  detail?: string;
}

export function toObservation(v: unknown): Observation | null {
  if (!v || typeof v !== 'object') return null;
  const o = v as { title?: unknown; detail?: unknown };
  if (typeof o.title !== 'string') return null;
  return typeof o.detail === 'string'
    ? { title: o.title, detail: o.detail }
    : { title: o.title };
}
