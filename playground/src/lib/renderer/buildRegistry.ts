import type * as React from 'react';

// biome-ignore lint/suspicious/noExplicitAny: the registry holds arbitrary component types; any is the correct upper bound here.
export type AnyComp = React.ComponentType<any>;

// forwardRef/memo internals + class statics that are objects/functions but NOT
// sub-components — never register these as `Name.x`.
const RESERVED = new Set([
  '$$typeof',
  'render',
  'type',
  'compare',
  '_payload',
  '_init',
  'displayName',
  'defaultProps',
  'propTypes',
  'contextType',
  'contextTypes',
  'childContextTypes',
]);

export function isComponentLike(v: unknown): v is AnyComp {
  if (typeof v === 'function') return true;
  return !!v && typeof v === 'object' && '$$typeof' in (v as object);
}

/**
 * Build the renderer registry from a module namespace (`import * as Ken`).
 * Every runtime export is a component (types are erased), keyed by its export
 * name. Compound roots (Card, Tabs, Table, Menu…) carry their sub-components as
 * own properties; those register as `Name.Sub` (Card.Header, Tabs.List, …).
 */
export function buildRegistry(
  ns: Record<string, unknown>,
): Record<string, AnyComp> {
  const reg: Record<string, AnyComp> = {};
  for (const [name, value] of Object.entries(ns)) {
    if (!isComponentLike(value)) continue;
    reg[name] = value as AnyComp;
    for (const [key, sub] of Object.entries(
      value as unknown as Record<string, unknown>,
    )) {
      if (RESERVED.has(key)) continue;
      if (isComponentLike(sub)) reg[`${name}.${key}`] = sub as AnyComp;
    }
  }
  return reg;
}
