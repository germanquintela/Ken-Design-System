import * as stylex from '@stylexjs/stylex';

/**
 * BOX STYLES — co-located because only Box uses them (Box is the polymorphic
 * no-escape-hatch LAYOUT primitive: alignment + a hairline BORDER axis — richer
 * surface styling like background / radius / shadow still lives on `Card`). The
 * border is the one visual concession: a token-colored 1px edge (e.g. a toolbar's
 * bottom divider) without reaching for a Separator or a full Card. Two shapes here:
 *
 * - STATIC enum maps (below): one atomic class per closed keyword set
 *   (display, flex alignment, position, overflow). These are the
 *   bread-and-butter — fully static, tree-shakeable, last-wins per property.
 * - DYNAMIC fns (`dyn`): token-VALUED axes (every spacing/gap, sizing, inset,
 *   z-index) where the cardinality is 12 steps × ~25 props ≈ 300 combos. Rather
 *   than hand-write that, one `(v) => ({ prop: v })` per CSS property takes the
 *   resolved token CSS-var at runtime. Type-safety is enforced at the prop layer
 *   (Box only accepts token keys); this just plugs the resolved var in. This is
 *   StyleX's sanctioned dynamic-style mechanism, NOT a runtime token getter.
 */

// — BASE — always applied. `minWidth/minHeight: 0` undoes the flex `min-*: auto`
//   default so a long child can't blow out the track. (The `box-sizing:
//   border-box` reset is GLOBAL — it ships in `@ken/react/fonts.css` so the
//   whole host app gets it, not just Box.)
export const base = stylex.create({
  root: { minWidth: 0, minHeight: 0 },
});

export const display = stylex.create({
  block: { display: 'block' },
  flex: { display: 'flex' },
  'inline-flex': { display: 'inline-flex' },
  inline: { display: 'inline' },
  grid: { display: 'grid' },
  'inline-grid': { display: 'inline-grid' },
  none: { display: 'none' },
});

export const direction = stylex.create({
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  'row-reverse': { flexDirection: 'row-reverse' },
  'column-reverse': { flexDirection: 'column-reverse' },
});

export const align = stylex.create({
  start: { alignItems: 'flex-start' },
  center: { alignItems: 'center' },
  end: { alignItems: 'flex-end' },
  stretch: { alignItems: 'stretch' },
  baseline: { alignItems: 'baseline' },
});

export const justify = stylex.create({
  start: { justifyContent: 'flex-start' },
  center: { justifyContent: 'center' },
  end: { justifyContent: 'flex-end' },
  between: { justifyContent: 'space-between' },
  around: { justifyContent: 'space-around' },
  evenly: { justifyContent: 'space-evenly' },
});

export const wrap = stylex.create({
  nowrap: { flexWrap: 'nowrap' },
  wrap: { flexWrap: 'wrap' },
  'wrap-reverse': { flexWrap: 'wrap-reverse' },
});

export const flex = stylex.create({
  none: { flex: 'none' }, // 0 0 auto
  auto: { flex: 'auto' }, // 1 1 auto
  initial: { flex: 'initial' }, // 0 1 auto
  '1': { flex: 1 }, // 1 1 0% — fill & share
});

export const grow = stylex.create({
  true: { flexGrow: 1 },
  false: { flexGrow: 0 },
});

export const shrink = stylex.create({
  true: { flexShrink: 1 },
  false: { flexShrink: 0 },
});

export const alignSelf = stylex.create({
  start: { alignSelf: 'flex-start' },
  center: { alignSelf: 'center' },
  end: { alignSelf: 'flex-end' },
  stretch: { alignSelf: 'stretch' },
  baseline: { alignSelf: 'baseline' },
  auto: { alignSelf: 'auto' },
});

export const justifySelf = stylex.create({
  start: { justifySelf: 'start' },
  center: { justifySelf: 'center' },
  end: { justifySelf: 'end' },
  stretch: { justifySelf: 'stretch' },
  auto: { justifySelf: 'auto' },
});

export const position = stylex.create({
  static: { position: 'static' },
  relative: { position: 'relative' },
  absolute: { position: 'absolute' },
  fixed: { position: 'fixed' },
  sticky: { position: 'sticky' },
});

export const overflow = stylex.create({
  visible: { overflow: 'visible' },
  hidden: { overflow: 'hidden' },
  clip: { overflow: 'clip' },
  scroll: { overflow: 'scroll' },
  auto: { overflow: 'auto' },
});

export const overflowX = stylex.create({
  visible: { overflowX: 'visible' },
  hidden: { overflowX: 'hidden' },
  clip: { overflowX: 'clip' },
  scroll: { overflowX: 'scroll' },
  auto: { overflowX: 'auto' },
});

export const overflowY = stylex.create({
  visible: { overflowY: 'visible' },
  hidden: { overflowY: 'hidden' },
  clip: { overflowY: 'clip' },
  scroll: { overflowY: 'scroll' },
  auto: { overflowY: 'auto' },
});

// Keep the element scrollable but hide the visible scrollbar.
// `scrollbarWidth: none` covers Firefox/standard; the `::-webkit-scrollbar`
// pseudo hides it in Chrome/Safari/Edge.
export const scrollbar = stylex.create({
  hidden: {
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': { display: 'none' },
  },
});

