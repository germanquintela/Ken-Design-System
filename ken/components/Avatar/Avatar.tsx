import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import type { ControlSize } from '../../theme/foundations/iconSize';
import * as s from './Avatar.styles';

/** Diameter scale — shared with the rest of the control sizing (`sm`/`md`/`lg`). */
export type AvatarSize = ControlSize;

/** The three identity tints. Normally auto-picked from the name; override here.
 *  Keyed tint1/2/3 (not by hue): the buckets are arbitrary and re-themeable. */
export type AvatarColor = 'tint1' | 'tint2' | 'tint3';

type NativeSpan = Omit<
  ComponentPropsWithoutRef<'span'>,
  'className' | 'style' | 'color' | 'children'
>;

export interface AvatarProps extends NativeSpan {
  /** Person's name — drives BOTH the initials and the (hashed) background tint. */
  name: string;
  /** Diameter. Default `md`. */
  size?: AvatarSize;
  /** Override the auto-hashed identity colour. */
  color?: AvatarColor;
}

const TINTS = ['tint1', 'tint2', 'tint3'] as const;

/**
 * Deterministic name → tint. A rolling code-point mix keeps the spread across
 * the three colours stable per person and robust to emoji / odd whitespace, so
 * the same name is always the same colour.
 */
function tintFor(name: string): AvatarColor {
  let h = 0;
  for (const ch of name.trim()) h = (h * 31 + (ch.codePointAt(0) ?? 0)) >>> 0;
  return TINTS[h % TINTS.length];
}

/**
 * First letter of the first + last word, uppercased: `Ada Lovelace` → `AL`,
 * `Ada` → `A`, empty → `?`. `Array.from` keeps astral glyphs (emoji) intact.
 */
function initialsFor(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  const first = Array.from(words[0])[0] ?? '';
  const last =
    words.length > 1 ? (Array.from(words[words.length - 1])[0] ?? '') : '';
  return (first + last).toUpperCase() || '?';
}

/**
 * **Avatar** — a circular identity chip showing a person's initials on a tint
 * deterministically hashed from their `name` (so the same name is always the same
 * colour). Pass `color` to override the tint. To stack several, use `AvatarGroup`.
 *
 * Renders a plain `<span role="img" aria-label>` containing a decorative
 * `<span aria-hidden>` for the initials — server-renderable, no client import
 * required. Ken Avatar is initials-only (no image slot yet), so the initials span
 * always shows. The outer span is labelled by `name`; the initials are decorative.
 *
 * @example
 * ```tsx
 * <Avatar name="Ada Lovelace" />
 * <Avatar name="Grace Hopper" size="lg" color="tint2" />
 * ```
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { name, size = 'md', color, ...rest },
  ref,
) {
  const tint = color ?? tintFor(name);
  return (
    <span
      ref={ref}
      role="img"
      aria-label={name}
      {...rest}
      {...stylex.props(s.root.base, s.size[size], s.tint[tint])}
    >
      <span aria-hidden>{initialsFor(name)}</span>
    </span>
  );
});
