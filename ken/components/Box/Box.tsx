import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { ElementType, HTMLAttributes, Ref } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';
import { renderPoly } from '../../lib/renderPoly';
import { space, layout } from '../../theme/tokens/space.stylex';
import { color } from '../../theme/tokens/color.stylex';
import { zIndex } from '../../theme/tokens/zIndex.stylex';
import * as s from './Box.styles';

/**
 * Token scales as closed string unions — these ARE the public API. Autocomplete
 * shows only valid steps; an off-system value (`gap="13px"`) won't type-check.
 * Listed explicitly (rather than `keyof typeof space`) so the generated `.d.ts`
 * stays clean and a token can't silently drift the surface.
 *
 * **The scale is NOT contiguous — it jumps.** `spaceN` = N×4px, but only these
 * steps exist (no `space7`/`space9`/`space11`/…):
 * - Spacing (gaps · padding · margin): `space0`=0 · `1`=4 · `2`=8 · `3`=12 ·
 *   `4`=16 · `5`=20 · `6`=24 · `8`=32 · `10`=40 · `12`=48 · `16`=64 · `20`=80 px.
 * - Container (sizing — width/height/min/max): coarser steps `space24`=96 ·
 *   `32`=128 · `40`=160 · `48`=192 · `64`=256 · `80`=320 · `96`=384 · `128`=512 ·
 *   `160`=640 · `192`=768 · `240`=960 px.
 */
type SpaceToken =
  | 'space0'
  | 'space1'
  | 'space2'
  | 'space3'
  | 'space4'
  | 'space5'
  | 'space6'
  | 'space8'
  | 'space10'
  | 'space12'
  | 'space16'
  | 'space20'
  | 'space24'
  | 'space32'
  | 'space40'
  | 'space48'
  | 'space64'
  | 'space80'
  | 'space96'
  | 'space128'
  | 'space160'
  | 'space192'
  | 'space240';

type ZIndexToken =
  | 'base'
  | 'sticky'
  | 'dropdown'
  | 'overlay'
  | 'modal'
  | 'toast'
  | 'tooltip';

/** The border-color tokens — the only visual axis Box exposes (a 1px hairline). */
type BorderToken =
  | 'borderSubtle'
  | 'borderDefault'
  | 'borderStrong'
  | 'borderFocus';

/** Sizing keywords (intrinsic + viewport + page) layered over the space scale. */
type SizeToken =
  | SpaceToken
  | 'full'
  | 'auto'
  | 'fit'
  | 'min'
  | 'max'
  | 'screen'
  | 'page';

/**
 * Sizing is the ONE axis that gets an escape hatch: container dimensions are
 * legitimately off-scale (a 400px form, a 1200px column, `60%`, `clamp(...)`),
 * and unlike color/spacing they carry no brand decision. So width/height/min/max
 * also accept a raw number (→ px) or any CSS string — while the token literals
 * above still autocomplete. Spacing (gap/padding/margin/inset) stays token-only.
 */
type SizeValue = SizeToken | number | (string & {});
type InsetToken = SpaceToken | 'auto' | 'full';
type BasisToken = SpaceToken | 'auto' | 'full' | 'content';
type MarginToken = SpaceToken | 'auto';

type DisplayValue =
  | 'block'
  | 'flex'
  | 'inline-flex'
  | 'inline'
  | 'grid'
  | 'inline-grid'
  | 'none';
type DirectionValue = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type AlignValue = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type JustifyValue =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';
type WrapValue = 'nowrap' | 'wrap' | 'wrap-reverse';
type FlexValue = 'none' | 'auto' | 'initial' | '1';
type AlignSelfValue = AlignValue | 'auto';
type JustifySelfValue = 'start' | 'center' | 'end' | 'stretch' | 'auto';
type PositionValue = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
type OverflowValue = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';

/**
 * A prop value that can vary by viewport: a scalar (applies everywhere, exactly
 * as before) OR a mobile-first pair. `base` is the default; `md` overrides at
 * ≥768px and falls back to `base` when omitted. Only the curated layout props
 * below are widened to `Responsive<…>`; everything else stays scalar-only.
 */
type Responsive<T> = T | { base: T; md?: T };

