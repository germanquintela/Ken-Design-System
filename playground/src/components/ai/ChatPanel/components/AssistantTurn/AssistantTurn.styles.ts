import * as stylex from '@stylexjs/stylex';
import { color } from '@ken/react/theme/tokens/color.stylex';
import { space } from '@ken/react/theme/tokens/space.stylex';
import {
  font,
  fontSize,
  fontWeight,
  lineHeight,
} from '@ken/react/theme/tokens/typography.stylex';
import { duration, easing } from '@ken/react/theme/tokens/motion.stylex';

// App-layer custom control (deliberately NOT Ken's Button): a single, fully
// clickable pill announcing the version this turn produced + a jump-to action.
// Every visual is a Ken token resolved to its CSS var — no raw hex/px.
export const styles = stylex.create({
  // One button. Left → right: flag glyph · "Version N generated" · chevron (far right).
  // `color` is the SINGLE owner of the foreground tone: it's currentColor for the
  // flag's stroke, inherited by the label, and the chevron's stroke. Transitioning
  // `color` here animates all three together (inherited animated value) — secondary
  // at rest → primary black on hover.
  pill: {
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.space2,
    width: '100%',
    marginTop: space.space2,
    marginBottom: space.space2,
    backgroundColor: 'transparent',
    borderStyle: 'none',
    padding: 0,
    cursor: 'pointer',
    color: {
      default: color.textSecondary,
      ':hover:not(:disabled)': color.textPrimary,
    },
    transitionProperty: 'color',
    transitionDuration: duration.medium,
    transitionTimingFunction: easing.standard,
  },
  // Version label — plain span (not Ken Text) so it INHERITS the pill's animated
  // currentColor instead of pinning its own tone. Typography still token-bound.
  label: {
    fontFamily: font.sans,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.footnote,
    lineHeight: lineHeight.footnote,
    color: 'inherit',
  },
  // Chevron — sits right after the label (not pushed out); inherits currentColor
  // for the shared tone + transition.
  chevron: {
    flexShrink: 0,
  },
});
