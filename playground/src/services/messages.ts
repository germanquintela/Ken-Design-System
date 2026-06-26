import type { SupabaseClient } from '@supabase/supabase-js';
import {
  type AssistantMessageInput,
  ChatMessageSchema,
  type ChatMessage,
} from '@/schemas/message';

export async function loadMessages(
  supabase: SupabaseClient,
  conversationId: string,
): Promise<ChatMessage[]> {
  const { data } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });
  return ChatMessageSchema.array().parse(data ?? []);
}

export async function insertUserMessage(
  supabase: SupabaseClient,
  conversationId: string,
  userId: string,
  content: string,
): Promise<ChatMessage> {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      user_id: userId,
      role: 'user',
      content,
    })
    .select('*')
    .single();
  if (error || !data) throw new Error('Could not save message.');
  return ChatMessageSchema.parse(data);
}

export async function insertAssistantMessage(
  supabase: SupabaseClient,
  input: AssistantMessageInput,
): Promise<ChatMessage> {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: input.conversationId,
      user_id: input.userId,
      role: 'assistant',
      content: input.content,
      spec: input.spec,
      observations: input.observations,
      version: input.version,
      based_on_version: input.basedOnVersion,
    })
    .select('*')
    .single();
  if (error || !data) throw new Error('Could not save message.');
  return ChatMessageSchema.parse(data);
}
