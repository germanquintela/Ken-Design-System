import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';

/**
 * Menu-only bits (destructive item colours); the rest lives in the shared
 * overlay foundation. Each colour re-declares its `default` so composing over
 * overlay.item never erases a default (StyleX last-wins per key).
 */

export const item = stylex.create({
  destructive: {
    color: {
      default: color.dangerDefault,
      '[data-disabled]': color.textDisabled,
    },
    backgroundColor: {
      default: 'transparent',
      '[data-highlighted]': `color-mix(in srgb, ${color.dangerDefault} 8%, transparent)`,
    },
  },
});

export const slot = stylex.create({
  destructive: {
    color: color.dangerDefault,
  },
});
