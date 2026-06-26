import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { ElementType, HTMLAttributes, Ref } from 'react';
import { renderPoly } from '../../lib/renderPoly';
import * as s from './Kbd.styles';

/** Density scale — cap height + square min-width; the 12px text stays. */
export type KbdSize = 'sm' | 'md';

type NativeProps = Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'>;

export interface KbdProps extends NativeProps {
  /** The element Kbd renders as. Default `kbd` (the semantic keycap tag). */
  as?: ElementType;
  /** Density — cap height + square min-width. Default `md`. */
  size?: KbdSize;
}

/**
 * **Kbd** — a keyboard keycap for documenting shortcuts (e.g. `⌘K`, `Esc`).
 * Children render as-is: a glyph string, or a Lucide icon the caller sizes. For a
 * multi-key combo, wrap several caps in `KbdGroup`.
 *
 * No Base UI primitive exists for `<kbd>`, so (like Badge/Box) it uses
 * `renderPoly` — keeping the polymorphic `as` and the no-raw-element rule without
 * pulling in any interactive behaviour.
 *
 * @example
 * ```tsx
 * <Kbd>⌘K</Kbd>
 * <Kbd size="sm">Esc</Kbd>
 * ```
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { as = 'kbd', size = 'md', children, ...rest },
  ref,
) {
  return renderPoly({
    as,
    ref: ref as Ref<HTMLElement>,
    props: {
      ...rest,
      ...stylex.props(s.cap.base, s.size[size]),
      children,
    },
  });
});

export interface KbdGroupProps extends NativeProps {
  /** The element KbdGroup renders as. Default `span` (inline). */
  as?: ElementType;
}

/**
 * **KbdGroup** — lays several `<Kbd>` caps in a row with the standard element gap
 * (e.g. `⌘` + `K`). Drop plain text between caps (a `+`) for a combinator — no
 * separator is auto-inserted (matches shadcn).
 *
 * @example
 * ```tsx
 * <KbdGroup>
 *   <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
 * </KbdGroup>
 * ```
 */
export const KbdGroup = forwardRef<HTMLElement, KbdGroupProps>(
  function KbdGroup({ as = 'span', children, ...rest }, ref) {
    return renderPoly({
      as,
      ref: ref as Ref<HTMLElement>,
      props: {
        ...rest,
        ...stylex.props(s.group.base),
        children,
      },
    });
  },
);
