import * as stylex from '@stylexjs/stylex';
import { avatarTint } from '../../theme/tokens/avatarTint.stylex';
import { color } from '../../theme/tokens/color.stylex';
import { radius } from '../../theme/tokens/radius.stylex';
import {
  font,
  fontSize,
  fontWeight,
} from '../../theme/tokens/typography.stylex';

/**
 * AVATAR STYLES — co-located (Avatar + AvatarGroup are the only users; one small
 * family kept here rather than a recipe per §4). The circle (`root` + `size` +
 * `tint`) is shared by the solo Avatar AND the group's "+N" overflow chip, so it
 * lives in exactly one place.
 *
 * StyleX merges last-wins per key: `root` owns text colour + geometry, `tint`
 * owns the background only, `stack` owns the group ring + overlap margin.
 */

export const root = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxSizing: 'border-box',
    overflow: 'hidden', // clips a future <img> to the circle
    borderRadius: radius.full,
    fontFamily: font.sans,
    fontWeight: fontWeight.regular, // Lausanne has only 400 — emphasis is size/colour
    lineHeight: 1, // tight box; flex does the centring
    color: avatarTint.text, // initials — always warm charcoal
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
});

// Diameter + initials font per size. Raw px diameters are layout constants (like
// Badge heights); all multiples of 4. Font maps to existing role tokens so the
// initials track the system scale.
export const size = stylex.create({
  sm: { width: '24px', height: '24px', fontSize: fontSize.footnote },
  md: { width: '32px', height: '32px', fontSize: fontSize.control },
  lg: { width: '40px', height: '40px', fontSize: fontSize.body },
});

// Identity tint — background ONLY (text colour is owned by `root`, always
// charcoal). `overflow` is the neutral "+N" chip; it is internal and never part
// of Avatar's public `color` union.
export const tint = stylex.create({
  tint1: { backgroundColor: avatarTint.tint1 },
  tint2: { backgroundColor: avatarTint.tint2 },
  tint3: { backgroundColor: avatarTint.tint3 },
  overflow: { backgroundColor: avatarTint.overflow },
});

// The stacked-avatars container.
export const group = stylex.create({
  root: { display: 'inline-flex', alignItems: 'center' },
});

// Each stacked item wraps one avatar (or the "+N" chip). A 2px ring in the page
// colour masks the avatar behind it; every item after the first pulls left to
// overlap. Overlap on the 4px grid, sized to the diameter.
export const stack = stylex.create({
  base: {
    display: 'inline-flex',
    borderRadius: radius.full,
    boxShadow: `0 0 0 2px ${color.backgroundPage}`, // ring separates the overlap
  },
  sm: { marginLeft: '-8px' },
  md: { marginLeft: '-8px' },
  lg: { marginLeft: '-12px' },
});
