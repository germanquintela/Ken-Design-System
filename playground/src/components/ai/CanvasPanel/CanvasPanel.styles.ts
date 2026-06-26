import * as stylex from '@stylexjs/stylex';
import { color } from '@ken/react/theme/tokens/color.stylex';

// The ONE decorative app-layer background (precedent: AppWrapper shell bg). A gray
// work surface (limestone) with a hairline dot grid (darkLimestone) — both colors
// come from Ken tokens resolved to their CSS vars, never raw hex.
export const canvas = stylex.create({
  base: {
    // This element owns BOTH the decorative background AND its layout (Ken's Box
    // can't paint a background — it strips className/style — so the scrolling
    // surface lives at the app layer; mirrors AppWrapper's shell technique).
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    // Tall generated UI scrolls vertically inside the canvas; oversized-WIDTH
    // content is contained (the preview wrapper is width-bounded) so it never
    // forces a lateral scrollbar onto the canvas/page.
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: color.backgroundSubtle,
    backgroundImage: `radial-gradient(${color.borderSubtle} 1px, transparent 1.5px)`,
    backgroundSize: '16px 16px',
    backgroundPosition: '-8px -8px',
  },
});

// Code view fills the whole surface edge-to-edge (no card): a solid
// backgroundSubtle plate that masks the dot grid below short snippets. Same
// color as CodePreview's borderless <pre>, so the two read as one surface.
export const codeSurface = stylex.create({
  fill: { backgroundColor: color.backgroundSubtle },
});
