import * as stylex from '@stylexjs/stylex';
import { color } from '../tokens/color.stylex';

/**
 * FOCUS RING — the shared keyboard-focus treatment, reused by every
 * interactive control (Button, IconButton, inputs…).
 *
 * A neutral slate ring (`borderFocus`), NEVER lime — the accent is action-only.
 * Rendered as an always-present transparent outline that only colours in on
 * `:focus-visible`, so toggling it never shifts layout. `:focus-visible` means
 * pointer clicks stay quiet; only keyboard/AT focus shows the ring.
 */
export const focusRing = stylex.create({
  ring: {
    outlineStyle: 'solid',
    outlineWidth: '2px',
    outlineColor: {
      default: 'transparent',
      ':focus-visible': color.borderFocus,
    },
    outlineOffset: '2px',
  },
});
