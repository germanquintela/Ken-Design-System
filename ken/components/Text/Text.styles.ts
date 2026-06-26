import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import {
  font,
  fontSize,
  fontWeight,
  lineHeight,
} from '../../theme/tokens/typography.stylex';

/**
 * TEXT STYLES — co-located (only Text uses them; a single primitive, not a
 * family → not a recipe per §4).
 *
 * Two closed axes, both pure token sets (static StyleX — no dynamic fns needed):
 *  - size → applies the PAIRED fontSize + lineHeight for a typography role
 *    (the two are designed together in typography.stylex, never split).
 *  - tone → the foreground colour ladder (primary / secondary / tertiary).
 *
 * StyleX merges last-wins per property key: `size` owns font-size/line-height,
 * `tone` owns colour — no property is set in two owners.
 */
export const base = stylex.create({
  root: {
    margin: 0, // reset UA margins so `as="p"`/`as="h1"` stay layout-clean — spacing is Box/Stack's job
    fontFamily: font.sans,
    fontWeight: fontWeight.regular, // only Lausanne 400 exists; emphasis is size/colour, never weight
  },
});

// Curated role subset — leaves out micro, the control-only `label`, and the
// hero `display*` sizes. Each value pairs the matching fontSize + lineHeight.
export const size = stylex.create({
  footnote: { fontSize: fontSize.footnote, lineHeight: lineHeight.footnote },
  caption: { fontSize: fontSize.caption, lineHeight: lineHeight.caption },
  body: { fontSize: fontSize.body, lineHeight: lineHeight.body },
  subheading: {
    fontSize: fontSize.subheading,
    lineHeight: lineHeight.subheading,
  },
  heading: { fontSize: fontSize.heading, lineHeight: lineHeight.heading },
  headingLg: { fontSize: fontSize.headingLg, lineHeight: lineHeight.headingLg },
  displaySm: { fontSize: fontSize.displaySm, lineHeight: lineHeight.displaySm },
  display: { fontSize: fontSize.display, lineHeight: lineHeight.display },
  displayLg: { fontSize: fontSize.displayLg, lineHeight: lineHeight.displayLg },
});

// Case transforms. `uppercase`/`lowercase`/`capitalize` map straight to
// `text-transform`; `firstLetter` is sentence-case — it uppercases only the very
// first character via `::first-letter` (CSS `capitalize` would title-case every
// word). Useful for surfacing lowercase API/error strings as a clean sentence.
export const transform = stylex.create({
  uppercase: { textTransform: 'uppercase' },
  lowercase: { textTransform: 'lowercase' },
  capitalize: { textTransform: 'capitalize' },
  firstLetter: { '::first-letter': { textTransform: 'uppercase' } },
});

// Horizontal text alignment — only set when the consumer asks (no `start`
// entry: that's the UA default, so an unset `align` adds no rule).
export const align = stylex.create({
  start: { textAlign: 'start' },
  center: { textAlign: 'center' },
  end: { textAlign: 'end' },
});

// Foreground ladder — the three tones, plus a danger tone for error copy.
export const tone = stylex.create({
  primary: { color: color.textBody },
  secondary: { color: color.textSecondary },
  tertiary: { color: color.textMuted },
  danger: { color: color.dangerDefault }, // error / destructive copy
});

// Single-line ellipsis — the block + nowrap + overflow trio clips inline text and
// adds a `…`. `display: block` is what lets an inline `span` truncate at all.
export const truncate = stylex.create({
  on: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
});
