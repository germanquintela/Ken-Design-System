import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Onboarding: create an anonymous Supabase user and stamp the visitor's name +
 * company onto its `user_metadata`. The anonymous user has a real `auth.uid()`,
 * so RLS, conversation/message inserts, and the build route's auth check all
 * work unchanged — no email/password, no friction.
 */
export async function startAnonymousSession(
  supabase: SupabaseClient,
  profile: { name: string; company: string },
): Promise<void> {
  const { error: signInError } = await supabase.auth.signInAnonymously();
  if (signInError) throw new Error(signInError.message);

  const { error: updateError } = await supabase.auth.updateUser({
    data: profile,
  });
  if (updateError) throw new Error(updateError.message);
}
