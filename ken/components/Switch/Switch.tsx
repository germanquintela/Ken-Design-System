'use client';

import * as stylex from '@stylexjs/stylex';
import { forwardRef, useId } from 'react';
import type { ReactNode, Ref } from 'react';
import { Switch as BaseSwitch } from '@base-ui-components/react/switch';
import { focusRing } from '../../theme/foundations/focusRing';
import { labelText, row, thumb, track } from './Switch.styles';

/** Switch ships a compact two-step scale (no `lg`), like Checkbox. */
export type SwitchSize = 'sm' | 'md';

// Built on Base UI's headless Switch: the Root renders a `<span role="switch">`
// plus a hidden `<input>`; the Thumb is a `<span>` we position. We drop Base
// UI's `className`/`render` (styling is owned here) and forward the ref to the
// Root span. `disabled` is pulled out to drive the native input AND the
// render-time style choice (a span can't use `:disabled`). There is no `color`
// prop: the active/on state is always success green by design.
type BaseProps = Omit<BaseSwitch.Root.Props, 'className' | 'render'>;

export interface SwitchProps extends BaseProps {
  /** Optional text beside the switch. When present, clicking it toggles. */
  label?: ReactNode;
  /** Control size — track, knob, label and gap scale together. */
  size?: SwitchSize;
}

/**
 * **Switch** — a toggle for an immediate on/off setting, with an optional inline
 * label. Built on Base UI's headless Switch (`<span role="switch">` + a hidden
 * `<input>`); the on state is always success green (there is no `color` prop).
 * Controlled via `checked`, uncontrolled via `defaultChecked` (forwarded Base UI props).
 *
 * @example
 * ```tsx
 * <Switch label="Notifications" defaultChecked />
 * <Switch label="Compact mode" size="sm" />
 * ```
 */
export const Switch = forwardRef<HTMLElement, SwitchProps>(function Switch(
  { label, size = 'md', disabled, id: idProp, ...rest },
  ref,
) {
  const reactId = useId();
  const id = idProp ?? reactId;

  const control = (
    <BaseSwitch.Root
      ref={ref as Ref<HTMLElement>}
      id={id}
      disabled={disabled}
      {...rest}
      {...stylex.props(
        track.base,
        focusRing.ring,
        track[size],
        disabled ? track.disabled : track.interactive,
      )}
    >
      <BaseSwitch.Thumb {...stylex.props(thumb.base, thumb[size])} />
    </BaseSwitch.Root>
  );

  // No label → the switch is the whole control (consumer supplies its own
  // accessible name, e.g. `aria-label`, via `...rest`).
  if (label == null) return control;

  // Associated by `htmlFor`/`id` (not nesting) so clicking the label toggles
  // exactly once.
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
});
