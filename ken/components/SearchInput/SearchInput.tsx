'use client';

import * as stylex from '@stylexjs/stylex';
import { Search } from 'lucide-react';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import type {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  MouseEvent,
  Ref,
} from 'react';
import { Field } from '@base-ui-components/react/field';
import { iconSize, type ControlSize } from '../../theme/foundations/iconSize';
import { fieldShell, fieldSize } from '../../theme/foundations/field';
import { Spinner } from '../Spinner';
import { Kbd } from '../Kbd';
import { input as inputStyles, shape, slot } from './SearchInput.styles';

/** Shared control-size scale — height + text track it (matched to Input/Button). */
export type SearchInputSize = ControlSize;

// Drop the escape hatches (className/style) and `size` (our union, not the native
// width hint). The native `type` is owned (always "search"). `placeholder` is fine.
type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'className' | 'style' | 'children' | 'type'
>;

export interface SearchInputProps extends NativeInputProps {
  /** Control size — height + text scale together. Default `md`. */
  size?: SearchInputSize;
  /** Async state: swaps the magnifier for a Spinner and hides the `⌘K` chip. */
  loading?: boolean;
  /**
   * Whether to show the `⌘K` chip and bind the global `⌘K`/`⌃K` shortcut that
   * focuses this field. Default `true`. Set `false` when `⌘K` is owned by
   * something else (e.g. a global search) so this field doesn't hijack it.
   */
  shortcut?: boolean;
}

/**
 * **SearchInput** — a fully-rounded search field on Base UI's `Field`: the shared
 * field shell (border + focus ring) at `radius.full`, a leading magnifier that
 * becomes a Spinner while `loading`, and a trailing `⌘K` chip that focuses the
 * input on press and retires once you're typing/focused. Binds the global
 * `⌘K`/`⌃K` shortcut unless `shortcut={false}`.
 *
 * @example
 * ```tsx
 * <SearchInput placeholder="Search transactions" />
 * <SearchInput loading value={query} onChange={(e) => setQuery(e.target.value)} />
 * ```
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      size = 'md',
      loading = false,
      shortcut = true,
      disabled,
      placeholder = 'Search',
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      id: idProp,
      ...rest
    },
    ref,
  ) {
    const reactId = useId();
    const id = idProp ?? reactId;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [focused, setFocused] = useState(false);

    // Track whether the field has text — to retire the chip. Controlled callers
    // derive it from `value`; uncontrolled ones track it locally via onChange.
    const isControlled = value !== undefined;
    const [uncontrolledHasValue, setUncontrolledHasValue] = useState(
      () => String(defaultValue ?? '').length > 0,
    );
    const hasValue = isControlled
      ? String(value ?? '').length > 0
      : uncontrolledHasValue;

    // The chip is a "press ⌘K to jump here" hint — show it only when the shortcut
    // is enabled and the field is idle: not loading, not focused, empty, enabled.
    const showChip = shortcut && !loading && !focused && !hasValue && !disabled;

    // Forward the ref AND keep a local handle (used to focus on ⌘K / box click).
    const setRefs = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref)
        (ref as { current: HTMLInputElement | null }).current = node;
    };

    // Global ⌘K (⌃K on Win/Linux) → focus this field. No-op while disabled or when
    // the shortcut is opted out (so it can't clash with a global ⌘K owner).
    useEffect(() => {
      if (disabled || !shortcut) return;
      const onKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [disabled, shortcut]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setUncontrolledHasValue(e.target.value.length > 0);
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

    // Clicking anywhere in the box (padding, leading slot) focuses the input —
    // minus the input itself, where the native click places the caret.
    const focusOnBoxClick = (e: MouseEvent<HTMLDivElement>) => {
      if (disabled || e.target === inputRef.current) return;
      e.preventDefault();
      inputRef.current?.focus();
    };

    return (
      <Field.Root
        disabled={disabled}
        onMouseDown={focusOnBoxClick}
        {...stylex.props(
          fieldShell.base,
          fieldSize[size],
          shape.full,
          disabled ? fieldShell.disabled : fieldShell.interactive,
        )}
      >
        <span
          aria-hidden
          {...stylex.props(slot.base, disabled && slot.disabled)}
        >
          {loading ? (
            <Spinner size={size} tone="inherit" aria-hidden />
          ) : (
            <Search size={iconSize[size]} aria-hidden />
          )}
        </span>

        <Field.Control
          ref={setRefs as Ref<HTMLInputElement>}
          id={id}
          type="search"
          disabled={disabled}
          placeholder={placeholder}
          aria-busy={loading || undefined}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
          {...stylex.props(
            inputStyles.base,
            inputStyles[size],
            disabled && inputStyles.disabled,
          )}
        />

        {showChip && (
          <Kbd size="sm" aria-hidden>
            ⌘K
          </Kbd>
        )}
      </Field.Root>
    );
  },
);
