---
title: IconButton
component: IconButton
description: An icon-only action button — the same recipe as Button, but square and label-free.
status: stable
category: Actions
---

IconButton is a single-icon action control. It shares the full button recipe with Button and
LinkButton — the same seven variants, the same three sizes, the same focus ring and press
scale — but renders a square footprint with no visible text. Because there is no label, an
`aria-label` is required at the type level: an icon-only button with no accessible name is an
a11y bug the type system refuses to let ship.

## Variants

All seven colour treatments from Button are available.

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "IconButton", "props": { "variant": "default", "aria-label": "Add" }, "children": { "type": "Icon", "props": { "name": "Plus" } } },
  { "type": "IconButton", "props": { "variant": "subtle", "aria-label": "Add" }, "children": { "type": "Icon", "props": { "name": "Plus" } } },
  { "type": "IconButton", "props": { "variant": "secondary", "aria-label": "Add" }, "children": { "type": "Icon", "props": { "name": "Plus" } } },
  { "type": "IconButton", "props": { "variant": "ghost", "aria-label": "More" }, "children": { "type": "Icon", "props": { "name": "MoreHorizontal" } } },
  { "type": "IconButton", "props": { "variant": "success", "aria-label": "Confirm" }, "children": { "type": "Icon", "props": { "name": "Check" } } },
  { "type": "IconButton", "props": { "variant": "danger", "aria-label": "Delete" }, "children": { "type": "Icon", "props": { "name": "Trash2" } } }
] }
```

## Shapes

`square` keeps the control-family radius; `circle` goes fully round — useful for avatar-adjacent
actions or floating triggers.

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "IconButton", "props": { "shape": "square", "aria-label": "Add" }, "children": { "type": "Icon", "props": { "name": "Plus" } } },
  { "type": "IconButton", "props": { "shape": "circle", "aria-label": "Add" }, "children": { "type": "Icon", "props": { "name": "Plus" } } }
] }
```

## Sizes

Heights mirror the Button scale (32 / 36 / 44 px) so an IconButton lines up with a same-size Button.

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "IconButton", "props": { "size": "sm", "aria-label": "Add" }, "children": { "type": "Icon", "props": { "name": "Plus" } } },
  { "type": "IconButton", "props": { "size": "md", "aria-label": "Add" }, "children": { "type": "Icon", "props": { "name": "Plus" } } },
  { "type": "IconButton", "props": { "size": "lg", "aria-label": "Add" }, "children": { "type": "Icon", "props": { "name": "Plus" } } }
] }
```

## Loading

`loading` replaces the icon with a Spinner and marks the button inert (`aria-busy` / `aria-disabled`,
pointer-events blocked) — without native `disabled`, so it keeps its live colour rather than going grey.

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "IconButton", "props": { "variant": "default", "loading": true, "aria-label": "Add" }, "children": { "type": "Icon", "props": { "name": "Plus" } } },
  { "type": "IconButton", "props": { "variant": "secondary", "loading": true, "aria-label": "Add" }, "children": { "type": "Icon", "props": { "name": "Plus" } } },
  { "type": "IconButton", "props": { "variant": "default", "shape": "circle", "loading": true, "aria-label": "Send" }, "children": { "type": "Icon", "props": { "name": "Send" } } }
] }
```