interface BoxOwnProps {
  /** The element (or component) Box renders as. Default `div`. */
  as?: ElementType;

  /** Default `flex` — Box doubles as the row/column layout primitive. */
  display?: Responsive<DisplayValue>;

  /** `flex-direction`. Default `row`. Responsive: a value or `{ base, md }`. */
  direction?: Responsive<DirectionValue>;
  /** Cross-axis alignment (`align-items`): `start` · `center` · `end` · `stretch` · `baseline`. */
  align?: Responsive<AlignValue>;
  /** Main-axis distribution (`justify-content`): `start` · `center` · `end` · `between` · `around` · `evenly`. */
  justify?: Responsive<JustifyValue>;
  /** `flex-wrap`: `nowrap` · `wrap` · `wrap-reverse`. */
  wrap?: WrapValue;
  /** Gap between children. Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`. */
  gap?: Responsive<SpaceToken>;
  /** Row gap only (`row-gap`). Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`. */
  rowGap?: SpaceToken;
  /** Column gap only (`column-gap`). Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`. */
  columnGap?: SpaceToken;

  /** `flex` shorthand: `none` · `auto` · `initial` · `1`. */
  flex?: Responsive<FlexValue>;
  /** `flex-grow: 1` when true. */
  grow?: boolean;
  /** `flex-shrink: 1` when true. */
  shrink?: boolean;
  /** `flex-basis`. Spacing step (×4px) `space0/1/2/3/4/5/6/8/10/12/16/20`, or `auto` · `full` · `content`. */
  basis?: BasisToken;
  /** Override the container's cross-axis alignment for this item (`align-self`). */
  alignSelf?: AlignSelfValue;
  /** `justify-self` (grid item): `start` · `center` · `end` · `stretch` · `auto`. */
  justifySelf?: JustifySelfValue;

  /** Padding, all sides. Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`. */
  p?: Responsive<SpaceToken>;
  /** Inline padding (left + right). Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`. */
  px?: Responsive<SpaceToken>;
  /** Block padding (top + bottom). Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`. */
  py?: Responsive<SpaceToken>;
  /** Padding-top. Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`. */
  pt?: Responsive<SpaceToken>;
  /** Padding-right. Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`. */
  pr?: Responsive<SpaceToken>;
  /** Padding-bottom. Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`. */
  pb?: Responsive<SpaceToken>;
  /** Padding-left. Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`. */
  pl?: Responsive<SpaceToken>;

  /** Margin, all sides. Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`, or `auto`. */
  m?: MarginToken;
  /** Inline margin (left + right). `mx="auto"` centers a fixed-width Box. Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`, or `auto`. */
  mx?: MarginToken;
  /** Block margin (top + bottom). Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`, or `auto`. */
  my?: MarginToken;
  /** Margin-top. Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`, or `auto`. */
  mt?: MarginToken;
  /** Margin-right. Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`, or `auto`. */
  mr?: MarginToken;
  /** Margin-bottom. Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`, or `auto`. */
  mb?: MarginToken;
  /** Margin-left. Spacing step (×4px): `space0/1/2/3/4/5/6/8/10/12/16/20`, or `auto`. */
  ml?: MarginToken;

  /** Width. A `space*` step (×4px — incl. coarser container steps up to `space240`=960px; see the `Box` doc for the full scale), a keyword (`full` · `fit` · `min` · `max` · `screen` · `page`), a number (→ px), or any CSS string. */
  width?: Responsive<SizeValue>;
  /** Height. Same value space as `width`. */
  height?: Responsive<SizeValue>;
  /** Minimum width. Same value space as `width`. */
  minWidth?: Responsive<SizeValue>;
  /** Maximum width. `maxWidth="page"` caps at the page max-width. */
  maxWidth?: Responsive<SizeValue>;
  /** Minimum height. Same value space as `width`. */
  minHeight?: SizeValue;
  /** Maximum height. Same value space as `width`. */
  maxHeight?: SizeValue;

