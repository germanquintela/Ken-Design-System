---
title: Showcase
component: Showcase
description: A preview-with-reveal-code box — the docs' canonical way to show a live example alongside its source.
status: stable
category: Display
---

Showcase is the docs shell the Ken docs site uses for every component example. It places the live preview in a centered panel, and hides the source behind a "Show code" toggle (Base UI `Collapsible`) so the page doesn't drown in code. When expanded, the code panel is a borderless `CodePreview` flush to the card's edge.

The component is intentionally app-level: it carries state (`open`), takes a `ReactNode` as `children` (the live preview), and a `code` string (the source). Because the children are real React nodes and the `code` prop is a freeform string, Showcase can't be expressed as a static `ken` JSON node — use `tsx` blocks to document it.

## Anatomy

```tsx
import { Showcase } from '@ken/react';
import { Button } from '@ken/react';

<Showcase code={`<Button variant="default">Click me</Button>`}>
  <Button variant="default">Click me</Button>
</Showcase>
```

The `children` prop is what gets rendered inside the preview area; `code` is the string that appears when the panel opens. The two are independent — you author the real component tree as children, and the copy-paste source as `code`.

## Start expanded

Pass `defaultOpen` to show the code panel on first render, useful for examples where the source is the point.

```tsx
<Showcase
  code={`<Button variant="primary">Save</Button>`}
  defaultOpen
>
  <Button variant="primary">Save</Button>
</Showcase>
```

## Language

`language` is forwarded to the inner `CodePreview`. Default is `'tsx'`.

```tsx
<Showcase
  code={`.button { color: red; }`}
  language="css"
>
  {/* live preview here */}
</Showcase>
```
