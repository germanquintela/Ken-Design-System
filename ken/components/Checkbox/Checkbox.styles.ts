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
 * CHECKBOX STYLES — co-located because (for now) only Checkbox uses them.
 * Promote to `recipes/` the day a sibling control (Radio) shares the box/tick.
 *
 * Architecture note: Base UI's `Checkbox.Root` is a `<span>` (not a native
 * button), so `:disabled` never fires on it. Two consequences shape this file:
 *  - DISABLED is driven at render-time — the consumer always owns `disabled`,
 *    so the component picks `box.disabled` vs `box.interactive` instead of a
 *    `:disabled` selector. That also lets hover/active stay unguarded (the
 *    interactive bucket simply isn't applied when disabled).
 *  - CHECKED is driven by the Indicator mounting (it only renders when ticked),
 *    so the colored fill needs no `[data-checked]` selector — it's literally
 *    absent when unchecked and animates in on mount.
 * Every value is a semantic token on the 4px grid; no raw hex, no `transition: all`.
 */

// The colored fill grows into place on tick — a quick "checkbox tick" (140ms),
// ease-out, replays on every (re)mount. Exit is instant (Indicator unmounts).
const tickIn = stylex.keyframes({
  from: { opacity: 0, transform: 'scale(0.6)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

export const box = stylex.create({
  // Shape-only shell. Colors (bg/border) live in interactive/disabled so each
  // is owned in ONE bucket with all its states (StyleX merges last-wins per key).
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    flexShrink: 0,
    margin: 0,
    padding: 0,
    appearance: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: radius.nav,
    // Explicit props only (never `all`): the unchecked border eases (200ms),
    // the press scale is snappy (140ms ease-out).
    transitionProperty: 'border-color, transform',
    transitionDuration: `${duration.medium}, ${duration.fast}`,
    transitionTimingFunction: `${easing.standard}, ${easing.out}`,
  },

  // Size = box edge. The 4px-grid compact scale (sm 16 / md 20).
  sm: { width: '16px', height: '16px' },
  md: { width: '20px', height: '20px' },

  // Applied when enabled — owns bg + border + the hover/press affordances.
  interactive: {
    backgroundColor: color.backgroundPage, // white box when unchecked
    borderColor: { default: color.borderDefault, ':hover': color.borderStrong },
    cursor: 'pointer',
    transform: { default: 'scale(1)', ':active': 'scale(0.97)' },
  },

  // Applied when disabled — inert fill, no hover/press.
  disabled: {
    backgroundColor: color.backgroundDisabled,
    borderColor: color.borderDefault,
    cursor: 'not-allowed',
  },
});

export const indicator = stylex.create({
  // Absolute fill that covers the box (incl. its 1px border, hence inset -1px)
  // so a checked box reads as a solid colored square — the border becomes the
  // fill, exactly as in the Figma. Holds the centered white tick.
  base: {
    position: 'absolute',
    inset: '-1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.nav,
    color: color.textOnControlChecked, // the Lucide tick inherits this (currentColor)
    pointerEvents: 'none',
    animationName: tickIn,
    animationDuration: duration.fast,
    animationTimingFunction: easing.out,
  },

  // Checked-state fill — the only thing the `color` prop changes.
  default: { backgroundColor: color.backgroundControlChecked },
  success: { backgroundColor: color.successDefault },
  // Checked + disabled — muted fill so a ticked-but-inert box still reads.
  disabledFill: { backgroundColor: color.borderStrong },
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
  // The box ↔ label layout; gap tracks the control size.
  base: { display: 'inline-flex', alignItems: 'center' },
  sm: { gap: space.space2 },
  md: { gap: space.space3 },
  interactive: { cursor: 'pointer' },
  disabled: { cursor: 'not-allowed' },
});
