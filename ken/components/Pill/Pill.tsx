'use client';

import * as stylex from '@stylexjs/stylex';
import { cloneElement, forwardRef, isValidElement } from 'react';
import type { ReactElement, ReactNode, Ref } from 'react';
import { Button as BaseButton } from '@base-ui-components/react/button';
import { focusRing } from '../../theme/foundations/focusRing';
import { iconSize } from '../../theme/foundations/iconSize';
import * as chip from '../../recipes/chipRecipe';
import type { BadgeStatus, BadgeSize } from '../Badge';
import * as s from './Pill.styles';

// We always render a real <button>, so take the NATIVE member of Base UI's props
// union (still carries `type`, `form`, `onClick`, native `disabled`, …) and drop
// Base UI's `className`/`render` (styling is owned by Ken).
type NativeButtonProps = Extract<BaseButton.Props, { nativeButton?: true }>;
type BaseProps = Omit<NativeButtonProps, 'className' | 'render'>;

export interface PillProps extends BaseProps {
  /** Status — selects the surface and accent colour. Default `neutral`. Mirrors Badge. */
  status?: BadgeStatus;
  /** Density. Default `md`. */
  size?: BadgeSize;
  /** Optional leading icon — a Lucide element, auto-sized; colour follows status. */
  icon?: ReactNode;
}

/**
 * **Pill** — the interactive twin of `Badge`: the same pill visual (shared via
 * `recipes/chipRecipe`) on a real Base UI Button, so it takes `onClick`, shows a
 * hover/press affordance and a keyboard focus ring, and is fully operable. Use it
 * for clickable chips (e.g. starter-prompt suggestions); use `Badge` for display.
 *
 * @example
 * ```tsx
 * <Pill onClick={apply}>All transactions</Pill>
 * <Pill status="success" icon={<Check />}>Approved</Pill>
 * ```
 */
export const Pill = forwardRef<HTMLButtonElement, PillProps>(function Pill(
  { status = 'neutral', size = 'md', type = 'button', icon, children, ...rest },
  ref,
) {
  // Status hue is carried by the ICON only (neutral inherits the label colour),
  // exactly like Badge. cloneElement injects Lucide's numeric `size`.
  const iconNode =
    icon != null ? (
      <span
        {...stylex.props(
          chip.icon.base,
          status !== 'neutral' && chip.icon[status],
        )}
      >
        {isValidElement(icon)
          ? cloneElement(icon as ReactElement<{ size?: number }>, {
              size: iconSize[size],
            })
          : icon}
      </span>
    ) : null;

  return (
    <BaseButton
      ref={ref as Ref<HTMLElement>}
      type={type}
      {...rest}
      {...stylex.props(
        chip.shell.base,
        focusRing.ring,
        chip.size[size],
        s.interaction.base,
        status === 'neutral' ? s.surface.neutral : s.surface.status,
        status === 'neutral' ? s.text.primary : s.text.secondary,
      )}
    >
      {iconNode}
      {children}
    </BaseButton>
  );
});
