import * as stylex from '@stylexjs/stylex';
import { cloneElement, forwardRef, isValidElement } from 'react';
import type {
  ElementType,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import { renderPoly } from '../../lib/renderPoly';
import { iconSize } from '../../theme/foundations/iconSize';
import * as chip from '../../recipes/chipRecipe';
import * as s from './Badge.styles';

/**
 * Status drives BOTH the surface and the accent colour. `neutral` (default) is
 * the filled limestone chip for plain labels; the rest are outlined white chips
 * whose hue is carried by the icon — or by the text, when there's no icon.
 */
export type BadgeStatus = 'neutral' | 'success' | 'warning' | 'error' | 'info';

/** Density scale — height, icon size and horizontal padding; the 12px text stays. */
export type BadgeSize = 'sm' | 'md';

type NativeSpan = Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'>;

export interface BadgeProps extends NativeSpan {
  /** The element Badge renders as. Default `span` (inline). */
  as?: ElementType;
  /** Status — selects the surface and accent colour. Default `neutral`. */
  status?: BadgeStatus;
  /** Density. Default `md` (the Figma size). */
  size?: BadgeSize;
  /** Optional leading icon — a Lucide element. Auto-sized to the badge; its
   *  colour follows the status (via `currentColor`). */
  icon?: ReactNode;
}

/**
 * **Badge** — a small, non-interactive status chip for labels, counts and states
 * (e.g. `Active`, `3`, `Failed`). `neutral` (default) is a filled limestone chip;
 * the status variants are outlined white chips whose hue is carried by the icon
 * (or by the text, when no icon is given). For a clickable chip, reach for `Pill`.
 *
 * Display-only, so (like Card/Box) it uses `renderPoly` rather than an interactive
 * primitive — keeping the polymorphic `as` and the no-raw-element rule without
 * pulling in button/focus behaviour.
 *
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge status="success" icon={<Check />}>Paid</Badge>
 * <Badge status="error" size="sm">Failed</Badge>
 * ```
 */
export const Badge = forwardRef<HTMLElement, BadgeProps>(function Badge(
  { as = 'span', status = 'neutral', size = 'md', icon, children, ...rest },
  ref,
) {
  // Label colour: neutral → primary, any status → secondary. The status hue is
  // carried by the ICON only — the text is never tinted.
  const labelTone = status === 'neutral' ? s.text.primary : s.text.secondary;

  // Icon is auto-sized to the badge and tinted by the status (neutral inherits
  // the label colour). cloneElement injects Lucide's numeric `size` prop.
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

  return renderPoly({
    as,
    ref: ref as Ref<HTMLElement>,
    props: {
      ...rest,
      ...stylex.props(
        chip.shell.base,
        chip.size[size],
        status === 'neutral' ? s.surface.neutral : s.surface.status,
        labelTone,
      ),
      children: (
        <>
          {iconNode}
          {children}
        </>
      ),
    },
  });
});
