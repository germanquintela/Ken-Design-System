'use client';

import * as stylex from '@stylexjs/stylex';
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  useRef,
  useState,
} from 'react';
import type {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { Field } from '@base-ui-components/react/field';
import { iconSize } from '../../theme/foundations/iconSize';
import {
  below,
  box,
  fieldCol,
  icon,
  input,
  label,
  root,
} from './FormInput.styles';

// Drop the escape hatches (className/style) and props Ken owns. `placeholder` is
// the floating label's job (exposing the native one would collide). FormInput is
// LARGE-only — there's no `size`.
type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'className' | 'style' | 'children' | 'placeholder'
>;

export interface FormInputProps extends NativeInputProps {
  /** Floating label — sits inside the field at rest, floats up on focus/fill. It's the accessible name. */
  label: string;
  /** Decorative trailing (right) icon — a Lucide element, sized to the control automatically. */
  endIcon?: ReactNode;
  /** Helper line below the field. Hidden while an `error` is showing. */
  description?: ReactNode;
  /** Error message. When set, the field reads as invalid and this replaces the description. */
  error?: ReactNode;
}

/**
 * **FormInput** — a text field with a floating `label` that rests inside the box
 * and floats up on focus/fill (large size only). Built on Base UI's `Field`, so
 * the label is a real `<label>` and the accessible name — never the native
 * `placeholder`. For a plain field with an external label, use `Input`.
 *
 * @example
 * ```tsx
 * <FormInput
 *   label="Email address"
 *   type="email"
 *   endIcon={<Mail size={20} />}
 *   error={emailError}
 * />
 * ```
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(
    {
      label: labelText,
      endIcon,
      description,
      error,
      disabled,
      id: idProp,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) {
    const reactId = useId();
    const id = idProp ?? reactId;
    const inputRef = useRef<HTMLInputElement | null>(null);

    const isControlled = value !== undefined;
    const [focused, setFocused] = useState(false);
    const [uncontrolledFilled, setUncontrolledFilled] = useState(
      () => defaultValue != null && String(defaultValue).length > 0,
    );
    const filled = isControlled
      ? String(value ?? '').length > 0
      : uncontrolledFilled;
    const floated = focused || filled;
    const invalid = Boolean(error);

    // Forward the ref AND keep a local handle (used to focus on box click).
    const setRefs = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref)
        (ref as { current: HTMLInputElement | null }).current = node;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setUncontrolledFilled(e.target.value.length > 0);
      onChange?.(e);
    };
    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    };

    // Clicking anywhere in the box (padding, icon) focuses the input — minus the
    // input itself, where the native click places the caret / starts selection.
    const focusOnBoxClick = (e: MouseEvent<HTMLDivElement>) => {
      if (disabled || e.target === inputRef.current) return;
      e.preventDefault();
      inputRef.current?.focus();
    };

    const sizedIcon = (node: ReactNode) =>
      isValidElement(node)
        ? cloneElement(node as ReactElement<{ size?: number }>, {
            size: iconSize.lg,
          })
        : node;

    return (
      <Field.Root
        disabled={disabled}
        invalid={invalid}
        {...stylex.props(root.base)}
      >
        {/* biome-ignore lint/a11y/noStaticElementInteractions: shell click-to-focus convenience; the inner input is the real keyboard-accessible control. */}
        <div
          onMouseDown={focusOnBoxClick}
          {...stylex.props(
            box.base,
            disabled ? box.disabled : invalid ? box.error : box.interactive,
          )}
        >
          <span {...stylex.props(fieldCol.base)}>
            <Field.Label
              {...stylex.props(
                label.base,
                floated ? label.floated : label.resting,
                invalid && label.error,
                disabled && label.disabled,
              )}
            >
              {labelText}
            </Field.Label>
            <Field.Control
              ref={setRefs}
              id={id}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...rest}
              {...stylex.props(input.base, disabled && input.disabled)}
            />
          </span>

          {endIcon != null && (
            <span
              aria-hidden
              {...stylex.props(icon.base, disabled && icon.disabled)}
            >
              {sizedIcon(endIcon)}
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
  },
);
