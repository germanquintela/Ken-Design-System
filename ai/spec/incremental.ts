import { type Observation, toObservation } from './observation';

/**
 * Scan a partial JSON buffer and return every observation object already fully
 * received inside the top-level "observations" array. The in-flight (not yet
 * closed) object is skipped. String-aware so braces inside titles don't confuse
 * the brace counter. Safe to call repeatedly as the buffer grows.
 */
export function extractClosedObservations(buffer: string): Observation[] {
  const keyAt = buffer.indexOf('"observations"');
  if (keyAt === -1) return [];
  let i = buffer.indexOf('[', keyAt + '"observations"'.length);
  if (i === -1) return [];
  i += 1;

  const chunks: string[] = [];
  let depth = 0;
  let start = -1;
  let inStr = false;
  let esc = false;
  for (; i < buffer.length; i++) {
    const ch = buffer[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === '\\') esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') inStr = true;
    else if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        chunks.push(buffer.slice(start, i + 1));
        start = -1;
      }
    } else if (ch === ']' && depth === 0) break;
  }

  const out: Observation[] = [];
  for (const raw of chunks) {
    try {
      const o = toObservation(JSON.parse(raw));
      if (o) out.push(o);
    } catch {
      /* incomplete — ignore */
    }
  }
  return out;
}

// JSON string-escape map, shared by extractMessageDelta.
const JSON_ESCAPE: Record<string, string> = {
  '"': '"',
  '\\': '\\',
  '/': '/',
  n: '\n',
  t: '\t',
  r: '\r',
  b: '\b',
  f: '\f',
};

/**
 * Index just past the top-level "observations" array's closing ']'. Returns -1
 * if the array isn't present or hasn't closed yet. String- and nesting-aware so
 * braces/brackets inside titles don't fool the depth counter.
 */
function observationsArrayEnd(buffer: string): number {
  const at = buffer.indexOf('"observations"');
  if (at === -1) return -1;
  let i = buffer.indexOf('[', at);
  if (i === -1) return -1;
  i += 1;
  let depth = 0,
    inStr = false,
    esc = false;
  for (; i < buffer.length; i++) {
    const ch = buffer[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === '\\') esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') inStr = true;
    else if (ch === '[' || ch === '{') depth++;
    else if (ch === '}') depth--;
    else if (ch === ']') {
      if (depth === 0) return i + 1;
      depth--;
    }
  }
  return -1; // array still streaming
}

/**
 * Incrementally decode the top-level "message" string value out of a partial
 * JSON buffer. Returns the fully-decoded text received so far (honoring JSON
 * escapes) and whether the closing quote has been seen. Holds back any trailing
 * incomplete escape (lone backslash or partial \uXXXX) so a half-formed escape
 * is never emitted. The search is anchored AFTER the observations array closes
 * (field order is observations -> message -> spec), so a stray "message" key
 * inside an observation can't be mistaken for the top-level field. Safe to call
 * repeatedly as the buffer grows.
 */
export function extractMessageDelta(buffer: string): {
  text: string;
  closed: boolean;
} {
  let searchFrom = 0;
  if (buffer.indexOf('"observations"') !== -1) {
    const end = observationsArrayEnd(buffer);
    if (end === -1) return { text: '', closed: false }; // observations not closed -> message not reached
    searchFrom = end;
  }
  const keyAt = buffer.indexOf('"message"', searchFrom);
  if (keyAt === -1) return { text: '', closed: false };
  let i = buffer.indexOf(':', keyAt + '"message"'.length);
  if (i === -1) return { text: '', closed: false };
  i += 1;
  while (
    i < buffer.length &&
    (buffer[i] === ' ' ||
      buffer[i] === '\n' ||
      buffer[i] === '\t' ||
      buffer[i] === '\r')
  )
    i++;
  if (i >= buffer.length || buffer[i] !== '"')
    return { text: '', closed: false };
  i += 1; // past opening quote

  let out = '';
  for (; i < buffer.length; i++) {
    const ch = buffer[i];
    if (ch === '\\') {
      if (i + 1 >= buffer.length) break; // incomplete escape - hold back
      const e = buffer[i + 1];
      if (e === 'u') {
        if (i + 6 > buffer.length) break; // incomplete \uXXXX - hold back
        out += String.fromCharCode(parseInt(buffer.slice(i + 2, i + 6), 16));
        i += 5;
      } else {
        out += JSON_ESCAPE[e] ?? e;
        i += 1;
      }
    } else if (ch === '"') {
      return { text: out, closed: true };
    } else {
      out += ch;
    }
  }
  return { text: out, closed: false };
}
