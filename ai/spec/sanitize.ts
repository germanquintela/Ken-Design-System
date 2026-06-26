import type { KenElement, KenNode } from './types';

export const MAX_NODES = 500;
export const MAX_DEPTH = 50;

/** Props an LLM must never set; stripped regardless of catalog. */
export const DANGEROUS_PROPS = [
  'className',
  'style',
  'dangerouslySetInnerHTML',
  'ref',
  'key',
  'render',
];
const isDangerous = (k: string) =>
  DANGEROUS_PROPS.includes(k) || /^on[A-Z]/.test(k);

const isElementLike = (v: unknown): v is KenElement =>
  !!v &&
  typeof v === 'object' &&
  typeof (v as { type?: unknown }).type === 'string';

interface SanitizeCtx {
  count: number;
}

function sanitizeValue(
  value: unknown,
  isKnownType: (t: string) => boolean,
  depth: number,
  ctx: SanitizeCtx,
): unknown {
  if (isElementLike(value))
    return sanitizeInternal(value, isKnownType, depth, ctx);
  if (Array.isArray(value)) {
    if (value.some(isElementLike)) {
      return value
        .map((v) => sanitizeValue(v, isKnownType, depth, ctx))
        .filter((v) => v !== null);
    }
    return value; // plain data array (e.g. Select options) — passed through
  }
  return value;
}

function sanitizeInternal(
  node: unknown,
  isKnownType: (t: string) => boolean,
  depth: number,
  ctx: SanitizeCtx,
): KenNode | null {
  if (typeof node === 'string') return node;
  if (!isElementLike(node)) return null;
  if (depth > MAX_DEPTH || ctx.count++ >= MAX_NODES) return null;
  if (!isKnownType(node.type)) return null;

  const out: KenElement = { type: node.type };

  if (node.props && typeof node.props === 'object') {
    const props: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node.props)) {
      if (isDangerous(k)) continue;
      props[k] = sanitizeValue(v, isKnownType, depth + 1, ctx);
    }
    if (Object.keys(props).length) out.props = props;
  }

  if (Array.isArray(node.children)) {
    const kids = node.children
      .map((c) => sanitizeInternal(c, isKnownType, depth + 1, ctx))
      .filter((c): c is KenNode => c !== null);
    if (kids.length) out.children = kids;
  }

  return out;
}

export function sanitizeNode(
  node: unknown,
  isKnownType: (t: string) => boolean,
  depth = 0,
): KenNode | null {
  return sanitizeInternal(node, isKnownType, depth, { count: 0 });
}

export function parseSpec(
  raw: unknown,
  isKnownType: (t: string) => boolean,
): { ok: true; spec: KenNode } | { ok: false; error: string } {
  let parsed: unknown = raw;
  if (typeof raw === 'string') {
    try {
      parsed = JSON.parse(raw);
    } catch {
      return { ok: false, error: 'Model did not return valid JSON.' };
    }
  }
  const spec = sanitizeNode(parsed, isKnownType);
  if (spec === null || typeof spec === 'string') {
    return { ok: false, error: 'Model returned an unusable layout.' };
  }
  return { ok: true, spec };
}
