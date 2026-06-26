import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import * as s from './StackLogo.styles';

/** Box size — xxs 12 · xs 16 · sm 24 · md 32 px (square; the mark keeps its aspect ratio). */
export type StackLogoSize = 'xxs' | 'xs' | 'sm' | 'md';

type NativeSpan = Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'style'>;

export interface StackLogoProps extends NativeSpan {
  /** Diameter on the xs/sm/md scale. Default `md` (32px). */
  size?: StackLogoSize;
  /** `false` → static mark; `true` → the 3D wobble + `role="status"`. Default `false`. */
  loading?: boolean;
}

// SVG geometry (viewBox units — intrinsic shape data, like Lucide path data, not
// design tokens): 7 dots, r=1.5825, in a hexagonal honeycomb — a centre dot ringed
// by 6. The centre dot sits on the wobble's pivot, so it stays pinned while the
// ring sways in 3D (see the styles).
const R = 1.5825;
const DOTS: readonly (readonly [number, number])[] = [
  [6.92348, 1.5825], // top-centre
  [1.5825, 4.55101], // upper-left
  [12.2645, 4.55101], // upper-right
  [6.92348, 7.71458], // centre (on the rotation axis)
  [1.5825, 10.8807], // lower-left
  [12.2645, 10.8807], // lower-right
  [6.92348, 13.8475], // bottom-centre
];

/** The **Stack** brand mark — a hexagonal honeycomb of 7 dots. Static by default;
 *  the `loading` state makes it wobble — a 3D conical sway that balances about its
 *  pinned centre (not a flat spin). A non-interactive SVG status/brand element with
 *  no Base UI primitive (like Spinner / Breadcrumb's fallback) — a styled `<span>`
 *  wrapping a decorative, optionally-animated SVG.
 *
 *  @example
 *  ```tsx
 *  <StackLogo loading={isPending} size="sm" />
 *  ```
 */
export const StackLogo = forwardRef<HTMLSpanElement, StackLogoProps>(
  function StackLogo(
    { size = 'md', loading = false, 'aria-hidden': ariaHidden, ...rest },
    ref,
  ) {
    // Decorative (aria-hidden) wins; else a live status while spinning, an image when static.
    const a11y = ariaHidden
      ? { 'aria-hidden': ariaHidden }
      : loading
        ? { role: 'status' as const, 'aria-label': 'Loading' }
        : { role: 'img' as const, 'aria-label': 'Stack' };

    return (
      <span
        ref={ref}
        {...a11y}
        {...rest}
        {...stylex.props(s.root.base, s.size[size])}
      >
        <svg
          viewBox="0 0 13.847 15.43"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
          {...stylex.props(s.svg.base, loading && s.svg.wobble)}
        >
          {DOTS.map(([cx, cy]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={R}
              fill="currentColor"
            />
          ))}
        </svg>
      </span>
    );
  },
);
