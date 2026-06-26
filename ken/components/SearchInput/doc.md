---
title: SearchInput
component: SearchInput
description: A fully-rounded search field with a leading magnifier, async loading state, and an optional ⌘K keyboard shortcut.
status: stable
category: Forms
hero: /components/search-input.webp
---

SearchInput is a purpose-built search field, not a styled `Input`. The pill shape, leading magnifier, and `⌘K` chip are intrinsic to the component. It uses `type="search"` — browsers add the native clear button on fill.

## Default

Idle, the field shows a leading magnifier and a trailing `⌘K` chip as a hint. The chip retires the moment you focus or start typing.

```ken
{ "type": "SearchInput", "props": { "aria-label": "Search", "placeholder": "Search" } }
```

## Sizes

Height, text, and both slots scale with `size`. The pill shape holds at all three steps.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space4" }, "children": [
  { "type": "SearchInput", "props": { "size": "sm", "aria-label": "Small search" } },
  { "type": "SearchInput", "props": { "size": "md", "aria-label": "Medium search" } },
  { "type": "SearchInput", "props": { "size": "lg", "aria-label": "Large search" } }
] }
```

## Loading

`loading` swaps the leading magnifier for a Spinner and hides the `⌘K` chip — signalling that results are being fetched.

```ken
{ "type": "SearchInput", "props": { "aria-label": "Search", "loading": true } }
```

## The ⌘K shortcut

When `shortcut` is `true` (the default), SearchInput registers a global `keydown` listener for `⌘K` (or `⌃K` on Windows/Linux) and focuses itself when the shortcut fires. The trailing `Kbd` chip is the visual hint for this binding.

The chip is visible only when the field is idle — not focused, not loading, not disabled, and empty. Once any of those conditions is true, the chip disappears because it is no longer needed.

Set `shortcut={false}` when a different element owns `⌘K` in the same view (e.g. a global `CommandMenu`) so the two don't fight over the binding.

## Disabled

When disabled, the magnifier dims, the chip is suppressed, and the `⌘K` listener is removed.

```ken
{ "type": "SearchInput", "props": { "aria-label": "Search", "disabled": true } }
```
