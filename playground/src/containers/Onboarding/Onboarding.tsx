'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Box, FormInput, Button, Text } from '@ken/react';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { startAnonymousSession } from '@/services/session';
import { AuthWrapper } from '@/components/auth/AuthWrapper';

export function Onboarding() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await startAnonymousSession(getBrowserSupabase(), { name, company });
      router.push('/');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
      setBusy(false);
    }
  }

  return (
    <AuthWrapper title="Let's get started">
      <Box as="form" direction="column" gap="space10" {...{ onSubmit }}>
        <Box direction="column" gap="space4">
          <FormInput
            label="Your name"
            required
            value={name}
            {...{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value),
            }}
          />
          <FormInput
            label="Where you work"
            required
            value={company}
            {...{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setCompany(e.target.value),
            }}
          />
        </Box>
        {error && (
          <Text size="footnote" tone="danger" transform="firstLetter">
            {error}
          </Text>
        )}
        <Button type="submit" size="lg" loading={busy}>
          Continue
        </Button>
      </Box>
    </AuthWrapper>
  );
}
