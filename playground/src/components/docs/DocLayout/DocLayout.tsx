import type * as React from 'react';
import { Box, Breadcrumb, Text } from '@ken/react';
import { DocImage } from '../DocImage';

// The shared shell for every docs page (component docs + foundations), so they
// read identically: breadcrumb → title + description + lede → optional hero
// image → the page's sections (passed as children, each a <DocSection>).
export function DocLayout({
  title,
  description,
  lede = [],
  hero,
  children,
}: {
  title: string;
  description: string;
  /** Extra intro paragraphs under the description. */
  lede?: string[];
  /** Optional hero image (public path). Renders only when provided. */
  hero?: string | null;
  children: React.ReactNode;
}) {
  return (
    <Box
      direction="column"
      mx="auto"
      maxWidth="800px"
      pt="space6"
      gap="space8"
      pb="space12"
    >
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item current>{title}</Breadcrumb.Item>
      </Breadcrumb>

      <Box direction="column" gap="space2" mt="space2">
        <Box direction="column" gap="space1" mb="space2">
          <Text as="h1" size="headingLg" tone="primary">
            {title}
          </Text>
          <Text as="p" size="body" tone="secondary">
            {description}
          </Text>
        </Box>
        {lede.map((p, i) => (
          <Text key={i} as="p" size="caption" tone="secondary">
            {p}
          </Text>
        ))}
      </Box>

      {hero && <DocImage src={hero} />}

      {children}
    </Box>
  );
}
