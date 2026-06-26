import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { ElementType, HTMLAttributes, Ref } from 'react';
import { renderPoly } from '../../lib/renderPoly';
import * as s from './Text.styles';

/** Curated typography roles — each applies the PAIRED fontSize + lineHeight. */
export type TextSize =
  | 'footnote'
  | 'caption'
  | 'body'
  | 'subheading'
  | 'heading'
  | 'headingLg'
  | 'displaySm'
  | 'display'
  | 'displayLg';

/** Foreground tone ladder: primary (charcoal) → secondary (dark smoke) → tertiary (smoke); plus `danger` for error copy. */
export type TextTone = 'primary' | 'secondary' | 'tertiary' | 'danger';

/** Horizontal alignment. Default `start` (no rule emitted). */
export type TextAlign = 'start' | 'center' | 'end';

/**
 * Case transform. `uppercase`/`lowercase`/`capitalize` are CSS `text-transform`;
 * `firstLetter` is sentence-case (uppercases only the first character).
 */
export type TextTransform =
  | 'uppercase'
  | 'lowercase'
  | 'capitalize'
  | 'firstLetter';

// `className`/`style` are intentionally removed — no escape hatch; every visual
// comes from a typed, token-bound prop (same contract as Box).
type NativeText = Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'>;

export interface TextProps extends NativeText {
  /** The element Text renders as. Default `span` (inline) — pass `p`, `h1`, `label`, `strong`… */
  as?: ElementType;
  /** Typography role — applies the paired fontSize + lineHeight. Default `body`. */
  size?: TextSize;
  /** Foreground tone. Default `primary`. */
  tone?: TextTone;
  /** Horizontal alignment. Default `start`. */
  align?: TextAlign;
  /** Case transform — `firstLetter` sentence-cases lowercase strings. */
  transform?: TextTransform;
  /** Clip to a single line with a trailing ellipsis instead of wrapping. */
  truncate?: boolean;
}

/**
 * **Text** — the polymorphic typography primitive, and the only sanctioned way to
 * render text (no raw `<p>`/`<span>`/`<h1>`). Pick a typography role with `size`
 * (each applies a paired fontSize + lineHeight) and a `tone` from the foreground
 * ladder, and render the right semantic tag via `as`.
 *
 * Display-only → uses `renderPoly` (like Box/Card/Badge): keeps the polymorphic
 * `as` and the no-raw-element rule without pulling in any interactive/focus
 * behaviour. `children` flows through `...rest`.
 *
 * @example
 * ```tsx
 * <Text as="h1" size="display">Spend smarter</Text>
 * <Text tone="secondary">Supporting copy</Text>
 * <Text size="caption" truncate>A very long single line that clips…</Text>
 * ```
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  {
    as = 'span',
    size = 'body',
    tone = 'primary',
    align,
    transform,
    truncate = false,
    ...rest
  },
  ref,
) {
  return renderPoly({
    as,
    ref: ref as Ref<HTMLElement>,
    props: {
      ...rest,
      ...stylex.props(
        s.base.root,
        s.size[size],
        s.tone[tone],
        align && s.align[align],
        transform && s.transform[transform],
        truncate && s.truncate.on,
      ),
    },
  });
});
