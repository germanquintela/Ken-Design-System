import { z } from 'zod';
import type { KenNode, Observation } from '@ken/ai';

// Mirrors @ken/ai's `Observation` shape; the engine is the source of truth and
// the inferred type is structurally identical.
export const ObservationSchema = z.object({
  title: z.string(),
  detail: z.string().optional(),
});

export const ChatMessageSchema = z.object({
  id: z.string(),
  conversation_id: z.string(),
  user_id: z.string(),
  role: z.enum(['user', 'assistant']),
  content: z.string().nullable(),
  // Typed passthrough — the sanitizer in @ken/ai owns spec safety; Zod does not walk it.
  spec: z.custom<KenNode>().nullable(),
  observations: ObservationSchema.array().nullable(),
  version: z.number().nullable(),
  based_on_version: z.number().nullable(),
  created_at: z.string(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// Input for inserting an assistant message row (camelCase at the call site;
// insertAssistantMessage maps it to the snake_case columns).
export interface AssistantMessageInput {
  conversationId: string;
  userId: string;
  content: string;
  spec: KenNode;
  observations: Observation[];
  version: number;
  basedOnVersion: number | null;
}
