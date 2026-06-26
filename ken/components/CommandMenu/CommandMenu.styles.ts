import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { radius } from '../../theme/tokens/radius.stylex';
import { space } from '../../theme/tokens/space.stylex';
import { elevation } from '../../theme/tokens/elevation.stylex';
import { zIndex } from '../../theme/tokens/zIndex.stylex';
import { duration, easing } from '../../theme/tokens/motion.stylex';
import {
  font,
  fontSize,
  lineHeight,
} from '../../theme/tokens/typography.stylex';

/**
 * COMMAND MENU STYLES — co-located. The palette is a Dialog surface (scrim +
 * focus trap) hosting an always-open Autocomplete. The PANEL look (bg, hairline,
 * shadow, enter/exit) mirrors overlay.panel; rows/group labels reuse overlay.*.
 * Only the bits overlay doesn't express live here: scrim, popup placement/size,
 * the search row, the divider, and the scroll region.
 */

// Same obsidian scrim as Modal (cross-overlay token).
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

// Top-anchored panel (command menus sit high, not centred). Mirrors
// overlay.panel surface + the Modal enter/exit scale.
export const popup = stylex.create({
  base: {
    position: 'fixed',
    top: '15vh',
    left: '50%',
    zIndex: zIndex.modal,
    display: 'flex',
    flexDirection: 'column',
    width: '560px',
    maxWidth: 'calc(100vw - 48px)',
    maxHeight: '60vh',
    overflow: 'hidden',
    backgroundColor: color.backgroundPage,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: color.borderSubtle,
    borderRadius: radius.surface,
    boxShadow: elevation.modal, // modal-level lift — a centred palette over a scrim, not a dropdown
    fontFamily: font.sans, // portaled to <body> — pin Lausanne

    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0,
    },
    transform: {
      default: 'translateX(-50%) scale(1)',
      '[data-starting-style]': 'translateX(-50%) scale(0.97)',
      '[data-ending-style]': 'translateX(-50%) scale(0.97)',
    },
    transitionProperty: 'opacity, transform',
    transitionDuration: {
      default: duration.medium,
      '[data-ending-style]': duration.fast,
    },
    transitionTimingFunction: easing.out,
  },
});

// — SEARCH ROW — leading magnifier + borderless input. The popup IS the surface,
// so no nested field border; a bottom hairline separates it from the list.
export const searchRow = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: space.space2,
    flexShrink: 0,
    height: '48px', // documented control-height exception
    paddingInline: space.space4,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: color.borderSubtle,
  },
});

export const searchIcon = stylex.create({
  base: { display: 'inline-flex', flexShrink: 0, color: color.textMuted },
});

export const input = stylex.create({
  base: {
    flexGrow: 1,
    minWidth: 0,
    height: '100%',
    borderStyle: 'none',
    outlineStyle: 'none',
    backgroundColor: 'transparent',
    color: color.textPrimary,
    fontFamily: font.sans,
    fontSize: fontSize.control,
    lineHeight: lineHeight.control,
    '::placeholder': { color: color.textMuted },
  },
});

// — LIST — the scroll region under the search row. minHeight:0 so it scrolls
// inside the flex column. space1 inset so rows don't kiss the corners.
export const list = stylex.create({
  base: {
    flexGrow: 1,
    minHeight: 0,
    overflowY: 'auto',
    padding: space.space1,
  },
});

// — EMPTY — centred muted message when nothing matches. Base UI keeps this
// element mounted even with results (only its children are conditional), so
// collapse it with `:empty` to kill the dead band under the list.
export const empty = stylex.create({
  base: {
    display: { default: 'block', ':empty': 'none' },
    paddingBlock: space.space6,
    paddingInline: space.space4,
    textAlign: 'center',
    fontFamily: font.sans,
    fontSize: fontSize.control,
    lineHeight: lineHeight.control,
    color: color.textMuted,
  },
});
