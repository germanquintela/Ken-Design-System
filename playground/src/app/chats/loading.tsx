import { ChatsSkeleton } from '@/components/skeletons/ChatsSkeleton';

// Chats fallback. `/chats` is a full-shell AppWrapper page (no persistent layout),
// so this draws the WHOLE shell — sidebar + titled card — but with a body that
// mirrors the conversation list (SearchInput over icon · title · date rows) instead
// of the root docs skeleton it would otherwise inherit.
export default function Loading() {
  return <ChatsSkeleton />;
}
