---
title: Badge
component: Badge
description: A compact label that communicates category, status, or metadata at a glance.
status: stable
category: Display
hero: /components/badge.webp
---

Badge carries two surfaces keyed to `status`. The `neutral` default is a filled
limestone chip — use it for plain tags and category labels. Every other status
(`success`, `warning`, `error`, `info`) renders an outlined white chip; the status
hue is carried by the optional `icon` only — the text stays charcoal, keeping dense
tables readable at a glance.

## Neutral

```ken
{ "type": "Box", "props": { "gap": "space2", "align": "center" }, "children": [
  { "type": "Badge", "children": "Receivables & Revenue" },
  { "type": "Badge", "props": { "icon": { "type": "Icon", "props": { "name": "Box" } } }, "children": "Inventory" }
] }
```

## Status variants

The icon is tinted by the status; the label stays secondary (dark-smoke).

```ken
{ "type": "Box", "props": { "gap": "space2", "align": "center" }, "children": [
  { "type": "Badge", "props": { "status": "success", "icon": { "type": "Icon", "props": { "name": "CheckCircle2" } } }, "children": "Paid" },
  { "type": "Badge", "props": { "status": "warning", "icon": { "type": "Icon", "props": { "name": "AlertTriangle" } } }, "children": "Review" },
  { "type": "Badge", "props": { "status": "error", "icon": { "type": "Icon", "props": { "name": "XCircle" } } }, "children": "Declined" },
  { "type": "Badge", "props": { "status": "info", "icon": { "type": "Icon", "props": { "name": "Info" } } }, "children": "Info" }
] }
```

## Sizes

`sm` and `md` (default). The icon and horizontal padding scale; the 12 px text stays fixed.

```ken
{ "type": "Box", "props": { "gap": "space2", "align": "center" }, "children": [
  { "type": "Badge", "props": { "size": "sm", "status": "success", "icon": { "type": "Icon", "props": { "name": "CheckCircle2" } } }, "children": "Small" },
  { "type": "Badge", "props": { "size": "md", "status": "success", "icon": { "type": "Icon", "props": { "name": "CheckCircle2" } } }, "children": "Medium" }
] }
```
