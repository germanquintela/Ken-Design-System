'use client';

import * as stylex from '@stylexjs/stylex';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { IconButton } from '../IconButton';
import type { IconButtonProps } from '../IconButton';
import { iconSize } from '../../theme/foundations/iconSize';
import { swap } from './CopyButton.styles';

/** How long the confirmed (check) state lingers before reverting to copy. */
const REVERT_DELAY = 3000;

export interface CopyButtonProps
  extends Omit<
    IconButtonProps,
    'children' | 'aria-label' | 'onClick' | 'onCopy'
  > {
  /** The text written to the clipboard on click. */
  value: string;
  /** Accessible name for the idle state. @default 'Copy' */
  'aria-label'?: string;
  /** Accessible name announced once copied. @default 'Copied' */
  copiedLabel?: string;
  /** Fired after a successful clipboard write. */
  onCopy?(value: string): void;
}

/**
 * **CopyButton** — an `IconButton` that writes `value` to the clipboard and
 * confirms with a copy → green-check swap that auto-reverts after 3s. Hand it the
 * text and it owns the whole interaction; size, variant, shape, focus ring and
 * press scale are inherited from IconButton. The `aria-label` flips to
 * `copiedLabel` while confirmed, so screen readers hear it too.
 *
 * @example
 * ```tsx
 * <CopyButton value="npm install @ken/react" />
 * <CopyButton value={apiKey} size="sm" onCopy={(v) => track('copied', v)} />
 * ```
 */
export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  function CopyButton(
    {
      value,
      size = 'md',
      variant = 'secondary',
      'aria-label': label = 'Copy',
      copiedLabel = 'Copied',
      onCopy,
      ...rest
    },
    ref,
  ) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    // Clear the pending revert if we unmount mid-confirmation.
    useEffect(() => () => clearTimeout(timer.current), []);

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopy?.(value);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), REVERT_DELAY);
      } catch {
        // Clipboard denied (insecure context / permission) — stay in idle state.
      }
    }, [value, onCopy]);

    const glyph = iconSize[size];

    return (
      <IconButton
        ref={ref}
        size={size}
        variant={variant}
        aria-label={copied ? copiedLabel : label}
        onClick={handleCopy}
        {...rest}
      >
        <span {...stylex.props(swap.root)}>
          <Copy
            size={glyph}
            aria-hidden
            {...stylex.props(
              swap.icon,
              copied ? swap.copyHidden : swap.copyShown,
            )}
          />
          <Check
            size={glyph}
            aria-hidden
            {...stylex.props(
              swap.icon,
              swap.checkBase,
              copied ? swap.checkShown : swap.checkHidden,
            )}
          />
        </span>
      </IconButton>
    );
  },
);
