import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { space } from '../../theme/tokens/space.stylex';
import { radius } from '../../theme/tokens/radius.stylex';
import {
  font,
  fontSize,
  fontWeight,
  lineHeight,
} from '../../theme/tokens/typography.stylex';
import { duration, easing } from '../../theme/tokens/motion.stylex';

/**
 * TIMELINE STYLES — co-located (a single component with compound parts, like
 * Table/Card → not a recipe per §4). The component is a Base UI Accordion dressed
 * as a timeline: a dotted rail of dots down the left, each row a collapsible step.
 *
 * GEOMETRY (the documented px exception — intrinsic shape data, not tokens, like
 * StackLogo's dot coordinates): the dot is 6px and sits centred on a fixed 32px
 * header band (`DOT_STAGE`), so it lines up with the title AND has head-room for
 * the bounce. `DOT_CENTER` (16px) is half that band — the rail line anchors to it
 * so the thread always meets the dot's centre, at any panel height.
 */
const DOT_SIZE = '6px';
const DOT_STAGE = '32px'; // header-row height; dot centred here (bounce head-room = 13px each side)
const DOT_CENTER = '16px'; // half of DOT_STAGE — where consecutive dots' connecting line meets
const RAIL_WIDTH = DOT_SIZE; // rail is exactly the dot; the line is centred within it
const REDUCE = '@media (prefers-reduced-motion: reduce)';

// — The ball bounce — only the last (obsidian) dot, only while loading. A looping
//   idle affordance, so its ~1.25s period + per-keyframe gravity curves are the
//   documented >300ms exception (StackLogo/Spinner). transform-origin is the floor
//   (bottom centre): the impact squash flattens ONTO the floor, the rise stretches
//   UP off it. translateY is % of the dot's own height (6px). Gravity is faked with
//   per-keyframe easing — ease-OUT going up (decelerate to the apex), ease-IN coming
//   down (accelerate into the floor); `ease-in` is intentionally absent from the
//   motion tokens (sluggish for UI) but is the physically-correct fall curve, so it's
//   inlined here as part of the same looping-idle exception.
const UP = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // ease-out — decelerating climb
const DOWN = 'cubic-bezier(0.55, 0.06, 0.68, 0.19)'; // ease-in — accelerating fall

const bounce = stylex.keyframes({
  '0%': {
    transform: 'translateY(0) scale(1, 1)',
    animationTimingFunction: 'ease',
  }, // rest on the floor
  '5%': {
    transform: 'translateY(0) scale(1.18, 0.82)',
    animationTimingFunction: UP,
  }, // anticipation crouch
  '18%': {
    transform: 'translateY(-90%) scale(0.86, 1.18)',
    animationTimingFunction: UP,
  }, // launch, stretched
  '34%': {
    transform: 'translateY(-135%) scale(1, 1)',
    animationTimingFunction: 'linear',
  }, // apex, round
  '40%': {
    transform: 'translateY(-135%) scale(1, 1)',
    animationTimingFunction: DOWN,
  }, // brief hang
  '58%': {
    transform: 'translateY(-60%) scale(0.9, 1.15)',
    animationTimingFunction: DOWN,
  }, // falling, stretched
  '70%': {
    transform: 'translateY(0) scale(1.35, 0.65)',
    animationTimingFunction: UP,
  }, // floor impact — squash
  '75%': {
    transform: 'translateY(-14%) scale(0.96, 1.06)',
    animationTimingFunction: DOWN,
  }, // tiny rebound
  '80%': {
    transform: 'translateY(0) scale(1, 1)',
    animationTimingFunction: 'ease',
  }, // settle
  '100%': { transform: 'translateY(0) scale(1, 1)' }, // … then hold — the pause before the next drop
});

// Vestibular-safe fallback: no vertical travel, just a calm opacity breath.
const pulse = stylex.keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.45 },
  '100%': { opacity: 1 },
});

export const root = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%', // fill the parent so each step's content column (and its chevron) runs full-width
  },
});

export const item = stylex.create({
  // Each step: the rail column + the content column, side by side. `stretch` makes
  // the rail as tall as the content, so the connecting line grows with the panel.
  base: {
    display: 'flex',
    alignItems: 'stretch',
    gap: space.space3, // dot → title, matches the Figma rhythm
  },
});

export const rail = stylex.create({
  // Fixed-width lane holding the dot (top) and the absolutely-positioned line.
  base: {
    position: 'relative',
    flexShrink: 0,
    width: RAIL_WIDTH,
  },
});

