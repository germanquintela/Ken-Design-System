import type * as React from 'react';
import Image from 'next/image';
import { Box, Text, Logo, Separator } from '@ken/react';
import { BLUR_PLACEHOLDER } from '@/lib/blurPlaceholder';

/**
 * Shared chrome for the auth screens (login / register): the two-column
 * layout, the Ramp wordmark, a screen title, and the hero image. Each page
 * supplies its own `<form>` as children — only the title and the form differ.
 */
export function AuthWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      direction={{ base: 'column', md: 'row' }}
      minHeight="screen"
      width="full"
    >
      {/* Left column — form. Stacks on top on mobile, fills the left half ≥768px. */}
      <Box
        flex="1"
        justify="center"
        align="center"
        p="space24"
        maxWidth="space160"
      >
        <Box direction="column" gap="space10" width="full">
          <Box direction="column" gap="space6">
            <Logo size="sm" type="wordmark" />
            <Text size="displaySm">{title}</Text>
          </Box>
          <Separator orientation="horizontal" />
          {children}
        </Box>
      </Box>

      {/* Right column — big image. Hidden on mobile, shown ≥768px. */}
      <Box
        display={{ base: 'none', md: 'flex' }}
        flex="1"
        position="relative"
        overflow="hidden"
      >
        <Image
          src="/login-hero.webp"
          alt=""
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          style={{ objectFit: 'cover', objectPosition: 'bottom right' }}
        />
      </Box>
    </Box>
  );
}
