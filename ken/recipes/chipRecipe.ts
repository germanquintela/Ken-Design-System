import * as stylex from '@stylexjs/stylex';
import { color } from '../theme/tokens/color.stylex';
import { radius } from '../theme/tokens/radius.stylex';
import { space } from '../theme/tokens/space.stylex';
import {
  font,
  fontSize,
  fontWeight,
  lineHeight,
} from '../theme/tokens/typography.stylex';

/**
 * CHIP RECIPE — the stateless visual identity shared by the chip family:
 * the display `Badge` and the interactive `Pill`.
 *
 * Holds ONLY what is identical and state-free between the two — the pill shell,
 * the density scale, and the icon tints. Colour SURFACES and TEXT are NOT here:
 * StyleX merges last-wins per property key, so each colour property must live in
 * exactly one owner with its default/:hover/:disabled together. Badge's surfaces
 * are stateless; Pill's carry :hover/:disabled — so each component owns its own
 * surface + text (rest-state values kept identical by convention).
 */

export const shell = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.space1,
    boxSizing: 'border-box',
    flexShrink: 0,
    width: 'fit-content', // a pill hugs its content, never stretches
    margin: 0,
    fontFamily: font.sans,
    fontWeight: fontWeight.regular, // Lausanne has no Medium cut; emphasis is colour
    fontSize: fontSize.footnote,
    lineHeight: lineHeight.normal, // chips are fixed-height + flex-centred; font-metric default avoids glyph clipping
    whiteSpace: 'nowrap',
    borderRadius: radius.full, // pill
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent', // the surface owns any visible border
  },
});

// Size scale — fixed height + horizontal padding on the 4px grid; the 12px text
// stays legible at either size (density only).
export const size = stylex.create({
  sm: { height: '20px', paddingInline: space.space2 },
  md: { height: '24px', paddingInline: space.space3 },
});

// ICON — wrapper sets the status tint (Lucide strokes inherit currentColor).
// neutral has no entry → the icon inherits the label colour.
export const icon = stylex.create({
  base: { display: 'inline-flex', flexShrink: 0 },
  success: { color: color.successDefault },
  warning: { color: color.warningDefault },
  error: { color: color.dangerDefault },
  info: { color: color.infoDefault },
});