// — DYNAMIC: token-valued axes. One fn per CSS property; the resolved token
//   CSS-var (or a closed keyword literal) is passed in from Box.tsx. —
export const dyn = stylex.create({
  gap: (v: string) => ({ gap: v }),
  rowGap: (v: string) => ({ rowGap: v }),
  columnGap: (v: string) => ({ columnGap: v }),

  p: (v: string) => ({ padding: v }),
  px: (v: string) => ({ paddingInline: v }),
  py: (v: string) => ({ paddingBlock: v }),
  pt: (v: string) => ({ paddingTop: v }),
  pr: (v: string) => ({ paddingRight: v }),
  pb: (v: string) => ({ paddingBottom: v }),
  pl: (v: string) => ({ paddingLeft: v }),

  m: (v: string) => ({ margin: v }),
  mx: (v: string) => ({ marginInline: v }),
  my: (v: string) => ({ marginBlock: v }),
  mt: (v: string) => ({ marginTop: v }),
  mr: (v: string) => ({ marginRight: v }),
  mb: (v: string) => ({ marginBottom: v }),
  ml: (v: string) => ({ marginLeft: v }),

  width: (v: string) => ({ width: v }),
  height: (v: string) => ({ height: v }),
  minWidth: (v: string) => ({ minWidth: v }),
  maxWidth: (v: string) => ({ maxWidth: v }),
  minHeight: (v: string) => ({ minHeight: v }),
  maxHeight: (v: string) => ({ maxHeight: v }),
  basis: (v: string) => ({ flexBasis: v }),

  inset: (v: string) => ({ inset: v }),
  top: (v: string) => ({ top: v }),
  right: (v: string) => ({ right: v }),
  bottom: (v: string) => ({ bottom: v }),
  left: (v: string) => ({ left: v }),

  zIndex: (v: string) => ({ zIndex: v }),

  // Border — `v` is the resolved border-token CSS var (the color). Width/style are
  // baked to a 1px solid hairline; one fn per edge, longhand props (last-wins safe).
  border: (v: string) => ({
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: v,
  }),
  borderTop: (v: string) => ({
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: v,
  }),
  borderRight: (v: string) => ({
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: v,
  }),
  borderBottom: (v: string) => ({
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: v,
  }),
  borderLeft: (v: string) => ({
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: v,
  }),
});

// — RESPONSIVE: the `{ base, md }` path for the curated responsive subset
//   (direction, display, align, justify, flex, gap, sizing, padding). Each fn
//   takes two already-resolved CSS values and emits a base rule plus a single
//   `md` override. Scalars never reach here — they keep the static / single-arg
//   `dyn` fast path above; only an object value resolves through `rdyn`, so the
//   per-Box inline-var cost is paid only when a prop is actually responsive.
//
//   The media-query literal is inlined (StyleX needs a static key); keep it in
//   sync with `MD` in theme/foundations/breakpoint.ts.
export const rdyn = stylex.create({
  flexDirection: (b: string, m: string) => ({
    flexDirection: { default: b, '@media (min-width: 768px)': m },
  }),
  display: (b: string, m: string) => ({
    display: { default: b, '@media (min-width: 768px)': m },
  }),
  alignItems: (b: string, m: string) => ({
    alignItems: { default: b, '@media (min-width: 768px)': m },
  }),
  justifyContent: (b: string, m: string) => ({
    justifyContent: { default: b, '@media (min-width: 768px)': m },
  }),
  flex: (b: string, m: string) => ({
    flex: { default: b, '@media (min-width: 768px)': m },
  }),

  gap: (b: string, m: string) => ({
    gap: { default: b, '@media (min-width: 768px)': m },
  }),

  padding: (b: string, m: string) => ({
    padding: { default: b, '@media (min-width: 768px)': m },
  }),
  paddingInline: (b: string, m: string) => ({
    paddingInline: { default: b, '@media (min-width: 768px)': m },
  }),
  paddingBlock: (b: string, m: string) => ({
    paddingBlock: { default: b, '@media (min-width: 768px)': m },
  }),
  paddingTop: (b: string, m: string) => ({
    paddingTop: { default: b, '@media (min-width: 768px)': m },
  }),
  paddingRight: (b: string, m: string) => ({
    paddingRight: { default: b, '@media (min-width: 768px)': m },
  }),
  paddingBottom: (b: string, m: string) => ({
    paddingBottom: { default: b, '@media (min-width: 768px)': m },
  }),
  paddingLeft: (b: string, m: string) => ({
    paddingLeft: { default: b, '@media (min-width: 768px)': m },
  }),

  width: (b: string, m: string) => ({
    width: { default: b, '@media (min-width: 768px)': m },
  }),
  height: (b: string, m: string) => ({
    height: { default: b, '@media (min-width: 768px)': m },
  }),
  minWidth: (b: string, m: string) => ({
    minWidth: { default: b, '@media (min-width: 768px)': m },
  }),
  maxWidth: (b: string, m: string) => ({
    maxWidth: { default: b, '@media (min-width: 768px)': m },
  }),
});
