---
title: Separator
component: Separator
description: A hairline divider between sections or inline items.
status: stable
category: Layout
hero: /components/separator.webp
---

Separator is a single-purpose component wrapping Base UI's `Separator` primitive,
which renders the correct `role="separator"` and `aria-orientation` automatically.
The hairline is painted as a 1px `background` (not a border) so it stays a true
single-pixel line regardless of device pixel ratio.

Separator carries no built-in margin — the parent is responsible for spacing. This
keeps the component predictable: it never fights with the layout around it.

## Horizontal

The default. Fills the available inline width of its container.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space3", "width": "space64" }, "children": [
  { "type": "Text", "props": { "size": "body" }, "children": "Account settings" },
  { "type": "Separator" },
  { "type": "Text", "props": { "size": "body" }, "children": "Billing" },
  { "type": "Separator" },
  { "type": "Text", "props": { "size": "body" }, "children": "Members" }
] }
```

## Tone

Two weights: `default` is the standard divider (bone); `subtle` is the faintest
hairline — used for table gridlines and dense lists where a lighter hand is needed.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space3", "width": "space64" }, "children": [
  { "type": "Text", "props": { "size": "caption", "tone": "tertiary" }, "children": "default" },
  { "type": "Separator", "props": { "tone": "default" } },
  { "type": "Text", "props": { "size": "caption", "tone": "tertiary" }, "children": "subtle" },
  { "type": "Separator", "props": { "tone": "subtle" } }
] }
```

## Vertical

`orientation="vertical"` flips to a 1px-wide, `align-self: stretch` line that fills
the flex row's height. It requires a flex-row parent with a defined height or
`align-items` that gives it something to stretch into.

```tsx
<Box direction="row" align="center" gap="space3" height={20}>
  <Text size="body">Edit</Text>
  <Separator orientation="vertical" />
  <Text size="body">Duplicate</Text>
  <Separator orientation="vertical" />
  <Text size="body">Delete</Text>
</Box>
```
