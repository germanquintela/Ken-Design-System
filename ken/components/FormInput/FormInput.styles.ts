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
 * The float is driven at RENDER TIME (`resting` vs `floated` boolean) — NOT a
 * CSS sibling trick: StyleX is atomic/single-element and can't reach a sibling.
 * Each colour is owned in ONE bucket with all its states (StyleX merges
 * last-wins per key — the border lives only in interactive/error).
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

export const box = stylex.create({
  // Shape-only shell. Colours (border/bg/ring) live in the state buckets.
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch',
    boxSizing: 'border-box',
    width: '100%',
    height: '56px', // raw px — the documented control-height exception
    paddingInline: space.space4,
    gap: space.space2,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: radius.control,
    backgroundColor: color.backgroundPage,
    // Focus ring = box-shadow spread that hugs the box (not a detached outline);
    // owned per-state alongside the border. Keys on :focus-within (box not focusable).
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.standard,
  },
  interactive: {
    borderColor: {
      default: color.borderDefault,
      ':focus-within': color.borderFocus,
    },
    boxShadow: {
      default: 'none',
      ':focus-within': `0 0 0 3px color-mix(in srgb, ${color.borderFocus} 30%, transparent)`,
    },
  },
  error: {
    borderColor: color.dangerDefault,
    boxShadow: {
      default: 'none',
      ':focus-within': `0 0 0 3px color-mix(in srgb, ${color.dangerDefault} 30%, transparent)`,
    },
  },
  disabled: {
    backgroundColor: color.backgroundDisabled,
    borderColor: color.borderDefault,
    cursor: 'not-allowed',
  },
});

export const fieldCol = stylex.create({
  // `minWidth: 0` lets the input shrink inside the flex row.
  base: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export const input = stylex.create({
  // `paddingTop` drops the value into a lower band, reserving the top for the
  // floated label so the two never collide. Native placeholder hidden (the label is it).
  base: {
    width: '100%',
    minWidth: 0,
    margin: 0,
    padding: 0,
    paddingTop: '14px', // raw px — same float-geometry exception as the height
    borderStyle: 'none',
    outlineStyle: 'none',
    backgroundColor: 'transparent',
    appearance: 'none',
    color: color.textPrimary,
    fontFamily: font.sans,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.body,
    lineHeight: 'normal',
    '::placeholder': { color: 'transparent' },
  },
  disabled: { color: color.textDisabled, cursor: 'not-allowed' },
});

export const label = stylex.create({
  // top-left transform-origin lets the float scale toward the corner while
  // translateY sets the vertical position. pointer-events off so clicks fall through.
  base: {
    position: 'absolute',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    transformOrigin: 'top left',
    whiteSpace: 'nowrap',
    fontFamily: font.sans,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.body, // matches the value; the float only scales DOWN
    lineHeight: lineHeight.body,
    color: color.textMuted,
    transitionProperty: 'transform, color',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: `${easing.out}, ${easing.standard}`,
    willChange: 'transform',
  },
  resting: { transform: 'translateY(15px) scale(1)' },
  floated: { transform: 'translateY(9px) scale(0.625)' },
  error: { color: color.dangerDefault },
  disabled: { color: color.textDisabled },
});

export const icon = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: color.textMuted,
    pointerEvents: 'none',
  },
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
