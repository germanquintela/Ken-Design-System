import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { easing } from '../../theme/tokens/motion.stylex';

/**
 * STACKLOGO STYLES — co-located (a single component, not a family → not a recipe
 * per §4). The mark is painted in `currentColor`: the wrapper sets the colour
 * (obsidian/textPrimary by default; `tone='inherit'` omits it so the mark rides
 * the parent's colour, e.g. on a dark CTA band).
 *
 * Motion note: like Spinner/Skeleton, the loading animation is a LOOPING idle
 * affordance, so its period is a deliberate exception to the system's "<300ms,
 * one-shot" rule (motion.ts is for UI transitions). The mark does NOT spin or flip
 * — it WOBBLES: a 3D conical precession. It tilts and the *direction* of that tilt
 * sweeps a full clockwise circle (top → right → bottom → left), so the centre stays
 * pinned and the face never flips. Mechanism: `rotateZ(φ)·rotateX(TILT)·rotateZ(-φ)`
 * is a tilt of angle TILT about the precessing axis (cosφ, sinφ, 0); φ 0→360° sweeps
 * the cone once. Note `TILT=0` collapses to the identity, so any keyframe with no
 * tilt is exactly the FLAT static svg.
 *
 * RHYTHM — rest flat, bloom, sweep, settle, pause, repeat: the mark RESTS on the
 * flat logo (the paused pose is the identity = the static svg). On each cycle the
 * tilt blooms in (0→14%), holds through one clockwise revolution (14→58%), settles
 * back to flat (58→72%), then HOLDS flat (72→100%) — the pause — before it starts
 * again. φ is spaced uniformly with the timeline and the curve is `linear`, so the
 * sweep is smooth (no mid-turn hitch); the bloom-in / settle / pause carry the
 * start→wobble→rest cadence. Under reduced-motion the 3D is dropped entirely
 * (vestibular-safe): the mark stays flat and an opacity pulse carries the "working"
 * signal. Inlined literals (the documented >300ms exception): TILT = 32deg,
 * period = 2.8s (revolution+settle 0→72%, pause 72→100%), PULSE = 2.8s.
 */

const precession = stylex.keyframes({
  '0%': { transform: 'rotateZ(0deg) rotateX(0deg) rotateZ(0deg)' }, // flat — identical to the static svg
  '14%': { transform: 'rotateZ(70deg) rotateX(32deg) rotateZ(-70deg)' }, // tilt bloomed in
  '58%': { transform: 'rotateZ(290deg) rotateX(32deg) rotateZ(-290deg)' }, // …one clockwise revolution at full tilt
  '72%': { transform: 'rotateZ(360deg) rotateX(0deg) rotateZ(-360deg)' }, // settled back to flat (revolution done)
  '100%': { transform: 'rotateZ(360deg) rotateX(0deg) rotateZ(-360deg)' }, // hold flat — the pause before it restarts
});

const pulse = stylex.keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.55 },
  '100%': { opacity: 1 },
});

export const root = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    lineHeight: 0, // strip the inline-box descender so the box is exactly the svg
    color: color.textPrimary, // the mark's only colour (dots ride currentColor)
  },
});

// Square box + perspective per size. Perspective scales with the box (~2.5×) so the
// wobble's 3D depth reads the same at every size; it's a no-op while the mark isn't
// 3D-transformed (static / at-rest state), so it lives in the always-applied map.
// Inlined as literals (the StyleX compiler can't read a plain-TS map inside create()).
export const size = stylex.create({
  xxs: { width: '12px', height: '12px', perspective: '30px' },
  xs: { width: '16px', height: '16px', perspective: '40px' },
  sm: { width: '24px', height: '24px', perspective: '60px' },
  md: { width: '32px', height: '32px', perspective: '80px' },
});

export const svg = stylex.create({
  base: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  // Applied only when `loading`. Wobbles the mark about its pinned centre, resting
  // on the flat logo between sweeps; reduced-motion swaps to a flat opacity pulse.
  wobble: {
    transformOrigin: 'center',
    animationName: {
      default: precession,
      '@media (prefers-reduced-motion: reduce)': pulse,
    },
    animationDuration: '2.8s',
    animationTimingFunction: {
      default: easing.linear,
      '@media (prefers-reduced-motion: reduce)': easing.standard,
    },
    animationIterationCount: 'infinite',
  },
});
