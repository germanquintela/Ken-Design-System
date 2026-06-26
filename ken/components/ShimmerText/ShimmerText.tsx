import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { ElementType, HTMLAttributes, Ref } from 'react';
import { renderPoly } from '../../lib/renderPoly';
import { base as textBase, size as textSize } from '../Text/Text.styles';
import type { TextSize } from '../Text';
import * as s from './ShimmerText.styles';

export type { TextSize } from '../Text';

// `className`/`style` are intentionally removed — no escape hatch, same contract
// as Text/Box. There is no `tone`: the colour is owned by the shimmer gradient,
// so a tone prop would be dead/conflicting.
type NativeText = Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'>;

export interface ShimmerTextProps extends NativeText {
  /** The element it renders as. Default `span` (inline) — pass `p`, `h1`, `strong`… */
  as?: ElementType;
  /** Typography role — applies the paired fontSize + lineHeight. Default `body`. */
  size?: TextSize;
}

/**
 * **ShimmerText** — text in solid obsidian with a faint light band sweeping
 * across it on a slow, endless loop — a "super subtle" sheen. A sibling of
 * `Text` (it reuses Text's typography contract) rather than a wrapper: the
 * `background-clip: text` paint must live on the text-bearing element itself.
 * Display-only → uses `renderPoly`, like Text/Box. Freezes to
 * static obsidian under `prefers-reduced-motion`.
 *
 * @example
 * ```tsx
 * <ShimmerText size="body">Generating…</ShimmerText>
 * ```
 */
export const ShimmerText = forwardRef<HTMLElement, ShimmerTextProps>(
  function ShimmerText({ as = 'span', size = 'body', ...rest }, ref) {
    return renderPoly({
      as,
      ref: ref as Ref<HTMLElement>,
      props: {
        ...rest,
        ...stylex.props(textBase.root, textSize[size], s.root.base),
      },
    });
  },
);
