import { z } from 'zod';

export const ConversationSchema = z.object({
  id: z.string(),
  title: z.string(),
  created_at: z.string(),
});

export type Conversation = z.infer<typeof ConversationSchema>;
