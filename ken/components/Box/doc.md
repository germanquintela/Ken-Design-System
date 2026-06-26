---
title: Box
component: Box
description: The polymorphic layout primitive — every Ken surface is composed from Boxes.
status: stable
category: Layout
---

Box is the no-escape-hatch foundation of Ken's layout system. There is no raw `<div>`
in Ken — everything is a Box (or a primitive like Stack, Grid, or Text that composes
one internally). Its typed prop surface means the autocomplete only offers token values;
an off-system value like `gap="13px"` won't type-check.

Box defaults to `display: flex`, so it doubles as both a row and a column without
requiring a wrapper component.

## Direction and gap

`direction` sets the main flex axis. `gap` accepts a spacing token.

```ken
{ "type": "Box", "props": { "gap": "space6", "align": "start" }, "children": [
  { "type": "Box", "props": { "direction": "row", "gap": "space3", "p": "space4", "border": "borderDefault" }, "children": [
    { "type": "Text", "children": "row" },
    { "type": "Text", "props": { "tone": "secondary" }, "children": "·" },
    { "type": "Text", "children": "layout" }
  ] },
  { "type": "Box", "props": { "direction": "column", "gap": "space3", "p": "space4", "border": "borderDefault" }, "children": [
    { "type": "Text", "children": "column" },
    { "type": "Text", "children": "layout" }
  ] }
] }
```

## Alignment

`align` controls the cross-axis; `justify` distributes along the main axis.

```ken
{ "type": "Box", "props": { "gap": "space4", "direction": "column" }, "children": [
  { "type": "Box", "props": { "direction": "row", "align": "center", "justify": "between", "p": "space3", "border": "borderSubtle" }, "children": [
    { "type": "Text", "props": { "size": "caption", "tone": "secondary" }, "children": "align: center · justify: between" },
    { "type": "Button", "props": { "variant": "subtle", "size": "sm" }, "children": "Action" }
  ] },
  { "type": "Box", "props": { "direction": "row", "align": "end", "justify": "end", "gap": "space2", "p": "space3", "border": "borderSubtle" }, "children": [
    { "type": "Button", "props": { "variant": "ghost", "size": "sm" }, "children": "Cancel" },
    { "type": "Button", "props": { "variant": "primary", "size": "sm" }, "children": "Save" }
  ] }
] }
```

## Padding

Padding props (`p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`) accept spacing tokens only —
no raw px values.

```ken
{ "type": "Box", "props": { "direction": "row", "gap": "space4", "align": "start" }, "children": [
  { "type": "Box", "props": { "p": "space2", "border": "borderDefault" }, "children": [
    { "type": "Text", "props": { "size": "caption" }, "children": "p: space2" }
  ] },
  { "type": "Box", "props": { "p": "space4", "border": "borderDefault" }, "children": [
    { "type": "Text", "props": { "size": "caption" }, "children": "p: space4" }
  ] },
  { "type": "Box", "props": { "px": "space6", "py": "space3", "border": "borderDefault" }, "children": [
    { "type": "Text", "props": { "size": "caption" }, "children": "px: space6 · py: space3" }
  ] }
] }
```

## Sizing

Sizing accepts token keywords (`full`, `fit`, `min`, `max`), space-scale tokens
(`space96` = 384px), bare numbers (→ px), or any CSS string. This is the one axis
with a raw-value escape hatch — container dimensions are legitimately off-scale;
brand color and spacing are not.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space3" }, "children": [
  { "type": "Box", "props": { "width": "full", "p": "space2", "border": "borderSubtle" }, "children": [
    { "type": "Text", "props": { "size": "caption", "tone": "secondary" }, "children": "width: full" }
  ] },
  { "type": "Box", "props": { "width": "fit", "p": "space2", "border": "borderSubtle" }, "children": [
    { "type": "Text", "props": { "size": "caption", "tone": "secondary" }, "children": "width: fit" }
  ] }
] }
```

## Responsive props

Layout-critical props (`direction`, `gap`, `display`, `align`, `justify`, `flex`,
`width`, `height`, and padding) accept a `{ base, md }` pair instead of a scalar.
`base` is the mobile-first default; `md` overrides at ≥ 768px.

```tsx
<Box
  direction={{ base: 'column', md: 'row' }}
  gap={{ base: 'space2', md: 'space6' }}
  p="space4"
>
  <Box flex="1">Sidebar</Box>
  <Box flex={{ base: '1', md: 'none' }}>Content</Box>
</Box>
```

## Polymorphic `as`

`as` renders any HTML element or component while keeping the full typed prop surface.
There is no `className` or raw `style` escape hatch — `as` is how you emit semantic
markup without sacrificing the LLM-safe contract.

```ken
{ "type": "Box", "props": { "as": "ul", "direction": "column", "gap": "space2", "p": "space4", "border": "borderSubtle" }, "children": [
  { "type": "Box", "props": { "as": "li" }, "children": [
    { "type": "Text", "props": { "size": "body" }, "children": "Line item one" }
  ] },
  { "type": "Box", "props": { "as": "li" }, "children": [
    { "type": "Text", "props": { "size": "body" }, "children": "Line item two" }
  ] }
] }
```

## Border hairlines

`border`, `borderTop`, `borderRight`, `borderBottom`, `borderLeft` each accept a
border token and paint a 1px line in the matching color. Useful for toolbar dividers
and inline separators where a full `<Separator>` is overkill.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space4" }, "children": [
  { "type": "Box", "props": { "direction": "row", "align": "center", "justify": "between", "px": "space4", "py": "space3", "borderBottom": "borderDefault" }, "children": [
    { "type": "Text", "props": { "size": "subheading" }, "children": "Toolbar" },
    { "type": "Button", "props": { "variant": "ghost", "size": "sm" }, "children": "Options" }
  ] }
] }
```
