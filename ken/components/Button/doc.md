---
title: Button
component: Button
description: Triggers an action — the primary way a person commits to something in the UI.
status: stable
category: Actions
hero: /components/button.webp
---

Buttons commit to an action. Reach for the **primary** variant for the single most
important action on a view; use **subtle** or **ghost** for secondary actions so the
hierarchy stays legible.

## Variants

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "Button", "props": { "variant": "primary" }, "children": "Primary" },
  { "type": "Button", "props": { "variant": "subtle" }, "children": "Subtle" },
  { "type": "Button", "props": { "variant": "ghost" }, "children": "Ghost" }
] }
```

## Sizes

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "Button", "props": { "size": "sm" }, "children": "Small" },
  { "type": "Button", "props": { "size": "md" }, "children": "Medium" },
  { "type": "Button", "props": { "size": "lg" }, "children": "Large" }
] }
```

## Loading

A loading button shows a spinner and is inert while the action is in flight.

```ken
{ "type": "Button", "props": { "loading": true }, "children": "Saving…" }
```