export const line = stylex.create({
  // The dotted thread, centred under the dot. Defaults span the full item height;
  // the first item starts at its dot, the last ends at its dot — so across the
  // stack the line is one continuous run from the first dot's centre to the last's.
  base: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: 0,
    bottom: 0,
    width: 0,
    borderLeftWidth: '1.5px',
    borderLeftStyle: 'dotted',
    borderLeftColor: color.borderDefault, // hairline — same family as dividers
  },
  fromDot: { top: DOT_CENTER }, // first item — line begins at the dot, not above it
  toDot: { bottom: `calc(100% - ${DOT_CENTER})` }, // last item — line ends at the dot, not below it
});

export const dotStage = stylex.create({
  // The header-height band the dot lives in; centres the dot and gives the bounce
  // its vertical room. `overflow: visible` (default) so the squash/stretch isn't clipped.
  base: {
    height: DOT_STAGE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const dot = stylex.create({
  base: {
    position: 'relative', // sit above the dotted line
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: radius.full,
    flexShrink: 0,
  },
  // Past steps — muted smoke (= Figma #999ba3).
  muted: { backgroundColor: color.textMuted },
  // Current step (the last dot) while loading — obsidian.
  current: { backgroundColor: color.textPrimary },
  // Only the current dot, only while loading: the ball bounce (pulse under reduced motion).
  bounce: {
    transformOrigin: 'bottom center', // the floor
    animationName: { default: bounce, [REDUCE]: pulse },
    animationDuration: { default: '1.25s', [REDUCE]: '1.6s' },
    animationIterationCount: 'infinite',
  },
});

export const content = stylex.create({
  // The growing right column: trigger over panel.
  base: {
    flexGrow: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
  },
});

export const header = stylex.create({
  // Base UI renders an <h3>; strip its intrinsic margin so it doesn't break the row.
  base: { margin: 0 },
});

export const trigger = stylex.create({
  // Reset the native button, lay the title + chevron across the header band. Height
  // matches DOT_STAGE so the title sits level with its dot.
  base: {
    appearance: 'none',
    boxSizing: 'border-box',
    margin: 0,
    width: '100%',
    minHeight: DOT_STAGE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.space3,
    backgroundColor: 'transparent',
    borderStyle: 'none',
    padding: 0,
    fontFamily: font.sans,
    textAlign: 'left',
    cursor: { default: 'pointer', '[data-disabled]': 'not-allowed' },
    borderRadius: radius.nav, // for the focus ring's corners
  },
  // A step with no panel body: same header band, but inert — no pointer, no toggle.
  static: { cursor: 'default' },
});

export const title = stylex.create({
  // 14px control label; truncates so a long step never breaks the row.
  base: {
    flexGrow: 1,
    minWidth: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: fontSize.caption, // the md control label size
    lineHeight: lineHeight.control,
    fontWeight: fontWeight.regular, // own the weight: the header's <h3> would otherwise bold a non-button label
    transitionProperty: 'color',
    transitionDuration: { default: duration.base, [REDUCE]: duration.instant },
    transitionTimingFunction: easing.standard,
  },
  muted: { color: color.textMuted }, // collapsed, not current
  active: { color: color.textPrimary }, // current (last) or open — the reversed-emphasis rule
});

export const chevron = stylex.create({
  // ChevronRight → points down when open. Consumer passes `open` (StyleX can't read
  // the trigger's data-attribute from a child) — the Menu/Select chevron pattern.
  base: {
    flexShrink: 0,
    color: color.textMuted,
    transitionProperty: 'transform',
    transitionDuration: {
      default: duration.medium,
      [REDUCE]: duration.instant,
    },
    transitionTimingFunction: easing.standard,
  },
  open: { transform: 'rotate(90deg)' }, // right → down
});

export const panel = stylex.create({
  // Base UI drives the open/close height via the --accordion-panel-height var it sets
  // on this element; we animate height 0 ⇄ that var. Padding lives on the inner wrapper
  // so the collapse measures cleanly. Reduced motion snaps (transition-property: none).
  base: {
    overflow: 'hidden',
    boxSizing: 'border-box',
    height: {
      default: 'var(--accordion-panel-height)',
      '[data-starting-style]': 0,
      '[data-ending-style]': 0,
    },
    transitionProperty: { default: 'height', [REDUCE]: 'none' },
    transitionDuration: duration.medium,
    transitionTimingFunction: easing.out,
  },
});

export const panelInner = stylex.create({
  base: {
    paddingTop: space.space1,
    paddingBottom: space.space3, // breathing room before the next step
    fontSize: fontSize.caption,
    lineHeight: lineHeight.control,
    color: color.textSecondary,
  },
});
