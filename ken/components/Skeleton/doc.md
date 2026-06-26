---
title: Skeleton
component: Skeleton
description: A pulsing placeholder that holds space while content loads.
status: stable
category: Feedback
hero: /components/skeleton.webp
---

Skeleton reserves layout space before content arrives so the page doesn't shift when it loads. Pick the variant that matches the shape of what's coming — `text` for copy, `circle` for avatars, `rect` for images or cards — and the visual rhythm stays intact during the wait.

Skeleton is `aria-hidden` by default: it's a decorative placeholder. The consumer owns the accessible loading signal (e.g. `aria-busy` on the region it replaces).

## Variants

```ken
{ "type": "Box", "props": { "gap": "space6", "direction": "column", "align": "start" }, "children": [
  { "type": "Skeleton", "props": { "variant": "text" } },
  { "type": "Skeleton", "props": { "variant": "text", "lines": 4 } }
] }
```

## Circle

Mirrors Avatar's size scale — drop a circle wherever an avatar will appear.

```ken
{ "type": "Box", "props": { "gap": "space4", "align": "center" }, "children": [
  { "type": "Skeleton", "props": { "variant": "circle", "size": "sm" } },
  { "type": "Skeleton", "props": { "variant": "circle", "size": "md" } },
  { "type": "Skeleton", "props": { "variant": "circle", "size": "lg" } }
] }
```

## Rect

A block placeholder that fills its container. Pair it with a sized Box to hold the exact slot (image, card, chart area).

```ken
{ "type": "Skeleton", "props": { "variant": "rect" } }
```

## Composition

Compose variants to ghost an entire list row — a circle beside stacked text bars mirrors the real layout's structure.

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "Skeleton", "props": { "variant": "circle", "size": "lg" } },
  { "type": "Box", "props": { "direction": "column", "gap": "space2", "style": { "flex": 1 } }, "children": [
    { "type": "Skeleton", "props": { "variant": "text" } },
    { "type": "Skeleton", "props": { "variant": "text", "lines": 1 } }
  ] }
] }
```

## Motion note

The pulse animation runs on a 1.5 s loop — the one documented exception to Ken's general < 300 ms motion rule. Unlike interaction feedback, a skeleton is passive: it conveys "something is coming" rather than responding to input, so a longer, breathing cadence reads naturally rather than as a UI reaction. It is suppressed entirely under `prefers-reduced-motion`.
