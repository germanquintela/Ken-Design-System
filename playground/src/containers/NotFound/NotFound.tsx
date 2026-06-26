import { Box, LinkButton, Text } from '@ken/react';
import { styles } from './NotFound.styles';

export function NotFound() {
  return (
    <Box
      direction="column"
      align="center"
      justify="center"
      gap="space8"
      minHeight="screen"
      width="full"
      p="space6"
      style={styles.page}
    >
      <Box direction="column" align="center" gap="space2">
        <Text as="h1" size="displayLg" tone="primary">
          404
        </Text>
        <Text as="p" size="body" tone="secondary">
          We couldn&rsquo;t find the page you&rsquo;re looking for.
        </Text>
      </Box>
      <LinkButton href="/" size="lg">
        Back to home
      </LinkButton>
    </Box>
  );
}
