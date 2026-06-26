'use client';
import * as React from 'react';
import { Box, Text, UserMessage } from '@ken/react';
import { useChat } from '@/hooks/useChat';
import { AssistantTurn } from './components/AssistantTurn';
import { AiInput } from './components/AiInput';
import { ChatEmptyState } from './components/ChatEmptyState';

export function ChatPanel() {
  const {
    messages,
    versions,
    building,
    streamObservations,
    streamMessage,
    error,
    setDisplayedVersion,
    send,
  } = useChat();
  const [draft, setDraft] = React.useState('');
  const endRef = React.useRef<HTMLDivElement>(null);

  const isEmpty = messages.length === 0 && !building;

  // Keep the conversation pinned to the bottom: re-run on every change that grows
  // the transcript — new messages, streamed observations, and the incrementally
  // streamed assistant text (which grows without changing any count) — plus the
  // building flag so the live turn appearing/leaving stays scrolled to the end.
  // biome-ignore lint/correctness/useExhaustiveDependencies: deps are deliberately the growth signals listed above, not endRef.
  React.useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, streamObservations, streamMessage, building]);

  async function onSend() {
    const text = draft.trim();
    if (!text || building) return;
    setDraft('');
    await send(text);
  }

  const versionOf = React.useCallback(
    (messageId: string) =>
      versions.find((v) => v.messageId === messageId)?.version ?? null,
    [versions],
  );

  return (
    <Box direction="column" grow minWidth={0} minHeight={0} width="full">
      <Box
        direction="column"
        grow
        minHeight={0}
        gap="space4"
        pt="space4"
        px="space4"
        overflowY="auto"
        hideScrollbar
      >
        {isEmpty ? (
          <ChatEmptyState onPick={setDraft} />
        ) : (
          <>
            {messages.map((m) =>
              m.role === 'user' ? (
                <UserMessage key={m.id}>{m.content}</UserMessage>
              ) : (
                <AssistantTurn
                  key={m.id}
                  observations={m.observations ?? []}
                  message={m.content ?? undefined}
                  version={versionOf(m.id)}
                  onJump={() => {
                    const v = versionOf(m.id);
                    if (v != null) setDisplayedVersion(v);
                  }}
                />
              ),
            )}
            {building && (
              <AssistantTurn
                observations={streamObservations}
                message={streamMessage}
                building
              />
            )}
            {error && (
              <Text size="footnote" tone="secondary">
                {error}
              </Text>
            )}
            <div ref={endRef} />
          </>
        )}
      </Box>

      <Box shrink={false} p="space4" width="full" align="center">
        <AiInput
          value={draft}
          onChange={setDraft}
          onSend={onSend}
          loading={building}
          placeholder="Describe a UI to build…"
        />
      </Box>
    </Box>
  );
}
