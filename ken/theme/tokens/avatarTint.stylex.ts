import * as stylex from '@stylexjs/stylex';
import { palette } from '../core/palette.stylex';

/**
 * AVATAR IDENTITY TINTS — a self-contained wayfinding sub-system (the file this
 * stub was reserved for). A person's avatar gets a deterministic background from
 * their name; the initials sit on top in warm charcoal. This is the ONLY place
 * the Secondary accents are mapped to a role — the component reads these tokens,
 * never the raw palette. `defineVars` → CSS custom properties, so a brand theme
 * can re-map identity colours alongside the rest of the token layer.
 */
export const avatarTint = stylex.defineVars({
  // Identity backgrounds — picked deterministically by hashing the name. Keyed
  // tint1/2/3 (not by hue) since the buckets are arbitrary and a re-theme can
  // re-map them to any colour.
  tint1: palette.identityYellow,
  tint2: palette.identityBlue,
  tint3: palette.identityGreen,
  text: palette.charcoal,
  overflow: palette.darkLimestone,
});
