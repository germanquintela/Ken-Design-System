---
title: Timeline
component: Timeline
description: A dotted-rail step list — each step is a collapsible accordion row connected by a continuous vertical line.
status: stable
category: Display
---

Timeline shows a sequence of steps on a dotted vertical rail. Each step is an accordion row: click
its title to reveal or hide the body panel. The connecting line is continuous — it runs from the
centre of the first dot to the centre of the last, stretching as panels open and push content down.

The current (last) step is distinguished only while the timeline is `loading`. When loading, that
dot turns obsidian and bounces like a ball (squash-and-stretch with a gravity ease) to signal
in-progress work. Its title reads as primary instead of muted. Once loading ends, no step is
emphasised — every dot reads as history.

A step with no `children` has nothing to reveal, so it renders a plain non-interactive label
instead of a trigger (no chevron, not clickable).

## Basic

```ken
{ "type": "Timeline", "children": [
  { "type": "Timeline.Item", "props": { "title": "Connecting to bank" }, "children": "Authenticated with Plaid · Chase ••4821." },
  { "type": "Timeline.Item", "props": { "title": "Importing transactions" }, "children": "1,204 transactions imported across 3 accounts." },
  { "type": "Timeline.Item", "props": { "title": "Reconciling totals" }, "children": "Matching against the general ledger…" }
] }
```

## Loading

When `loading` is `true`, the last dot turns obsidian and bounces. This is the only in-progress
affordance — no spinner, no shimmer. The bounce animation is a squash-and-stretch loop: the dot
compresses slightly on the bottom (gravity contact) then stretches on the way up, lending it a
physical, reassuring quality. It stops the moment `loading` goes `false`.

```ken
{ "type": "Timeline", "props": { "loading": true }, "children": [
  { "type": "Timeline.Item", "props": { "title": "Connecting to bank" }, "children": "Done." },
  { "type": "Timeline.Item", "props": { "title": "Importing transactions" }, "children": "Done." },
  { "type": "Timeline.Item", "props": { "title": "Reconciling totals" }, "children": "Matching against the general ledger…" }
] }
```

## Steps without a body

A `Timeline.Item` with no children renders as a plain label row — no chevron, no expand gesture.
Mix expandable and label-only steps freely on the same rail.

```ken
{ "type": "Timeline", "children": [
  { "type": "Timeline.Item", "props": { "title": "Submitted" } },
  { "type": "Timeline.Item", "props": { "title": "Under review" } },
  { "type": "Timeline.Item", "props": { "title": "Approved" }, "children": "Finance approved this request on Jun 25, 2026." }
] }
```

## Controlled open state

Use `value` + `onValueChange` for controlled expansion, or `defaultValue` for uncontrolled. Each
step's identity defaults to its zero-based index; pass an explicit `value` prop on `Timeline.Item`
for a stable key that survives reordering.

By default `multiple={true}` — any combination of steps can be open at once. Set `multiple={false}`
to make it accordion-exclusive (opening one step closes the others).

```ken
{ "type": "Timeline", "props": { "defaultValue": [1] }, "children": [
  { "type": "Timeline.Item", "props": { "title": "Time is money. Save both." }, "children": "Step one detail." },
  { "type": "Timeline.Item", "props": { "title": "Time is money. Save both." }, "children": "This step is open by default — the rail stays continuous as the panel pushes the next step down." },
  { "type": "Timeline.Item", "props": { "title": "Time is money. Save both." }, "children": "Step three detail." }
] }
```
