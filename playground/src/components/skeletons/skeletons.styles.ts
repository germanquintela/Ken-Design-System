import * as stylex from '@stylexjs/stylex';
import { color } from '@ken/react/theme/tokens/color.stylex';
import { radius } from '@ken/react/theme/tokens/radius.stylex';
import { space } from '@ken/react/theme/tokens/space.stylex';
import { easing } from '@ken/react/theme/tokens/motion.stylex';

/**
 * LOADING-SKELETON STYLES — app-level placeholder blocks for the route-transition
 * fallbacks (`app/loading.tsx` & friends). App-layer, like AppWrapper.styles /
 * navItem.styles: it paints the playground's own chrome, never a Ken component.
 *
 * Why not Ken's <Skeleton>? Its `rect` variant has a 64px height floor, so it
 * can't express the sidebar's small shapes (a 20px logo, a 12px nav label). Ken's
 * <Skeleton> is still used directly for the multi-line text fills in the chat
 * composer — this file only adds the precise-size blocks it can't.
 *
 * The fill is the same `backgroundSkeleton` token, and the pulse is byte-for-byte
 * Ken's (1.5s, `inOut`, frozen under reduced-motion) so these blocks breathe in
 * lockstep with any real <Skeleton> on screen. The 1.5s loop is the documented
 * exception to the system's <300ms one-shot motion rule — it's an idle affordance.
 *
 * Every height/inset below mirrors the real element the block stands in for, so
 * the swap to live content doesn't jump. The two fallbacks model the two dominant
 * authed surfaces: the centered docs page (root) and the chat/canvas builder.
 */
const pulse = stylex.keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
});

export const block = stylex.create({
  base: {
    boxSizing: 'border-box',
    flexShrink: 0,
    backgroundColor: color.backgroundSkeleton,
    animationName: {
      default: pulse,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationDuration: '1.5s',
    animationTimingFunction: easing.inOut,
    animationIterationCount: 'infinite',
  },
});

// Heights mirror the real element each block stands in for, so the swap to real
// content doesn't jump.
export const shape = stylex.create({
  logo: { width: '40px', height: space.space5, borderRadius: radius.nav },
  cta: { width: '100%', height: space.space8, borderRadius: radius.control },
  icon: { width: space.space4, height: space.space4, borderRadius: radius.nav },
  label: { height: space.space3, borderRadius: radius.nav },
  kbdCap: {
    width: '28px',
    height: space.space5,
    borderRadius: radius.control,
  },
  groupTitle: { width: '40%', height: space.space3, borderRadius: radius.nav },
  avatar: {
    width: space.space8,
    height: space.space8,
    borderRadius: radius.full,
  },
  email: { width: '120px', height: space.space3, borderRadius: radius.nav },

  crumbHome: { width: '40px', height: space.space3, borderRadius: radius.nav },
  crumbCurrent: {
    width: '72px',
    height: space.space3,
    borderRadius: radius.nav,
  },
  crumbSep: {
    width: space.space1,
    height: space.space3,
    borderRadius: radius.full,
  },
  docTitle: {
    width: '34%',
    height: space.space8,
    borderRadius: radius.control,
  },
  docDesc: { height: space.space4, borderRadius: radius.nav },
  heroFill: { width: '100%', height: '280px' },
  subheading: {
    width: '30%',
    height: space.space5,
    borderRadius: radius.control,
  },
  exampleChip: {
    width: '132px',
    height: space.space8,
    borderRadius: radius.control,
  },

  homeTitle: { width: '64px', height: space.space8, borderRadius: radius.control },
  captionLine: { height: space.space3, borderRadius: radius.nav },
  bannerFill: { width: '100%', aspectRatio: '1918 / 917' },
  cardTitle: { height: space.space5, borderRadius: radius.nav },

  searchField: { width: '100%', height: '36px', borderRadius: radius.full },
  chatDot: { width: '14px', height: '14px', borderRadius: radius.full },

  headerTitle: { width: '120px', height: space.space4, borderRadius: radius.nav },

  userBubble: {
    width: '60%',
    height: space.space12,
    borderRadius: radius.surface,
  },
  metaLine: {
    width: '72px',
    height: space.space2,
    borderRadius: radius.full,
  },
  turnLogo: {
    width: space.space5,
    height: space.space5,
    borderRadius: radius.full,
  },
  caption: { width: '104px', height: space.space3, borderRadius: radius.nav },
  timelineDot: {
    width: space.space2,
    height: space.space2,
    borderRadius: radius.full,
  },
  pill: { width: '176px', height: space.space8, borderRadius: radius.full },
  sendBtn: {
    width: space.space10,
    height: space.space10,
    borderRadius: radius.full,
  },

  toolToggle: {
    width: '64px',
    height: space.space8,
    borderRadius: radius.control,
  },
  toolSelect: {
    width: '100%',
    height: space.space8,
    borderRadius: radius.control,
  },
  canvasPreview: {
    width: '316px',
    maxWidth: '100%',
    height: '246px',
    borderRadius: radius.surface,
  },

  wordmark: { width: '120px', height: space.space6, borderRadius: radius.nav },
  authTitle: {
    width: '60%',
    height: space.space8,
    borderRadius: radius.control,
  },
  field: { width: '100%', height: '52px', borderRadius: radius.control },
  button: {
    width: '100%',
    height: space.space12,
    borderRadius: radius.control,
  },
  fillParent: { width: '100%', height: '100%', borderRadius: radius.surface },
});

// Layout grids that Box can't express (no grid-template axis). Mirrors the
// co-located Home.styles `grid`: two even columns, collapsing to one when narrow.
export const layout = stylex.create({
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: 'repeat(2, minmax(0, 1fr))',
      '@media (max-width: 640px)': '1fr',
    },
    gap: space.space4,
  },
});

export const labelW = stylex.create({
  w90: { width: '90%' },
  w85: { width: '85%' },
  w80: { width: '80%' },
  w75: { width: '75%' },
  w70: { width: '70%' },
  w65: { width: '65%' },
  w60: { width: '60%' },
  w55: { width: '55%' },
  w50: { width: '50%' },
  w45: { width: '45%' },
  w40: { width: '40%' },
  w35: { width: '35%' },
});
