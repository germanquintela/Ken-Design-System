'use client';
import type * as React from 'react';
import * as Lucide from 'lucide-react';
import * as Ken from '@ken/react';
import { buildRegistry, type AnyComp } from './buildRegistry';
import { CommandMenuPreview } from './adapters';

export function IconNode({
  name,
  size,
}: {
  name?: string;
  size?: number;
}): React.ReactElement | null {
  if (!name) return null;
  const Cmp = (
    Lucide as unknown as Record<
      string,
      React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>
    >
  )[name];
  return Cmp ? <Cmp size={size ?? 16} aria-hidden /> : null;
}

export const REGISTRY: Record<string, AnyComp> = {
  ...buildRegistry(Ken as unknown as Record<string, unknown>),
  Icon: IconNode as AnyComp,
  // CommandMenu is a controlled overlay needing onSelect callbacks + component
  // icons a JSON spec can't carry — the adapter shims it. Overrides the
  // auto-registered real component (must come after the spread).
  CommandMenu: CommandMenuPreview as AnyComp,
};
