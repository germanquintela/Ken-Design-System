---
title: Select
component: Select
description: A dropdown that lets a person choose one option from a list — or several, with MultiSelect.
status: stable
category: Forms
hero: /components/select.webp
---

The Select family covers two shapes. `Select` is a rectangular field for single
choice — the trigger shows the placeholder until an option is chosen, then swaps
the leading icon and label to match. `MultiSelect` is a rounded-full filter pill
for multi-choice — selections appear as white pills inside the trigger, collapsing
into a "+N" chip past `maxVisiblePills`.

Both share the same `options` data array and the same dropdown (trailing checkmarks,
keyed icon slots, disabled rows).

## Select — basic

Each option may carry an `icon` (a string Lucide name). Once the user picks one, that
icon slides into the trigger's leading slot.

```ken
{ "type": "Select", "props": {
  "placeholder": "Status",
  "options": [
    { "value": "todo", "label": "To do", "icon": "Circle" },
    { "value": "in-progress", "label": "In progress", "icon": "CircleDot" },
    { "value": "done", "label": "Done", "icon": "CheckCircle2" }
  ]
} }
```

## Select — sizes

`sm` (32 px) and `md` (36 px, default).

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "Select", "props": {
    "size": "sm",
    "placeholder": "Small",
    "options": [
      { "value": "a", "label": "Option A" },
      { "value": "b", "label": "Option B" }
    ]
  } },
  { "type": "Select", "props": {
    "size": "md",
    "placeholder": "Medium",
    "options": [
      { "value": "a", "label": "Option A" },
      { "value": "b", "label": "Option B" }
    ]
  } }
] }
```

## Select — disabled

The whole control is inert — no hover, no open.

```ken
{ "type": "Select", "props": {
  "disabled": true,
  "placeholder": "Status",
  "options": [
    { "value": "todo", "label": "To do" },
    { "value": "done", "label": "Done" }
  ]
} }
```

## Select — controlled

Use `value` + `onValueChange` when the selection drives other state.

```tsx
const [status, setStatus] = React.useState<string | null>(null);

<Select
  value={status}
  onValueChange={setStatus}
  placeholder="Status"
  options={[
    { value: 'todo', label: 'To do' },
    { value: 'in-progress', label: 'In progress' },
    { value: 'done', label: 'Done' },
  ]}
/>
```

---

## MultiSelect

`MultiSelect` renders a rounded-full pill trigger. Each chosen option becomes a white
pill inside the trigger; once the visible count exceeds `maxVisiblePills` (default 2)
the rest collapse into a `+N` chip.

```ken
{ "type": "MultiSelect", "props": {
  "placeholder": "Status",
  "icon": { "type": "Icon", "props": { "name": "SlidersHorizontal" } },
  "options": [
    { "value": "todo", "label": "To do", "icon": "Circle" },
    { "value": "in-progress", "label": "In progress", "icon": "CircleDot" },
    { "value": "done", "label": "Done", "icon": "CheckCircle2" }
  ]
} }
```

## MultiSelect — overflow

When the selection exceeds `maxVisiblePills`, the rest render as a single `+N` chip.

```ken
{ "type": "MultiSelect", "props": {
  "placeholder": "Status",
  "defaultValue": ["todo", "in-progress", "done"],
  "maxVisiblePills": 2,
  "options": [
    { "value": "todo", "label": "To do" },
    { "value": "in-progress", "label": "In progress" },
    { "value": "done", "label": "Done" }
  ]
} }
```

## MultiSelect — controlled

```tsx
const [value, setValue] = React.useState<string[]>(['todo']);

<MultiSelect
  value={value}
  onValueChange={setValue}
  placeholder="Status"
  options={[
    { value: 'todo', label: 'To do' },
    { value: 'in-progress', label: 'In progress' },
    { value: 'done', label: 'Done' },
  ]}
/>
```
