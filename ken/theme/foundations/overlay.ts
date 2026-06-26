import * as stylex from '@stylexjs/stylex';
import { color } from '../tokens/color.stylex';
import { radius } from '../tokens/radius.stylex';
import { space } from '../tokens/space.stylex';
import { font, fontSize, lineHeight } from '../tokens/typography.stylex';
import { elevation } from '../tokens/elevation.stylex';
import { duration, easing } from '../tokens/motion.stylex';
import { zIndex } from '../tokens/zIndex.stylex';

/**
 * OVERLAY — the shared floating-surface vocabulary for Ken's popper menus.
 * Authored once so the Menu popup today, and the Select / Combobox listboxes
 * later, share one panel + row look. Cross-control primitive → foundations
 * (CLAUDE.md §4). Component-only bits (Menu's destructive item, the rotating
 * chevron) stay co-located in the component.
 *
 * Everything is exported under ONE `overlay` namespace (`overlay.panel`,
 * `overlay.item`, `overlay.slot`…) so the parts read as a surface vocabulary at
 * the call site and never collide with a component's own `item`/`slot`/`label`
 * locals (which previously forced an `item as itemSurface` alias on every import).
 *
 * State styling keys off Base UI's data-attributes (`[data-highlighted]` =
 * hover AND keyboard; `[data-disabled]`), the same mechanism Tabs uses. Each
 * colour/background keeps its `default` + conditions in ONE owner so a later
 * style can't erase the default (StyleX merges last-wins PER KEY).
 */

const positioner = stylex.create({
  base: {
    zIndex: zIndex.dropdown,
  },
});

const panel = stylex.create({
  // Intrinsic width; Select later overrides minWidth to var(--anchor-width) to
  // match its trigger.
  base: {
    boxSizing: 'border-box',
    minWidth: '180px',
    maxWidth: '280px',
    padding: space.space1, // inset so rows don't kiss the rounded corners
    backgroundColor: color.backgroundPage,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: color.borderSubtle, // the shadow carries the elevation, the border just defines the edge
    borderRadius: radius.control,
    boxShadow: elevation.overlay,
    // Enter/exit: Base UI flags data-starting-style / data-ending-style around
    // the open transition; transform-origin comes from the positioner. Per Emil:
    // ease-out, exit faster than enter, under 300ms, reduced-motion → instant.
    transformOrigin: 'var(--transform-origin)', // set by Base UI Positioner
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0,
    },
    transform: {
      default: 'scale(1) translateY(0)',
      '[data-starting-style]': 'scale(0.96) translateY(-4px)',
      '[data-ending-style]': 'scale(0.96) translateY(-4px)',
    },
    // Reduced motion: switch transition-property to `none` so BOTH the enter and
    // the `[data-ending-style]` exit snap instantly (a media override on
    // transitionDuration would only replace the `default` branch, not the exit).
    transitionProperty: {
      default: 'opacity, transform',
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    transitionDuration: {
      default: duration.medium,
      '[data-ending-style]': duration.base,
    },
    transitionTimingFunction: easing.out,
  },
});

const item = stylex.create({
  base: {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    gap: space.space2,
    width: '100%',
    minHeight: '36px',
    paddingInline: space.space2,
    paddingBlock: space.space1,
    borderRadius: radius.nav, // tighter than the panel
    fontFamily: font.sans,
    fontSize: fontSize.control,
    lineHeight: lineHeight.control,
    textDecorationLine: 'none', // reset when rendered as <a> (LinkItem)
    color: {
      default: color.textPrimary,
      '[data-disabled]': color.textDisabled,
    },
    backgroundColor: {
      default: 'transparent',
      '[data-highlighted]': color.backgroundHover,
    },
    // `pointer` suits a menu; Select/Combobox option rows may override to `default`.
    cursor: { default: 'pointer', '[data-disabled]': 'not-allowed' },
    userSelect: 'none',
    outlineStyle: 'none', // the highlight IS the focus affordance here
    transitionProperty: 'background-color',
    transitionDuration: {
      default: duration.fast,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.standard,
  },
});

const label = stylex.create({
  base: {
    flexGrow: 1,
    minWidth: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
});

const slot = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: color.textSecondary,
  },
  disabled: {
    color: color.textDisabled,
  },
});

const separator = stylex.create({
  base: {
    height: '1px',
    marginBlock: space.space1,
    marginInline: `calc(-1 * ${space.space1})`, // span the panel inset edge-to-edge
    backgroundColor: color.borderSubtle,
  },
});

const groupLabel = stylex.create({
  base: {
    display: 'block',
    paddingInline: space.space2,
    paddingBlock: space.space1,
    fontFamily: font.sans,
    fontSize: fontSize.footnote,
    lineHeight: lineHeight.footnote,
    color: color.textMuted,
    userSelect: 'none',
  },
});

const chevron = stylex.create({
  // The trigger disclosure caret — shared by Menu and Select. Rotates with the
  // open state (the consumer passes `open` from its own state; StyleX has no
  // descendant selectors so it can't read the trigger's data-attribute).
  base: {
    flexShrink: 0,
    transitionProperty: 'transform',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.standard,
  },
  open: {
    transform: 'rotate(180deg)',
  },
});

/** The floating-surface vocabulary, namespaced. Consume as `overlay.panel.base`,
 *  `overlay.item.base`, `overlay.slot.disabled`, `overlay.chevron.open`, … */
export const overlay = {
  positioner,
  panel,
  item,
  label,
  slot,
  separator,
  groupLabel,
  chevron,
};
