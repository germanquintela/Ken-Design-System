'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Box, FormInput, Button, Text, LinkButton } from '@ken/react';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { AuthWrapper } from '@/components/auth/AuthWrapper';

export function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const { error } = await getBrowserSupabase().auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        setBusy(false);
        return;
      }
      router.push('/');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
      setBusy(false);
    }
  }

  return (
    <AuthWrapper title="Welcome back!">
      <Box as="form" direction="column" gap="space10" {...{ onSubmit }}>
        <Box direction="column" gap="space4">
          <FormInput
            label="Email"
            type="email"
            value={email}
            {...{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value),
            }}
          />
          <FormInput
            label="Password"
            type="password"
            value={password}
            {...{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value),
            }}
          />
        </Box>
        {error && (
          <Text size="footnote" tone="danger" transform="firstLetter">
            {error}
          </Text>
        )}
        <Box direction="column" gap="space2">
          <Button type="submit" size="lg" loading={busy}>
            Sign in
          </Button>
          <LinkButton href="/register" variant="ghost" size="lg">
            Create an account
          </LinkButton>
        </Box>
      </Box>
    </AuthWrapper>
  );
}
