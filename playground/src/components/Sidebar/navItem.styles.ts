import * as stylex from '@stylexjs/stylex';
import { color } from '@ken/react/theme/tokens/color.stylex';
import { space } from '@ken/react/theme/tokens/space.stylex';
import { radius } from '@ken/react/theme/tokens/radius.stylex';
import {
  font,
  fontSize,
  fontWeight,
  lineHeight,
} from '@ken/react/theme/tokens/typography.stylex';

/**
 * NAV-ITEM SHARED STYLES — the resting/hover look of a sidebar row, shared by
 * NavLink (a routed <Link>) and SearchNavItem (a <button> trigger) so the two
 * stay pixel-identical. Single source of truth; each color key has its default +
 * :hover together (StyleX last-wins per key).
 */
export const styles = stylex.create({
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: space.space2,
    width: '100%',
    paddingInline: space.space3,
    paddingBlock: space.space2,
    borderRadius: radius.nav,
    fontFamily: font.sans,
    fontSize: fontSize.control,
    lineHeight: lineHeight.control,
    fontWeight: fontWeight.regular,
    textDecoration: 'none',
    cursor: 'pointer',
    color: { default: color.textSecondary, ':hover': color.textPrimary },
    backgroundColor: {
      default: 'transparent',
      ':hover': color.backgroundHover,
    },
    transitionProperty: 'color, background-color',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease',
  },
  // Native <button> reset so SearchNavItem inherits the link look cleanly.
  button: {
    appearance: 'none',
    borderWidth: 0,
    margin: 0,
    textAlign: 'left',
    font: 'inherit',
  },
  icon: { flexShrink: 0 },
  label: {
    flexGrow: 1, // fill the row — in SearchNavItem this pushes the trailing ⌘K cap to the right edge
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});
