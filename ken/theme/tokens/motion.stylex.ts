import * as stylex from '@stylexjs/stylex';

/**
 * MOTION — durations + easing curves.
 *
 * Built on Emil Kowalski's guidance: the built-in CSS easings are too weak, so
 * we ship custom curves; UI animations stay under 300ms; exits are faster than
 * entrances; ease-out for enter/exit, ease-in-out for on-screen movement.
 * `ease-in` is intentionally absent — it starts slow and feels sluggish.
 */
export const duration = stylex.defineVars({
  instant: '0ms',
  fast: '140ms',
  base: '160ms',
  medium: '200ms',
  slow: '240ms',
});

export const easing = stylex.defineVars({
  out: 'cubic-bezier(0.23, 1, 0.32, 1)',
  inOut: 'cubic-bezier(0.77, 0, 0.175, 1)',
  standard: 'ease',
  linear: 'linear',
});
