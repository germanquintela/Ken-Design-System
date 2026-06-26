import { Box, Separator, Skeleton } from '@ken/react';
// Re-use the REAL canvas dot-grid + composer chrome so the builder skeleton's
// surfaces match the live UI exactly (zero drift, no layout shift on swap).
import { canvas } from '@/components/ai/CanvasPanel/CanvasPanel.styles';
import { shell as aiInputShell } from '@/components/ai/ChatPanel/components/AiInput/AiInput.styles';
import { Bar } from '../Bar';
import * as s from '../skeletons.styles';

function TimelineRow({ w }: { w: keyof typeof s.labelW }) {
  return (
    <Box align="center" gap="space2">
      <Bar shape={[s.shape.timelineDot]} />
      <Bar shape={[s.shape.label, s.labelW[w]]} />
    </Box>
  );
}

/**
 * The builder's two panes — chat column (~1/4) + canvas (~3/4) — that fill the card
 * body. Shared, role-less, by both builder fallbacks: the canvas-only `BuilderSkeleton`
 * (conversation switches, shell persists) and the full-shell `BuilderFullSkeleton`
 * (first entry, shell still rendering). The single role=status lives on each fallback's
 * own root, so assistive tech is told "Loading" once.
 */
export function BuilderPanes() {
  return (
    <>
      <Box
        flex="none"
        width="space96"
        minHeight={0}
        direction="column"
        minWidth={0}
      >
        <Box
          direction="column"
          grow
          minHeight={0}
          gap="space4"
          pt="space4"
          px="space4"
        >
          <Box direction="column" align="end" gap="space1">
            <Bar shape={[s.shape.userBubble]} />
            <Bar shape={[s.shape.metaLine]} />
          </Box>
          <Box align="start" direction="column" gap="space4">
            <Box direction="column" gap="space1">
              <Box align="center" gap="space2">
                <Bar shape={[s.shape.turnLogo]} />
                <Bar shape={[s.shape.caption]} />
              </Box>
              <Box direction="column" gap="space2" ml="space1">
                <TimelineRow w="w75" />
                <TimelineRow w="w50" />
                <TimelineRow w="w60" />
              </Box>
            </Box>
            <Bar shape={[s.shape.pill]} />
          </Box>
        </Box>

        <Box shrink={false} p="space4" width="full" align="center">
          <Box
            direction="column"
            gap="space2"
            px="space3"
            py="space2"
            width="full"
            style={aiInputShell.base}
          >
            <Skeleton variant="text" lines={1} />
            <Box justify="end">
              <Bar shape={[s.shape.sendBtn]} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Separator orientation="vertical" tone="subtle" />

      <Box grow minWidth={0} minHeight={0} direction="column">
        <Box
          align="center"
          justify="between"
          gap="space2"
          px="space4"
          py="space2"
          borderBottom="borderSubtle"
        >
          <Bar shape={[s.shape.toolToggle]} />
          <Box width="space60">
            <Bar shape={[s.shape.toolSelect]} />
          </Box>
        </Box>

        <Box style={canvas.base}>
          <Box
            p="space6"
            minHeight="full"
            width="full"
            align="center"
            justify="center"
          >
            <Bar shape={[s.shape.canvasPreview]} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