  /** CSS `position`: `static` · `relative` · `absolute` · `fixed` · `sticky`. */
  position?: PositionValue;
  /** All-edge offset (`inset`). Spacing step (×4px) `space0/1/2/3/4/5/6/8/10/12/16/20`, or `auto` · `full`. */
  inset?: InsetToken;
  /** `top` offset. Spacing step (×4px) `space0/1/2/3/4/5/6/8/10/12/16/20`, or `auto` · `full`. */
  top?: InsetToken;
  /** `right` offset. Spacing step (×4px) `space0/1/2/3/4/5/6/8/10/12/16/20`, or `auto` · `full`. */
  right?: InsetToken;
  /** `bottom` offset. Spacing step (×4px) `space0/1/2/3/4/5/6/8/10/12/16/20`, or `auto` · `full`. */
  bottom?: InsetToken;
  /** `left` offset. Spacing step (×4px) `space0/1/2/3/4/5/6/8/10/12/16/20`, or `auto` · `full`. */
  left?: InsetToken;
  /** Stacking layer (`z-index`). Named token: `base` · `sticky` · `dropdown` · `overlay` · `modal` · `toast` · `tooltip`. */
  zIndex?: ZIndexToken;

  /** `overflow`: `visible` · `hidden` · `clip` · `scroll` · `auto`. */
  overflow?: OverflowValue;
  /** `overflow-x`. Same values as `overflow`. */
  overflowX?: OverflowValue;
  /** `overflow-y`. Same values as `overflow`. */
  overflowY?: OverflowValue;
  /** Keep the element scrollable but hide the visible scrollbar. */
  hideScrollbar?: boolean;

  // Border — a 1px hairline in a border-token color. `border` = all edges;
  // the per-edge props paint a single side (e.g. a toolbar's bottom divider).
  /** 1px hairline on all edges. Border token: `borderSubtle` · `borderDefault` · `borderStrong` · `borderFocus`. */
  border?: BorderToken;
  /** Top-edge hairline (e.g. a toolbar's bottom divider lives on the row below). Border token. */
  borderTop?: BorderToken;
  /** Right-edge hairline. Border token. */
  borderRight?: BorderToken;
  /** Bottom-edge hairline. Border token. */
  borderBottom?: BorderToken;
  /** Left-edge hairline. Border token. */
  borderLeft?: BorderToken;

  /**
   * Escape hatch for app-layer decoration Box's typed axes can't express
   * (e.g. a background image / dot-grid). Accepts ONLY the output of
   * `stylex.create` — never a raw className or inline-style string — so the
   * LLM-safe contract holds (no loose hex/px). Composed LAST, so it wins over
   * Box's own styles for any shared property.
   */
  style?: StyleXStyles;
}

/**
 * Native attributes Box forwards (events, aria, id, role, tabIndex, children…).
 * `className` stays removed (no raw class escape hatch); native `style` is removed
 * too, then re-declared above as a typed `StyleXStyles` prop — the only sanctioned
 * escape hatch, restricted to compiled StyleX output.
 */
type BoxNativeProps = Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'>;

export interface BoxProps extends BoxNativeProps, BoxOwnProps {}

// — token resolvers: closed keyword → CSS literal, else → the themeable var —
const SPACE = space as unknown as Record<string, string>;
const BORDER = color as unknown as Record<string, string>;

const resolveSize = (v: SizeValue, axis: 'w' | 'h'): string => {
  if (typeof v === 'number') return `${v}px`; // bare number → px
  switch (v) {
    case 'full':
      return '100%';
    case 'auto':
      return 'auto';
    case 'fit':
      return 'fit-content';
    case 'min':
      return 'min-content';
    case 'max':
      return 'max-content';
    case 'screen':
      return axis === 'w' ? '100vw' : '100vh';
    case 'page':
      return layout.pageMaxWidth;
    // a token key → its themeable var; anything else is a raw CSS escape value
    default:
      return v in SPACE ? SPACE[v] : v;
  }
};

const resolveInset = (v: InsetToken): string =>
  v === 'auto' ? 'auto' : v === 'full' ? '100%' : space[v];

const resolveBasis = (v: BasisToken): string =>
  v === 'auto'
    ? 'auto'
    : v === 'full'
      ? '100%'
      : v === 'content'
        ? 'content'
        : space[v];

const resolveMargin = (v: MarginToken): string =>
  v === 'auto' ? 'auto' : space[v];

