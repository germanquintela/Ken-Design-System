import * as stylex from '@stylexjs/stylex';

/**
 * SPACING — 4px base grid. spaceN = N × 4px. "Comfortable" density.
 * Only the steps the system actually uses are defined (no value soup).
 */
export const space = stylex.defineVars({
  space0: '0',
  space1: '4px',
  space2: '8px',
  space3: '12px',
  space4: '16px',
  space5: '20px',
  space6: '24px',
  space8: '32px',
  space10: '40px',
  space12: '48px',
  space16: '64px',
  space20: '80px',
  // Container scale — meant for sizing (width/height/min/max), not gaps/padding.
  // Same grid (spaceN = N × 4px); steps get coarser as the values grow.
  space24: '96px',
  space32: '128px',
  space40: '160px',
  space48: '192px',
  space64: '256px',
  space80: '320px',
  space96: '384px',
  space128: '512px',
  space160: '640px',
  space192: '768px',
  space240: '960px',
});

/** Layout constants — page-level sizing. */
export const layout = stylex.defineVars({
  pageMaxWidth: '1200px',
  sidebarWidth: '240px',
});
