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
 * SWITCH STYLES — co-located (only Switch uses them for now).
 *
 * Base UI's `Switch.Root`/`Switch.Thumb` are `<span>`s; the Thumb carries
 * `data-checked` / `data-unchecked` / `data-disabled`. We drive:
 *  - POSITION from `[data-checked]` (a `translateX` on the thumb) — works for
 *    uncontrolled switches because it's pure CSS state, no render-time knowledge.
 *  - DISABLED at render-time (consumer-owned), like Checkbox, so hover/press
 *    pseudos need no `:disabled` (a span can't be `:disabled` anyway).
 *
 * The morph (per Emil): the thumb both slides (translateX) AND stretches
 * (scaleX) — ONE `transform` property, so it's GPU-only (no layout), and CSS
 * transitions (not keyframes) keep it interruptible on rapid toggles. Pressing
 * fattens the knob; releasing slides it to the far side while it settles back to
 * a circle, so it visibly extends along the direction of travel. Origin stays
 * centered to avoid a 1-frame anchor flip when toggling mid-stretch.
 * Everything is a semantic token on the 4px grid; motion respects reduced-motion.
 */

const STRETCH = 'scaleX(1.2)'; // ~20% wider on press — the "morph"
const SM_TRAVEL = '12px'; // 28 track − 2·2 inset − 12 knob
const MD_TRAVEL = '16px'; // 36 track − 2·2 inset − 16 knob

export const track = stylex.create({
  // Shape-only shell. Background (grey↔green) lives in interactive/disabled so
  // it's owned in ONE bucket (StyleX merges last-wins per key).
  base: {
    position: 'relative',
    display: 'inline-block',
    boxSizing: 'border-box',
    flexShrink: 0,
    borderRadius: radius.full,
    // Colour cross-fade only — explicit prop, never `all`; instant under reduced-motion.
    transitionProperty: 'background-color',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.standard,
  },

  // Compact scale — track edge = knob + 2·2px inset.
  sm: { width: '28px', height: '16px' },
  md: { width: '36px', height: '20px' },

  // Enabled — owns the bg (off grey → on vivid green) + pointer.
  interactive: {
    backgroundColor: {
      default: color.borderStrong,
      '[data-checked]': color.successStrong,
    },
    cursor: 'pointer',
  },

  // Disabled — same hues at 45% so it reads inert (cascades to the white knob too).
  disabled: {
    backgroundColor: {
      default: color.borderStrong,
      '[data-checked]': color.successStrong,
    },
    opacity: 0.45,
    cursor: 'not-allowed',
  },
});

export const thumb = stylex.create({
  // White knob, inset 2px from the track edges. `transform` (position + stretch)
  // is owned per-size below since the travel distance differs.
  base: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    borderRadius: radius.full,
    backgroundColor: color.backgroundPage,
    transitionProperty: 'transform',
    transitionDuration: {
      default: duration.base, // 160ms — snappy slide + press stretch
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.out, // strong ease-out — feels responsive
  },

  sm: {
    width: '12px',
    height: '12px',
    transform: {
      default: 'translateX(0) scaleX(1)',
      ':active:not([data-disabled])': `translateX(0) ${STRETCH}`,
      '[data-checked]': `translateX(${SM_TRAVEL}) scaleX(1)`,
      '[data-checked]:active:not([data-disabled])': `translateX(${SM_TRAVEL}) ${STRETCH}`,
    },
  },
  md: {
    width: '16px',
    height: '16px',
    transform: {
      default: 'translateX(0) scaleX(1)',
      ':active:not([data-disabled])': `translateX(0) ${STRETCH}`,
      '[data-checked]': `translateX(${MD_TRAVEL}) scaleX(1)`,
      '[data-checked]:active:not([data-disabled])': `translateX(${MD_TRAVEL}) ${STRETCH}`,
    },
  },
});

export const labelText = stylex.create({
  base: {
    fontFamily: font.sans,
    fontWeight: fontWeight.regular, // Lausanne has no Medium cut
    color: color.textPrimary,
    userSelect: 'none',
  },
  sm: { fontSize: fontSize.caption, lineHeight: lineHeight.caption },
  md: { fontSize: fontSize.control, lineHeight: lineHeight.control },
  disabled: { color: color.textDisabled },
});

export const row = stylex.create({
  base: { display: 'inline-flex', alignItems: 'center' },
  sm: { gap: space.space2 },
  md: { gap: space.space3 },
  interactive: { cursor: 'pointer' },
  disabled: { cursor: 'not-allowed' },
});
