import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { radius } from '../../theme/tokens/radius.stylex';
import { space } from '../../theme/tokens/space.stylex';
import {
  font,
  fontSize,
  fontWeight,
  lineHeight,
} from '../../theme/tokens/typography.stylex';
import { duration, easing } from '../../theme/tokens/motion.stylex';

/**
 * The bordered box (border/ring/disabled fill + sm-md-lg height+padding) lives
 * in the shared `theme/foundations/field.ts` shell. Input only owns the box's
 * RADIUS here, plus the label, control, slots, and below-text.
 */

const errorIn = stylex.keyframes({
  from: { opacity: 0, transform: 'translateY(-4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const root = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.space1,
    width: '100%',
  },
});

export const labelText = stylex.create({
  // `fit-content` so the <label> hit-area is the text, not the full row.
  base: {
    width: 'fit-content',
    fontFamily: font.sans,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption,
    color: color.textSecondary,
  },
  disabled: { color: color.textDisabled },
});

export const box = stylex.create({
  control: { borderRadius: radius.control },
});

export const input = stylex.create({
  base: {
    width: '100%',
    minWidth: 0,
    margin: 0,
    padding: 0,
    borderStyle: 'none',
    outlineStyle: 'none',
    backgroundColor: 'transparent',
    appearance: 'none',
    color: color.textPrimary,
    fontFamily: font.sans,
    fontWeight: fontWeight.regular,
    lineHeight: 'normal',
    '::placeholder': { color: color.textMuted },
  },
  sm: { fontSize: fontSize.caption },
  md: { fontSize: fontSize.control },
  lg: { fontSize: fontSize.body },
  disabled: { color: color.textDisabled, cursor: 'not-allowed' },
});

export const slot = stylex.create({
  // pointer-events off so clicks fall through to focus the input.
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: color.textMuted,
    pointerEvents: 'none',
  },
  sm: { fontSize: fontSize.caption, lineHeight: lineHeight.caption },
  md: { fontSize: fontSize.control, lineHeight: lineHeight.control },
  lg: { fontSize: fontSize.body, lineHeight: lineHeight.body },
  disabled: { color: color.textDisabled },
});

export const below = stylex.create({
  base: {
    margin: 0,
    fontFamily: font.sans,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption,
  },
  description: { color: color.textMuted },
  error: {
    color: color.dangerDefault,
    animationName: {
      default: errorIn,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationDuration: duration.fast,
    animationTimingFunction: easing.out,
  },
});
