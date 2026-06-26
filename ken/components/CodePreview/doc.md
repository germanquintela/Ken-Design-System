---
title: CodePreview
component: CodePreview
description: Syntax-highlighted code block with an optional copy button — the display primitive the docs use to show source snippets.
status: stable
category: Display
---

CodePreview wraps `prism-react-renderer` in Ken's surface conventions. It trims leading and trailing blank lines from the source, applies the Ken Prism theme, and places a `CopyButton` in the top-right corner. The `bordered` flag lets it sit standalone (the default) or flush inside a container like Showcase.

## Basic usage

Pass a `code` string and let the defaults do the rest: `language="tsx"`, `bordered`, and the copy button are all on.

```tsx
import { CodePreview } from '@ken/react';

const SNIPPET = `import { Button } from '@ken/react';

export function Example() {
  return <Button variant="default">Click me</Button>;
}`;

<CodePreview code={SNIPPET} />
```

## Languages

Set `language` to match the grammar — the copy button label stays "Copy code" regardless.

```tsx
<CodePreview code="pnpm add @ken/react" language="bash" />
```

Supported values: `tsx` · `jsx` · `ts` · `js` · `css` · `bash`.

## Without the copy button

Set `showCopy={false}` when the snippet is illustrative rather than something a person would paste.

```tsx
<CodePreview code={SNIPPET} showCopy={false} />
```

## Borderless (Showcase-embedded)

When embedding inside another surface — like Showcase — pass `bordered={false}` so the code block sits flush, inheriting the parent's radius and background.

```tsx
<CodePreview code={SNIPPET} bordered={false} />
```

## Polymorphic root

The wrapper renders as a `div` by default. Pass `as="section"` or any element type when semantics require it.

```tsx
<CodePreview code={SNIPPET} as="section" />
```
