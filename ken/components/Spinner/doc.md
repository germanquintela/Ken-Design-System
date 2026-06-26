---
title: Spinner
component: Spinner
description: An animated arc that signals an action is in progress.
status: stable
category: Feedback
hero: /components/spinner.webp
---

Spinner communicates that the UI is busy — a network request, a file upload, a background job. Use it in contexts where the action's duration is unknown and no skeleton can hold the incoming shape (e.g. a full-page load, a submit button mid-flight, an empty panel waiting on data).

The arc and its faint track share the same colour, scaled to 20 % opacity. This single-colour geometry keeps the spinner on-brand across every surface and variant.

## Sizes

Spinner lives on the same `sm` / `md` / `lg` control scale as icons, so an in-control spinner is always the right diameter for its host.

```ken
{ "type": "Box", "props": { "gap": "space5", "align": "center" }, "children": [
  { "type": "Spinner", "props": { "size": "sm" } },
  { "type": "Spinner", "props": { "size": "md" } },
  { "type": "Spinner", "props": { "size": "lg" } }
] }
```

## Tone

`default` paints the arc charcoal. `inherit` picks up the parent's `currentColor` — this is how Button tints the spinner to match each variant's text colour without passing an explicit colour prop.

```ken
{ "type": "Spinner", "props": { "tone": "default", "size": "lg" } }
```

Use `tone="inherit"` inside a coloured context; the spinner adopts the surrounding text colour automatically.

## Accessibility

By default Spinner renders `role="status"` with an `aria-label` of "Loading" (overridable via the `label` prop). When placed inside a component that already announces its busy state (e.g. a Button with `aria-busy`), pass `aria-hidden` to suppress the redundant announcement.
