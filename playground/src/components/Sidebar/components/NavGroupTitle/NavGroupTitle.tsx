import type { ReactNode } from 'react';
import { Box, Text } from '@ken/react';

/**
 * NavGroupTitle — a muted section heading for the sidebar (e.g. "Chats",
 * "Foundations", "Components"). Padded to align with the nav items' left edge
 * below it; uses the most-muted tone so it reads as a label, not a destination.
 * App-level (it's sidebar chrome), composed entirely from Ken primitives.
 */
export function NavGroupTitle({ children }: { children: ReactNode }) {
  return (
    <Box px="space3" py="space1">
      <Text size="footnote" tone="tertiary">
        {children}
      </Text>
    </Box>
  );
}
