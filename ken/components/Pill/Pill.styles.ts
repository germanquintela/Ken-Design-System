import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { duration, easing } from '../../theme/tokens/motion.stylex';

/**
 * Each colour property lives in exactly ONE owner (StyleX last-wins per key):
 * `surface` owns background/border, `text` owns the label colour. Hover/active
 * are guarded with :not(:disabled).
 */

export const interaction = stylex.create({
  base: {
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    userSelect: 'none',
    appearance: 'none',
    transitionProperty: 'background-color, border-color, color, transform',
    transitionDuration: `${duration.medium}, ${duration.medium}, ${duration.medium}, ${duration.fast}`,
    transitionTimingFunction: `${easing.standard}, ${easing.standard}, ${easing.standard}, ${easing.out}`,
    transform: { default: 'scale(1)', ':active:not(:disabled)': 'scale(0.97)' },
  },
});

export const surface = stylex.create({
  neutral: {
    backgroundColor: {
      default: color.backgroundSurface,
      ':hover:not(:disabled)': color.backgroundSubtleHover,
      ':disabled': color.backgroundDisabled,
    },
  },
  status: {
    backgroundColor: {
      default: color.backgroundPage,
      ':hover:not(:disabled)': color.backgroundSubtle,
      ':disabled': color.backgroundDisabled,
    },
    borderColor: {
      default: color.borderDefault,
      ':disabled': color.backgroundDisabled,
    },
  },
});

export const text = stylex.create({
  primary: {
    color: { default: color.textPrimary, ':disabled': color.textDisabled },
  },
  secondary: {
    color: { default: color.textSecondary, ':disabled': color.textDisabled },
  },
});
