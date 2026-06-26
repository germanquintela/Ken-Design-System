import * as stylex from '@stylexjs/stylex';

/**
 * ELEVATION — intentionally tiny. Layers are separated by SURFACE COLOR
 * (paper vs limestone), not drop shadows. The only justified shadows are
 * floating overlays, which sit over arbitrary content where surface color alone
 * can't separate them. Kept soft and warm (obsidian-based), not heavy material.
 */
export const elevation = stylex.defineVars({
  none: 'none', // deliberate scale floor (like radius.none) — lets a prop toggle shadow on/off

  // Soft within-surface lift — a sticky Card header/footer casting onto the body.
  // Deliberately very subtle (separates co-planar sections, not floating layers),
  // much lighter than `overlay`. Directional (downward); the Card footer mirrors
  // it upward in its recipe.
  raised: '0 4px 8px -6px rgba(12, 10, 8, 0.06)',
  overlay:
    '0 4px 12px -4px rgba(12, 10, 8, 0.08), 0 1px 3px -1px rgba(12, 10, 8, 0.05)',
  modal: '0 16px 48px -12px rgba(12, 10, 8, 0.22)',
});
