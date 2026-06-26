import type * as React from 'react';
import { Box, Separator, Text } from '@ken/react';

// One docs section: a leading hairline, an optional heading + prose, and the
// section body (examples, swatches, specimens…). Shared by component docs and
// foundations so every section is spaced and styled the same.
export function DocSection({
  title,
  description = [],
  children,
}: {
  title?: string;
  description?: string[];
  children?: React.ReactNode;
}) {
  return (
    <>
      <Separator orientation="horizontal" tone="subtle" />
      <Box direction="column" gap="space1">
        {title && (
          <Text as="h2" size="subheading" tone="primary">
            {title}
          </Text>
        )}
        {description.map((p, i) => (
          <Text key={i} as="p" size="caption" tone="secondary">
            {p}
          </Text>
        ))}
        {children && (
          <Box direction="column" width="full" gap="space4" mt="space4">
            {children}
          </Box>
        )}
      </Box>
    </>
  );
}
