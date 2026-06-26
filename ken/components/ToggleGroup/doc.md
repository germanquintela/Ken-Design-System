---
title: ToggleGroup
component: ToggleGroup
description: An icon-only segmented control where exactly one option is always active.
status: stable
category: Forms
hero: /components/toggle-group.webp
---

ToggleGroup is a segmented control for mutually exclusive choices — one limestone
pill slides under the active option. It is icon-only by design: every item requires
an `aria-label` to name it for screen readers.

The pill slides via a computed CSS translate (`index × step`), so the animation
requires no DOM measurement — all items are equal-sized squares.

## Basic usage

Pass an `items` array — each item needs a `value`, an `icon` (a Lucide *component*
in real TSX; a Lucide *name string* in the `ken` JSON examples below, which the docs
factory resolves), and an `aria-label`. Use `defaultValue` for uncontrolled initial
selection.

```ken
{ "type": "ToggleGroup", "props": {
  "aria-label": "Text alignment",
  "defaultValue": "left",
  "items": [
    { "value": "left", "icon": "AlignLeft", "aria-label": "Align left" },
    { "value": "center", "icon": "AlignCenter", "aria-label": "Align center" },
    { "value": "right", "icon": "AlignRight", "aria-label": "Align right" },
    { "value": "justify", "icon": "AlignJustify", "aria-label": "Justify" }
  ]
} }
```

## Sizes

`md` (32 px tall, default) and `lg` (36 px tall). The pill and icon scale together.

```ken
{ "type": "Box", "props": { "gap": "space4", "align": "center" }, "children": [
  { "type": "ToggleGroup", "props": {
    "size": "md",
    "aria-label": "View mode (medium)",
    "defaultValue": "grid",
    "items": [
      { "value": "grid", "icon": "LayoutGrid", "aria-label": "Grid view" },
      { "value": "list", "icon": "List", "aria-label": "List view" }
    ]
  } },
  { "type": "ToggleGroup", "props": {
    "size": "lg",
    "aria-label": "View mode (large)",
    "defaultValue": "grid",
    "items": [
      { "value": "grid", "icon": "LayoutGrid", "aria-label": "Grid view" },
      { "value": "list", "icon": "List", "aria-label": "List view" }
    ]
  } }
] }
```

## Disabled item

A single option can be disabled — it greys out and becomes inert. The pill skips over it.

```ken
{ "type": "ToggleGroup", "props": {
  "aria-label": "Text alignment",
  "defaultValue": "left",
  "items": [
    { "value": "left", "icon": "AlignLeft", "aria-label": "Align left" },
    { "value": "center", "icon": "AlignCenter", "aria-label": "Align center" },
    { "value": "right", "icon": "AlignRight", "aria-label": "Align right", "disabled": true },
    { "value": "justify", "icon": "AlignJustify", "aria-label": "Justify" }
  ]
} }
```

## Disabled group

```ken
{ "type": "ToggleGroup", "props": {
  "disabled": true,
  "aria-label": "View mode",
  "defaultValue": "grid",
  "items": [
    { "value": "grid", "icon": "LayoutGrid", "aria-label": "Grid view" },
    { "value": "list", "icon": "List", "aria-label": "List view" }
  ]
} }
```

## Controlled

```tsx
const [view, setView] = React.useState('grid');

<ToggleGroup
  value={view}
  onValueChange={setView}
  aria-label="View mode"
  items={[
    { value: 'grid', icon: LayoutGrid, 'aria-label': 'Grid view' },
    { value: 'list', icon: List, 'aria-label': 'List view' },
  ]}
/>
```
