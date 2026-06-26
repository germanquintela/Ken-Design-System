---
title: StackLogo
component: StackLogo
description: The Stack brand mark — a honeycomb of 7 dots, static or wobbling.
status: stable
category: Display
hero: /components/stacklogo.webp
---

StackLogo renders the Stack isotype: seven dots arranged in a hexagonal honeycomb (one centre dot ringed by six). It has two states. At rest it is a flat, still mark — an `img` in the accessibility tree labelled "Stack". Under `loading` it becomes a `status` element: the mark tilts into a 3D conical wobble, blooms out to full tilt, sweeps one clockwise circle, settles back to flat, pauses, then repeats. The centre dot is pinned on the wobble's rotation axis so it never moves — only the outer ring sways.

This motion is deliberate: it evokes orbital mechanics (a gyroscope, a precessing top) rather than a simple spin, which would feel generic. The logo stays recognisable at every stage because it never flips.

## Sizes

```ken
{ "type": "Box", "props": { "gap": "space6", "align": "center" }, "children": [
  { "type": "StackLogo", "props": { "size": "xs" } },
  { "type": "StackLogo", "props": { "size": "sm" } },
  { "type": "StackLogo", "props": { "size": "md" } }
] }
```

## Loading state

Pass `loading` to activate the 3D wobble. Use it wherever the app is doing background work and you want the brand mark itself to carry the loading signal — a header slot, a splash screen, an empty-panel transition.

```ken
{ "type": "Box", "props": { "gap": "space6", "align": "center" }, "children": [
  { "type": "StackLogo", "props": { "size": "xs", "loading": true } },
  { "type": "StackLogo", "props": { "size": "sm", "loading": true } },
  { "type": "StackLogo", "props": { "size": "md", "loading": true } }
] }
```

## Accessibility

Static mark → `role="img"` labelled "Stack". Loading → `role="status"` labelled "Loading". Pass `aria-hidden` to suppress both when the logo is decorative (e.g. inside a nav bar that already has a text label).

`prefers-reduced-motion` freezes the animation and applies a gentle pulse instead — the mark stays recognisable at all times.