// — enum resolvers (friendly keyword → CSS value) for the responsive path —
//   these mirror the static maps in Box.styles.ts (the scalar fast path still
//   uses those); they exist so the `{ base, md }` path can emit the same values.
const ALIGN: Record<AlignValue, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};
const JUSTIFY: Record<JustifyValue, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};
const FLEX: Record<FlexValue, string> = {
  none: 'none',
  auto: 'auto',
  initial: 'initial',
  '1': '1',
};

/** Is this prop value the responsive `{ base, md }` form? (Scalars are strings /
 *  numbers — never objects — so an object with `base` is unambiguous.) */
const isResp = <T,>(v: Responsive<T>): v is { base: T; md?: T } =>
  typeof v === 'object' && v !== null && 'base' in v;

/** Resolve a responsive pair's base + md through `f` (md falls back to base)
 *  into the two CSS values the `rdyn` fns expect. */
const pair = <T,>(
  v: { base: T; md?: T },
  f: (t: T) => string,
): [string, string] => [f(v.base), f(v.md ?? v.base)];

/**
 * **Box** — the polymorphic layout primitive, and the system's only sanctioned
 * way to render a layout element (no raw `<div>`). Defaults to `display: flex`,
 * so it doubles as the row/column primitive; render any element via `as`.
 *
 * Every spacing / sizing / color axis is a **semantic token**, never a raw value:
 * the prop types are closed unions, so an off-system value (`gap="13px"`) won't
 * compile. The spacing scale is `spaceN` = N×4px but **jumps** (no `space7`/`9`/
 * `11`/…): gaps/padding/margin use `space0·1·2·3·4·5·6·8·10·12·16·20`; sizing
 * adds coarser container steps up to `space240` (960px). Tip: press `Ctrl`/`⌘` +
 * `Space` after `=` on any prop to autocomplete the exact steps it accepts.
 *
 * @example
 * ```tsx
 * <Box direction="column" gap="space4" p="space6" maxWidth="page">
 *   <Box grow>…</Box>
 *   <Box mt="space2" border="borderSubtle" />
 * </Box>
 * ```
 */
