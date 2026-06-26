import type { SupabaseClient } from '@supabase/supabase-js';
import { ConversationSchema, type Conversation } from '@/schemas/conversation';

export async function listConversations(
  supabase: SupabaseClient,
): Promise<Conversation[]> {
  const { data } = await supabase
    .from('conversations')
    .select('id,title,created_at')
    .order('created_at', { ascending: false });
  return ConversationSchema.array().parse(data ?? []);
}

export async function createConversation(
  supabase: SupabaseClient,
  userId: string,
  title: string,
): Promise<Conversation> {
  const { data, error } = await supabase
    .from('conversations')
    .insert({ user_id: userId, title })
    .select('id,title,created_at')
    .single();
  if (error || !data) throw new Error('Could not start a chat.');
  return ConversationSchema.parse(data);
}
