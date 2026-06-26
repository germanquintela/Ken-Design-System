import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import * as s from './Separator.styles';

/** Line direction. `vertical` is for flex rows (it fills the row's height). */
export type SeparatorOrientation = 'horizontal' | 'vertical';

/** Hairline weight. `default` = standard divider; `subtle` = faintest (gridlines). */
export type SeparatorTone = 'default' | 'subtle';

// Plain div with role="separator" — same output as Base UI's Separator, with no
// client-side import needed. Drop `className`/`style` (styling is owned here) and
// re-expose `orientation` with Ken's own union so the two valid values are all
// the autocomplete shows.
type BaseProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;

export interface SeparatorProps extends BaseProps {
  /** Line direction. Default `horizontal`. */
  orientation?: SeparatorOrientation;
  /** Hairline weight. Default `default`. */
  tone?: SeparatorTone;
}

/**
 * **Separator** — a one-pixel hairline that divides content. `horizontal` (the
 * default) is a full-width rule; `vertical` is for flex rows and fills the row's
 * height. Use `tone="subtle"` for the faintest weight (gridlines). It carries no
 * margin of its own — space it with the surrounding layout.
 *
 * Renders a plain `<div role="separator" aria-orientation>` — server-renderable,
 * no client import required.
 *
 * @example
 * ```tsx
 * <Separator />
 * <Box direction="row" align="center" gap="space3">
 *   <Text>Edit</Text>
 *   <Separator orientation="vertical" />
 *   <Text>Delete</Text>
 * </Box>
 * ```
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator(
    { orientation = 'horizontal', tone = 'default', ...rest },
    ref,
  ) {
    return (
      // biome-ignore lint/a11y/useFocusableInteractive: static separator — no tabIndex; reproduces Base UI's own <div role="separator"> output
      // biome-ignore lint/a11y/useSemanticElements: <hr> can't accept StyleX props; deliberate reproduction of Base UI Separator's div output
      <div
        ref={ref}
        // biome-ignore lint/a11y/useAriaPropsForRole: aria-valuenow only required for interactive sliders, not static dividers
        role="separator"
        aria-orientation={orientation}
        {...rest}
        {...stylex.props(s.line.base, s.line[orientation], s.line[tone])}
      />
    );
  },
);
