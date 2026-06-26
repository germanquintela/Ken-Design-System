import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { radius } from '../../theme/tokens/radius.stylex';
import { elevation } from '../../theme/tokens/elevation.stylex';

/**
 * CARD STYLES — co-located (only Card uses them). Card is the visual surface
 * that Box deliberately is NOT: a bordered, rounded, clipping container split
 * into Header / Body / Footer sections.
 *
 * Divider model (no React.Children inspection): the Header owns a BOTTOM
 * hairline and the Footer a TOP hairline, the Body none. A line therefore shows
 * only when that section is present — header+body, body+footer, all-three and
 * body-only all read correctly.
 */

// `overflow: hidden` clips tinted sections to the radius.
export const root = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: color.backgroundPage,
    overflow: 'hidden',
  },
});

export const border = stylex.create({
  on: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: color.borderDefault,
  },
  // Faintest hairline (limestone) — for quiet surfaces like loading skeletons.
  subtle: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: color.borderSubtle,
  },
});

export const radiusStyles = stylex.create({
  none: { borderRadius: radius.none },
  nav: { borderRadius: radius.nav },
  control: { borderRadius: radius.control },
  surface: { borderRadius: radius.surface },
});

export const width = stylex.create({
  full: { width: '100%' },
  fit: { width: 'fit-content' },
  auto: { width: 'auto' },
});

export const background = stylex.create({
  subtle: { backgroundColor: color.backgroundSubtle },
});

// Sections carry NO padding — the consumer owns spacing via the Box (or other
// content) they render inside. Sections only contribute background, the divider
// hairline, and the optional shadow.

export const header = stylex.create({
  root: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: color.borderDefault,
  },
  // `position`+`zIndex` lift the header above the body so its shadow paints over it.
  shadow: { boxShadow: elevation.raised, position: 'relative', zIndex: 1 },
});

export const footer = stylex.create({
  root: {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: color.borderDefault,
  },
  shadow: {
    boxShadow: '0 -4px 8px -6px rgba(12, 10, 8, 0.06)',
    position: 'relative',
    zIndex: 1,
  },
});
