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
 * A keycap is non-interactive (you can't click a key) → pointer-events /
 * user-select off. minWidth == height so a single key reads as a square cap.
 */

export const cap = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.space1,
    boxSizing: 'border-box',
    flexShrink: 0,
    width: 'fit-content',
    margin: 0,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: color.borderDefault,
    borderRadius: radius.nav,
    backgroundColor: color.backgroundSubtle,
    color: color.textMuted,
    fontFamily: font.sans,
    fontWeight: fontWeight.regular, // Lausanne has no Medium cut; the cap reads via its surface
    fontSize: fontSize.footnote,
    lineHeight: lineHeight.footnote,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    userSelect: 'none',
  },
});

// Heights are the documented control-height exception.
export const size = stylex.create({
  sm: { height: '20px', minWidth: '20px', paddingInline: space.space1 },
  md: { height: '24px', minWidth: '24px', paddingInline: space.space1 },
});

export const group = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.space1,
  },
});
