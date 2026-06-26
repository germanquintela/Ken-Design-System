import * as stylex from '@stylexjs/stylex';
import { color } from '@ken/react/theme/tokens/color.stylex';
import { space } from '@ken/react/theme/tokens/space.stylex';

/**
 * APP SHELL STYLES — the playground's floating-card layout, painted at the app
 * layer (Ken's Box has no background axis, by decision). The shell surface is the
 * real `backgroundSurface` token (limestone) — never a hardcoded hex — resolved to
 * the identical CSS var Ken injects (next.config sets rootDir = repo root, so the
 * var hashes match across the package boundary).
 *
 * Mirrors PageLayout.styles' own technique: ONE element owns the background, the
 * flex row, AND a single uniform inset — `padding === gap === space2` — so the
 * card's top/right/bottom margin and the sidebar↔card gap are the same 8px.
 *
 * Shell surface is `backgroundSubtle` (lightLimestone #fcfcfa) — a hair off the
 * card's paper white, so the white Card reads as a floating surface above it.
 */
export const shell = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    // Pin the shell to the viewport and clip it: the floating card is fixed and the
    // content scrolls INSIDE the card body, so the page itself never scrolls.
    height: '100dvh',
    minHeight: '100dvh',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    gap: space.space2,
    padding: space.space2,
    backgroundColor: color.backgroundSubtle,
  },
  // contentFill apps (the AI builder) own their own scrolling: pin the shell to
  // the viewport height and clip it, so the height chain is DEFINITE all the way
  // down and inner panes (chat, canvas) scroll internally instead of the page.
  fill: {
    height: '100dvh',
    minHeight: '100dvh',
    overflow: 'hidden',
  },
});

export const title = stylex.create({
  base: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
});

// contentFill — the card is already a flex column stretched to the shell height;
// this body grows into the space below the header so a full-height app (the AI
// builder) can own it, with its panes scrolling internally.
export const fill = stylex.create({
  body: {
    display: 'flex',
    flex: 1,
    minHeight: 0,
  },
});