export const Box = forwardRef<HTMLElement, BoxProps>(function Box(props, ref) {
  const {
    as = 'div',
    display = 'flex',
    direction,
    align,
    justify,
    wrap,
    gap,
    rowGap,
    columnGap,
    flex,
    grow,
    shrink,
    basis,
    alignSelf,
    justifySelf,
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    position,
    inset,
    top,
    right,
    bottom,
    left,
    zIndex: z,
    overflow,
    overflowX,
    overflowY,
    hideScrollbar,
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    style,
    ...rest
  } = props;

  return renderPoly({
    as,
    ref: ref as Ref<HTMLElement>,
    props: {
      ...rest,
      ...stylex.props(
        s.base.root,

        // responsive-capable enum props: scalar → static fast path;
        // `{ base, md }` → dynamic media-query rule via `rdyn`.
        isResp(display)
          ? s.rdyn.display(...pair(display, (d) => d))
          : s.display[display],
        direction !== undefined &&
          (isResp(direction)
            ? s.rdyn.flexDirection(...pair(direction, (d) => d))
            : s.direction[direction]),
        align !== undefined &&
          (isResp(align)
            ? s.rdyn.alignItems(...pair(align, (a) => ALIGN[a]))
            : s.align[align]),
        justify !== undefined &&
          (isResp(justify)
            ? s.rdyn.justifyContent(...pair(justify, (j) => JUSTIFY[j]))
            : s.justify[justify]),
        flex !== undefined &&
          (isResp(flex)
            ? s.rdyn.flex(...pair(flex, (f) => FLEX[f]))
            : s.flex[flex]),

        wrap && s.wrap[wrap],
        grow !== undefined && s.grow[grow ? 'true' : 'false'],
        shrink !== undefined && s.shrink[shrink ? 'true' : 'false'],
        alignSelf && s.alignSelf[alignSelf],
        justifySelf && s.justifySelf[justifySelf],
        position && s.position[position],
        overflow && s.overflow[overflow],
        overflowX && s.overflowX[overflowX],
        overflowY && s.overflowY[overflowY],
        hideScrollbar && s.scrollbar.hidden,

        // dynamic, token-valued axes (responsive ones: scalar → single-arg
        // `dyn`; `{ base, md }` → `rdyn`)
        gap !== undefined &&
          (isResp(gap)
            ? s.rdyn.gap(...pair(gap, (g) => space[g]))
            : s.dyn.gap(space[gap])),
        rowGap !== undefined && s.dyn.rowGap(space[rowGap]),
        columnGap !== undefined && s.dyn.columnGap(space[columnGap]),

        p !== undefined &&
          (isResp(p)
            ? s.rdyn.padding(...pair(p, (t) => space[t]))
            : s.dyn.p(space[p])),
        px !== undefined &&
          (isResp(px)
            ? s.rdyn.paddingInline(...pair(px, (t) => space[t]))
            : s.dyn.px(space[px])),
        py !== undefined &&
          (isResp(py)
            ? s.rdyn.paddingBlock(...pair(py, (t) => space[t]))
            : s.dyn.py(space[py])),
        pt !== undefined &&
          (isResp(pt)
            ? s.rdyn.paddingTop(...pair(pt, (t) => space[t]))
            : s.dyn.pt(space[pt])),
        pr !== undefined &&
          (isResp(pr)
            ? s.rdyn.paddingRight(...pair(pr, (t) => space[t]))
            : s.dyn.pr(space[pr])),
        pb !== undefined &&
          (isResp(pb)
            ? s.rdyn.paddingBottom(...pair(pb, (t) => space[t]))
            : s.dyn.pb(space[pb])),
        pl !== undefined &&
          (isResp(pl)
            ? s.rdyn.paddingLeft(...pair(pl, (t) => space[t]))
            : s.dyn.pl(space[pl])),

        m !== undefined && s.dyn.m(resolveMargin(m)),
        mx !== undefined && s.dyn.mx(resolveMargin(mx)),
        my !== undefined && s.dyn.my(resolveMargin(my)),
        mt !== undefined && s.dyn.mt(resolveMargin(mt)),
        mr !== undefined && s.dyn.mr(resolveMargin(mr)),
        mb !== undefined && s.dyn.mb(resolveMargin(mb)),
        ml !== undefined && s.dyn.ml(resolveMargin(ml)),

        width !== undefined &&
          (isResp(width)
            ? s.rdyn.width(...pair(width, (v) => resolveSize(v, 'w')))
            : s.dyn.width(resolveSize(width, 'w'))),
        height !== undefined &&
          (isResp(height)
            ? s.rdyn.height(...pair(height, (v) => resolveSize(v, 'h')))
            : s.dyn.height(resolveSize(height, 'h'))),
        minWidth !== undefined &&
          (isResp(minWidth)
            ? s.rdyn.minWidth(...pair(minWidth, (v) => resolveSize(v, 'w')))
            : s.dyn.minWidth(resolveSize(minWidth, 'w'))),
        maxWidth !== undefined &&
          (isResp(maxWidth)
            ? s.rdyn.maxWidth(...pair(maxWidth, (v) => resolveSize(v, 'w')))
            : s.dyn.maxWidth(resolveSize(maxWidth, 'w'))),
        minHeight !== undefined && s.dyn.minHeight(resolveSize(minHeight, 'h')),
        maxHeight !== undefined && s.dyn.maxHeight(resolveSize(maxHeight, 'h')),
        basis !== undefined && s.dyn.basis(resolveBasis(basis)),

        inset !== undefined && s.dyn.inset(resolveInset(inset)),
        top !== undefined && s.dyn.top(resolveInset(top)),
        right !== undefined && s.dyn.right(resolveInset(right)),
        bottom !== undefined && s.dyn.bottom(resolveInset(bottom)),
        left !== undefined && s.dyn.left(resolveInset(left)),

        z !== undefined && s.dyn.zIndex(zIndex[z]),

        // Border hairlines — resolve the token to its themeable color var.
        border !== undefined && s.dyn.border(BORDER[border]),
        borderTop !== undefined && s.dyn.borderTop(BORDER[borderTop]),
        borderRight !== undefined && s.dyn.borderRight(BORDER[borderRight]),
        borderBottom !== undefined && s.dyn.borderBottom(BORDER[borderBottom]),
        borderLeft !== undefined && s.dyn.borderLeft(BORDER[borderLeft]),

        // App-layer escape hatch — composed LAST so it wins per-property.
        style,
      ),
    },
  });
});
