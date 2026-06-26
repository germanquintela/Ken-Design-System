'use client';

import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { ReactNode, Ref } from 'react';
import { Button as BaseButton } from '@base-ui-components/react/button';
import { surface, variants, states } from '../../recipes/buttonRecipe';
import { focusRing } from '../../theme/foundations/focusRing';
import { Spinner } from '../Spinner';
import { sizes, shape } from './IconButton.styles';
import type { ButtonVariant, ButtonSize } from '../Button';

export type IconButtonShape = 'square' | 'circle';

// IconButton — same Base UI <button>, same recipe, same 7 variants and size
// scale as Button, but it renders a single icon (passed as children) inside a
// square footprint. Adds `shape` (square | circle). Because it has no text, an
// `aria-label` is REQUIRED at the type level — an icon-only control with no
// accessible name is an a11y bug we refuse to let ship (decisions in the type
// system, à la the LLM-safe thesis).
//
// Icon sizing follows Button's convention: the consumer sets it via the Lucide
// `size` prop (use `iconSize[size]`), so the glyph tracks the control size.
type NativeButtonProps = Extract<BaseButton.Props, { nativeButton?: true }>;
type BaseProps = Omit<
  NativeButtonProps,
  'className' | 'render' | 'prefix' | 'aria-label'
>;

export interface IconButtonProps extends BaseProps {
  /** Visual treatment. `default` is the lime primary action. Matches Button. */
  variant?: ButtonVariant;
  /** Control footprint + icon scale. Matches Button. */
  size?: ButtonSize;
  /** Corner geometry: `square` keeps the family radius, `circle` is fully round. */
  shape?: IconButtonShape;
  /** Shows a spinner in place of the icon and makes the button inert (`aria-busy`,
   *  non-interactive) while keeping its live colours — mirrors Button's `loading`. */
  loading?: boolean;
  /** The single icon to render. */
  children: ReactNode;
  /** Accessible name — required, since there's no visible label. */
  'aria-label': string;
}

/**
 * **IconButton** — an icon-only action button: same Base UI `<button>`, recipe,
 * seven `variant`s and size scale as `Button`, in a square (or `circle`) footprint.
 * Pass the single Lucide icon as `children` plus a required `aria-label` (there's
 * no visible text). `loading` swaps the icon for a Spinner.
 *
 * @example
 * ```tsx
 * <IconButton aria-label="Delete" variant="danger" onClick={remove}>
 *   <Trash size={16} />
 * </IconButton>
 * ```
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      variant = 'default',
      size = 'md',
      shape: shapeProp = 'square',
      type = 'button',
      loading = false,
      onClick,
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <BaseButton
        ref={ref as Ref<HTMLElement>}
        type={type}
        // Loading is non-interactive WITHOUT native `disabled` (which would grey it
        // out): aria-busy/aria-disabled announce it, the guarded onClick blocks
        // keyboard activation, and states.loading kills pointer events.
        aria-busy={loading || undefined}
        aria-disabled={loading || undefined}
        onClick={loading ? undefined : onClick}
        {...rest}
        {...stylex.props(
          surface.base,
          focusRing.ring,
          sizes[size],
          shape[shapeProp],
          variants[variant],
          loading && states.loading,
        )}
      >
        {loading ? (
          <Spinner size={size} tone="inherit" aria-hidden />
        ) : (
          children
        )}
      </BaseButton>
    );
  },
);
