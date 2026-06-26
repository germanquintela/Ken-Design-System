import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { easing } from '../../theme/tokens/motion.stylex';

/**
 * SPINNER STYLES — co-located (a single component, not a family → not a recipe
 * per §4). The arc + faint track are both drawn in `currentColor`: the wrapper
 * sets the colour (charcoal by default; `tone='inherit'` omits it so the spinner
 * rides the parent's colour, e.g. a Button's per-variant text colour). The track
 * is the same colour at low opacity; the arc is one quarter of the ring, spinning.
 *
 * Motion note: like Skeleton, the rotation is a LOOPING idle affordance, so its
 * ~0.7s period is a deliberate exception to the system's "<300ms, one-shot" rule
 * (motion.ts is for UI transitions). The curve reuses the `linear` token —
 * motion.ts reserved it "for spinners". Diverging from Skeleton (which freezes
 * its shimmer under reduced-motion), reduced-motion here SLOWS the spin rather
 * than freezing: a frozen spinner reads as broken and drops the only loading
 * signal, whereas a frozen shimmer still reads as a placeholder.
 */

const spin = stylex.keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const root = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    lineHeight: 0, // strip the inline-box descender so the box is exactly the svg
  },
  // Standalone default tone — charcoal. `tone='inherit'` skips this so the
  // spinner inherits the parent's `currentColor`.
  charcoal: { color: color.textBody },
});

// Diameter — mirrors the canonical icon scale (foundations/iconSize: 12/14/16),
// so an in-control spinner matches the icon size of its sm/md/lg host. Inlined as
// literals because the StyleX compiler can't read a plain-TS map inside create()
// (it only resolves *.stylex vars); kept in lockstep with iconSize by hand.
export const size = stylex.create({
  sm: { width: '12px', height: '12px' },
  md: { width: '14px', height: '14px' },
  lg: { width: '16px', height: '16px' },
});

export const svg = stylex.create({
  base: {
    display: 'block',
    width: '100%',
    height: '100%',
    transformOrigin: 'center', // rotate about the ring's centre across browsers
    animationName: spin,
    animationDuration: {
      default: '0.7s',
      '@media (prefers-reduced-motion: reduce)': '1.5s', // gentler, never frozen
    },
    animationTimingFunction: easing.linear,
    animationIterationCount: 'infinite',
  },
});
