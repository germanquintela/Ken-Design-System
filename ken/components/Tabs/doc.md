---
title: Tabs
component: Tabs
description: A segmented navigation strip with a sliding underline pipe — built on Base UI, keyboard-navigable, and fully accessible.
status: stable
category: Navigation
hero: /components/tabs.webp
---

Tabs is a compound component: `Tabs.List` wraps the tab strip, `Tabs.Tab` is each button, and `Tabs.Panel` is the content pane. The sliding pipe (underline indicator) renders inside `Tabs.List` automatically — you never add it yourself, and it always moves correctly.

Both controlled (`value` / `onValueChange`) and uncontrolled (`defaultValue`) modes come straight from Base UI. Keyboard navigation (arrow keys, Home, End) and the focus ring are built in.

## Basic strip

The reference shape: equal-width tabs, sliding pipe, no panels needed for nav-only use.

```ken
{ "type": "Tabs", "props": { "defaultValue": "overview" }, "children": [
  { "type": "Tabs.List", "children": [
    { "type": "Tabs.Tab", "props": { "value": "overview" }, "children": "Overview" },
    { "type": "Tabs.Tab", "props": { "value": "activity" }, "children": "Activity" }
  ] }
] }
```

## With panels

Add `Tabs.Panel` elements below the list and content swaps as the pipe slides. Each panel's `value` must match its tab's `value`.

```ken
{ "type": "Tabs", "props": { "defaultValue": "apple" }, "children": [
  { "type": "Tabs.List", "children": [
    { "type": "Tabs.Tab", "props": { "value": "apple" }, "children": "Apple" },
    { "type": "Tabs.Tab", "props": { "value": "orange" }, "children": "Orange" },
    { "type": "Tabs.Tab", "props": { "value": "mango" }, "children": "Mango" }
  ] },
  { "type": "Tabs.Panel", "props": { "value": "apple" }, "children": "Crisp, sweet, and the classic default." },
  { "type": "Tabs.Panel", "props": { "value": "orange" }, "children": "Citrus — juicy and a little tart." },
  { "type": "Tabs.Panel", "props": { "value": "mango" }, "children": "Tropical, soft, and fragrant." }
] }
```

## Disabled tab

A disabled `Tabs.Tab` greys out, loses its hover, and is skipped by keyboard navigation.

```ken
{ "type": "Tabs", "props": { "defaultValue": "apple" }, "children": [
  { "type": "Tabs.List", "children": [
    { "type": "Tabs.Tab", "props": { "value": "apple" }, "children": "Apple" },
    { "type": "Tabs.Tab", "props": { "value": "orange", "disabled": true }, "children": "Orange" },
    { "type": "Tabs.Tab", "props": { "value": "mango" }, "children": "Mango" }
  ] }
] }
```

## Controlled

Drive the active tab from external state — useful when the active tab needs to sync with a URL or another piece of UI.

```tsx
const [tab, setTab] = React.useState('overview');

<Tabs value={tab} onValueChange={setTab}>
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="activity">Activity</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">Overview content</Tabs.Panel>
  <Tabs.Panel value="activity">Activity feed</Tabs.Panel>
</Tabs>
```
