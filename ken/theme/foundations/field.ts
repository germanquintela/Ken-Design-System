import * as stylex from '@stylexjs/stylex';
import { color } from '../tokens/color.stylex';
import { space } from '../tokens/space.stylex';
import { duration, easing } from '../tokens/motion.stylex';

/**
 * FIELD SHELL — the bordered box shared by every text control (Input, SearchInput,
 * …). The cross-control primitive: a single owner for the field's border, focus
 * ring, disabled fill, and the sm/md/lg height + horizontal-padding scale.
 *
 * Graduated out of Input on its SECOND user (SearchInput) — the rule-of-second-
 * use abstraction. Each colour lives in ONE state bucket with all its states
 * (StyleX merges last-wins per key, so the border lives only in interactive/error/
 * disabled — never split a property across buckets or a later one erases it).
 *
 * Components compose: `fieldShell.base + fieldSize[size] + <own radius> + <state>`.
 * RADIUS is intentionally NOT here — it's the one shape decision each control owns
 * (Input → radius.control, SearchInput → radius.full).
 *
 * FOCUS = a soft, solid-hue ring that HUGS the box (box-shadow spread, no blur,
 * follows the radius) rather than a detached outline; keys on `:focus-within`
 * (the box isn't focusable, the inner control is); never lime.
 */
export const fieldShell = stylex.create({
  // Shape-only shell; single line, everything vertically centred. Colours
  // (border/bg/ring) live in the state buckets below.
  base: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%',
    gap: space.space2,
    borderWidth: '1px',
    borderStyle: 'solid',
    backgroundColor: color.backgroundPage,
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

// Size = height (raw px — the documented control-height exception, matched to
// Button so the controls align in a form row) + horizontal padding on the 4px grid.
export const fieldSize = stylex.create({
  sm: { height: '32px', paddingInline: space.space2 },
  md: { height: '36px', paddingInline: space.space3 },
  lg: { height: '44px', paddingInline: space.space4 },
});
