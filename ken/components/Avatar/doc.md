---
title: Avatar
component: Avatar
description: A circular initials chip that identifies a person, with deterministic colour tinting.
status: stable
category: Display
hero: /components/avatar.webp
---

Avatar derives two things from `name`: the initials (first letter of the first and
last word) and a background tint (a deterministic hash across three identity colours).
The same name always produces the same colour, so the same person looks consistent
across the product without any server-side lookup. Pass `color` to override the hash
when you need a specific tint.

`AvatarGroup` stacks avatars into an overlapping row. It clones a uniform `size`
onto each child and owns the white ring and left-pull overlap. Use `max` to cap the
visible count; the overflow collapses into a neutral "+N" chip.

## Sizes

`sm` (24 px), `md` (32 px, default), `lg` (40 px). The initials font tracks the
diameter.

```ken
{ "type": "Box", "props": { "gap": "space3", "align": "center" }, "children": [
  { "type": "Avatar", "props": { "name": "Ada Lovelace", "size": "sm" } },
  { "type": "Avatar", "props": { "name": "Ada Lovelace", "size": "md" } },
  { "type": "Avatar", "props": { "name": "Ada Lovelace", "size": "lg" } }
] }
```

## Auto-tinting

Each name hashes to one of three identity tints. Different names land on different
colours; the same name is always the same colour.

```ken
{ "type": "Box", "props": { "gap": "space2", "align": "center" }, "children": [
  { "type": "Avatar", "props": { "name": "Alan Turing" } },
  { "type": "Avatar", "props": { "name": "Katherine Johnson" } },
  { "type": "Avatar", "props": { "name": "Ada Lovelace" } },
  { "type": "Avatar", "props": { "name": "Margaret Hamilton" } }
] }
```

## Color override

Pass `color` (`tint1`, `tint2`, or `tint3`) to pin the tint regardless of name.

```ken
{ "type": "Box", "props": { "gap": "space2", "align": "center" }, "children": [
  { "type": "Avatar", "props": { "name": "Ada Lovelace", "color": "tint1" } },
  { "type": "Avatar", "props": { "name": "Ada Lovelace", "color": "tint2" } },
  { "type": "Avatar", "props": { "name": "Ada Lovelace", "color": "tint3" } }
] }
```

---

## AvatarGroup

`AvatarGroup` sets one `size` for all its children. The overlap and white ring are
owned by the group — the `<Avatar>` itself stays a plain circle.

```ken
{ "type": "AvatarGroup", "props": { "size": "md" }, "children": [
  { "type": "Avatar", "props": { "name": "Alan Turing" } },
  { "type": "Avatar", "props": { "name": "Katherine Johnson" } },
  { "type": "Avatar", "props": { "name": "Ada Lovelace" } },
  { "type": "Avatar", "props": { "name": "Margaret Hamilton" } }
] }
```

## AvatarGroup with max

`max` caps the visible avatars. The overflow renders as a circular neutral "+N" chip
at the same diameter and ring.

```ken
{ "type": "AvatarGroup", "props": { "size": "md", "max": 3 }, "children": [
  { "type": "Avatar", "props": { "name": "Alan Turing" } },
  { "type": "Avatar", "props": { "name": "Katherine Johnson" } },
  { "type": "Avatar", "props": { "name": "Ada Lovelace" } },
  { "type": "Avatar", "props": { "name": "Margaret Hamilton" } },
  { "type": "Avatar", "props": { "name": "Barbara Liskov" } },
  { "type": "Avatar", "props": { "name": "Grace Hopper" } }
] }
```

## AvatarGroup sizes

The group `size` prop applies uniformly to every avatar and to the "+N" chip.

```ken
{ "type": "Box", "props": { "gap": "space6", "align": "center" }, "children": [
  { "type": "AvatarGroup", "props": { "size": "sm", "max": 3 }, "children": [
    { "type": "Avatar", "props": { "name": "Alan Turing" } },
    { "type": "Avatar", "props": { "name": "Katherine Johnson" } },
    { "type": "Avatar", "props": { "name": "Ada Lovelace" } },
    { "type": "Avatar", "props": { "name": "Margaret Hamilton" } }
  ] },
  { "type": "AvatarGroup", "props": { "size": "md", "max": 3 }, "children": [
    { "type": "Avatar", "props": { "name": "Alan Turing" } },
    { "type": "Avatar", "props": { "name": "Katherine Johnson" } },
    { "type": "Avatar", "props": { "name": "Ada Lovelace" } },
    { "type": "Avatar", "props": { "name": "Margaret Hamilton" } }
  ] },
  { "type": "AvatarGroup", "props": { "size": "lg", "max": 3 }, "children": [
    { "type": "Avatar", "props": { "name": "Alan Turing" } },
    { "type": "Avatar", "props": { "name": "Katherine Johnson" } },
    { "type": "Avatar", "props": { "name": "Ada Lovelace" } },
    { "type": "Avatar", "props": { "name": "Margaret Hamilton" } }
  ] }
] }
```
