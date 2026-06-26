import * as stylex from '@stylexjs/stylex';
import { color } from '../theme/tokens/color.stylex';
import { radius } from '../theme/tokens/radius.stylex';
import { space } from '../theme/tokens/space.stylex';
import { font, fontSize, fontWeight } from '../theme/tokens/typography.stylex';
import { duration, easing } from '../theme/tokens/motion.stylex';

/**
 * BUTTON RECIPE — the button family's shared visual language.
 *
 * `surface` is the shape-agnostic shell (layout, radius, an always-present
 * border slot, transitions) plus the sm/md/lg size scale. `variants` is the
 * 7-way colour system. Lives in `recipes/` (not co-located inside Button, not
 * in theme/foundations) because it's the styling shared across the button
 * FAMILY — Button today, LinkButton / IconButton next — composed from semantic
 * tokens. Cross-control primitives (focusRing, iconSize) stay in foundations.
 *
 * Contract notes:
 * - Everything spatial is on the 4px grid; every colour is a semantic token.
 * - Each colour property is owned in exactly ONE place (the variant), with its
 *   `default` / `:hover` / `:disabled` values together — StyleX merges
 *   last-wins PER KEY, so a property split across styles would clobber its own
 *   default. The shell only sets a flat transparent `borderColor`; variants
 *   that show a border fully re-declare it (incl. a `default`).
 * - Hover is guarded with `:not(:disabled)` so disabled buttons never react.
 */

export const surface = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.space2,
    boxSizing: 'border-box',
    flexShrink: 0,
    margin: 0,
    fontFamily: font.sans,
    fontWeight: fontWeight.regular, // Lausanne has no Medium cut; emphasis is colour/size
    lineHeight: 'normal', // fixed height + flex-center owns the vertical rhythm; keep the label un-stretched
    whiteSpace: 'nowrap',
    // Normalize: when the family renders as an <a> (LinkButton) the browser
    // underlines it by default; <button> doesn't. Reset here so every element
    // looks the same.
    textDecorationLine: 'none',
    borderRadius: radius.full,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent', // variants own any visible border colour
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    userSelect: 'none',
    appearance: 'none',
    // Motion per Emil: hover/colour eases in softly (explicit props — never
    // `all` — `ease`, ~200ms); the press scale is snappy (~140ms ease-out) so
    // the button feels responsive to a click. All under the 300ms UI ceiling.
    transitionProperty:
      'background-color, border-color, color, box-shadow, transform',
    transitionDuration: `${duration.medium}, ${duration.medium}, ${duration.medium}, ${duration.medium}, ${duration.fast}`,
    transitionTimingFunction: `${easing.standard}, ${easing.standard}, ${easing.standard}, ${easing.standard}, ${easing.out}`,
    transform: { default: 'scale(1)', ':active:not(:disabled)': 'scale(0.97)' },
  },

  // Size scale — height + padding on the 4px grid (md = the Figma mock); font
  // from the role scale (13 → 14 → 16).
  sm: {
    height: '32px',
    paddingInline: space.space3,
    fontSize: fontSize.caption,
  },
  md: {
    height: '36px',
    paddingInline: space.space4,
    fontSize: fontSize.control,
  },
  lg: {
    height: '44px',
    paddingInline: space.space6,
    fontSize: fontSize.body,
  },

  // BLOCK — stretch to the container's width (the label stays centred via the
  // base's justify-content). Opt-in for full-width CTAs (e.g. a sidebar "New
  // Chat"); the family is inline by default. Overrides the base's flex-shrink:0
  // so it can actually grow.
  block: {
    display: 'flex',
    width: '100%',
    flexShrink: 1,
  },
});

