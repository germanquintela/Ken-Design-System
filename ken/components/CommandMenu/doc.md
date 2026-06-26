---
title: CommandMenu
component: CommandMenu
description: A ⌘K command palette — full-screen search over grouped actions, with built-in keyboard shortcut and live filtering.
status: stable
category: Overlays
---

CommandMenu is the system-wide action surface. Press `⌘K` (or `⌃K` on Windows/Linux) anywhere in the app and it opens. Type to filter — the Base UI Autocomplete handles fuzzy matching across `label` and optional `keywords`. Rows reuse the same `overlay` vocabulary as Menu and Select, so the surface feels consistent.

The component is props-driven (like Modal): you control `open`/`onOpenChange` from your own state. Pass a `groups` array of `CommandGroup` objects — each group has a `heading` and an array of `CommandItem` entries. Each item carries an `onSelect` callback; the palette closes automatically after selection.

## Basic usage

```tsx
import { Home, FileText, Plus, MessageSquare } from 'lucide-react';
import { CommandMenu, type CommandGroup } from '@ken/react';

const groups: CommandGroup[] = [
  {
    heading: 'Navigation',
    items: [
      { id: 'home', label: 'Home', icon: Home, onSelect: () => router.push('/') },
      { id: 'docs', label: 'Docs', icon: FileText, onSelect: () => router.push('/docs') },
    ],
  },
  {
    heading: 'Actions',
    items: [
      { id: 'new-chat', label: 'New Chat', icon: Plus, onSelect: () => createChat() },
    ],
  },
];

function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open command menu <Kbd>⌘K</Kbd>
      </Button>
      <CommandMenu open={open} onOpenChange={setOpen} groups={groups} />
    </>
  );
}
```

## Global keyboard shortcut

`shortcut` defaults to `true` — the component binds `⌘K` / `⌃K` on `window` and toggles `open` for you. Wire `onOpenChange` to your state and the shortcut just works, no extra `useEffect` needed.

```tsx
function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <CommandMenu
      open={open}
      onOpenChange={setOpen}
      groups={groups}
      shortcut   // default true — ⌘K opens/closes automatically
    />
  );
}
```

## Keywords for extra match surface

Add `keywords` to a `CommandItem` to make it findable by synonyms or shortcuts not visible in the label. The filter searches both `label` and `keywords` but only renders `label` in the row.

```tsx
const groups: CommandGroup[] = [
  {
    heading: 'Actions',
    items: [
      {
        id: 'new-chat',
        label: 'New Chat',
        icon: Plus,
        keywords: ['create', 'start', 'compose'],
        onSelect: () => createChat(),
      },
    ],
  },
];
```

## Empty state

When no items match the query, `emptyMessage` is shown. Default is `"No results."`.

```tsx
<CommandMenu
  open={open}
  onOpenChange={setOpen}
  groups={groups}
  emptyMessage="No commands match your search."
/>
```
