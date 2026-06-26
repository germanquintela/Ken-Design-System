---
title: Text
component: Text
description: The typographic primitive — every string in Ken flows through Text.
status: stable
category: Layout
---

Text is the polymorphic typography primitive. Like Box, it carries no `className` or
raw `style` escape hatch — every visual decision comes from a typed prop. Its `size`
prop doesn't name a pixel value; it names a semantic role (e.g. `body`, `heading`)
that resolves to a paired `fontSize` + `lineHeight`. Changing a token updates every
instance that uses it.

Text defaults to a `<span>` (inline). Pass `as="p"` for block paragraphs, `as="h2"`
for headings, `as="label"` for form labels.

## Size scale

Nine curated roles, each coupling a font size with its matching line height. Prefer
these over a raw number — the scale was tuned to Lausanne's optical metrics.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space3" }, "children": [
  { "type": "Text", "props": { "size": "footnote" }, "children": "footnote — 12px" },
  { "type": "Text", "props": { "size": "caption" }, "children": "caption — 13px" },
  { "type": "Text", "props": { "size": "body" }, "children": "body — 16px" },
  { "type": "Text", "props": { "size": "subheading" }, "children": "subheading — 18px" },
  { "type": "Text", "props": { "size": "heading" }, "children": "heading — 24px" },
  { "type": "Text", "props": { "size": "headingLg" }, "children": "headingLg — 28px" }
] }
```

## Tone ladder

Three foreground tones build hierarchy without needing font-weight changes. Lausanne
ships one weight; emphasis comes from color contrast and size, not boldness.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space3" }, "children": [
  { "type": "Text", "props": { "tone": "primary" }, "children": "primary — charcoal" },
  { "type": "Text", "props": { "tone": "secondary" }, "children": "secondary — dark smoke" },
  { "type": "Text", "props": { "tone": "tertiary" }, "children": "tertiary — smoke" }
] }
```

## Polymorphic `as`

`as` emits the right semantic element without leaving Ken's styled system. Pair it
with a size and tone; the visual output is identical regardless of the tag.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space4" }, "children": [
  { "type": "Text", "props": { "as": "h2", "size": "heading" }, "children": "Rendered as h2" },
  { "type": "Text", "props": { "as": "p", "size": "body", "tone": "secondary" }, "children": "Rendered as p — a block paragraph in secondary tone." },
  { "type": "Text", "props": { "as": "label", "size": "caption", "tone": "tertiary" }, "children": "Rendered as label" }
] }
```

## Alignment

`align` sets `text-align`. It only emits a rule when set (default is `start` = no rule),
so alignment doesn't override inherited context.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space3", "width": "full" }, "children": [
  { "type": "Text", "props": { "align": "start", "size": "body" }, "children": "start (default)" },
  { "type": "Text", "props": { "align": "center", "size": "body" }, "children": "center" },
  { "type": "Text", "props": { "align": "end", "size": "body" }, "children": "end" }
] }
```

## Truncate

`truncate` clips to a single line with a trailing ellipsis. The parent must constrain
the width — Text itself doesn't set `max-width`.

```ken
{ "type": "Box", "props": { "width": "space48", "border": "borderSubtle", "p": "space2" }, "children": [
  { "type": "Text", "props": { "truncate": true, "size": "body" }, "children": "This sentence is longer than the container and will be clipped." }
] }
```
