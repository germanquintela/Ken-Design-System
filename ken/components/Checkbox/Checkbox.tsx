'use client';

import * as stylex from '@stylexjs/stylex';
import { forwardRef, useId } from 'react';
import type { ReactNode, Ref } from 'react';
import { Check } from 'lucide-react';
import { Checkbox as BaseCheckbox } from '@base-ui-components/react/checkbox';
import { focusRing } from '../../theme/foundations/focusRing';
import { iconSize } from '../../theme/foundations/iconSize';
import { box, indicator, labelText, row } from './Checkbox.styles';

/** Checked-state fill. `default` = obsidian/charcoal, `success` = green. */
export type CheckboxColor = 'default' | 'success';

/** Checkbox ships a compact two-step scale (no `lg`), so it doesn't reuse ControlSize. */
export type CheckboxSize = 'sm' | 'md';

// Built on Base UI's headless Checkbox (like the rest of the library): the Root
// renders a `<span role="checkbox">` plus a hidden `<input>`. We drop Base UI's
// `className`/`render` (styling is owned here) and forward the ref to the span.
// `disabled` is pulled out so it can drive BOTH the native input and the
// render-time style choice (a span can't use `:disabled`).
type BaseProps = Omit<BaseCheckbox.Root.Props, 'className' | 'render'>;

export interface CheckboxProps extends BaseProps {
  /** Optional text beside the box. When present, clicking it toggles the box. */
  label?: ReactNode;
  /** Checked-state fill color. Default is the obsidian/charcoal box. */
  color?: CheckboxColor;
  /** Control size — box, tick, label and gap scale together. */
  size?: CheckboxSize;
}

/**
 * **Checkbox** — a single on/off control with an optional inline label. Built on
 * Base UI's headless Checkbox (renders a `<span role="checkbox">` + a hidden
 * `<input>`); when a `label` is given, clicking it toggles the box. Controlled
 * via `checked`, uncontrolled via `defaultChecked` (forwarded Base UI props).
 *
 * @example
 * ```tsx
 * <Checkbox label="Email me receipts" defaultChecked />
 * <Checkbox label="Approved" color="success" size="sm" />
 * ```
 */
export const Checkbox = forwardRef<HTMLElement, CheckboxProps>(
  function Checkbox(
    { label, color = 'default', size = 'md', disabled, id: idProp, ...rest },
    ref,
  ) {
    const reactId = useId();
    const id = idProp ?? reactId;

    const control = (
      <BaseCheckbox.Root
        ref={ref as Ref<HTMLElement>}
        id={id}
        disabled={disabled}
        {...rest}
        {...stylex.props(
          box.base,
          focusRing.ring,
          box[size],
          disabled ? box.disabled : box.interactive,
        )}
      >
        <BaseCheckbox.Indicator
          {...stylex.props(
            indicator.base,
            disabled ? indicator.disabledFill : indicator[color],
          )}
        >
          <Check size={iconSize[size]} strokeWidth={3} aria-hidden />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    );

    // No label → the box is the whole control (consumer supplies its own
    // accessible name, e.g. `aria-label`, via `...rest`).
    if (label == null) return control;

    // Label is associated by `htmlFor`/`id` (not nesting) so clicking it toggles
    // exactly once — no double-fire from a wrapping <label>.
    return (
      <span
        {...stylex.props(
          row.base,
          row[size],
          disabled ? row.disabled : row.interactive,
        )}
      >
        {control}
        <label
          htmlFor={id}
          {...stylex.props(
            labelText.base,
            labelText[size],
            disabled && labelText.disabled,
          )}
        >
          {label}
        </label>
      </span>
    );
  },
);
