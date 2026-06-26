import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { radius } from '../../theme/tokens/radius.stylex';
import { space } from '../../theme/tokens/space.stylex';
import { duration, easing } from '../../theme/tokens/motion.stylex';

/**
 * TOGGLEGROUP STYLES — co-located (only ToggleGroup uses them). An icons-only,
 * single-select segmented control: a white pill container with a limestone pill
 * that SLIDES under the active icon.
 *
 * The slide is COMPUTED, not measured. The slots are equal fixed squares, so the
 * pill's offset is `activeIndex × (slot + gap)`; ToggleGroup.tsx resolves that to
 * a `translateX(<px>)` and hands it to `pillMotion.at` (StyleX's sanctioned
 * dynamic-style mechanism — same pattern as Box.styles `dyn`). The pill mounts
 * already at its offset, so the transition only fires on LATER changes — no
 * mount-flash and no DOM read (cheaper + simpler than Base UI's measured
 * Tabs.Indicator).
 *
 * Slot sizes are px literals — the documented control-footprint exception (cf.
 * IconButton 32/36/44, Switch tracks). Everything else is a 4px-grid token.
 * Disabled is keyed off BOTH `:disabled` AND `[data-disabled]`: a grouped Toggle
 * is a roving CompositeItem, so we don't assume which Base UI applies, and every
 * interactive pseudo is guarded against both (the no-hover-when-disabled rule).
 */

// Slot footprint per size. Flat consts (not a map) so StyleX can fold them at
// build time inside stylex.create — a TS map access can't be (cf. Spinner).
const SLOT_MD = '24px';
const SLOT_LG = '28px';

export const root = stylex.create({
  // White pill shell with a faint limestone hairline. `relative` anchors the
  // absolutely-positioned pill; `padding` is the inset the pill rides within.
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: 'fit-content',
    gap: space.space1,
    padding: space.space1,
    margin: 0,
    borderRadius: radius.full,
    backgroundColor: color.backgroundPage,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: color.borderSubtle,
  },
});

export const pill = stylex.create({
  // The sliding indicator. Anchored at the container inset (top/left = padding),
  // BEHIND the icons. Only `transform` animates → GPU-only, interruptible on
  // rapid clicks; on-screen movement uses ease-in-out (Emil).
  base: {
    position: 'absolute',
    top: space.space1,
    left: space.space1,
    zIndex: 0,
    pointerEvents: 'none',
    borderRadius: radius.full,
    backgroundColor: color.backgroundNeutral,
    transitionProperty: 'transform',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.inOut,
  },
  md: { width: SLOT_MD, height: SLOT_MD },
  lg: { width: SLOT_LG, height: SLOT_LG },
});

// DYNAMIC: the resolved `translateX(<px>)` passed in from ToggleGroup.tsx. One
// owner for `transform` (the transition lives in `pill.base`) — no collision.
export const pillMotion = stylex.create({
  at: (transform: string) => ({ transform }),
});

export const item = stylex.create({
  // Transparent icon button above the pill. Emphasis is COLOR only; the glyph
  // inherits it via `currentColor`. Conditions are mutually exclusive across the
  // disabled boundary, so the resolved colour is correct regardless of StyleX
  // selector priority (same approach as Tabs).
  base: {
    position: 'relative',
    zIndex: 1,
    appearance: 'none',
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    margin: 0,
    padding: 0,
    borderWidth: 0,
    borderRadius: radius.full,
    backgroundColor: 'transparent',
    userSelect: 'none',
    color: {
      default: color.textSecondary,
      ':hover:not([data-pressed]):not(:disabled):not([data-disabled])':
        color.textPrimary,
      '[data-pressed]:not(:disabled):not([data-disabled])': color.textPrimary,
      ':disabled': color.textDisabled,
      '[data-disabled]': color.textDisabled,
    },
    cursor: {
      default: 'pointer',
      ':disabled': 'not-allowed',
      '[data-disabled]': 'not-allowed',
    },
    transitionProperty: 'color',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.standard,
  },
  md: { width: SLOT_MD, height: SLOT_MD },
  lg: { width: SLOT_LG, height: SLOT_LG },
});
