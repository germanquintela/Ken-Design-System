import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import type { ControlSize } from '../../theme/foundations/iconSize';
import * as s from './Spinner.styles';

/** Colour resolution: `default` paints the arc charcoal; `inherit` rides the
 *  parent's `currentColor` (used by Button so the spinner matches each variant). */
export type SpinnerTone = 'default' | 'inherit';

/** Diameter — the canonical control scale, so an in-control spinner matches the
 *  icon size of its sm/md/lg host. */
export type SpinnerSize = ControlSize;

type NativeSpan = Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'style'>;

export interface SpinnerProps extends NativeSpan {
  /** Diameter, on the control scale. Default `md` (14px). */
  size?: SpinnerSize;
  /** `default` → charcoal; `inherit` → parent `currentColor`. Default `default`. */
  tone?: SpinnerTone;
  /** Accessible label, announced to assistive tech via `role="status"`. Ignored
   *  when the spinner is `aria-hidden` (e.g. inside a Button that already
   *  announces `aria-busy`). */
  label?: string;
}

// SVG geometry (viewBox units — inherent to the shape, like Lucide's path data,
// not design tokens): a 24-unit box, a r=9 ring at 2.5 stroke. The arc reveals a
// quarter of the circumference (C = 2π·9 ≈ 56.5 → 14.1 on / 42.4 off).
const STROKE = 2.5;
const ARC = '14.14 42.41';
const TRACK_OPACITY = 0.2; // faint same-colour track (documented decorative value)

/**
 * **Spinner** — an indeterminate loading indicator: a rotating arc over a faint
 * same-colour track. Sizes ride the control scale (`sm` · `md` · `lg`) so an
 * in-control spinner matches its host's icon size. Set `tone="inherit"` to ride
 * the parent's `currentColor` (how Button tints it per variant).
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" label="Loading transactions" />
 * <Spinner tone="inherit" /> // inside a coloured control
 * ```
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner(
    {
      size = 'md',
      tone = 'default',
      label = 'Loading',
      'aria-hidden': ariaHidden,
      ...rest
    },
    ref,
  ) {
    // Hidden inside a host that announces its own busy-state → drop the status role.
    const a11y = ariaHidden
      ? { 'aria-hidden': ariaHidden }
      : { role: 'status' as const, 'aria-label': label };

    return (
      <span
        ref={ref}
        {...a11y}
        {...rest}
        {...stylex.props(
          s.root.base,
          tone === 'default' && s.root.charcoal,
          s.size[size],
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          {...stylex.props(s.svg.base)}
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth={STROKE}
            opacity={TRACK_OPACITY}
          />
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={ARC}
          />
        </svg>
      </span>
    );
  },
);
