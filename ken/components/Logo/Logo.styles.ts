import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';

/**
 * The lockup rides `currentColor` (set by `tone`); `size` sets the HEIGHT and the
 * svg takes width:auto so each lockup keeps its own aspect ratio.
 */
export const root = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    lineHeight: 0, // strip the inline-box descender so the box is exactly the svg
  },
});

export const tone = stylex.create({
  default: { color: color.textPrimary },
  muted: { color: color.textSecondary },
  inverse: { color: color.textInverse },
});

export const size = stylex.create({
  xs: { height: '16px' },
  sm: { height: '24px' },
  md: { height: '32px' },
});

export const svg = stylex.create({
  base: {
    display: 'block',
    height: '100%',
    width: 'auto',
  },
});
