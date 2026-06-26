import { CATALOG } from './data';

export function catalogTypeNames(): string[] {
  const names: string[] = [];
  for (const entry of CATALOG) {
    names.push(entry.name);
    for (const sub of entry.subcomponents) names.push(sub.name);
  }
  return names;
}

const KNOWN = new Set<string>([...catalogTypeNames(), 'Icon']);

export function isKnownType(type: string): boolean {
  return KNOWN.has(type);
}
