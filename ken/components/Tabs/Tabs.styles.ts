import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { space } from '../../theme/tokens/space.stylex';
import {
  font,
  fontSize,
  fontWeight,
  lineHeight,
} from '../../theme/tokens/typography.stylex';
import { duration, easing } from '../../theme/tokens/motion.stylex';

/**
 * TABS STYLES — co-located; only Tabs uses them. Promote to `recipes/` the day a
 * sibling control (e.g. SegmentedControl) shares the underline/pipe treatment.
 *
 * The "pipe" is Base UI's `Tabs.Indicator`: a `<span>` Base UI keeps `hidden`
 * (UA `display:none`) until it has measured the active tab, then positions
 * itself via the CSS vars it sets on its own element — `--active-tab-left` /
 * `--active-tab-width` (same trick as `font.sans` referencing `--font-lausanne`).
 * Because it's hidden until measured, it paints straight at the right spot (no
 * mount-flash) and the transition only fires on later tab changes. NB: we set no
 * `display` on the pipe so the UA `[hidden]` rule keeps winning until measured.
 *
 * Every value is a semantic token on the 4px grid; `2px`/`-1px` are the
 * documented decorative-thickness exceptions (cf. Checkbox's 1px border).
 */

export const list = stylex.create({
  // Flex row + the full-width divider line the pipe rides on. `relative` anchors
  // the absolutely-positioned indicator to the list box.
  base: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    margin: 0,
    padding: 0,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: color.borderDefault,
  },
});

export const tab = stylex.create({
  // Equal slots that fill the row (flex:1), centered label. Emphasis is carried
  // by COLOR, not weight (Lausanne ships 400 only). Color is the one animated
  // property here — eased ~200ms (Emil: hover/color → plain ease).
  base: {
    flex: 1,
    appearance: 'none',
    borderWidth: 0,
    margin: 0,
    backgroundColor: 'transparent',
    fontFamily: font.sans,
    fontSize: fontSize.control,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.control,
    paddingBlock: space.space3,
    paddingInline: space.space3, // min spacing; flex:1 owns the real width
    textAlign: 'center',
    whiteSpace: 'nowrap',
    userSelect: 'none',

    // Tabs are roving-focus composite items, so Base UI keeps a disabled tab
    // keyboard-reachable: it sets `aria-disabled`/`[data-disabled]` and does NOT
    // apply the native `disabled` attribute — so `:disabled` never matches here.
    // We key every disabled rule off `[data-disabled]` instead. Conditions are
    // mutually exclusive across the disabled boundary, so the resolved color is
    // correct regardless of StyleX selector priority:
    //  - inactive → secondary; active (Base UI sets `[data-active]` on the
    //    selected tab) → primary; hover (only while enabled) → primary;
    //    disabled → muted grey, no hover.
    color: {
      default: color.textSecondary,
      ':hover:not([data-disabled])': color.textPrimary,
      '[data-active]:not([data-disabled])': color.textPrimary,
      '[data-disabled]': color.textDisabled,
    },
    cursor: { default: 'pointer', '[data-disabled]': 'not-allowed' },

    transitionProperty: 'color',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.standard,
  },
});

export const pipe = stylex.create({
  // The sliding underline. `bottom: -1px` makes the 2px bar overlap the 1px
  // divider so it sits ON TOP of the line, at the same level. Only `left`/`width`
  // change between tabs → animate exactly those (never `all`); on-screen movement
  // uses ease-in-out (Emil). No `display` set, so the UA `[hidden]` rule hides
  // it until Base UI has measured the active tab.
  base: {
    position: 'absolute',
    bottom: '-1px',
    left: 'var(--active-tab-left)',
    width: 'var(--active-tab-width)',
    height: '2px',
    backgroundColor: color.textPrimary, // obsidian active underline
    transitionProperty: 'left, width',
    transitionDuration: {
      default: duration.medium,
      '@media (prefers-reduced-motion: reduce)': duration.instant,
    },
    transitionTimingFunction: easing.inOut,
  },
});

export const panel = stylex.create({
  base: {
    paddingBlockStart: space.space4,
    fontFamily: font.sans,
    fontSize: fontSize.body,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.body,
    color: color.textPrimary,
  },
});
