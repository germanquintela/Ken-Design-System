import { Box, Separator } from '@ken/react';
import { Bar } from '../Bar';
import * as s from '../skeletons.styles';

/**
 * Auth fallback (`app/(auth)/loading.tsx`). The (auth) group would otherwise
 * inherit the root full-shell skeleton — wrong, since login/register use the
 * two-column AuthWrapper, not the app shell. This mirrors AuthWrapper's left
 * column (wordmark + title + divider + form) so a logout → /login hop stays calm.
 */
export function AuthSkeleton() {
  return (
    <Box
      role="status"
      aria-busy
      aria-label="Loading"
      direction={{ base: 'column', md: 'row' }}
      minHeight="screen"
      width="full"
    >
      <Box
        flex="1"
        justify="center"
        align="center"
        p="space24"
        maxWidth="space160"
      >
        <Box direction="column" gap="space10" width="full">
          <Box direction="column" gap="space6">
            <Bar shape={[s.shape.wordmark]} />
            <Bar shape={[s.shape.authTitle]} />
          </Box>
          <Separator orientation="horizontal" tone="subtle" />
          <Box direction="column" gap="space4">
            <Bar shape={[s.shape.field]} />
            <Bar shape={[s.shape.field]} />
            <Bar shape={[s.shape.button]} />
          </Box>
        </Box>
      </Box>

      {/* Hero column — hidden on mobile, a single surface placeholder ≥768px. */}
      <Box display={{ base: 'none', md: 'flex' }} flex="1" minHeight={0}>
        <Bar shape={[s.shape.fillParent]} />
      </Box>
    </Box>
  );
}
