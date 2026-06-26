'use client';
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getBrowserSupabase } from '@/lib/supabase/client';
import type { Observation } from '@ken/ai';
import type { Conversation } from '@/schemas/conversation';
import type { ChatMessage } from '@/schemas/message';
import { deriveVersions } from '@/util/versions';
import type { VersionEntry } from '@/schemas/version';
import {
  listConversations,
  createConversation,
} from '@/services/conversations';
import {
  loadMessages,
  insertUserMessage,
  insertAssistantMessage,
} from '@/services/messages';
import { streamBuild } from '@/services/buildStream';

interface ChatContextValue {
  conversations: Conversation[];
  conversationsLoading: boolean;
  activeId: string | null;
  messages: ChatMessage[];
  versions: VersionEntry[];
  displayedVersion: number | null;
  setDisplayedVersion(v: number): void;
  building: boolean;
  streamObservations: Observation[];
  streamMessage: string;
  loading: boolean;
  error: string | null;
  newChat(): void;
  send(prompt: string): Promise<void>;
}

const ChatContext = React.createContext<ChatContextValue | null>(null);
export { ChatContext };

/** Read the conversation id out of `/ai-builder/<id>` (null on the bare route). */
function idFromPath(pathname: string | null): string | null {
  if (!pathname) return null;
  const m = pathname.match(/^\/ai-builder\/([^/]+)/);
  return m ? m[1] : null;
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const supabase = React.useMemo(() => getBrowserSupabase(), []);
  const router = useRouter();
  const pathname = usePathname();
  const activeId = idFromPath(pathname);

  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  // The initial conversation-list fetch (distinct from `building`/`loading`, which
  // tracks an in-flight build). The sidebar shows a skeleton until this clears.
  const [conversationsLoading, setConversationsLoading] = React.useState(true);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [displayedVersion, setDisplayedVersion] = React.useState<number | null>(
    null,
  );
  const [building, setBuilding] = React.useState(false);
  const [streamObservations, setStreamObservations] = React.useState<
    Observation[]
  >([]);
  const [streamMessage, setStreamMessage] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const versions = React.useMemo(() => deriveVersions(messages), [messages]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await listConversations(supabase);
        if (!cancelled) setConversations(list);
      } finally {
        if (!cancelled) setConversationsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  React.useEffect(() => {
    if (!activeId) {
      setMessages([]);
      setDisplayedVersion(null);
      return;
    }
    (async () => {
      const loaded = await loadMessages(supabase, activeId);
      setMessages(loaded);
      const vs = deriveVersions(loaded);
      setDisplayedVersion(vs.length ? vs[vs.length - 1].version : null);
    })();
  }, [supabase, activeId]);

  const newChat = React.useCallback(() => {
    router.push('/ai-builder');
  }, [router]);

  const send = React.useCallback(
    async (prompt: string) => {
      setError(null);
      setBuilding(true);
      setStreamObservations([]);
      setStreamMessage('');
      try {
        const { data: auth } = await supabase.auth.getUser();
        const userId = auth.user?.id;
        if (!userId) throw new Error('Not signed in.');

        let convoId = activeId;
        if (!convoId) {
          const convo = await createConversation(
            supabase,
            userId,
            prompt.slice(0, 40),
          );
          convoId = convo.id;
          setConversations((prev) => [convo, ...prev]);
          router.push(`/ai-builder/${convo.id}`);
        }

        const userMsg = await insertUserMessage(
          supabase,
          convoId,
          userId,
          prompt,
        );
        setMessages((prev) => [...prev, userMsg]);

        const history = [...messages, userMsg].slice(-6).map((m) => ({
          role: m.role,
          content:
            m.role === 'assistant' ? JSON.stringify(m.spec) : (m.content ?? ''),
        }));
        const baseSpec =
          versions.find((v) => v.version === displayedVersion)?.spec ??
          (versions.length ? versions[versions.length - 1].spec : null);

        const result = await streamBuild(
          { prompt, history, baseSpec },
          {
            onObservation: (o) => setStreamObservations((prev) => [...prev, o]),
            onMessage: (full) => setStreamMessage(full),
          },
        );

        const nextVersion = (versions.at(-1)?.version ?? 0) + 1;
        const aiMsg = await insertAssistantMessage(supabase, {
          conversationId: convoId,
          userId,
          content: result.message,
          spec: result.spec,
          observations: result.observations,
          version: nextVersion,
          basedOnVersion: displayedVersion,
        });
        setMessages((prev) => [...prev, aiMsg]);
        setDisplayedVersion(nextVersion);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong.');
      } finally {
        setBuilding(false);
        setStreamObservations([]);
        setStreamMessage('');
      }
    },
    [supabase, activeId, messages, versions, displayedVersion, router],
  );

  const value: ChatContextValue = {
    conversations,
    conversationsLoading,
    activeId,
    messages,
    versions,
    displayedVersion,
    setDisplayedVersion,
    building,
    streamObservations,
    streamMessage,
    loading: building,
    error,
    newChat,
    send,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export type { ChatContextValue };
