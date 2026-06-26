---
title: Breadcrumb
component: Breadcrumb
description: A wayfinding trail that shows where you are in a hierarchy — auto-separated, emphasis-reversed, accessible by default.
status: stable
category: Navigation
---

Breadcrumb renders a `<nav>` over a semantic `<ol>` of `<li>` items. Chevron separators are inserted by the root between every crumb — you can't forget one, double one, or misplace one. The emphasis is intentionally reversed from the typical pattern: the current page is `primary` with an underline (it's where you are), while ancestors are `muted` links that underline on hover.

## Two-level trail

The simplest shape: one ancestor link and the current page.

```ken
{ "type": "Breadcrumb", "children": [
  { "type": "Breadcrumb.Item", "props": { "href": "#" }, "children": "April 2026" },
  { "type": "Breadcrumb.Item", "props": { "current": true }, "children": "Assets & Prepaids" }
] }
```

## Three-level trail

Separators fill in automatically between every crumb regardless of depth.

```ken
{ "type": "Breadcrumb", "children": [
  { "type": "Breadcrumb.Item", "props": { "href": "#" }, "children": "Home" },
  { "type": "Breadcrumb.Item", "props": { "href": "#" }, "children": "April 2026" },
  { "type": "Breadcrumb.Item", "props": { "current": true }, "children": "Assets & Prepaids" }
] }
```

## Deep trail

The same rhythm scales to any depth — every ancestor is an independent link.

```ken
{ "type": "Breadcrumb", "children": [
  { "type": "Breadcrumb.Item", "props": { "href": "#" }, "children": "Dashboard" },
  { "type": "Breadcrumb.Item", "props": { "href": "#" }, "children": "Accounting" },
  { "type": "Breadcrumb.Item", "props": { "href": "#" }, "children": "Close" },
  { "type": "Breadcrumb.Item", "props": { "href": "#" }, "children": "April 2026" },
  { "type": "Breadcrumb.Item", "props": { "current": true }, "children": "Assets & Prepaids" }
] }
```

## Current-only

A single `current` crumb with no ancestors — no separator renders.

```ken
{ "type": "Breadcrumb", "children": [
  { "type": "Breadcrumb.Item", "props": { "current": true }, "children": "Assets & Prepaids" }
] }
```

## Router links

Swap the default `<a>` for a router `<Link>` via the `render` prop on any `Breadcrumb.Item`. The `href` moves onto the `<Link>` itself.

```tsx
import Link from 'next/link';

<Breadcrumb>
  <Breadcrumb.Item render={<Link href="/accounting/close" />}>Close</Breadcrumb.Item>
  <Breadcrumb.Item render={<Link href="/accounting/close/april-2026" />}>April 2026</Breadcrumb.Item>
  <Breadcrumb.Item current>Assets &amp; Prepaids</Breadcrumb.Item>
</Breadcrumb>
```
