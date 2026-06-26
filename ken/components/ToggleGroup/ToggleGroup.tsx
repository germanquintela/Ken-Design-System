'use client';

import * as stylex from '@stylexjs/stylex';
import { forwardRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ToggleGroup as BaseToggleGroup } from '@base-ui-components/react/toggle-group';
import { Toggle as BaseToggle } from '@base-ui-components/react/toggle';
import { iconSize } from '../../theme/foundations/iconSize';
import { focusRing } from '../../theme/foundations/focusRing';
import { item, pill, pillMotion, root } from './ToggleGroup.styles';

// Icons-only, single-select SEGMENTED CONTROL. Built on Base UI's headless
// `toggle-group` (roving focus, keyboard arrows) + `toggle` (a native <button>
// carrying `aria-pressed`/`data-pressed`). Exactly one option is always active;
// a single limestone pill SLIDES under it. Base UI's value is an array of pressed
// values — we expose a single `string` and adapt at the boundary, swallowing the
// empty case so the active option can't be deselected (mandatory selection).
//
// Data-driven by an `items` array (not compound children): it makes the pill math
// trivial — equal fixed squares ⇒ offset is `index × step`, no DOM measurement —
// and lets the type FORCE a per-item `aria-label` (icon-only controls must have an
// accessible name, à la IconButton). Styling is owned here: no className/render.

export type ToggleGroupSize = 'md' | 'lg';

export interface ToggleGroupItem {
  /** Stable identity; matched against `value` / `defaultValue`. */
  value: string;
  /** A Lucide icon COMPONENT — Ken renders it at the size's icon scale. */
  icon: LucideIcon;
  /** Accessible name — required, since there's no visible label. */
  'aria-label': string;
  /** Disable just this option. */
  disabled?: boolean;
}

export interface ToggleGroupProps {
  /** The options, left → right. The pill slides between them. */
  items: ToggleGroupItem[];
  /** Controlled selected value (single). */
  value?: string;
  /** Uncontrolled initial value. Defaults to `items[0].value`. */
  defaultValue?: string;
  /** Fires with the newly-selected value. Never fires empty (mandatory selection). */
  onValueChange?: (value: string) => void;
  /** Density — `md` (32px tall) or `lg` (36px tall). */
  size?: ToggleGroupSize;
  /** Disable the whole control. */
  disabled?: boolean;
  /** Accessible name for the group. */
  'aria-label'?: string;
  /** Accessible name by reference (alternative to `aria-label`). */
  'aria-labelledby'?: string;
  /** Pass-through id. */
  id?: string;
}

// slot + gap, in px — how far the pill travels per index step. Plain TS map used
// in render logic only (NOT inside stylex.create, where a map access can't fold).
const STEP: Record<ToggleGroupSize, number> = { md: 28, lg: 32 };

/**
 * **ToggleGroup** — an icons-only, single-select segmented control where exactly
 * one option is always active and a limestone pill slides beneath it. Built on
 * Base UI's headless ToggleGroup (roving focus + arrow keys); exposes a single
 * `string` value (not Base UI's array) and refuses to deselect (mandatory
 * selection). Data-driven by an `items` array — each item REQUIRES an `aria-label`,
 * since there is no visible text.
 *
 * @example
 * ```tsx
 * <ToggleGroup
 *   aria-label="View"
 *   defaultValue="grid"
 *   items={[
 *     { value: 'grid', icon: LayoutGrid, 'aria-label': 'Grid view' },
 *     { value: 'list', icon: List, 'aria-label': 'List view' },
 *   ]}
 *   onValueChange={setView}
 * />
 * ```
 */
export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  function ToggleGroup(
    {
      items,
      value,
      defaultValue,
      onValueChange,
      size = 'md',
      disabled = false,
      ...rest
    },
    ref,
  ) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<string | undefined>(
      defaultValue ?? items[0]?.value,
    );
    const activeValue = isControlled ? value : internal;

    // The slot the pill rests under. `-1` (value not found / empty) pins it to 0.
    const activeIndex = Math.max(
      0,
      items.findIndex((it) => it.value === activeValue),
    );
    const offset = activeIndex * STEP[size];

    const handleValueChange = (groupValue: unknown[]) => {
      const next = groupValue[0] as string | undefined;
      if (next == null) return; // mandatory selection — ignore deselect of the active item
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    };

    return (
      <BaseToggleGroup
        ref={ref}
        value={activeValue !== undefined ? [activeValue] : undefined}
        onValueChange={handleValueChange}
        disabled={disabled}
        {...rest}
        {...stylex.props(root.base)}
      >
        <span
          aria-hidden
          {...stylex.props(
            pill.base,
            pill[size],
            pillMotion.at(`translateX(${offset}px)`),
          )}
        />
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <BaseToggle
              key={it.value}
              value={it.value}
              disabled={it.disabled}
              aria-label={it['aria-label']}
              {...stylex.props(item.base, item[size], focusRing.ring)}
            >
              <Icon size={iconSize[size]} aria-hidden />
            </BaseToggle>
          );
        })}
      </BaseToggleGroup>
    );
  },
);

ToggleGroup.displayName = 'ToggleGroup';
