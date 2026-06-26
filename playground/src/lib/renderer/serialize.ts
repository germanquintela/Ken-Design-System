import type { KenNode, KenElement } from '@ken/ai';

const isElement = (v: unknown): v is KenElement =>
  !!v &&
  typeof v === 'object' &&
  typeof (v as { type?: unknown }).type === 'string';
const isIcon = (v: unknown): v is KenElement =>
  isElement(v) && v.type === 'Icon';

function indent(n: number): string {
  return '  '.repeat(n);
}

function serializeValue(
  value: unknown,
  ken: Set<string>,
  lucide: Set<string>,
): string {
  // Returns a JS expression string for an object/array prop value.
  if (Array.isArray(value)) {
    const items = value.map((v) => serializeValue(v, ken, lucide)).join(', ');
    return `[${items}]`;
  }
  if (isIcon(value)) {
    const name = String(
      (value.props as { name?: string } | undefined)?.name ?? '',
    );
    if (name) lucide.add(name);
    return `<${name} />`;
  }
  if (isElement(value)) {
    // A non-icon node used as a prop value (e.g. a styled Text as `title`). Inline its JSX.
    return serializeNode(value, 0, ken, lucide).trimStart();
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).map(
      ([k, v]) => {
        // option/item icon string -> element
        if (k === 'icon' && typeof v === 'string') {
          lucide.add(v);
          return `${k}: <${v} />`;
        }
        return `${k}: ${JSON.stringify(v)}`;
      },
    );
    return `{ ${entries.join(', ')} }`;
  }
  return JSON.stringify(value);
}

function propString(
  props: Record<string, unknown>,
  ken: Set<string>,
  lucide: Set<string>,
): string {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(props)) {
    if (typeof v === 'boolean') {
      if (v) parts.push(k); // bare true; omit false
    } else if (typeof v === 'string') {
      parts.push(`${k}="${v}"`);
    } else if (typeof v === 'number') {
      parts.push(`${k}={${v}}`);
    } else {
      parts.push(`${k}={${serializeValue(v, ken, lucide)}}`);
    }
  }
  return parts.length ? ` ${parts.join(' ')}` : '';
}

function serializeNode(
  node: KenNode,
  depth: number,
  ken: Set<string>,
  lucide: Set<string>,
): string {
  if (typeof node === 'string') return indent(depth) + node;
  const el = node as KenElement;
  // Icon node used directly as a child
  if (el.type === 'Icon') {
    const name = String(
      (el.props as { name?: string } | undefined)?.name ?? '',
    );
    if (name) lucide.add(name);
    return `${indent(depth)}<${name} />`;
  }
  ken.add(el.type.split('.')[0]); // import the root component (e.g. Card for Card.Header)
  const tag = el.type;
  const props = propString(el.props ?? {}, ken, lucide);
  const kids = el.children ?? [];
  if (kids.length === 0) return `${indent(depth)}<${tag}${props} />`;
  const inner = kids
    .map((c: KenNode) => serializeNode(c, depth + 1, ken, lucide))
    .join('\n');
  return `${indent(depth)}<${tag}${props}>\n${inner}\n${indent(depth)}</${tag}>`;
}

export function serialize(spec: KenNode): string {
  const ken = new Set<string>();
  const lucide = new Set<string>();
  const body = serializeNode(spec, 0, ken, lucide);
  const lines: string[] = [];
  if (ken.size)
    lines.push(`import { ${[...ken].sort().join(', ')} } from '@ken/react';`);
  if (lucide.size)
    lines.push(
      `import { ${[...lucide].sort().join(', ')} } from 'lucide-react';`,
    );
  if (lines.length) lines.push('');
  return `${lines.join('\n') + body}\n`;
}
