/**
 * BREAKPOINT — Ken's single mobile-first breakpoint.
 *
 * Deliberately NOT a `defineVars` token: CSS media queries cannot read custom
 * properties (`@media (min-width: var(--md))` is invalid), so a breakpoint can
 * never be themeable. It is a compile-time constant.
 *
 * The `@media (min-width: 768px)` string is INLINED inside `stylex.create`
 * (StyleX requires statically-analyzable media-query keys). These exports exist
 * for JS parity — e.g. `matchMedia(\`(min-width: ${MD}px)\`)` — and as the single
 * documented source of the value. Keep the inlined literal in Box.styles.ts in
 * sync with `MD` below.
 */
export const MD = 768;
export const mediaMd = `(min-width: ${MD}px)` as const;
