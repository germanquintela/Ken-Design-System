import * as stylex from '@stylexjs/stylex';

/**
 * TYPOGRAPHY TOKENS.
 *
 * Lausanne is self-hosted by the app (next/font/local), exposed as the
 * `--font-lausanne` CSS var on <html>; Inter is the open fallback. Tracking is
 * normal at every size — the typeface does the work, not letter-spacing — so
 * there is intentionally no letterSpacing token.
 */
export const font = stylex.defineVars({
  sans: 'var(--font-lausanne), "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  // The app does not self-host a brand mono, so this is a system monospace stack.
  mono: 'ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
});

// Only Lausanne Regular (400) is installed, so that's the only weight we
// expose — defining a heavier value would render as faux-bold (or fall back to
// Inter), never real Lausanne. Emphasis comes from size/color, not weight,
// until a Medium cut is added (then add `medium` here and re-point usages).
export const fontWeight = stylex.defineVars({
  regular: '400',
});

/** Role-based size scale (px) — name the decision, not the number. */
export const fontSize = stylex.defineVars({
  micro: '10px',
  footnote: '12px',
  caption: '13px',
  control: '14px',
  body: '16px',
  subheading: '18px',
  headingSm: '20px',
  heading: '24px',
  headingLg: '28px',
  displaySm: '40px',
  display: '48px',
  displayLg: '64px',
});

/**
 * Line-height keyed by the SAME role as fontSize — each size carries its own
 * designed leading, so the pair is always used together. Unitless.
 */
export const lineHeight = stylex.defineVars({
  normal: 'normal',
  micro: '1.2',
  footnote: '1.46',
  caption: '1.46',
  control: '1.43',
  body: '1.5',
  subheading: '1.43',
  headingSm: '1.38',
  heading: '1.33',
  headingLg: '1.3',
  displaySm: '1.2',
  display: '1.14',
  displayLg: '1.05',
});
