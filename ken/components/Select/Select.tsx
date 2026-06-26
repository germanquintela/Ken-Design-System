'use client';

import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Select as BaseSelect } from '@base-ui-components/react/select';
import { ChevronDown } from 'lucide-react';
import { fieldShell } from '../../theme/foundations/field';
import { overlay } from '../../theme/foundations/overlay';
import { field, trigger, value as valueStyles } from './Select.styles';
import { LEADING_ICON, SelectDropdown, sizeIcon } from './internals';
import type { SelectOption, SelectSize } from './internals';

export type { SelectOption, SelectSize };

export interface SelectProps {
  /** The options, in render order. */
  options: SelectOption[];
  /** Density. sm = 32px, md = 36px tall. Default 'md'. */
  size?: SelectSize;
  /** Empty-state placeholder (muted). */
  placeholder?: string;
  /** Leading icon — swaps to the selected option's icon once one is chosen. */
  icon?: ReactNode;
  /** Disable the whole control. */
  disabled?: boolean;
  /** Controlled value (`null` = nothing selected). */
  value?: string | null;
  /** Uncontrolled initial value. */
  defaultValue?: string | null;
  /** Fires with the newly-selected value. */
  onValueChange?: (value: string | null) => void;
  /** Controlled open state of the dropdown. */
  open?: boolean;
  /** Uncontrolled initial open state. Default `false`. */
  defaultOpen?: boolean;
  /** Fires when the dropdown opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Which side of the trigger the dropdown opens on: `top` · `bottom` · `left` · `right`. Default `bottom`. */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Alignment of the dropdown to the trigger: `start` · `center` · `end`. Default `start`. */
  align?: 'start' | 'center' | 'end';
  /** Gap in px between trigger and dropdown. Default 6. */
  sideOffset?: number;
  /** Form field name (submitted with the selected value). */
  name?: string;
  /** Pass-through id for the trigger. */
  id?: string;
  /** Accessible name for the trigger. */
  'aria-label'?: string;
  /** Accessible name by reference (alternative to `aria-label`). */
  'aria-labelledby'?: string;
}

/**
 * **Select** — a rectangular, single-select dropdown (the "normal" select). Built
 * on Base UI's Select; the trigger shows the chosen option's label and leading
 * icon (the icon swaps to the selection) with a rotating chevron. Controlled via
 * `value`/`onValueChange`, uncontrolled via `defaultValue`.
 *
 * @example
 * ```tsx
 * <Select
 *   placeholder="Pick a category"
 *   options={[
 *     { value: 'travel', label: 'Travel' },
 *     { value: 'meals', label: 'Meals' },
 *   ]}
 *   onValueChange={(v) => setCategory(v)}
 * />
 * ```
 */
export function Select({
  options,
  size = 'md',
  placeholder,
  icon,
  disabled,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  side,
  align,
  sideOffset,
  name,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: SelectProps) {
  const [valueState, setValueState] = useState<string | null>(defaultValue);
  const value = valueProp !== undefined ? valueProp : valueState;
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;

  const handleValueChange = (next: string | null) => {
    if (valueProp === undefined) setValueState(next);
    onValueChange?.(next);
  };
  const handleOpenChange = (next: boolean) => {
    if (openProp === undefined) setOpenState(next);
    onOpenChange?.(next);
  };

  const selected =
    value != null ? options.find((o) => o.value === value) : undefined;
  const leadingIcon = selected?.icon ?? icon;

  return (
    <BaseSelect.Root
      value={value as string}
      onValueChange={handleValueChange}
      open={open}
      onOpenChange={handleOpenChange}
      disabled={disabled}
      name={name}
      id={id}
    >
      <BaseSelect.Trigger
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...stylex.props(
          trigger.base,
          trigger[size],
          fieldShell.base,
          field.shape,
          size === 'sm' ? field.padSm : field.padMd,
          disabled ? field.disabled : field.rest,
          open && !disabled && field.open,
        )}
      >
        {leadingIcon != null && (
          <span
            aria-hidden
            {...stylex.props(
              overlay.slot.base,
              disabled && overlay.slot.disabled,
            )}
          >
            {sizeIcon(leadingIcon, LEADING_ICON)}
          </span>
        )}
        <span {...stylex.props(valueStyles.area)}>
          {selected ? (
            <span {...stylex.props(valueStyles.text)}>{selected.label}</span>
          ) : (
            <span
              {...stylex.props(valueStyles.text, valueStyles.placeholderField)}
            >
              {placeholder}
            </span>
          )}
        </span>
        <ChevronDown
          size={LEADING_ICON}
          aria-hidden
          {...stylex.props(overlay.chevron.base, open && overlay.chevron.open)}
        />
      </BaseSelect.Trigger>

      <SelectDropdown
        options={options}
        side={side}
        align={align}
        sideOffset={sideOffset}
      />
    </BaseSelect.Root>
  );
}

Select.displayName = 'Select';
