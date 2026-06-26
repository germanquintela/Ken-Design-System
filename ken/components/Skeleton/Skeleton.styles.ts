import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { radius } from '../../theme/tokens/radius.stylex';
import { space } from '../../theme/tokens/space.stylex';
import { fontSize } from '../../theme/tokens/typography.stylex';
import { easing } from '../../theme/tokens/motion.stylex';

/**
 * SKELETON STYLES — co-located (only Skeleton uses them; a single component, not
 * a family → not a recipe per §4).
 *
 * Surface = `backgroundSkeleton` (light-smoke #f5f5f4). The ambient PULSE lives
 * on the root so every variant — including a multi-line text column — breathes
 * as one unit.
 *
 * Motion note: a skeleton is a LOOPING idle affordance, so its ~1.5s pulse is
 * the one deliberate exception to the system's "<300ms, one-shot" motion rule
 * (motion.ts is for UI transitions). The duration is a local constant; the curve
 * still reuses the `inOut` token. Frozen entirely under reduced-motion.
 */

// Opacity breathes down to half and back — calm, not flashy (Emil: ambient
// motion shouldn't draw the eye).
const pulse = stylex.keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
});

export const root = stylex.create({
  base: {
    boxSizing: 'border-box',
    animationName: {
      default: pulse,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationDuration: '1.5s', // looping idle affordance — see note above
    animationTimingFunction: easing.inOut,
    animationIterationCount: 'infinite',
  },

  text: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.space2,
    width: '100%',
    fontSize: fontSize.body, // drives the 1em bar height — bars read as body text
  },

  circle: {
    flexShrink: 0,
    backgroundColor: color.backgroundSkeleton,
    borderRadius: radius.full,
  },

  // rect → fills its parent; a 64px floor keeps a bare, unconstrained rect
  // visible instead of collapsing to 0.
  rect: {
    width: '100%',
    height: '100%',
    minHeight: space.space16,
    backgroundColor: color.backgroundSkeleton,
    borderRadius: radius.surface,
  },
});

// Circle diameters mirror Avatar's scale (24/32/40).
export const circle = stylex.create({
  sm: { width: '24px', height: '24px' },
  md: { width: '32px', height: '32px' },
  lg: { width: '40px', height: '40px' },
});

export const line = stylex.create({
  base: {
    height: '1em',
    width: '100%',
    flexShrink: 0,
    backgroundColor: color.backgroundSkeleton,
    borderRadius: radius.nav,
  },
  last: { width: '60%' },
});
