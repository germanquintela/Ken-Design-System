import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';

/**
 * BADGE STYLES — Badge's colour owners only. The pill shell, size scale and icon
 * tints live in the shared `recipes/chipRecipe.ts` (also used by Pill).
 *
 * Two surfaces on one `status` axis:
 *  - neutral → a FILLED limestone chip, primary text, icon inherits the text.
 *  - status  → an OUTLINED white chip (hairline), secondary text; the status
 *    hue is carried by the ICON when present, otherwise by the TEXT.
 *
 * StyleX merges last-wins per property key, so each colour property lives in
 * exactly ONE owner: `surface` owns background/border, `text` owns the label.
 */

// Surface — background + border only.
export const surface = stylex.create({
  // Filled limestone; border stays transparent so it reads as borderless.
  neutral: { backgroundColor: color.backgroundSurface },
  // White chip with a hairline outline (the canonical Ken border).
  status: {
    backgroundColor: color.backgroundPage,
    borderColor: color.borderDefault,
  },
});

// Text colour — neutral = primary, any status = secondary. The status hue is
// carried by the ICON only, so the label is never tinted.
export const text = stylex.create({
  primary: { color: color.textPrimary },
  secondary: { color: color.textSecondary },
});
