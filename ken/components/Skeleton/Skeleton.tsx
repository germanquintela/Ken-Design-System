import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { ElementType, HTMLAttributes, Ref } from 'react';
import { renderPoly } from '../../lib/renderPoly';
import * as s from './Skeleton.styles';

/** Shape preset. `text` is a line (or stacked lines); the other two are blocks. */
export type SkeletonVariant = 'text' | 'circle' | 'rect';

/** Circle diameter — mirrors Avatar's scale (24/32/40). Ignored by text/rect. */
export type SkeletonSize = 'sm' | 'md' | 'lg';

// No `children` (it's a placeholder), no `className`/`style` escape hatch.
type NativeDiv = Omit<
  HTMLAttributes<HTMLElement>,
  'className' | 'style' | 'children'
>;

export interface SkeletonProps extends NativeDiv {
  /** The element Skeleton renders as. Default `div`. */
  as?: ElementType;
  /** Shape preset. Default `text`. */
  variant?: SkeletonVariant;
  /** Number of stacked bars — `text` only. The last bar is shortened. Default `1`. */
  lines?: number;
  /** Circle diameter — `circle` only. Default `md`. */
  size?: SkeletonSize;
}

/**
 * **Skeleton** — a pulsing placeholder for content that hasn't loaded yet. Pick a
 * `variant`: `text` renders one or more lines (the last one shortened), while
 * `circle` and `rect` are single blocks (an avatar, a thumbnail). `rect` fills its
 * parent, so size it from the surrounding layout. It's `aria-hidden` by default —
 * announce the loading state on the region it stands in for.
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" lines={3} />
 * <Skeleton variant="circle" size="lg" />
 * <Skeleton variant="rect" /> // fills its parent (min 64px tall)
 * ```
 */
export const Skeleton = forwardRef<HTMLElement, SkeletonProps>(
  function Skeleton(
    { as = 'div', variant = 'text', lines = 1, size = 'md', ...rest },
    ref,
  ) {
    const count = Math.max(1, Math.floor(lines));
    const children =
      variant === 'text'
        ? Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              {...stylex.props(
                s.line.base,
                i === count - 1 && count > 1 && s.line.last,
              )}
            />
          ))
        : undefined;

    return renderPoly({
      as,
      ref: ref as Ref<HTMLElement>,
      props: {
        'aria-hidden': true,
        ...rest,
        ...stylex.props(
          s.root.base,
          variant === 'text' && s.root.text,
          variant === 'circle' && s.root.circle,
          variant === 'circle' && s.circle[size],
          variant === 'rect' && s.root.rect,
        ),
        children,
      },
    });
  },
);
