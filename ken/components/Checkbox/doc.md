---
title: Checkbox
component: Checkbox
description: A binary control — checked or unchecked — for selecting one or more options from a set.
status: stable
category: Forms
hero: /components/checkbox.webp
---

Checkbox is built on Base UI's headless primitive, so focus, keyboard toggle, and the hidden `<input>` come for free. The `label` prop auto-associates via `htmlFor`/`id` — no wrapping `<label>` needed, no double-fire.

## States

The four resting states: unchecked, checked, and their disabled twins.

```ken
{ "type": "Box", "props": { "gap": "space6", "align": "center" }, "children": [
  { "type": "Checkbox", "props": { "label": "Unchecked" } },
  { "type": "Checkbox", "props": { "label": "Checked", "defaultChecked": true } },
  { "type": "Checkbox", "props": { "label": "Disabled", "disabled": true } },
  { "type": "Checkbox", "props": { "label": "Disabled checked", "disabled": true, "defaultChecked": true } }
] }
```

## Colors

`color` only changes the checked fill — the default obsidian/charcoal box vs. a success green. Use `success` when the checked state signals a positive outcome (e.g. "task complete").

```ken
{ "type": "Box", "props": { "gap": "space6", "align": "center" }, "children": [
  { "type": "Checkbox", "props": { "label": "Default", "defaultChecked": true, "color": "default" } },
  { "type": "Checkbox", "props": { "label": "Success", "defaultChecked": true, "color": "success" } }
] }
```

## Sizes

The compact two-step scale. Box, tick, label, and gap all scale together.

```ken
{ "type": "Box", "props": { "gap": "space6", "align": "center" }, "children": [
  { "type": "Checkbox", "props": { "label": "Small", "defaultChecked": true, "size": "sm" } },
  { "type": "Checkbox", "props": { "label": "Medium", "defaultChecked": true, "size": "md" } }
] }
```

## Without a label

When `label` is omitted, supply an accessible name via `aria-label` — the box alone is the full control.

```ken
{ "type": "Box", "props": { "gap": "space4", "align": "center" }, "children": [
  { "type": "Checkbox", "props": { "aria-label": "Standalone unchecked" } },
  { "type": "Checkbox", "props": { "aria-label": "Standalone checked", "defaultChecked": true } },
  { "type": "Checkbox", "props": { "aria-label": "Standalone success", "defaultChecked": true, "color": "success" } }
] }
```
