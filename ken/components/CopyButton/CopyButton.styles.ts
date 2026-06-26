import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { duration, easing } from '../../theme/tokens/motion.stylex';

/**
 * Two icons share a single CSS-grid cell so one can fade/scale out while the
 * other fades/scales in, in place. CSS transitions (not keyframes) so rapid
 * re-clicks retarget smoothly mid-flight.
 */
export const swap = stylex.create({
  root: {
    display: 'inline-grid',
    placeItems: 'center',
    lineHeight: 0,
  },
  icon: {
    gridArea: '1 / 1',
    display: 'inline-flex',
    transitionProperty: {
      default: 'opacity, transform',
      '@media (prefers-reduced-motion: reduce)': 'opacity',
    },
    transitionDuration: duration.base,
    transitionTimingFunction: easing.out,
  },

  copyShown: { opacity: 1, transform: 'scale(1) rotate(0deg)' },
  copyHidden: {
    opacity: 0,
    transform: {
      default: 'scale(0.6) rotate(-30deg)',
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
  },

  checkBase: { color: color.textPrimary },
  checkShown: { opacity: 1, transform: 'scale(1) rotate(0deg)' },
  checkHidden: {
    opacity: 0,
    transform: {
      default: 'scale(0.6) rotate(30deg)',
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
  },
});
