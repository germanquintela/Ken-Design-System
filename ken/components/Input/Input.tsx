'use client';

import * as stylex from '@stylexjs/stylex';
import { cloneElement, forwardRef, isValidElement, useId, useRef } from 'react';
import type {
  InputHTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { Field } from '@base-ui-components/react/field';
import { iconSize, type ControlSize } from '../../theme/foundations/iconSize';
import { fieldShell, fieldSize } from '../../theme/foundations/field';
import {
  below,
  box,
  input as inputStyles,
  labelText,
  root,
  slot,
} from './Input.styles';

/** Shared control-size scale — height + text track it (matched to Button). */
export type InputSize = ControlSize;

// Drop the escape hatches (className/style) and `size` (our union, not the
// native width hint). `prefix` is also a native HTML (RDFa) attribute — we
// redefine it (and `suffix`) as our slot nodes. Native `placeholder` IS allowed
// — the label is external.
type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'className' | 'style' | 'children' | 'prefix' | 'suffix'
>;

export interface InputProps extends NativeInputProps {
  /** Optional label rendered ABOVE the field. */
  label?: string;
  /** Control size — height + text scale together. */
  size?: InputSize;
  /** Leading slot (left) — a Lucide icon or short text like "$". Icons auto-size. */
  prefix?: ReactNode;
  /** Trailing slot (right) — a Lucide icon or short text like "USD". Icons auto-size. */
  suffix?: ReactNode;
  /** Helper line below the field. Hidden while an `error` is showing. */
  description?: ReactNode;
  /** Error message. When set, the field reads as invalid and this replaces the description. */
  error?: ReactNode;
}

/**
 * **Input** — a single-line text field built on Base UI's `Field`: an optional
 * external `label` above, the bordered box with `prefix`/`suffix` slots, and a
 * `description`/`error` line below (aria-describedby wired by Field). `sm`/`md`/`lg`
 * via `size`; no floating label, no local state — for that use `FormInput`.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Amount"
 *   prefix="$"
 *   suffix="USD"
 *   placeholder="0.00"
 *   description="Enter the transfer amount."
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    size = 'md',
    prefix,
    suffix,
    description,
    error,
    disabled,
    id: idProp,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const id = idProp ?? reactId;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const invalid = Boolean(error);

  // Forward the ref AND keep a local handle (used to focus on box click).
  const setRefs = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as { current: HTMLInputElement | null }).current = node;
  };

  // Clicking anywhere in the box (padding, slots) focuses the input — minus the
  // input itself, where the native click places the caret / starts selection.
  const focusOnBoxClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || e.target === inputRef.current) return;
    e.preventDefault();
    inputRef.current?.focus();
  };

  // Size a Lucide element to the control; leave plain text (e.g. "$") untouched.
  const sizedSlot = (node: ReactNode) =>
    isValidElement(node)
      ? cloneElement(node as ReactElement<{ size?: number }>, {
          size: iconSize[size],
        })
      : node;

  return (
    <Field.Root
      disabled={disabled}
      invalid={invalid}
      {...stylex.props(root.base)}
    >
      {label != null && (
        <Field.Label
          {...stylex.props(labelText.base, disabled && labelText.disabled)}
        >
          {label}
        </Field.Label>
      )}

      {/* biome-ignore lint/a11y/noStaticElementInteractions: shell click-to-focus convenience; the inner input is the real keyboard-accessible control. */}
      <div
        onMouseDown={focusOnBoxClick}
        {...stylex.props(
          fieldShell.base,
          fieldSize[size],
          box.control,
          disabled
            ? fieldShell.disabled
            : invalid
              ? fieldShell.error
              : fieldShell.interactive,
        )}
      >
        {prefix != null && (
          <span
            aria-hidden
            {...stylex.props(slot.base, slot[size], disabled && slot.disabled)}
          >
            {sizedSlot(prefix)}
          </span>
        )}
        <Field.Control
          ref={setRefs}
          id={id}
          disabled={disabled}
          {...rest}
          {...stylex.props(
            inputStyles.base,
            inputStyles[size],
            disabled && inputStyles.disabled,
          )}
        />
        {suffix != null && (
          <span
            aria-hidden
            {...stylex.props(slot.base, slot[size], disabled && slot.disabled)}
          >
            {sizedSlot(suffix)}
          </span>
        )}
      </div>

      {invalid ? (
        <Field.Error match {...stylex.props(below.base, below.error)}>
          {error}
        </Field.Error>
      ) : description != null ? (
        <Field.Description {...stylex.props(below.base, below.description)}>
          {description}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
});
