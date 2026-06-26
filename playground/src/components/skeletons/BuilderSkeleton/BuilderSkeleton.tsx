import { Box } from '@ken/react';
import { BuilderPanes } from '../BuilderPanes';

/**
 * Canvas-only fallback (`app/(builder)/ai-builder/loading.tsx`). The AI-builder
 * layout persists the shell (sidebar + card header) across conversation switches, so
 * this only fills the card body: the chat column + the canvas, matching the AiBuilder
 * container. First entry INTO the builder is covered by `BuilderFullSkeleton` instead.
 */
export function BuilderSkeleton() {
  return (
    <Box
      role="status"
      aria-busy
      aria-label="Loading"
      direction="row"
      grow
      minHeight={0}
      height="full"
    >
      <BuilderPanes />
    </Box>
  );
}
