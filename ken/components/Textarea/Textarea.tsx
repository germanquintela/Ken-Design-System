'use client';

import * as stylex from '@stylexjs/stylex';
import { forwardRef, useCallback, useEffect, useId, useRef } from 'react';
import type {
  ComponentProps,
  ReactNode,
  Ref,
  TextareaHTMLAttributes,
} from 'react';
import { Field } from '@base-ui-components/react/field';
import { area, below, labelText, root } from './Textarea.styles';

// Drop the escape hatches (className/style) and `children` — the control is a bare
// <textarea>; label/description/error are dedicated props. Native `rows`,
// `placeholder`, `value`, … are all welcome.
type NativeTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className' | 'style' | 'children'
>;

export interface TextareaProps extends NativeTextareaProps {
  /** Optional label rendered ABOVE the field. */
  label?: string;
  /** Helper line below the field. Hidden while an `error` is showing. */
  description?: ReactNode;
  /** Error message. When set, the field reads as invalid and this replaces the description. */
  error?: ReactNode;
  /** Strip the border, background, focus ring and padding — just an area to type in. */
  seamless?: boolean;
  /** Cap auto-grow at N px; past it the field scrolls internally. Ignored when
   *  `rows` is set (fixed height) or left undefined (unbounded auto-grow). */
  maxHeight?: number;
}

/** Empty-state floor for auto-grow: the field rests three rows tall, then grows. */
const AUTO_GROW_ROWS = 3;

/**
 * **Textarea** — a multi-line text field built on Base UI's `Field`, mirroring
 * `Input`: an optional external `label`, the bordered `<textarea>`, and a
 * `description`/`error` line below (aria-describedby wired by Field). AUTO-GROWS to
 * its content by default; pass `rows` for a fixed height, `maxHeight` to cap the
 * growth, or `seamless` to strip all chrome (border, background, focus ring, padding).
 *
 * @example
 * ```tsx
 * <Textarea
 *   label="Notes"
 *   placeholder="Add a memo…"
 *   maxHeight={200}
 *   description="Visible to your team."
 * />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      description,
      error,
      seamless,
      rows,
      disabled,
      id: idProp,
      value,
      onInput,
      maxHeight,
      ...rest
    },
    ref,
  ) {
    const reactId = useId();
    const id = idProp ?? reactId;
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const invalid = Boolean(error);
    const autoGrow = rows == null;

    // Forward the ref AND keep a local handle (used to measure/grow).
    const setRefs = (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref)
        (ref as { current: HTMLTextAreaElement | null }).current = node;
    };

    // Grow to fit content: collapse to the natural (rows={3}) height, then lock to
    // the scroll height + borders (box-sizing is border-box, so the height property
    // must include them or content clips by 1–2px). When `maxHeight` is set and the
    // content would exceed it, cap the height and let the field scroll internally
    // (inline overflow wins over area.autoGrow's `hidden`). No-op once `rows` is set.
    const grow = useCallback(() => {
      const el = textareaRef.current;
      if (!el || !autoGrow) return;
      el.style.height = 'auto';
      const borderY = el.offsetHeight - el.clientHeight;
      const full = el.scrollHeight + borderY;
      if (maxHeight != null && full > maxHeight) {
        el.style.height = `${maxHeight}px`;
        el.style.overflowY = 'auto';
      } else {
        el.style.height = `${full}px`;
        el.style.overflowY = 'hidden';
      }
    }, [autoGrow, maxHeight]);

    // Mount + external (controlled) value changes. Typing is handled synchronously
    // by onInput below, so this only backstops programmatic / initial updates.
    // biome-ignore lint/correctness/useExhaustiveDependencies: deps are intentional — backstop only programmatic/initial value changes, not every render.
    useEffect(() => {
      grow();
    }, [grow, value]);

    const handleInput: NonNullable<NativeTextareaProps['onInput']> = (e) => {
      grow();
      onInput?.(e);
    };

    // Props ride on Field.Control so Field's id / aria wiring sees them; the cast
    // bridges Base UI's input-shaped typing to our textarea (runtime is a textarea
    // via `render`). `rows` stays on the render element — a textarea-only attr.
    const controlProps = {
      id,
      disabled,
      value,
      onInput: handleInput,
      ...rest,
      ...stylex.props(
        area.base,
        disabled ? area.disabled : invalid ? area.error : area.outlined,
        seamless && area.seamless,
        autoGrow ? area.autoGrow : area.fixed,
      ),
    } as unknown as ComponentProps<typeof Field.Control>;

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

        <Field.Control
          ref={setRefs as Ref<HTMLInputElement>}
          render={<textarea rows={autoGrow ? AUTO_GROW_ROWS : rows} />}
          {...controlProps}
        />

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
