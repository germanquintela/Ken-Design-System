import * as stylex from '@stylexjs/stylex';
import { color } from '@ken/react/theme/tokens/color.stylex';
import { radius } from '@ken/react/theme/tokens/radius.stylex';
import { duration, easing } from '@ken/react/theme/tokens/motion.stylex';

// The composer shell: a rounded white card that holds the seamless textarea above
// the send row. Border + focus ring are owned here (the textarea is `seamless`, so
// it carries no chrome of its own). `:focus-within` warms the border and adds the
// soft ring — same focus language as the Input/Textarea field, hoisted to the box.
export const shell = stylex.create({
  base: {
    boxSizing: 'border-box',
    backgroundColor: color.backgroundPage,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: radius.surface,
    borderColor: {
      default: color.borderDefault,
      ':focus-within': color.borderFocus,
    },
    boxShadow: {
      default: 'none',
      ':focus-within': `0 0 0 3px color-mix(in srgb, ${color.borderFocus} 30%, transparent)`,
    },
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.standard,
  },
});
