'use client';
import * as React from 'react';
import * as Lucide from 'lucide-react';
import type { ElementType } from 'react';
import { Button, CommandMenu } from '@ken/react';

/**
 * Renderer adapters — components from the catalog that can't be driven by a raw
 * JSON spec as-is, so the canvas wraps them in a thin, builder-only shim.
 */

type RawItem = {
  id?: string;
  label: string;
  icon?: unknown;
  keywords?: string[];
};
type RawGroup = { heading: string; items?: RawItem[] };

function toLucide(icon: unknown): ElementType | undefined {
  // The catalog tells the model to pass a lucide-react NAME string, but it may
  // copy the { type: 'Icon', props: { name } } element convention used by every
  // other icon-bearing prop — accept both so neither path throws in createElement.
  const name =
    typeof icon === 'string'
      ? icon
      : icon &&
          typeof icon === 'object' &&
          (icon as { type?: unknown }).type === 'Icon'
        ? (icon as { props?: { name?: string } }).props?.name
        : undefined;
  if (name) return (Lucide as unknown as Record<string, ElementType>)[name];
  // Already a component (ElementType) → pass through; anything else → no icon.
  return typeof icon === 'function' ? (icon as ElementType) : undefined;
}

/**
 * **CommandMenuPreview** — CommandMenu in the AI canvas. The real component is a
 * *controlled* global overlay whose items need `onSelect` callbacks and
 * component-typed icons — neither expressible in a JSON spec. So the adapter:
 * renders a trigger that opens the palette (local open state), resolves each
 * item's string icon name to a Lucide component, makes selection inert, and
 * turns the global ⌘K binding off (a generated palette must never hijack the
 * builder's own ⌘K shortcut).
 */
export function CommandMenuPreview({
  groups,
  placeholder,
  emptyMessage,
}: {
  groups?: RawGroup[];
  placeholder?: string;
  emptyMessage?: string;
}): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  const normalized = (groups ?? []).map((group, gi) => ({
    heading: group.heading,
    items: (group.items ?? []).map((item, ii) => ({
      id: item.id ?? `${gi}-${ii}`,
      label: item.label,
      icon: toLucide(item.icon),
      keywords: item.keywords,
      onSelect: () => {},
    })),
  }));

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open command menu (⌘K)
      </Button>
      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        groups={normalized}
        placeholder={placeholder}
        emptyMessage={emptyMessage}
        shortcut={false}
      />
    </>
  );
}
