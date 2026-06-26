---
title: Kbd
component: Kbd
description: A keyboard keycap chip — renders a key label or shortcut with the semantic <kbd> element.
status: stable
category: Display
---

`Kbd` renders a keyboard key as a styled chip using the semantic `<kbd>` element. It is the
canonical Ken keycap: SearchInput's `⌘K` trigger is built from it, and any inline shortcut hint
in the UI should use it. `KbdGroup` composes multiple caps in a row for chord shortcuts like
`⌘ + K` or `Ctrl + B`.

## Single keys

The `min-width` equals the cap height, so a single character reads as a square chip.

```ken
{ "type": "Box", "props": { "gap": "space2", "align": "center" }, "children": [
  { "type": "Kbd", "children": "K" },
  { "type": "Kbd", "children": "⌘" },
  { "type": "Kbd", "children": "⇧" },
  { "type": "Kbd", "children": "↵" },
  { "type": "Kbd", "children": "Esc" }
] }
```

## Sizes

Two density steps — `sm` (20 px cap) and `md` (24 px cap). The 12 px label stays the same across
both; only the surrounding chip height and min-width change.

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "Kbd", "props": { "size": "sm" }, "children": "⌘K" },
  { "type": "Kbd", "props": { "size": "md" }, "children": "⌘K" }
] }
```

## KbdGroup

`KbdGroup` lays separate keycaps in a row with the standard gap. Drop a plain `"+"` string
between caps for a combinator — no separator is auto-inserted, so you control the exact glyph.

```ken
{ "type": "Box", "props": { "gap": "space4", "align": "center" }, "children": [
  { "type": "KbdGroup", "children": [
    { "type": "Kbd", "children": "⌘" },
    { "type": "Kbd", "children": "K" }
  ] },
  { "type": "KbdGroup", "children": [
    { "type": "Kbd", "children": "Ctrl" },
    "+",
    { "type": "Kbd", "children": "B" }
  ] },
  { "type": "KbdGroup", "children": [
    { "type": "Kbd", "children": "⌘" },
    { "type": "Kbd", "children": "⇧" },
    { "type": "Kbd", "children": "P" }
  ] }
] }
```

## Inline with text

`Kbd` centres against surrounding text at any size — drop it inline without extra wrapper markup.

```ken
{ "type": "Box", "props": { "gap": "space1", "align": "center" }, "children": [
  { "type": "Text", "props": { "size": "body" }, "children": "Press" },
  { "type": "Kbd", "props": { "size": "sm" }, "children": "⌘K" },
  { "type": "Text", "props": { "size": "body" }, "children": "to open search" }
] }
```
