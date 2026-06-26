---
title: Switch
component: Switch
description: An instant binary toggle — on or off — for settings that take effect without a submit step.
status: stable
category: Forms
hero: /components/switch.webp
---

Switch is built on Base UI's headless Switch primitive. The on state is always success green — there is no `color` prop. This is a deliberate design decision: green means "active", and mixing colors would undermine that signal. For a selection control that supports multiple states or neutral checked fills, use `Checkbox`.

The `label` prop auto-associates via `htmlFor`/`id`, so clicking the label toggles the switch once without any double-fire.

## States

Off, on, and their disabled twins. On is always success green.

```ken
{ "type": "Box", "props": { "gap": "space6", "align": "center" }, "children": [
  { "type": "Switch", "props": { "label": "Off" } },
  { "type": "Switch", "props": { "label": "On", "defaultChecked": true } },
  { "type": "Switch", "props": { "label": "Disabled off", "disabled": true } },
  { "type": "Switch", "props": { "label": "Disabled on", "disabled": true, "defaultChecked": true } }
] }
```

## Sizes

The compact two-step scale. Track, knob, label, and gap all scale together.

```ken
{ "type": "Box", "props": { "gap": "space6", "align": "center" }, "children": [
  { "type": "Switch", "props": { "label": "Small", "defaultChecked": true, "size": "sm" } },
  { "type": "Switch", "props": { "label": "Medium", "defaultChecked": true, "size": "md" } }
] }
```

## Without a label

When `label` is omitted, supply an accessible name via `aria-label`.

```ken
{ "type": "Box", "props": { "gap": "space4", "align": "center" }, "children": [
  { "type": "Switch", "props": { "aria-label": "Standalone off" } },
  { "type": "Switch", "props": { "aria-label": "Standalone on", "defaultChecked": true } }
] }
```
