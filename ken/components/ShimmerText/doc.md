---
title: ShimmerText
component: ShimmerText
description: Text in solid obsidian with a faint light band sweeping across it — a quiet "working" signal.
status: stable
category: Display
---

ShimmerText is a sibling of `Text`, not a wrapper. It reuses Text's full typography contract (the same `size` values, the same paired fontSize + lineHeight) but replaces the flat colour with a gradient band that sweeps across the text on a slow, endless loop. The effect is deliberately barely-there — obsidian letters with a lighter sheen passing through — rather than a bright animation.

Use it as a quiet in-line loading signal when a Spinner would be too heavy: an "Analyzing transactions…" label beside other UI, a heading while a panel is building its content. Because the colour is owned entirely by the shimmer gradient, there is no `tone` prop — every instance is obsidian on light.

## Sizes

ShimmerText accepts the same `size` scale as `Text`. The sheen sweeps at the same speed regardless of size.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space4", "align": "start" }, "children": [
  { "type": "ShimmerText", "props": { "size": "footnote" }, "children": "Footnote shimmer · 12" },
  { "type": "ShimmerText", "props": { "size": "caption" }, "children": "Caption shimmer · 13" },
  { "type": "ShimmerText", "props": { "size": "body" }, "children": "Body shimmer · 16" },
  { "type": "ShimmerText", "props": { "size": "subheading" }, "children": "Subheading shimmer · 18" },
  { "type": "ShimmerText", "props": { "size": "heading" }, "children": "Heading shimmer · 24" },
  { "type": "ShimmerText", "props": { "size": "headingLg" }, "children": "Heading Lg shimmer · 28" }
] }
```

## Polymorphic `as`

Like `Text`, ShimmerText renders as any element — `span` by default, but pass `h1`–`h6`, `p`, `strong`, or any semantic tag.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space4", "align": "start" }, "children": [
  { "type": "ShimmerText", "props": { "as": "h2", "size": "heading" }, "children": "Crafting something special" },
  { "type": "ShimmerText", "props": { "as": "p", "size": "body" }, "children": "A barely-there gleam travels across the obsidian text on a slow loop." }
] }
```

## As a loading label

The most common use: a quiet status line while work is happening in the background.

```ken
{ "type": "ShimmerText", "props": { "size": "caption" }, "children": "Analyzing transactions…" }
```

Under `prefers-reduced-motion` the animation stops and the text renders as solid obsidian — same token, no shimmer.
