'use client';
import { AppWrapper } from '@/components/AppWrapper';
import { useChat } from '@/hooks/useChat';

// ChatProvider is mounted at the root layout, so the builder route only needs to
// derive its header title from the active conversation.
export default function AiBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { conversations, activeId } = useChat();
  const title =
    conversations.find((c) => c.id === activeId)?.title ?? 'New chat';
  return (
    <AppWrapper title={title} contentFill>
      {children}
    </AppWrapper>
  );
}
