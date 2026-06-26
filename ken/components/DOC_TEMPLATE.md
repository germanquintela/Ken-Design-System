# doc.md authoring contract

Every component folder carries a `doc.md`. The playground discovers it automatically
(no registry / route / manifest edit) and renders it at `/components/<folder-lowercased>`,
with a live preview + copy-paste code for each example and an auto-generated props table.

To add a new component to the docs: export it from `ken/index.ts` (already required by the
component playbook) and drop a `doc.md` in its folder. That's it.

---

## Frontmatter (required: `title`, `component`, `description`)

```yaml
---
title: Button              # page H1 + sidebar label
component: Button          # the @ken/react export name — drives props extraction + the live factory
description: Triggers an action — the primary way a person commits to something in the UI.
status: stable             # optional: stable | beta | experimental
category: Actions          # optional: Actions | Forms | Display | Overlays | Navigation | Data | Layout | Feedback
                           #           (carried into the manifest; sidebar is flat A–Z in v1, so this is informational)
---
```

- `title`, `component`, `description` are **required** — the codegen throws if any is missing.
- `component` MUST be the runtime export name in `@ken/react` (e.g. `Button`, `Select`). It keys both
  the props table (extracted from `<Component>.tsx`) and the live renderer.

---

## Body

Markdown prose explaining the **why** (Geist-style — decisions, not just the API), plus example blocks.
There are exactly two special fenced-block types:

### 1. ` ```ken ` — LIVE examples (declarative JSON)

The fenced content is a JSON `KenNode`. It is rendered **live** in a Showcase, and a copy-paste TSX
snippet is derived automatically. Shape:

```ken
{ "type": "Button", "props": { "variant": "primary" }, "children": "Save" }
```

- `type` — the component name (or a compound part like `"Card.Header"`, `"Tabs.Tab"`).
- `props` — a plain object. Strings/numbers/booleans/arrays/objects only (no functions, no JSX).
- `children` — a string, OR an array of strings / nested KenNodes.

**Composition** — wrap multiple examples in a `Box` to show them side by side:

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "Button", "props": { "variant": "primary" }, "children": "Primary" },
  { "type": "Button", "props": { "variant": "subtle" }, "children": "Subtle" }
] }
```

**Icons** — use an `Icon` node with a Lucide name. It works both as a child and as an
element-valued prop (e.g. a Button's `prefix`/`suffix`, a Card title):

```ken
{ "type": "Button", "props": { "prefix": { "type": "Icon", "props": { "name": "Plus" } } }, "children": "New" }
```

**Data-array props** — `Select`/`MultiSelect` `options` and `ToggleGroup` `items` take plain data
arrays where an `icon` is a **string** Lucide name (the factory resolves it):

```ken
{ "type": "Select", "props": {
  "placeholder": "Assignee",
  "options": [
    { "value": "ada", "label": "Ada", "icon": "User" },
    { "value": "lin", "label": "Lin", "icon": "User" }
  ]
} }
```

```ken
{ "type": "ToggleGroup", "props": {
  "items": [
    { "value": "left", "icon": "AlignLeft" },
    { "value": "center", "icon": "AlignCenter" },
    { "value": "right", "icon": "AlignRight" }
  ],
  "defaultValue": "left"
} }
```

Use a **static representative state** for stateful components when it reads well as JSON
(e.g. a `Switch` with `"checked": true`, `Tabs` with `"defaultValue"`, an open accordion item).

### 2. ` ```tsx ` — code-only examples (the escape hatch)

Shown as static, prism-highlighted code — **not** rendered live. Use this when an example can't be a
static JSON spec: controlled state with `useState`, `render={<Link/>}` / `render={<a/>}`, event handlers
(`onClick`, `onOpenChange`), function children, or a `code`/`value` string the component consumes.

```tsx
const [open, setOpen] = React.useState(false);

<Modal open={open} onOpenChange={setOpen} title="Confirm">
  Are you sure?
</Modal>
```

Components that typically need at least one ` ```tsx ` block: **Modal, Menu, CommandMenu** (open state +
handlers), **CopyButton** (`value`), **Showcase / CodePreview** (a `code` string), and any example wiring a
Next `<Link>` via `render`.

### 3. Everything else

Normal markdown prose, headings (`## Section`), lists, and tables render as styled Ken typography.
Inline `code` is fine. (Note: Ken ships a single font weight — emphasis comes from size/tone, so `**bold**`
renders at normal weight by design.)

---

## How to author one

1. Read the component's `<Component>.tsx` for the real prop API (names, unions, defaults).
2. Read its `<Component>.stories.tsx` — the stories are worked, accurate examples. Translate them into
   prose + ` ```ken ` blocks (or ` ```tsx ` when they rely on state/handlers/render).
3. Write a short lede explaining the *why*, then one example block per major axis (variants, sizes, states,
   with-icons…). Keep each example minimal and prop-accurate — a ` ```ken ` block that references a real,
   valid prop renders live; a typo'd prop renders a degraded preview.
4. Components that export two parts (Avatar + AvatarGroup, Select + MultiSelect, Kbd + KbdGroup) document
   **both** on the one page; `component:` is the primary.

## Reference

`Button/doc.md` and `Card/doc.md` are the canonical examples — match their shape and depth.
