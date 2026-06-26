import type { KenNode, KenElement } from '@ken/ai';
import { serialize } from '../renderer/serialize';

const isElement = (v: unknown): v is KenElement =>
  !!v &&
  typeof v === 'object' &&
  typeof (v as { type?: unknown }).type === 'string';

/** Normalize a parsed JSON example: string children become a one-element array,
 *  matching the shape `serialize`/`KenRenderer` expect. */
function normalize(node: KenNode): KenNode {
  if (typeof node === 'string') return node;
  const el = node as KenElement;
  const out: KenElement = { type: el.type };
  if (el.props) out.props = el.props;
  if (el.children != null) {
    const kids = Array.isArray(el.children) ? el.children : [el.children];
    out.children = kids.map(normalize);
  }
  return out;
}

export function kenExampleData(
  json: string,
): { ok: true; node: KenNode; code: string } | { ok: false; raw: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, raw: json };
  }
  if (!isElement(parsed)) return { ok: false, raw: json };
  const node = normalize(parsed as KenNode);
  return { ok: true, node, code: serialize(node) };
}
