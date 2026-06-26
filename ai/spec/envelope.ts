import type { KenNode } from './types';
import { type Observation, toObservation } from './observation';
import { parseSpec } from './sanitize';

/**
 * Parse the model's `{ observations, spec }` envelope. Defensively also accepts a
 * bare spec node (older shape / robustness) with empty observations. The spec is
 * sanitized via parseSpec (the security boundary).
 */
export function parseEnvelope(
  raw: unknown,
  isKnownType: (t: string) => boolean,
):
  | { ok: true; spec: KenNode; observations: Observation[]; message: string }
  | { ok: false; error: string } {
  let parsed: unknown = raw;
  if (typeof raw === 'string') {
    try {
      parsed = JSON.parse(raw);
    } catch {
      return { ok: false, error: 'Model did not return valid JSON.' };
    }
  }

  const obj = parsed as { spec?: unknown; observations?: unknown } | null;
  const hasEnvelope = !!obj && typeof obj === 'object' && 'spec' in obj;
  const specResult = parseSpec(hasEnvelope ? obj?.spec : parsed, isKnownType);
  if (!specResult.ok) return specResult;

  const observations: Observation[] = [];
  if (obj && Array.isArray(obj.observations)) {
    for (const entry of obj.observations) {
      const o = toObservation(entry);
      if (o) observations.push(o);
    }
  }
  const rawMessage = (obj as { message?: unknown } | null)?.message;
  const message = typeof rawMessage === 'string' ? rawMessage : '';
  return { ok: true, spec: specResult.spec, observations, message };
}
