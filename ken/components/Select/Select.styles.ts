import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { radius } from '../../theme/tokens/radius.stylex';
import { space } from '../../theme/tokens/space.stylex';
import { font, fontSize } from '../../theme/tokens/typography.stylex';
import { duration, easing } from '../../theme/tokens/motion.stylex';

/**
 * SELECT FAMILY — co-located styles shared by Select (field, single) and
 * MultiSelect (pill, multi), the Avatar/AvatarGroup precedent. The dropdown
 * surface (panel/row/slot/label) is reused wholesale from
 * theme/foundations/overlay.ts; here live the two TRIGGER surfaces (field +
 * pill), the value area, the inner pills + "+N" chip, the trailing-check cell,
 * and the Select-specific panel width override.
 *
 * Single owner per property (StyleX merges last-wins per key): each colour/border
 * keeps its `default` + states together so a later composed style can't erase it.
 * Heights are raw px (the documented control-footprint exception), matched to
 * Button/field so controls line up in a form row.
 */

const RING = `0 0 0 3px color-mix(in srgb, ${color.borderFocus} 30%, transparent)`;

// Border colour is intentionally absent here (each appearance owns it → no merge collision).
export const trigger = stylex.create({
  base: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.space2,
    maxWidth: '100%',
    margin: 0,
    borderWidth: 0,
    borderStyle: 'solid',
    appearance: 'none',
    fontFamily: font.sans,
    fontSize: fontSize.footnote,
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    cursor: { default: 'pointer', '[data-disabled]': 'not-allowed' },
    outlineStyle: 'none', // pill re-enables it via focusRing; field uses a box-shadow ring
  },
  sm: { height: '32px' },
  md: { height: '36px' },
});

// FIELD appearance (Select) — owns radius + border-colour + focus/open ring +
// disabled (single owner each); composes fieldShell.base in the component.
export const field = stylex.create({
  shape: { borderRadius: radius.control },
  padSm: { paddingInline: space.space2 },
  padMd: { paddingInline: space.space3 },
  rest: {
    borderColor: {
      default: color.borderDefault,
      ':focus-visible': color.borderFocus,
    },
    boxShadow: { default: 'none', ':focus-visible': RING },
    color: color.textPrimary,
  },
  open: {
    // We hold the open state → paint the focused look while the popup is open,
    // independent of :focus-visible.
    borderColor: color.borderFocus,
    boxShadow: RING,
  },
  disabled: {
    backgroundColor: color.backgroundDisabled,
    borderColor: color.borderDefault,
    color: color.textDisabled,
  },
});

// PILL appearance (MultiSelect) — rounded-full chip, always limestone-filled.
// Right padding tightens only when pills are present (the component applies
// `multiPad` on hasValue) so an EMPTY pill keeps symmetric padding.
export const pill = stylex.create({
  shape: { borderRadius: radius.full },
  padSm: { paddingInline: space.space2 },
  padMd: { paddingInline: space.space3 },
  multiPad: { paddingInlineEnd: space.space1 },
  filled: {
    backgroundColor: {
      default: color.backgroundNeutral,
      ':hover:not(:disabled):not([data-disabled])': color.backgroundSubtleHover,
      '[data-disabled]': color.backgroundDisabled,
    },
    color: {
      default: color.textPrimary,
      '[data-disabled]': color.textDisabled,
    },
  },
  motion: {
    transitionProperty: 'background-color, border-color',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.standard,
  },
});

export const value = stylex.create({
  area: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.space1,
    flexGrow: 1,
    minWidth: 0,
    overflow: 'hidden',
  },
  text: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  placeholderField: { color: color.textMuted },
});

export const chip = stylex.create({
  base: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    paddingInline: space.space2,
    borderRadius: radius.full,
    backgroundColor: color.backgroundPage,
    color: color.textBody,
    fontFamily: font.sans,
    fontSize: fontSize.footnote,
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
  },
  sm: { height: '24px' },
  md: { height: '28px' },
  label: { overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' },
  disabled: {
    backgroundColor: color.backgroundSurface,
    color: color.textDisabled,
  },
});

export const check = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: color.textPrimary, // never accent — accent is action-only
  },
});

export const panel = stylex.create({
  select: {
    minWidth: 'max(var(--anchor-width), 180px)',
    maxWidth: 'var(--available-width)',
    maxHeight: 'var(--available-height)',
    overflowY: 'auto',
  },
});
