'use client';

import * as stylex from '@stylexjs/stylex';
import { cloneElement, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { Select as BaseSelect } from '@base-ui-components/react/select';
import { Check } from 'lucide-react';
import { iconSize } from '../../theme/foundations/iconSize';
import { overlay } from '../../theme/foundations/overlay';
import { check, panel } from './Select.styles';

/**
 * Shared internals for the Select family (Select + MultiSelect): the canonical
 * size scale, the option type, the icon auto-sizer, and the dropdown subtree.
 * Both components render `<SelectDropdown>` inside their own `BaseSelect.Root`,
 * so the listbox styling (overlay reuse + trailing check) lives in ONE place.
 */

export type SelectSize = 'sm' | 'md';

export const LEADING_ICON = iconSize.md;
export const ROW_ICON = iconSize.lg;

export interface SelectOption {
  /** Stable identity — matched against value / defaultValue. */
  value: string;
  /** Row label; also the single-select trigger label. */
  label: ReactNode;
  /** Per-option icon. In Select it swaps into the trigger's leading slot. */
  icon?: ReactNode;
  /** Disable just this option. */
  disabled?: boolean;
}

// Auto-size a Lucide element passed as ReactNode (the Menu pattern).
export const sizeIcon = (node: ReactNode, px: number) =>
  isValidElement(node)
    ? cloneElement(node as ReactElement<{ size?: number }>, { size: px })
    : node;

export interface SelectDropdownProps {
  options: SelectOption[];
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

/** Portal → Positioner → Popup → List of option rows, each with a trailing check
 *  (ItemIndicator renders only when selected). Reuses theme/foundations/overlay. */
export function SelectDropdown({
  options,
  side = 'bottom',
  align = 'start',
  sideOffset = 6,
}: SelectDropdownProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        // Base UI defaults this to `true` → native-<select> behavior where the
        // popup overlaps the trigger so the *selected* row sits over the value
        // (and `side`/`align`/`sideOffset` are ignored). We want a plain anchored
        // dropdown that drops below the trigger, like our other overlay menus.
        alignItemWithTrigger={false}
        side={side}
        align={align}
        sideOffset={sideOffset}
        {...stylex.props(overlay.positioner.base)}
      >
        <BaseSelect.Popup {...stylex.props(overlay.panel.base, panel.select)}>
          <BaseSelect.List>
            {options.map((o) => (
              <BaseSelect.Item
                key={o.value}
                value={o.value}
                disabled={o.disabled}
                label={typeof o.label === 'string' ? o.label : undefined}
                {...stylex.props(overlay.item.base)}
              >
                {o.icon != null && (
                  <span
                    aria-hidden
                    {...stylex.props(
                      overlay.slot.base,
                      o.disabled && overlay.slot.disabled,
                    )}
                  >
                    {sizeIcon(o.icon, ROW_ICON)}
                  </span>
                )}
                <BaseSelect.ItemText {...stylex.props(overlay.label.base)}>
                  {o.label}
                </BaseSelect.ItemText>
                <BaseSelect.ItemIndicator {...stylex.props(check.base)}>
                  <Check size={ROW_ICON} aria-hidden />
                </BaseSelect.ItemIndicator>
              </BaseSelect.Item>
            ))}
          </BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}
