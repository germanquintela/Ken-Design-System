'use client';
import type * as React from 'react';
import { ArrowUp } from 'lucide-react';
import { Box, Textarea, IconButton } from '@ken/react';
import { iconSize } from '@ken/react/theme/foundations/iconSize';
import { shell } from './AiInput.styles';

export interface AiInputProps {
  /** Controlled text value. */
  value: string;
  /** Fires on every keystroke with the next value. */
  onChange: (value: string) => void;
  /** Fires when the user submits (Enter or the send button). */
  onSend: () => void;
  /** Spinner on the send button + button inert while a build runs. */
  loading?: boolean;
  /** Disable the whole composer. */
  disabled?: boolean;
  placeholder?: string;
}

// App-level chat composer: a rounded shell wrapping a seamless auto-growing
// Textarea (3 rows → 400px → internal scroll) with a circular up-arrow send button
// pinned bottom-right. Enter sends; Shift+Enter inserts a newline. Thin controlled
// component — the parent (ChatPanel) owns the draft state and the send flow.
export function AiInput({
  value,
  onChange,
  onSend,
  loading = false,
  disabled = false,
  placeholder,
}: AiInputProps) {
  const canSend = value.trim().length > 0 && !disabled && !loading;

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (canSend) onSend();
    }
  }

  return (
    <Box
      direction="column"
      gap="space2"
      px="space3"
      py="space2"
      width="full"
      style={shell.base}
    >
      <Textarea
        seamless
        maxHeight={400}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        aria-label="Message"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Box justify="end">
        <IconButton
          shape="circle"
          size="md"
          variant="default"
          aria-label="Send message"
          loading={loading}
          disabled={value.trim().length === 0 || disabled}
          onClick={onSend}
        >
          <ArrowUp size={iconSize.md} />
        </IconButton>
      </Box>
    </Box>
  );
}
