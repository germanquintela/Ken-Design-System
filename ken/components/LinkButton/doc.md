---
title: LinkButton
component: LinkButton
description: A button that navigates — same recipe as Button, rendered as a real link element.
status: stable
category: Actions
---

LinkButton is a navigational twin of Button. It uses the same seven-variant, three-size recipe,
but renders an `<a>` element — giving it native link semantics for free: right-click to copy the
URL, middle-click to open in a new tab, `target="_blank"` works without special handling.

The element itself is polymorphic via Base UI's `render` prop. Pass `render={<Link href="…" />}` to
swap the `<a>` for a framework router link (Next's `<Link>`, Remix's, etc.) without `@ken/react`
ever importing the router — the package stays framework-agnostic.

No `disabled` prop: a link that can't navigate shouldn't exist as a link. Remove the destination
instead.

## Variants

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "LinkButton", "props": { "variant": "default", "href": "#" }, "children": "Default" },
  { "type": "LinkButton", "props": { "variant": "subtle", "href": "#" }, "children": "Subtle" },
  { "type": "LinkButton", "props": { "variant": "secondary", "href": "#" }, "children": "Secondary" },
  { "type": "LinkButton", "props": { "variant": "ghost", "href": "#" }, "children": "Ghost" }
] }
```

## Status variants

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "LinkButton", "props": { "variant": "success", "href": "#" }, "children": "Success" },
  { "type": "LinkButton", "props": { "variant": "warning", "href": "#" }, "children": "Warning" },
  { "type": "LinkButton", "props": { "variant": "danger", "href": "#" }, "children": "Danger" }
] }
```

## Sizes

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "LinkButton", "props": { "size": "sm", "href": "#" }, "children": "Small" },
  { "type": "LinkButton", "props": { "size": "md", "href": "#" }, "children": "Medium" },
  { "type": "LinkButton", "props": { "size": "lg", "href": "#" }, "children": "Large" }
] }
```

## With icons

Use the `prefix` and `suffix` slots for leading and trailing icons. The icon size should match the
control size.

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "LinkButton", "props": { "href": "#", "prefix": { "type": "Icon", "props": { "name": "Plus" } } }, "children": "Add new" },
  { "type": "LinkButton", "props": { "href": "#", "suffix": { "type": "Icon", "props": { "name": "ArrowRight" } } }, "children": "Continue" },
  { "type": "LinkButton", "props": { "href": "https://ramp.com", "target": "_blank", "rel": "noreferrer", "suffix": { "type": "Icon", "props": { "name": "ArrowUpRight" } } }, "children": "Open ramp.com" }
] }
```

## Router link (Next.js)

Swap the `<a>` for a framework router link via the `render` prop. `@ken/react` never imports
the router — the prop accepts any React element and merges the style + event props onto it.

```tsx
import Link from 'next/link';
import { LinkButton } from '@ken/react';

<LinkButton render={<Link href="/dashboard" />} variant="default">
  Go to dashboard
</LinkButton>
```
