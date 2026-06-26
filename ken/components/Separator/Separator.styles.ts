import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';

/**
 * SEPARATOR STYLES — co-located (only Separator uses them; a single component,
 * not a family → not a recipe per §4).
 *
 * The line is painted as a 1px background bar on Base UI's bare `<div>`, not a
 * border, so horizontal/vertical share one colour owner. 1px is the documented
 * decorative exception to the 4px grid (a hairline can't be a multiple of 4).
 * Colour comes from the `tone` styles below (single owner of `backgroundColor`):
 * `default` = `borderDefault` (dark limestone) the standard divider; `subtle` =
 * `borderSubtle` (limestone) the faintest hairline (table gridlines, dense lists).
 */
export const line = stylex.create({
  base: {
    flexShrink: 0,
    border: 'none', // we paint the rule via background, not a border
  },
  // Tone — sole owner of `backgroundColor` (keeps one color owner per StyleX merge).
  default: {
    backgroundColor: color.borderDefault,
  },
  subtle: {
    backgroundColor: color.borderSubtle,
  },
  horizontal: {
    width: '100%',
    height: '1px',
  },
  // 1px column that fills its flex parent's height via align-self: stretch.
  vertical: {
    width: '1px',
    alignSelf: 'stretch',
  },
});
