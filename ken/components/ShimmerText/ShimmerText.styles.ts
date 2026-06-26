import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { easing } from '../../theme/tokens/motion.stylex';

/**
 * SHIMMERTEXT STYLES — co-located (only ShimmerText uses them; a single
 * component, not a family → not a recipe per §4). Typography (Lausanne 400,
 * margin reset, the size scale) is reused from `Text.styles` — this file adds
 * ONLY the shimmer layer.
 *
 * The look: text is painted as a mostly-obsidian gradient with a narrow band a
 * few steps lighter (dark smoke) in the middle, clipped to the glyphs
 * (`background-clip: text` + transparent fill). Sliding the background position
 * sweeps that band across the text — a slow, "super subtle" sheen.
 *
 * Colours: base = `textPrimary` (obsidian #0c0a08, "from obsidian"); band =
 * `textSecondary` (dark smoke #4d505d) — a GREY sheen, never white, so it stays
 * on-brand and gentle. No new tokens (first use of a shimmer colour → second-use
 * rule); both come from the semantic colour API.
 *
 * Motion note: a continuous looping sheen, so its ~4s `linear` sweep is the same
 * documented exception to the "<300ms, one-shot" rule that Skeleton's pulse and
 * Spinner take (motion.ts durations are for UI transitions). It's slower than
 * Skeleton's 1.5s pulse because a travelling highlight draws the eye more than a
 * breathing opacity. `background-position` is a paint (not transform/opacity),
 * accepted here for the same reason. The duration is a local constant; the curve
 * still reuses the `linear` token. Frozen to solid obsidian under reduced-motion.
 */

const REDUCE = '@media (prefers-reduced-motion: reduce)';

// A mostly-obsidian gradient with a narrow dark-smoke band centred in it. Drawn
// at 300% width (`backgroundSize` below) so the band can sit fully OFF-screen at
// both ends — that gives a calm rest gap between sweeps and avoids any reset flash.
const sheen = `linear-gradient(100deg, ${color.textPrimary} 0%, ${color.textPrimary} 40%, ${color.textSecondary} 50%, ${color.textPrimary} 60%, ${color.textPrimary} 100%)`;

// Slide the band across the glyphs, left → right. CRUCIAL: with `no-repeat`, the
// background only fully covers the text while position stays within [0%, 100%];
// stray outside it and uncovered glyphs paint transparent (the text vanishes).
// At 100% the band rests off the left edge; at 0% off the right edge — so it
// enters, crosses, exits, then the loop seam happens with the band off-screen
// (no flash). The 300% width is what lets it rest off-screen without breaking
// coverage.
const shimmer = stylex.keyframes({
  '0%': { backgroundPosition: '100% 0' },
  '100%': { backgroundPosition: '0% 0' },
});

export const root = stylex.create({
  base: {
    // Paint the glyphs with the gradient, then clip the fill to the text.
    backgroundImage: { default: sheen, [REDUCE]: 'none' },
    backgroundSize: '300% 100%',
    backgroundRepeat: 'no-repeat',
    // Start with the band parked off the left edge (matches the 0% keyframe's
    // partner so there's no jump on the very first frame).
    backgroundPosition: '100% 0',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    // Transparent fill reveals the clipped gradient; under reduced-motion fall
    // back to solid obsidian (currentColor resolves to `color` → textPrimary).
    color: { default: 'transparent', [REDUCE]: color.textPrimary },
    WebkitTextFillColor: { default: 'transparent', [REDUCE]: 'currentColor' },

    animationName: { default: shimmer, [REDUCE]: 'none' },
    animationDuration: '4s', // continuous looping sheen — see note above
    animationTimingFunction: easing.linear,
    animationIterationCount: 'infinite',
  },
});
