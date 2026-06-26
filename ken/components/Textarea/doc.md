---
title: Textarea
component: Textarea
description: A multi-line text field that grows with its content by default.
status: stable
category: Forms
---

Textarea is the multi-line sibling of Input. By default it rests at three rows and
expands as the user types — no scrollbar, no drag handle. Passing `rows` opts out of
auto-grow and fixes the height. Use `seamless` to strip all chrome and embed the
field inside another surface.

## Default (auto-grow)

The field starts at three rows and grows to fit its content. It needs no `rows` prop.

```ken
{ "type": "Textarea", "props": { "label": "Notes", "placeholder": "Add a note…" } }
```

## Fixed height

Pass `rows` to set a fixed height. The field scrolls internally past that limit.

```ken
{ "type": "Textarea", "props": { "label": "Description", "placeholder": "Write something…", "rows": 6 } }
```

## Helper and error

A `description` line sits below the field. When `error` is set the border turns danger-red
and the description is replaced by the error message.

```ken
{ "type": "Textarea", "props": { "label": "Description", "placeholder": "Markdown is supported.", "description": "Markdown is supported." } }
```

## Disabled

```ken
{ "type": "Textarea", "props": { "label": "Memo", "disabled": true, "value": "Locked while the form submits." } }
```

## Seamless

`seamless` strips the border, background, focus ring, and padding — just an area to type
in. Embed it inside a card or a composer surface that supplies the container chrome.

```tsx
<div style={{ borderRadius: 8, border: '1px solid #e7e5e4', padding: 16 }}>
  <Textarea aria-label="Comment" seamless placeholder="Write a comment…" />
</div>
```
