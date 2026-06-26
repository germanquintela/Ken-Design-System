---
title: UserMessage
component: UserMessage
description: A right-hugging outgoing chat bubble with an optional date · time stamp beneath it.
status: stable
category: Display
---

UserMessage is the display primitive for the user's side of a conversation thread. The bubble right-aligns to its container, caps at 300 px, and wraps naturally — surface fill (`backgroundSurface`) and the shared 12 px surface radius keep it consistent with Cards and panels. The date · time stamp sits outside the bubble as a muted footnote; it is joined with a middot when both parts are present, and omitted entirely when neither is set.

## Basic

```ken
{ "type": "UserMessage", "props": { "date": "Jun 23", "time": "2:45 PM" }, "children": "Sounds good — let's ship it." }
```

## Long text

Content wraps inside the 300 px cap, right-aligned, so the bubble surface and radius are visible.

```ken
{ "type": "UserMessage", "props": { "date": "Jun 23", "time": "2:45 PM" }, "children": "The AI operating system for today's top accounting firms — cards, expenses, bill payments, and banking, in the blink of AI." }
```

## Without a timestamp

Omit `date` and `time` to render just the bubble, no meta line below.

```ken
{ "type": "UserMessage", "children": "How fast can we close the books this month?" }
```

## Time only

Supply only `time` — the meta line shows it alone, no middot.

```ken
{ "type": "UserMessage", "props": { "time": "2:45 PM" }, "children": "And can it categorize the AmEx import automatically?" }
```

## Conversation

Stack multiple messages in a column; every bubble and stamp aligns to the right edge.

```ken
{ "type": "Box", "props": { "direction": "column", "gap": "space4", "align": "flex-end" }, "children": [
  { "type": "UserMessage", "props": { "date": "Jun 23", "time": "2:43 PM" }, "children": "How fast can we close the books this month?" },
  { "type": "UserMessage", "props": { "date": "Jun 23", "time": "2:44 PM" }, "children": "And can it categorize the AmEx import automatically?" },
  { "type": "UserMessage", "props": { "date": "Jun 23", "time": "2:45 PM" }, "children": "The AI operating system for today's top accounting firms." }
] }
```
