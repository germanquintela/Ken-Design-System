import * as stylex from '@stylexjs/stylex';
import { palette } from '../core/palette.stylex';

/**
 * SEMANTIC COLOR TOKENS — the "why". The public color API components use.
 *
 * Each token names a ROLE and points at exactly one primitive, so a decision is
 * reused everywhere and nothing leaks a raw hex. Light-mode only by decision —
 * plain values, no light-dark().
 */
export const color = stylex.defineVars({
  backgroundPage: palette.paper,
  backgroundSurface: palette.limestone,
  backgroundSubtle: palette.lightLimestone,
  backgroundOverlay: 'rgba(12, 10, 8, 0.4)', // alpha can't ride a hex var, so it's an rgba literal

  backgroundHover: palette.lightSmoke,
  backgroundNeutral: palette.limestone,
  backgroundSubtleHover: palette.darkLimestone,
  backgroundDisabled: palette.lightSmoke,
  backgroundControlChecked: palette.charcoal,

  backgroundSkeleton: palette.lightSmoke,

  textPrimary: palette.obsidian,
  textBody: palette.charcoal,
  textSecondary: palette.darkSmoke,
  textMuted: palette.smoke,
  textDisabled: palette.smoke,
  textOnControlChecked: palette.paper,
  textOnAccent: palette.darkLime,
  textInverse: palette.paper,

  borderSubtle: palette.limestone,
  borderDefault: palette.darkLimestone,
  borderStrong: palette.smoke,
  borderFocus: palette.darkSmoke,

  // Accent is the ONLY family that pins an explicit *Hover: it's a curated brand
  // value, not a derived tint. Every other control derives its hover via
  // color-mix() on the base token, so they intentionally have no *Hover token.
  accentDefault: palette.lime,
  accentHover: palette.lightLime,

  successDefault: palette.success,
  successStrong: palette.successStrong,
  dangerDefault: palette.error,
  warningDefault: palette.warning,
  infoDefault: palette.info,
});
