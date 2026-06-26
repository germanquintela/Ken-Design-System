import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { radius } from '../../theme/tokens/radius.stylex';
import { elevation } from '../../theme/tokens/elevation.stylex';
import { space } from '../../theme/tokens/space.stylex';
import { zIndex } from '../../theme/tokens/zIndex.stylex';
import { duration, easing } from '../../theme/tokens/motion.stylex';
import {
  font,
  fontSize,
  lineHeight,
  fontWeight,
} from '../../theme/tokens/typography.stylex';

/**
 * Enter / exit are driven by Base UI's [data-starting-style] /
 * [data-ending-style] state attributes; exits run faster than entrances.
 */

export const backdrop = stylex.create({
  base: {
    position: 'fixed',
    inset: 0,
    zIndex: zIndex.overlay,
    backgroundColor: color.backgroundOverlay,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0,
    },
    transitionProperty: 'opacity',
    transitionDuration: {
      default: duration.medium,
      '[data-ending-style]': duration.fast,
    },
    transitionTimingFunction: easing.out,
  },
});

// Flex column so header / footer pin and the body scrolls.
export const popup = stylex.create({
  base: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: zIndex.modal,
    display: 'flex',
    flexDirection: 'column',
    width: '480px',
    maxWidth: 'calc(100vw - 48px)',
    maxHeight: 'calc(100vh - 64px)',
    overflow: 'hidden',
    backgroundColor: color.backgroundPage,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: color.borderDefault,
    borderRadius: radius.surface,
    boxShadow: elevation.modal,
    fontFamily: font.sans, // portaled to <body> — pin Lausanne, don't inherit
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0,
    },
    transform: {
      default: 'translate(-50%, -50%) scale(1)',
      '[data-starting-style]': 'translate(-50%, -50%) scale(0.96)',
      '[data-ending-style]': 'translate(-50%, -50%) scale(0.96)',
    },
    transitionProperty: 'opacity, transform',
    transitionDuration: {
      default: duration.slow,
      '[data-ending-style]': duration.fast,
    },
    transitionTimingFunction: easing.out,
  },
});

export const header = stylex.create({
  base: {
    paddingTop: space.space6,
    paddingLeft: space.space5,
    paddingRight: space.space10, // clearance for the floated close X
    paddingBottom: 0,
  },
});

// Emphasis by SIZE (Lausanne ships 400 only), never weight.
export const title = stylex.create({
  base: {
    margin: 0,
    fontSize: fontSize.subheading,
    lineHeight: lineHeight.subheading,
    fontWeight: fontWeight.regular,
    color: color.textPrimary,
  },
});

// Floated chrome (absolute), not a layout participant; zIndex lifts it above body content.
export const close = stylex.create({
  base: {
    position: 'absolute',
    top: space.space2,
    right: space.space2,
    zIndex: 1,
  },
});

// minHeight:0 lets it shrink inside the flex column so the popup's maxHeight
// scrolls the BODY, not the whole dialog.
export const body = stylex.create({
  base: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    paddingInline: space.space5,
    paddingTop: space.space3,
    paddingBottom: space.space4,
    color: color.textBody,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
  },
  noFooter: { paddingBottom: space.space4 },
});

export const footer = stylex.create({
  base: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: space.space2,
    paddingTop: space.space3,
    paddingInline: space.space4,
    paddingBottom: space.space4,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: color.borderDefault,
  },
});
