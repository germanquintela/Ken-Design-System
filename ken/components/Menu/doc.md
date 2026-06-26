---
title: Menu
component: Menu
description: A contextual dropdown of actions — anchored to any trigger, built for command surfaces and overflow menus.
status: stable
category: Overlays
---

Menu is a compound component: `Menu.Trigger` anchors the panel, `Menu.Content` positions it, and `Menu.Item` / `Menu.Section` / `Menu.Separator` fill it. The trigger defaults to a secondary Button — pass any Ken control via `render` to swap it out. `Menu.Chevron` is a tiny helper that rotates 180° with the open state, so you never wire that animation yourself.

## Default

The canonical shape: a labeled secondary button with a rotating chevron, and a flat list of actions with leading icons.

```tsx
<Menu>
  <Menu.Trigger render={<Button variant="secondary" />}>
    Options
    <Menu.Chevron />
  </Menu.Trigger>
  <Menu.Content>
    <Menu.Item prefix={<Pencil />}>Edit</Menu.Item>
    <Menu.Item prefix={<Copy />}>Duplicate</Menu.Item>
    <Menu.Item prefix={<Share2 />}>Share</Menu.Item>
  </Menu.Content>
</Menu>
```

## Icon-button trigger

Pass an `IconButton` as the `render` prop for a 3-dots overflow menu. Use `align="end"` so the panel right-aligns with the trigger.

```tsx
<Menu>
  <Menu.Trigger
    render={
      <IconButton variant="ghost" aria-label="More actions">
        <MoreHorizontal size={16} />
      </IconButton>
    }
  />
  <Menu.Content align="end">
    <Menu.Item prefix={<UserPlus />}>Invite teammate</Menu.Item>
    <Menu.Item prefix={<Download />}>Export</Menu.Item>
    <Menu.Item prefix={<Settings />}>Settings</Menu.Item>
  </Menu.Content>
</Menu>
```

## Sections, separators, and destructive items

Group related actions under a `Menu.Section` (renders a visible label). Use `Menu.Separator` for a visual break between groups. Mark irreversible actions `destructive` — they turn red and stay muted when disabled.

```tsx
<Menu>
  <Menu.Trigger render={<Button variant="secondary" />}>
    Manage
    <Menu.Chevron />
  </Menu.Trigger>
  <Menu.Content>
    <Menu.Item prefix={<Pencil />}>Edit</Menu.Item>
    <Menu.Item prefix={<Copy />}>Duplicate</Menu.Item>
    <Menu.Separator />
    <Menu.Section label="Danger zone">
      <Menu.Item destructive prefix={<Trash2 />}>Delete</Menu.Item>
    </Menu.Section>
  </Menu.Content>
</Menu>
```

## Item anatomy — prefix, suffix, link, disabled

Items accept a `prefix` (leading icon) and a `suffix` (trailing icon). `Menu.LinkItem` renders as a real `<a>` — use it for navigation destinations. A `disabled` item is visible but inert.

```tsx
<Menu>
  <Menu.Trigger render={<Button variant="secondary" />}>
    Account
    <Menu.Chevron />
  </Menu.Trigger>
  <Menu.Content>
    <Menu.Item prefix={<Settings />} suffix={<ExternalLink />}>Manage</Menu.Item>
    <Menu.LinkItem href="https://ramp.com" prefix={<ExternalLink />}>Open docs</Menu.LinkItem>
    <Menu.Item prefix={<Download />} disabled>Export (locked)</Menu.Item>
  </Menu.Content>
</Menu>
```
