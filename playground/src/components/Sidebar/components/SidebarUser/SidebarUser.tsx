'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Avatar, Skeleton, Text, IconButton } from '@ken/react';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { LogOut } from 'lucide-react';

/**
 * SidebarUser — the aside footer: the signed-in user's avatar + email and a
 * logout button. App-level (it reads the Supabase session and signs out), self-
 * contained: it fetches its own user on mount rather than threading email through
 * AppWrapper, which stays a generic title + children shell.
 */
export function SidebarUser() {
  const router = useRouter();
  const [email, setEmail] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    getBrowserSupabase()
      .auth.getUser()
      .then(({ data }) => {
        if (active) setEmail(data.user?.email ?? null);
      });
    return () => {
      active = false;
    };
  }, []);

  async function onLogout() {
    setBusy(true);
    try {
      await getBrowserSupabase().auth.signOut();
      router.push('/login');
      router.refresh(); // drop server-rendered, now-stale authed content
    } finally {
      setBusy(false);
    }
  }

  return (
    <Box direction="row" justify="between" gap="space3">
      <Box align="center" gap="space2" minWidth={0}>
        {email === null ? (
          <Skeleton variant="circle" size="md" />
        ) : (
          <Avatar name={email} size="md" />
        )}
        <Box minWidth={0}>
          <Text size="footnote" tone="secondary" truncate>
            {email ?? ''}
          </Text>
        </Box>
      </Box>
      <IconButton
        variant="ghost"
        size="sm"
        aria-label="Log out"
        disabled={busy}
        {...{ onClick: onLogout }}
      >
        <LogOut size={16} />
      </IconButton>
    </Box>
  );
}
