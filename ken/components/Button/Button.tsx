'use client';

import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { ReactNode, Ref } from 'react';
import { Button as BaseButton } from '@base-ui-components/react/button';
import { surface, variants, states } from '../../recipes/buttonRecipe';
import { focusRing } from '../../theme/foundations/focusRing';
import type { ControlSize } from '../../theme/foundations/iconSize';
import { Spinner } from '../Spinner';

export type ButtonVariant =
  | 'default'
  | 'subtle'
  | 'secondary'
  | 'ghost'
  | 'success'
  | 'warning'
  | 'danger';

export type ButtonSize = ControlSize;

// Built on Base UI's headless Button (consistent with the rest of the library):
// it renders a native <button>, keeps the `disabled` attribute (so the recipe's
// `:disabled` / `:hover:not(:disabled)` rules fire) and adds focus/press
// handling for free. We always render a real <button>, so we take the NATIVE
// member of Base UI's props union (which still carries `type`, `form`, …), drop
// Base UI's `className`/`render` (styling is owned by the recipe) and repurpose
// the global `prefix` HTML attribute as the leading-icon slot (à la Geist).
type NativeButtonProps = Extract<BaseButton.Props, { nativeButton?: true }>;
type BaseProps = Omit<NativeButtonProps, 'className' | 'render' | 'prefix'>;

export interface ButtonProps extends BaseProps {
  /** Visual treatment. `default` is the lime primary action. */
  variant?: ButtonVariant;
  /** Control height + type scale. */
  size?: ButtonSize;
  /** Icon rendered before the label. */
  prefix?: ReactNode;
  /** Icon rendered after the label. */
  suffix?: ReactNode;
  /** Shows a leading spinner and makes the button inert (`aria-busy`,
   *  non-interactive) while keeping its label and live colours. The spinner takes
   *  the leading-icon slot, so any `prefix` yields to it. */
  loading?: boolean;
  /** Stretch to the container's width (label stays centred). Default `false`. */
  fullWidth?: boolean;
}

/**
 * **Button** — the primary action control, built on Base UI's headless Button
 * (renders a native `<button>`). Seven `variant` treatments and a `sm`/`md`/`lg`
 * `size` scale; `prefix`/`suffix` slot icons around the label, and `loading` swaps
 * in a leading Spinner while making the button inert.
 *
 * @example
 * ```tsx
 * <Button variant="default" onClick={save}>Save changes</Button>
 *
 * <Button variant="secondary" prefix={<Plus size={16} />} loading={saving}>
 *   Add item
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'default',
      size = 'md',
      type = 'button',
      prefix,
      suffix,
      loading = false,
      fullWidth = false,
      disabled,
      onClick,
      children,
      ...rest
    },
    ref,
  ) {
    // When a Base UI overlay trigger (Menu/Select/…) composes over this Button via
    // `render`, it merges `aria-haspopup` onto us — that's our signal the Button is
    // a popup trigger, so we drop the press-scale (the popup's entrance is the
    // feedback). Inferred, never a prop the caller has to remember.
    const isPopupTrigger =
      (rest as { 'aria-haspopup'?: unknown })['aria-haspopup'] != null;
    return (
      <BaseButton
        ref={ref as Ref<HTMLElement>}
        type={type}
        disabled={disabled}
        // Loading is non-interactive WITHOUT native `disabled` (which would grey it
        // out): aria-busy/aria-disabled announce the state, the guarded onClick
        // blocks keyboard activation, and states.loading kills pointer events.
        aria-busy={loading || undefined}
        aria-disabled={loading || undefined}
        onClick={loading ? undefined : onClick}
        {...rest}
        {...stylex.props(
          surface.base,
          focusRing.ring,
          surface[size],
          fullWidth && surface.block,
          variants[variant],
          loading && states.loading,
          isPopupTrigger && states.noPressScale,
        )}
      >
        {loading ? <Spinner size={size} tone="inherit" aria-hidden /> : prefix}
        {children}
        {suffix}
      </BaseButton>
    );
  },
);