export const states = stylex.create({
  // LOADING — keep the variant's live colours (don't flash to the disabled grey)
  // but make the control inert: pointer-events:none blocks the mouse AND
  // suppresses the hover/active styles, while the host guards onClick (keyboard)
  // and sets aria-busy/aria-disabled. cursor:progress documents the wait.
  loading: {
    cursor: 'progress',
    pointerEvents: 'none',
  },

  // POPUP TRIGGER — a Button that opens a menu/select/popover drops the press
  // scale. The popup's own entrance animation (it scales out from this anchor)
  // IS the click feedback; the button squishing inward at the same instant, from
  // the same point, collides with it. Detected from `aria-haspopup`, never a
  // prop. Flat `scale(1)` overrides the surface's `:active` scale (last-wins per
  // key); hover / focus ring / colour transitions are untouched.
  noPressScale: {
    transform: 'scale(1)',
  },
});

export const variants = stylex.create({
  // DEFAULT — the lime primary action, with a soft inner sheen ("lit" feel).
  default: {
    backgroundColor: {
      default: color.accentDefault,
      ':hover:not(:disabled)': color.accentHover,
      ':disabled': color.backgroundDisabled,
    },
    color: { default: color.textOnAccent, ':disabled': color.textDisabled },
    // documented, button-only decorative effect (mock-faithful highlight)
    boxShadow: {
      default: 'inset 0 0 12px 0 rgba(255, 255, 255, 0.4)',
      ':disabled': 'none',
    },
  },

  // SUBTLE — low-emphasis neutral fill; hover darkens to bone.
  subtle: {
    backgroundColor: {
      default: color.backgroundNeutral,
      ':hover:not(:disabled)': color.backgroundSubtleHover,
      ':disabled': color.backgroundDisabled,
    },
    color: { default: color.textPrimary, ':disabled': color.textDisabled },
  },

  // SECONDARY — white with a limestone hairline. On hover the border deepens to
  // dark limestone and a light-limestone wash fills behind it — both move together.
  secondary: {
    backgroundColor: {
      default: color.backgroundPage,
      ':hover:not(:disabled)': color.backgroundSubtle, // lightLimestone — soft fill on hover
    },
    color: { default: color.textPrimary, ':disabled': color.textDisabled },
    borderColor: {
      default: color.borderSubtle, // limestone hairline at rest
      ':hover:not(:disabled)': color.borderDefault, // darkLimestone — border deepens on hover
      ':disabled': color.backgroundDisabled,
    },
  },

  // GHOST — chromeless, muted text. Hover fills with SUBTLE's resting surface
  // (backgroundNeutral) and darkens the text to primary. No underline.
  ghost: {
    backgroundColor: {
      default: 'transparent',
      ':hover:not(:disabled)': color.backgroundNeutral, // matches subtle's default fill
    },
    color: {
      default: color.textSecondary,
      ':hover:not(:disabled)': color.textPrimary,
      ':disabled': color.textDisabled,
    },
  },

  // STATUS (outline) — border + text in the status colour, transparent fill.
  // Hover: a very subtle wash of the SAME colour, derived from the status token
  // via color-mix so the tint always tracks the (themeable) status hue.
  success: {
    backgroundColor: {
      default: 'transparent',
      ':hover:not(:disabled)': `color-mix(in srgb, ${color.successDefault} 8%, transparent)`,
    },
    color: { default: color.successDefault, ':disabled': color.textDisabled },
    borderColor: {
      default: color.successDefault,
      ':disabled': color.backgroundDisabled,
    },
  },
  warning: {
    backgroundColor: {
      default: 'transparent',
      ':hover:not(:disabled)': `color-mix(in srgb, ${color.warningDefault} 8%, transparent)`,
    },
    color: { default: color.warningDefault, ':disabled': color.textDisabled },
    borderColor: {
      default: color.warningDefault,
      ':disabled': color.backgroundDisabled,
    },
  },
  danger: {
    backgroundColor: {
      default: 'transparent',
      ':hover:not(:disabled)': `color-mix(in srgb, ${color.dangerDefault} 8%, transparent)`,
    },
    color: { default: color.dangerDefault, ':disabled': color.textDisabled },
    borderColor: {
      default: color.dangerDefault,
      ':disabled': color.backgroundDisabled,
    },
  },
});
