import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import {
  font,
  fontSize,
  fontWeight,
  lineHeight,
} from '../../theme/tokens/typography.stylex';
import { space } from '../../theme/tokens/space.stylex';
import { radius } from '../../theme/tokens/radius.stylex';
import { duration, easing } from '../../theme/tokens/motion.stylex';

/**
 * BREADCRUMB — co-located recipe (only Breadcrumb uses it). The trail is a
 * `<nav><ol>`; each crumb an `<li>`, separators auto-inserted between them.
 *
 * From the Figma (node 34:690): TWK Lausanne 400 @ 12px (footnote), the trailing
 * crumb is primary + underlined (the page you're on), ancestors are muted links
 * with no underline at rest. The chevron separator rides in the muted tone.
 */
export const styles = stylex.create({
  // The <ol>: a single baseline row. Owns the type so crumbs + separator inherit
  // one font; color is assigned per element below.
  list: {
    display: 'flex',
    alignItems: 'center',
    gap: space.space2, // ~8px between crumb and chevron (Figma ~5–7px, snapped to grid)
    margin: 0,
    padding: 0,
    listStyle: 'none',
    fontFamily: font.sans,
    fontSize: fontSize.footnote,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.footnote,
  },

  // Each crumb's <li> — a flex cell so its link/text centers on the row.
  item: {
    display: 'inline-flex',
    alignItems: 'center',
  },

  // Separator <li> — aria-hidden; `color` drives the chevron's currentColor.
  separator: {
    display: 'inline-flex',
    alignItems: 'center',
    color: color.textMuted,
  },

  // Ancestor crumb (a real <a>): muted at rest. On hover it darkens to primary
  // (color eases — Emil: hover → ease) and the underline sweeps in left→right.
  // The underline is a 1px ::after that scaleX()es from its left origin — a
  // transform-only, GPU, interruptible reveal (Emil), eased ease-out (a reveal,
  // not a color tween). currentColor ties the line to the easing text color.
  link: {
    position: 'relative',
    display: 'inline-block',
    color: { default: color.textMuted, ':hover': color.textPrimary },
    textDecorationLine: 'none', // kill the native <a> underline — the ::after line is the underline
    borderRadius: radius.nav, // rounds the focus-visible outline corners
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: duration.medium,
    transitionTimingFunction: easing.standard,
    '::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '1px',
      backgroundColor: 'currentColor',
      transformOrigin: 'left', // grow from the left → reads as left-to-right
      transform: { default: 'scaleX(0)', ':hover': 'scaleX(1)' },
      transitionProperty: 'transform',
      // Reduced motion: keep the underline, drop the sweep (Emil a11y).
      transitionDuration: {
        default: duration.medium,
        '@media (prefers-reduced-motion: reduce)': duration.instant,
      },
      transitionTimingFunction: easing.out,
    },
  },

  // Current crumb (a non-interactive <span aria-current="page">): primary, with
  // the SAME 1px ::after line shown statically — so a hovered link and the
  // current page underline are pixel-identical.
  current: {
    position: 'relative',
    display: 'inline-block',
    color: color.textPrimary,
    '::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '1px',
      backgroundColor: 'currentColor',
    },
  },
});
