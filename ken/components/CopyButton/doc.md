---
title: CopyButton
component: CopyButton
description: An icon button that copies text to the clipboard and confirms with an animated icon swap.
status: stable
category: Actions
---

CopyButton wraps IconButton with a self-contained copy interaction: click it, it writes `value` to
the clipboard, then swaps the copy glyph for a green check that auto-reverts after three seconds.
The caller hands over the text — no wiring, no state, no event plumbing required.

The swap animation is a cross-dissolve with a slight scale + rotate: the copy icon scales down and
rotates out while the check scales up and rotates in. Both run on `opacity` + `transform` only
(GPU-composited, ~160ms ease-out) and retarget cleanly mid-flight on rapid re-clicks. Under
`prefers-reduced-motion` the transforms are dropped to a plain opacity crossfade.

`aria-label` flips from `"Copy"` to `"Copied"` with the visual state so screen readers hear the
confirmation. All variants, sizes, and shapes from IconButton are available.

## Basic usage

```tsx
import { CopyButton } from '@ken/react';

<CopyButton value="npm install @ken/react" />
```

## Variants

CopyButton inherits all seven colour variants from IconButton. The default is `secondary` — quiet
enough to sit beside code without competing with it.

```tsx
import { CopyButton } from '@ken/react';

<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <CopyButton value="copy me" variant="default" />
  <CopyButton value="copy me" variant="subtle" />
  <CopyButton value="copy me" variant="secondary" />
  <CopyButton value="copy me" variant="ghost" />
  <CopyButton value="copy me" variant="success" />
  <CopyButton value="copy me" variant="danger" />
</div>
```

## Sizes and shapes

```tsx
import { CopyButton } from '@ken/react';

<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <CopyButton value="copy me" size="sm" />
  <CopyButton value="copy me" size="md" />
  <CopyButton value="copy me" size="lg" />
  <CopyButton value="copy me" shape="circle" />
</div>
```

## Floating on a surface

`ghost` keeps the button invisible until hovered — ideal floating top-right of a code block.

```tsx
import { CopyButton } from '@ken/react';

<div style={{ position: 'relative', padding: 16, background: '#f5f5f3', borderRadius: 12, fontFamily: 'monospace', fontSize: 13 }}>
  <div style={{ position: 'absolute', top: 8, right: 8 }}>
    <CopyButton value="pnpm add @ken/react" variant="ghost" />
  </div>
  pnpm add @ken/react
</div>
```

## Callbacks

Use `onCopy` to hook into the successful write — for analytics, a toast, or chaining another action.

```tsx
import { CopyButton } from '@ken/react';

<CopyButton
  value="npm install @ken/react"
  onCopy={(text) => console.log('Copied:', text)}
/>
```
