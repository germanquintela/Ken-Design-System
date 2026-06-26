import * as stylex from '@stylexjs/stylex';

/**
 * RADIUS — named by ROLE. Ramp's geometry is deliberate: small on functional
 * chrome, larger on surfaces, pill on tags. The roles keep them from mixing.
 */
export const radius = stylex.defineVars({
  none: '0',
  nav: '4px',
  control: '6px',
  surface: '12px',
  full: '9999px',
});
