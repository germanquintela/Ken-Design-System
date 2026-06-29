'use client';

import * as React from 'react';
import { Box, Avatar, Skeleton, Text } from '@ken/react';
import { getBrowserSupabase } from '@/lib/supabase/client';

/**
 * SidebarUser — the aside footer: the visitor's avatar + name/company. App-level
 * (reads the Supabase session), self-contained: it fetches its own user on mount
 * rather than threading identity through AppWrapper, which stays a generic title
 * + children shell.
 */
export function SidebarUser() {
  const [name, setName] = React.useState<string | null>(null);
  const [company, setCompany] = React.useState<string | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    getBrowserSupabase()
      .auth.getUser()
      .then(({ data }) => {
        if (!active) return;
        const meta = data.user?.user_metadata as
          | { name?: string; company?: string }
          | undefined;
        setName(meta?.name ?? '');
        setCompany(meta?.company ?? '');
        setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <Box align="center" gap="space2" width="full" minWidth={0}>
      {!loaded ? (
        <Skeleton variant="circle" size="md" />
      ) : (
        <Avatar name={name || '?'} size="md" />
      )}
      <Box direction="column" flex="1" minWidth={0}>
        {!loaded ? (
          <Skeleton variant="text" lines={2} />
        ) : (
          <>
            <Text size="footnote" truncate>
              {name ?? ''}
            </Text>
            {company ? (
              <Text size="footnote" tone="secondary" truncate>
                {company}
              </Text>
            ) : null}
          </>
        )}
      </Box>
    </Box>
  );
}
