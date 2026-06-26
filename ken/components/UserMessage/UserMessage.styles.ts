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

/**
 * USERMESSAGE STYLES — co-located (only UserMessage uses them; a single
 * component, not a family → not a recipe per §4).
 *
 * The composition the user asked for: a right-aligned chat bubble (background +
 * radius + right-aligned text) with the date/time as a footnote OUTSIDE the
 * bubble. The bubble owns its layout + surface; the message owns its 14px
 * typography here (the Text primitive intentionally excludes the 14px `control`
 * size — control-only); the meta line reuses Text(footnote, tertiary).
 */

// One-off layout constant, not a token: a single-component decision, not a reused
// design choice (cf. Skeleton's 64px floor, ToggleGroup's computed step).
// 300px = the bubble's max measure (the user's spec). The corner round reuses the
// shared radius.surface token (12) — same geometry as cards/panels.
const BUBBLE_MAX_WIDTH = '300px';

export const root = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', // hug the right edge — "align to the right"
    gap: space.space1,
    margin: 0,
  },
});

export const bubble = stylex.create({
  base: {
    boxSizing: 'border-box',
    maxWidth: BUBBLE_MAX_WIDTH,
    paddingBlock: space.space3, // vertical breathing room (Figma ~14, on-grid)
    paddingInline: space.space4, // horizontal (Figma ~23, on-grid)
    backgroundColor: color.backgroundSurface,
    borderRadius: radius.surface,
    textAlign: 'right',
  },
});

// 14px (fontSize.control) is the only 14px in the system; Text omits it
// (control-only), so the typography lives here.
export const message = stylex.create({
  base: {
    margin: 0,
    fontFamily: font.sans,
    fontWeight: fontWeight.regular, // only Lausanne 400 exists; emphasis is size/colour
    fontSize: fontSize.caption,
    lineHeight: lineHeight.control, // 1.43 → ~20px line box
    color: color.textBody,
  },
});

// The date/time line below the bubble is a single Text(footnote, tertiary) node
// — right-aligned by the root's `align-items`, so it owns no styles of its own.
