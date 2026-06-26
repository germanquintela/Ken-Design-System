'use client';
import { Box, Separator } from '@ken/react';
import { useChat } from '@/hooks/useChat';
import { ChatPanel } from '@/components/ai/ChatPanel';
import { CanvasPanel } from '@/components/ai/CanvasPanel';

export function AiBuilder() {
  const { versions, displayedVersion, setDisplayedVersion, building } =
    useChat();
  return (
    <Box direction="row" grow minHeight={0} height="full">
      <Box flex="none" width="space96" minHeight={0}>
        <ChatPanel />
      </Box>
      <Separator orientation="vertical" tone="subtle" />
      <Box grow minWidth={0} minHeight={0}>
        <CanvasPanel
          versions={versions}
          displayedVersion={displayedVersion}
          setDisplayedVersion={setDisplayedVersion}
          building={building}
        />
      </Box>
    </Box>
  );
}
