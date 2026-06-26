---
title: FormInput
component: FormInput
description: A large-only text field where the label lives inside the shell and floats up on focus or fill.
status: stable
category: Forms
---

FormInput is the floating-label variant of `Input`. The label starts centered inside the box — acting as a visual placeholder — then animates up when the field is focused or has a value, leaving the typed text visible below it. There is no `size` prop: the control is large-only, matching the dense card-style forms common in Ramp's product.

The label is a real `<label>` via Base UI's `Field.Label`, not the native `placeholder` attribute, so it is always accessible.

For a plain field with an external label, see `Input`.

## Floating label

The label rests centered when empty and floats up on focus or fill.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space5" }, "children": [
  { "type": "FormInput", "props": { "label": "Empty — label centered" } },
  { "type": "FormInput", "props": { "label": "Filled — label floated", "defaultValue": "work@ramp.com" } }
] }
```

## States

Default, filled, disabled, and disabled-filled.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space5" }, "children": [
  { "type": "FormInput", "props": { "label": "Default" } },
  { "type": "FormInput", "props": { "label": "Filled", "defaultValue": "work@ramp.com" } },
  { "type": "FormInput", "props": { "label": "Disabled", "disabled": true } },
  { "type": "FormInput", "props": { "label": "Disabled filled", "disabled": true, "defaultValue": "work@ramp.com" } }
] }
```

## Trailing icon

`endIcon` places a decorative icon on the right, auto-sized to the large control. Use it for affordances like a search magnifier, calendar picker hint, or currency symbol.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space5" }, "children": [
  { "type": "FormInput", "props": { "label": "Search", "endIcon": { "type": "Icon", "props": { "name": "Search" } } } },
  { "type": "FormInput", "props": { "label": "Email", "defaultValue": "work@ramp.com", "endIcon": { "type": "Icon", "props": { "name": "Mail" } } } },
  { "type": "FormInput", "props": { "label": "Amount", "defaultValue": "1,250.00", "endIcon": { "type": "Icon", "props": { "name": "DollarSign" } } } }
] }
```

## Helper and error

`description` shows a helper line below. `error` flips the border and label to danger and replaces the helper with the error message.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space5" }, "children": [
  { "type": "FormInput", "props": { "label": "Work email", "description": "We'll only use this for receipts." } },
  { "type": "FormInput", "props": { "label": "Work email", "defaultValue": "not-an-email", "error": "Enter a valid email address." } }
] }
```
