---
title: Logo
component: Logo
description: The Ramp logo — mark (swoosh) or wordmark — as a scalable inline SVG.
status: stable
category: Display
hero: /components/logo.webp
---

Logo renders the Ramp brand lockup as an inline SVG painted in `currentColor`, so `tone` controls the colour without breaking out of the token system. Two lockups are available: `mark` (the swoosh isotype alone) and `wordmark` (the full "ramp" logotype beside the swoosh). Both scale by height and preserve their own aspect ratio — no squishing, no resampling.

## Lockups

```ken
{ "type": "Box", "props": { "gap": "space6", "align": "center" }, "children": [
  { "type": "Logo", "props": { "type": "mark", "size": "md" } },
  { "type": "Logo", "props": { "type": "wordmark", "size": "md" } }
] }
```

## Sizes

Heights follow the xs / sm / md scale (16 / 24 / 32 px). Both lockups respect the same scale; aspect ratio is intrinsic to each.

```ken
{ "type": "Box", "props": { "gap": "space5", "align": "center" }, "children": [
  { "type": "Logo", "props": { "size": "xs" } },
  { "type": "Logo", "props": { "size": "sm" } },
  { "type": "Logo", "props": { "size": "md" } }
] }
```

## Tones

`default` (obsidian near-black) for light surfaces, `muted` (grey) for de-emphasised contexts, `inverse` (white) for dark surfaces.

```ken
{ "type": "Box", "props": { "gap": "space5", "align": "center" }, "children": [
  { "type": "Logo", "props": { "tone": "default", "size": "sm" } },
  { "type": "Logo", "props": { "tone": "muted", "size": "sm" } }
] }
```

`inverse` should be placed on a dark surface — use a Box or container with a dark background token around it in your layout.

## Accessibility

Logo renders `role="img"` with `aria-label="Ramp"` by default. Pass `aria-hidden` when the logo is decorative (e.g. in a nav bar that already carries a visible "Ramp" text label).
