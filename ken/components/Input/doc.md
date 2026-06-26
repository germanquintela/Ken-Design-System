---
title: Input
component: Input
description: A single-line text field with an optional external label, prefix/suffix slots, and inline validation feedback.
status: stable
category: Forms
hero: /components/input.webp
---

Input is a plain text field on Base UI's `Field`. The label sits above the shell (not floating) and is accessible via `htmlFor`/`id`. Helper and error lines wire `aria-describedby` automatically — the field reads as invalid when `error` is set.

For a floating-label variant, see `FormInput`.

## Sizes

Height and text scale with `size`. The three steps match Button, Select, and the rest of the control family.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space5" }, "children": [
  { "type": "Input", "props": { "label": "Small", "size": "sm", "placeholder": "you@ramp.com" } },
  { "type": "Input", "props": { "label": "Medium", "size": "md", "placeholder": "you@ramp.com" } },
  { "type": "Input", "props": { "label": "Large", "size": "lg", "placeholder": "you@ramp.com" } }
] }
```

## Prefix and suffix

`prefix` and `suffix` accept a Lucide icon or a short text string like `"$"` or `"USD"`. Icons auto-size to the control; text is left as-is.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space5" }, "children": [
  { "type": "Input", "props": { "label": "Search", "placeholder": "Search…", "prefix": { "type": "Icon", "props": { "name": "Search" } } } },
  { "type": "Input", "props": { "label": "Amount", "placeholder": "0.00", "prefix": "$", "suffix": "USD" } },
  { "type": "Input", "props": { "label": "Email", "placeholder": "you@ramp.com", "suffix": { "type": "Icon", "props": { "name": "Mail" } } } }
] }
```

## States

Default and disabled. When disabled, the shell is muted and slots dim.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space5" }, "children": [
  { "type": "Input", "props": { "label": "Default", "placeholder": "you@ramp.com" } },
  { "type": "Input", "props": { "label": "Disabled", "disabled": true, "defaultValue": "work@ramp.com" } }
] }
```

## Helper and error

`description` shows a helper line below the field. Setting `error` flips the border to danger and replaces the helper with the error message — the field also reads as `aria-invalid`.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space5" }, "children": [
  { "type": "Input", "props": { "label": "Work email", "placeholder": "you@ramp.com", "description": "We'll only use this for receipts." } },
  { "type": "Input", "props": { "label": "Work email", "defaultValue": "not-an-email", "error": "Enter a valid email address." } }
] }
```
