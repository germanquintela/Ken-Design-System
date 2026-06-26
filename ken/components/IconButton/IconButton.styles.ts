import * as stylex from '@stylexjs/stylex';
import { radius } from '../../theme/tokens/radius.stylex';

/**
 * Two axes the shared buttonRecipe doesn't cover: a square footprint (heights
 * mirror the recipe `surface` scale so sizes line up with Button) and `shape`,
 * applied AFTER `surface.base` so its `borderRadius` wins (StyleX last-wins).
 */
export const sizes = stylex.create({
  sm: { width: '32px', height: '32px', paddingInline: 0 },
  md: { width: '36px', height: '36px', paddingInline: 0 },
  lg: { width: '44px', height: '44px', paddingInline: 0 },
});

export const shape = stylex.create({
  square: { borderRadius: radius.control },
  circle: { borderRadius: radius.full },
});
