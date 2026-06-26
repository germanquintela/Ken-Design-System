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
 * TEXTAREA STYLES — the multi-line sibling of `Input`: an optional EXTERNAL label
 * above, the bordered <textarea> itself (no wrapper box — there are no prefix/
 * suffix slots, so the control carries border/bg/ring directly), and a helper/
 * error line below. Same field-shell language as Input (border + box-shadow focus
 * ring + below-text) at the single md size.
 *
 * Each colour is owned in ONE bucket with all its states (StyleX merges last-wins
 * per key — `borderColor` lives only in the state buckets, never in `base`, so a
 * partial `:focus`-only override can't erase a default into black). FOCUS is a
 * soft box-shadow ring that HUGS the box (no blur, follows the radius), never lime.
 * Keys on `:focus` — the textarea IS the focusable element (unlike Input's box).
 */

// The error message slides in once on mount — opacity + a 4px lift, fast/ease-out.
const errorIn = stylex.keyframes({
  from: { opacity: 0, transform: 'translateY(-4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const root = stylex.create({
  // Stacks label / textarea / below-text with a uniform small gap.
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.space1,
    width: '100%',
  },
});

export const labelText = stylex.create({
  // External label above the field. `fit-content` so the <label> hit-area is the
  // text, not the full row.
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

export const area = stylex.create({
  // Shape + type + surface. `borderColor` lives in the state buckets only.
  // `resize: none` always — height is owned by auto-grow or the `rows` attr, never
  // a drag handle. Padding is the md scale; `seamless` strips it to zero.
  base: {
    display: 'block',
    boxSizing: 'border-box',
    width: '100%',
    margin: 0,
    resize: 'none',
    appearance: 'none',
    // Kill the native focus outline — our focus is the border + box-shadow ring
    // (matches Input). Without this the browser draws its own blue ring on top,
    // and `seamless` could never be fully chrome-free.
    outlineStyle: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: radius.control,
    backgroundColor: color.backgroundPage,
    color: color.textPrimary,
    fontFamily: font.sans,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.control,
    lineHeight: lineHeight.control, // ~20px line box → three lines ≈ 60px
    paddingBlock: space.space2,
    paddingInline: space.space3,
    // FOCUS = a soft, solid-hue ring that HUGS the box (box-shadow spread, no
    // blur, follows the radius) rather than a detached outline. Owned per-state
    // alongside the border; never lime.
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.standard,
    '::placeholder': { color: color.textMuted },
  },
  // Resting field — neutral border that warms to focus, with the focus ring.
  outlined: {
    borderColor: { default: color.borderDefault, ':focus': color.borderFocus },
    boxShadow: {
      default: 'none',
      ':focus': `0 0 0 3px color-mix(in srgb, ${color.borderFocus} 30%, transparent)`,
    },
  },
  error: {
    borderColor: color.dangerDefault,
    boxShadow: {
      default: 'none',
      ':focus': `0 0 0 3px color-mix(in srgb, ${color.dangerDefault} 30%, transparent)`,
    },
  },
  disabled: {
    backgroundColor: color.backgroundDisabled,
    borderColor: color.borderDefault,
    color: color.textDisabled,
    cursor: 'not-allowed',
  },
  // Just an area to type in: no border, surface, ring, or padding. Layered ON TOP
  // of the state bucket (wins border/bg/shadow/padding by order) so a disabled
  // seamless field keeps its muted text + not-allowed cursor.
  seamless: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    paddingBlock: space.space0,
    paddingInline: space.space0,
  },
  // Auto-grow: JS owns the height, so a scrollbar must never show.
  autoGrow: { overflowY: 'hidden' },
  // Fixed `rows`: content past N rows scrolls.
  fixed: { overflowY: 'auto' },
});

export const below = stylex.create({
  // The single bottom slot — helper text by default, error message when invalid.
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
