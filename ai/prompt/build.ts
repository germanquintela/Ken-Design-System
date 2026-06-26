import { CATALOG } from '../catalog/data';
import type {
  CatalogEntry,
  PropSpec,
  SubcomponentSpec,
} from '../catalog/types';
import { SYSTEM_PROMPT } from './systemPrompt';

function propLine(p: PropSpec): string {
  const t =
    p.type === 'enum' && p.enum
      ? p.enum.map((e) => `"${e}"`).join(' | ')
      : p.type;
  const req = p.required ? ' (required)' : '';
  const desc = p.description ? ` — ${p.description}` : '';
  return `    - ${p.name}: ${t}${req}${desc}`;
}

function childrenLine(kind: 'none' | 'text' | 'nodes'): string {
  if (kind === 'none') return '    children: none';
  if (kind === 'text') return '    children: text only';
  return '    children: array of nodes';
}

function subLine(s: SubcomponentSpec): string {
  const props = s.props.length ? `\n${s.props.map(propLine).join('\n')}` : '';
  return `  • ${s.name}\n${childrenLine(s.childrenKind)}${props}`;
}

function entryBlock(e: CatalogEntry): string {
  const props = e.props.length ? `\n${e.props.map(propLine).join('\n')}` : '';
  const subs = e.subcomponents.length
    ? `\n  Subcomponents:\n${e.subcomponents.map(subLine).join('\n')}`
    : '';
  return `### ${e.name} — ${e.description}\n${childrenLine(e.childrenKind)}${props}${subs}`;
}

export function buildSystemPrompt(catalog: CatalogEntry[] = CATALOG): string {
  return `${SYSTEM_PROMPT}

COMPONENTS:
${catalog.map(entryBlock).join('\n\n')}`;
}
