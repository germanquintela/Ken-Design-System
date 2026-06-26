import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { space } from '../../theme/tokens/space.stylex';
import { radius } from '../../theme/tokens/radius.stylex';
import { duration, easing } from '../../theme/tokens/motion.stylex';

export const styles = stylex.create({
  // overflow clips the expanding panel + tinted code to the radius.
  card: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: color.borderSubtle,
    borderRadius: radius.surface,
    backgroundColor: color.backgroundPage,
    overflow: 'hidden',
  },
  preview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: space.space8,
    minHeight: space.space40,
  },
  // Inset focus ring (offset -2px) so the card's overflow:hidden never clips it.
  footer: {
    appearance: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: space.space10,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: space.space4,
    paddingRight: space.space4,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: color.borderSubtle,
    borderRightStyle: 'none',
    borderBottomStyle: 'none',
    borderLeftStyle: 'none',
    backgroundColor: {
      default: 'transparent',
      ':hover:not(:disabled)': color.backgroundNeutral,
    },
    color: color.textSecondary,
    cursor: 'pointer',
    transitionProperty: 'background-color',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.standard,
    outlineStyle: { default: 'none', ':focus-visible': 'solid' },
    outlineWidth: { default: '0', ':focus-visible': '2px' },
    outlineColor: {
      default: 'transparent',
      ':focus-visible': color.borderFocus,
    },
    outlineOffset: { default: '0', ':focus-visible': '-2px' },
  },
  chevron: {
    display: 'inline-flex',
    transitionProperty: 'transform',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.standard,
  },
  chevronOpen: {
    transform: 'rotate(180deg)',
  },
  // Collapsible.Panel — Base UI sets --collapsible-panel-height; animate height
  // from 0 (starting/ending styles) to the measured height.
  panel: {
    overflow: 'hidden',
    height: {
      default: 'var(--collapsible-panel-height)',
      '[data-starting-style]': '0',
      '[data-ending-style]': '0',
    },
    transitionProperty: 'height',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.standard,
  },
});
