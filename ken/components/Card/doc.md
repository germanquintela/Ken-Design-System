---
title: Card
component: Card
description: A surface that groups related content, with optional header, body, and footer sections.
status: stable
category: Display
---

Card is a compound component: compose `Card.Header`, `Card.Body`, and `Card.Footer`.
Section dividers are owned by the sections themselves, so you never draw hairlines by hand.

## Anatomy

```ken
{ "type": "Card", "children": [
  { "type": "Card.Header", "children": "Invoice #1024" },
  { "type": "Card.Body", "children": "Net 30 — due July 25, 2026." },
  { "type": "Card.Footer", "children": [
    { "type": "Button", "props": { "variant": "subtle", "size": "sm" }, "children": "View" }
  ] }
] }
```
