import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { space } from '../../theme/tokens/space.stylex';
import {
  font,
  fontSize,
  lineHeight,
  fontWeight,
} from '../../theme/tokens/typography.stylex';

/**
 * TABLE STYLES — co-located (only Table uses them).
 *
 * `border-collapse: collapse` lets every hairline (header rule, row dividers,
 * the `bordered` grid + outer box) be a single shared `borderSubtle` line —
 * adjacent borders merge, so the leftmost cell's left border collapses into the
 * table's outer border with no doubling. All hairlines are limestone.
 *
 * Because StyleX has no descendant selectors, the root's `striped`/`hover`/
 * `bordered` reach rows and cells through React context (see Table.tsx); these
 * styles only describe what each element does once it knows the flag.
 */

const HAIRLINE = '1px';

export const table = stylex.create({
  base: {
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    fontFamily: font.sans,
    color: color.textPrimary,
    fontVariantNumeric: 'tabular-nums', // Ramp's data-table signature — inherits down
  },
  bordered: {
    borderWidth: HAIRLINE,
    borderStyle: 'solid',
    borderColor: color.borderSubtle,
  },
});

export const headerCell = stylex.create({
  base: {
    paddingBlock: space.space3,
    paddingInline: space.space4,
    fontSize: fontSize.footnote,
    lineHeight: lineHeight.footnote,
    fontWeight: fontWeight.regular,
    color: color.textSecondary,
    textAlign: 'left',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    // header rule — present even without `bordered`.
    borderBottomWidth: HAIRLINE,
    borderBottomStyle: 'solid',
    borderBottomColor: color.borderSubtle,
  },
});

export const cell = stylex.create({
  base: {
    paddingBlock: space.space3,
    paddingInline: space.space4,
    fontSize: fontSize.control,
    lineHeight: lineHeight.control,
    color: color.textPrimary,
    textAlign: 'left',
    verticalAlign: 'middle',
  },
});

// Overrides base `left` (same property, last-wins).
export const align = stylex.create({
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
});

// Added to every cell only when `bordered`. With the outer box + collapse,
// the leftmost line merges into the table border.
export const cellBordered = stylex.create({
  on: {
    borderLeftWidth: HAIRLINE,
    borderLeftStyle: 'solid',
    borderLeftColor: color.borderSubtle,
  },
});

export const row = stylex.create({
  // Divider between body rows. `:last-child` → 0 so there's no trailing hairline
  // (the last row leans on the outer box when `bordered`, on nothing when not).
  divider: {
    borderBottomWidth: { default: HAIRLINE, ':last-child': '0' },
    borderBottomStyle: 'solid',
    borderBottomColor: color.borderSubtle,
  },
  // Backgrounds — ONE owner of backgroundColor (avoids StyleX's last-wins
  // per-property collision). Exactly one of these is applied. StyleX ranks
  // `:hover` above `:nth-child`, so hover paints over the stripe.
  striped: {
    backgroundColor: { ':nth-child(even)': color.backgroundSubtle },
  },
  hover: {
    backgroundColor: { ':hover': color.backgroundHover },
  },
  stripedHover: {
    backgroundColor: {
      ':nth-child(even)': color.backgroundSubtle,
      ':hover': color.backgroundHover,
    },
  },
});
