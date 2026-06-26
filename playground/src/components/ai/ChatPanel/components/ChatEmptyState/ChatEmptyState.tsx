'use client';
import { Box, Text, Pill, StackLogo, Separator } from '@ken/react';
import { PROMPT_SUGGESTIONS } from '@/constants/promptSuggestions';

interface ChatEmptyStateProps {
  /** Fired with the suggestion's full prompt when a chip is clicked. */
  onPick(prompt: string): void;
}

/**
 * Welcoming empty state for a chat with no messages: a static AI logo, a title,
 * a subtle divider, and a row of starter-prompt chips that pre-fill the input.
 */
export function ChatEmptyState({ onPick }: ChatEmptyStateProps) {
  return (
    <Box
      direction="column"
      align="center"
      justify="center"
      grow
      gap="space6"
      p="space6"
    >
      <StackLogo size="sm" />
      <Text size="subheading" align="center">
        What do you want to build today?
      </Text>

      <Box width={280}>
        <Separator tone="subtle" />
      </Box>

      <Box direction="row" wrap="wrap" justify="center" gap="space2">
        {PROMPT_SUGGESTIONS.map((s) => (
          <Pill
            key={s.label}
            size="md"
            icon={<s.icon />}
            onClick={() => onPick(s.prompt)}
          >
            {s.label}
          </Pill>
        ))}
      </Box>
    </Box>
  );
}
