'use client';

import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Select as BaseSelect } from '@base-ui-components/react/select';
import { focusRing } from '../../theme/foundations/focusRing';
import { overlay } from '../../theme/foundations/overlay';
import { chip, pill, trigger, value as valueStyles } from './Select.styles';
import { LEADING_ICON, SelectDropdown, sizeIcon } from './internals';
import type { SelectOption, SelectSize } from './internals';

export type { SelectOption, SelectSize };

export interface MultiSelectProps {
  /** The options, in render order. */
  options: SelectOption[];
  /** Density. sm = 32px, md = 36px tall. Default 'md'. */
  size?: SelectSize;
  /** Empty-state placeholder (the pill doubles as the filter name → charcoal). */
  placeholder?: string;
  /** Leading icon — stays fixed (does not swap with the selection). */
  icon?: ReactNode;
  /** Disable the whole control. */
  disabled?: boolean;
  /** Controlled value. */
  value?: string[];
  /** Uncontrolled initial value. */
  defaultValue?: string[];
  /** Fires with the full next selection. */
  onValueChange?: (value: string[]) => void;
  /** Pills shown before collapsing into a "+N" chip. Default 2. */
  maxVisiblePills?: number;
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
  /** Form field name (submitted with the selected values). */
  name?: string;
  /** Pass-through id for the trigger. */
  id?: string;
  /** Accessible name for the trigger. */
  'aria-label'?: string;
  /** Accessible name by reference (alternative to `aria-label`). */
  'aria-labelledby'?: string;
}

/**
 * **MultiSelect** — a rounded-full filter pill that holds multiple selections as
 * white pills, collapsing the overflow into a `+N` chip. Built on Base UI's Select
 * in `multiple` mode; the leading icon stays fixed (unlike `Select`, it does not
 * swap with the selection). Controlled via `value`/`onValueChange` (string arrays),
 * uncontrolled via `defaultValue`.
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   placeholder="Tags"
 *   maxVisiblePills={2}
 *   options={[
 *     { value: 'urgent', label: 'Urgent' },
 *     { value: 'review', label: 'Review' },
 *   ]}
 *   onValueChange={setTags}
 * />
 * ```
 */
export function MultiSelect({
  options,
  size = 'md',
  placeholder,
  icon,
  disabled,
  value: valueProp,
  defaultValue,
  onValueChange,
  maxVisiblePills = 2,
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
}: MultiSelectProps) {
  const [valueState, setValueState] = useState<string[]>(defaultValue ?? []);
  const value = valueProp !== undefined ? valueProp : valueState;
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;

  const handleValueChange = (next: string[]) => {
    if (valueProp === undefined) setValueState(next);
    onValueChange?.(next);
  };
  const handleOpenChange = (next: boolean) => {
    if (openProp === undefined) setOpenState(next);
    onOpenChange?.(next);
  };

  const byValue = new Map(options.map((o) => [o.value, o]));
  const hasValue = value.length > 0;
  const visible = value.slice(0, maxVisiblePills);
  const rest = value.length - visible.length;

  return (
    <BaseSelect.Root
      multiple
      value={value}
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
          pill.shape,
          size === 'sm' ? pill.padSm : pill.padMd,
          hasValue && pill.multiPad,
          pill.filled,
          pill.motion,
          focusRing.ring,
        )}
      >
        {icon != null && (
          <span
            aria-hidden
            {...stylex.props(
              overlay.slot.base,
              disabled && overlay.slot.disabled,
            )}
          >
            {sizeIcon(icon, LEADING_ICON)}
          </span>
        )}
        <span {...stylex.props(valueStyles.area)}>
          {hasValue ? (
            <>
              {visible.map((v) => (
                <span
                  key={v}
                  {...stylex.props(
                    chip.base,
                    chip[size],
                    disabled && chip.disabled,
                  )}
                >
                  <span {...stylex.props(chip.label)}>
                    {byValue.get(v)?.label}
                  </span>
                </span>
              ))}
              {rest > 0 && (
                <span
                  {...stylex.props(
                    chip.base,
                    chip[size],
                    disabled && chip.disabled,
                  )}
                >{`+${rest}`}</span>
              )}
            </>
          ) : (
            <span {...stylex.props(valueStyles.text)}>{placeholder}</span>
          )}
        </span>
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

MultiSelect.displayName = 'MultiSelect';
