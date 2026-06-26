---
title: Table
component: Table
description: A dense, numerals-ready data table with compound semantics and three independent display flags.
status: stable
category: Data
---

Table is Ken's data-display centerpiece — the kind of ledger Ramp's bill-pay screens
are built on. It composes over semantic HTML (`<table>`, `<thead>`, `<tbody>`, `<tr>`,
`<th>`, `<td>`) without a headless library, so the accessibility contract is owned by
the markup itself: `scope="col"` on every header, correct sectioning, no ARIA hacks.

Three independent boolean flags — `striped`, `hover`, `bordered` — travel down through
React context because StyleX has no descendant selectors. Each row and cell reads the
flags from context and applies its own StyleX rules, so there's exactly one background
owner per row (no collision between stripe and hover states).

Amount columns should use `align="right"` — the stylesheet applies `font-variant-numeric: tabular-nums`
so numerals stay column-aligned.

## Anatomy

A complete table: `Table` → `Table.Head` → `Table.Row` → `Table.HeaderCell` in the
head; `Table.Body` → `Table.Row` → `Table.Cell` in the body.

```ken
{ "type": "Table", "children": [
  { "type": "Table.Head", "children": [
    { "type": "Table.Row", "children": [
      { "type": "Table.HeaderCell", "children": "Vendor" },
      { "type": "Table.HeaderCell", "children": "Status" },
      { "type": "Table.HeaderCell", "children": "Date" },
      { "type": "Table.HeaderCell", "props": { "align": "right" }, "children": "Amount" }
    ] }
  ] },
  { "type": "Table.Body", "children": [
    { "type": "Table.Row", "children": [
      { "type": "Table.Cell", "children": "Acme Corp" },
      { "type": "Table.Cell", "children": [{ "type": "Badge", "props": { "status": "success", "size": "sm" }, "children": "Paid" }] },
      { "type": "Table.Cell", "children": "Jun 12" },
      { "type": "Table.Cell", "props": { "align": "right" }, "children": "$1,200.00" }
    ] },
    { "type": "Table.Row", "children": [
      { "type": "Table.Cell", "children": "Globex" },
      { "type": "Table.Cell", "children": [{ "type": "Badge", "props": { "status": "warning", "size": "sm" }, "children": "Review" }] },
      { "type": "Table.Cell", "children": "Jun 14" },
      { "type": "Table.Cell", "props": { "align": "right" }, "children": "$980.50" }
    ] },
    { "type": "Table.Row", "children": [
      { "type": "Table.Cell", "children": "Initech" },
      { "type": "Table.Cell", "children": [{ "type": "Badge", "props": { "status": "neutral", "size": "sm" }, "children": "Draft" }] },
      { "type": "Table.Cell", "children": "Jun 18" },
      { "type": "Table.Cell", "props": { "align": "right" }, "children": "$540.00" }
    ] }
  ] }
] }
```

## Striped

`striped` tints even body rows with a faint limestone band — useful for dense ledgers
where the eye needs a visual track to follow across wide columns.

```ken
{ "type": "Table", "props": { "striped": true }, "children": [
  { "type": "Table.Head", "children": [
    { "type": "Table.Row", "children": [
      { "type": "Table.HeaderCell", "children": "Vendor" },
      { "type": "Table.HeaderCell", "props": { "align": "right" }, "children": "Amount" }
    ] }
  ] },
  { "type": "Table.Body", "children": [
    { "type": "Table.Row", "children": [
      { "type": "Table.Cell", "children": "Acme Corp" },
      { "type": "Table.Cell", "props": { "align": "right" }, "children": "$1,200.00" }
    ] },
    { "type": "Table.Row", "children": [
      { "type": "Table.Cell", "children": "Globex" },
      { "type": "Table.Cell", "props": { "align": "right" }, "children": "$980.50" }
    ] },
    { "type": "Table.Row", "children": [
      { "type": "Table.Cell", "children": "Initech" },
      { "type": "Table.Cell", "props": { "align": "right" }, "children": "$540.00" }
    ] }
  ] }
] }
```

## Hover

`hover` highlights the row under the cursor. When combined with `striped`, the hover
state paints over the stripe — a single background owner per row prevents the two from
colliding.

```ken
{ "type": "Table", "props": { "hover": true }, "children": [
  { "type": "Table.Head", "children": [
    { "type": "Table.Row", "children": [
      { "type": "Table.HeaderCell", "children": "Vendor" },
      { "type": "Table.HeaderCell", "props": { "align": "right" }, "children": "Amount" }
    ] }
  ] },
  { "type": "Table.Body", "children": [
    { "type": "Table.Row", "children": [
      { "type": "Table.Cell", "children": "Acme Corp" },
      { "type": "Table.Cell", "props": { "align": "right" }, "children": "$1,200.00" }
    ] },
    { "type": "Table.Row", "children": [
      { "type": "Table.Cell", "children": "Globex" },
      { "type": "Table.Cell", "props": { "align": "right" }, "children": "$980.50" }
    ] }
  ] }
] }
```

## Bordered

`bordered` adds an enclosing box and vertical column dividers — the full grid. Use it
when the content is wide enough that the outer frame helps orient the reader.

```ken
{ "type": "Table", "props": { "bordered": true }, "children": [
  { "type": "Table.Head", "children": [
    { "type": "Table.Row", "children": [
      { "type": "Table.HeaderCell", "children": "Vendor" },
      { "type": "Table.HeaderCell", "children": "Date" },
      { "type": "Table.HeaderCell", "props": { "align": "right" }, "children": "Amount" }
    ] }
  ] },
  { "type": "Table.Body", "children": [
    { "type": "Table.Row", "children": [
      { "type": "Table.Cell", "children": "Acme Corp" },
      { "type": "Table.Cell", "children": "Jun 12" },
      { "type": "Table.Cell", "props": { "align": "right" }, "children": "$1,200.00" }
    ] },
    { "type": "Table.Row", "children": [
      { "type": "Table.Cell", "children": "Globex" },
      { "type": "Table.Cell", "children": "Jun 14" },
      { "type": "Table.Cell", "props": { "align": "right" }, "children": "$980.50" }
    ] }
  ] }
] }
```

## Full grid

All three flags together: zebra rows, enclosing frame, column dividers, and hover
highlight — the maximum density mode for large ledgers.

```ken
{ "type": "Table", "props": { "striped": true, "bordered": true, "hover": true }, "children": [
  { "type": "Table.Head", "children": [
    { "type": "Table.Row", "children": [
      { "type": "Table.HeaderCell", "children": "Vendor" },
      { "type": "Table.HeaderCell", "children": "Status" },
      { "type": "Table.HeaderCell", "props": { "align": "right" }, "children": "Amount" }
    ] }
  ] },
  { "type": "Table.Body", "children": [
    { "type": "Table.Row", "children": [
      { "type": "Table.Cell", "children": "Acme Corp" },
      { "type": "Table.Cell", "children": [{ "type": "Badge", "props": { "status": "success", "size": "sm" }, "children": "Paid" }] },
      { "type": "Table.Cell", "props": { "align": "right" }, "children": "$1,200.00" }
    ] },
    { "type": "Table.Row", "children": [
      { "type": "Table.Cell", "children": "Globex" },
      { "type": "Table.Cell", "children": [{ "type": "Badge", "props": { "status": "error", "size": "sm" }, "children": "Declined" }] },
      { "type": "Table.Cell", "props": { "align": "right" }, "children": "$12,340.75" }
    ] }
  ] }
] }
```
