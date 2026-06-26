import * as stylex from '@stylexjs/stylex';

/**
 * Z-INDEX — named layers so overlays stack predictably. Base UI portals to the
 * end of <body>, but explicit layers keep ordering deterministic when several
 * overlays coexist (a tooltip over a dropdown over a modal).
 */
export const zIndex = stylex.defineVars({
  base: '0',
  sticky: '100',
  dropdown: '1000',
  overlay: '1100',
  modal: '1110',
  toast: '1200',
  tooltip: '1300',
});
