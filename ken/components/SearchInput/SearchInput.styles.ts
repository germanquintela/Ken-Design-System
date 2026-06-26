import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { radius } from '../../theme/tokens/radius.stylex';
import {
  font,
  fontSize,
  fontWeight,
} from '../../theme/tokens/typography.stylex';

/**
 * SEARCH INPUT STYLES — a fully-rounded search field. The bordered box (border /
 * focus ring / disabled fill / sm-md-lg height & padding) is the shared
 * `theme/foundations/field.ts` shell, identical to Input; SearchInput only swaps
 * the RADIUS to a pill and owns its two slots:
 *   • LEADING — a muted magnifying glass, replaced by a Spinner while `loading`.
 *   • TRAILING — a `⌘K` keycap (the shared `Kbd` component) that retires once
 *     you're in the field.
 */

export const shape = stylex.create({
  full: { borderRadius: radius.full },
});

export const slot = stylex.create({
  // pointer-events off so a click on the icon falls through to focus the input.
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
    '::-webkit-search-decoration': { appearance: 'none' },
    '::-webkit-search-cancel-button': { appearance: 'none' },
  },
  sm: { fontSize: fontSize.caption },
  md: { fontSize: fontSize.control },
  lg: { fontSize: fontSize.body },
  disabled: { color: color.textDisabled, cursor: 'not-allowed' },
});
