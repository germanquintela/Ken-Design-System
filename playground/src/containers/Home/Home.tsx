import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import * as stylex from '@stylexjs/stylex';
import { Box, Card, LinkButton, Separator, Text } from '@ken/react';
import { AppWrapper } from '@/components/AppWrapper';
import { styles } from './Home.styles';
import Link from 'next/link';

const CARDS: {
  title: string;
  description: string;
  href: string;
  image: string;
}[] = [
  {
    title: 'Button',
    description: 'The primary action control',
    href: '/components/button',
    image: '/components/button.webp',
  },

  {
    title: 'Badge',
    description: 'A compact label for category, status, or metadata.',
    href: '/components/badge',
    image: '/components/badge.webp',
  },
  {
    title: 'Select',
    description: 'Pick one option from a list ',
    href: '/components/select',
    image: '/components/select.webp',
  },
  {
    title: 'Switch',
    description: 'An instant binary toggle for settings',
    href: '/components/switch',
    image: '/components/switch.webp',
  },
];

export function Home() {
  return (
    <AppWrapper>
      <Box
        direction="column"
        mx="auto"
        maxWidth="800px"
        pt="space6"
        gap="space8"
        pb="space12"
      >
        <Box direction="column" gap="space2" mt="space2">
          <Box direction="column" gap="space1">
            <Text as="h1" size="headingLg" tone="primary">
              Ken
            </Text>
            <Text as="p" size="body" tone="secondary">
              An LLM-safe design system — Ramp&rsquo;s UI, rebuilt so that both
              people and models ship it correctly.
            </Text>
          </Box>
          <Text as="p" size="caption" tone="secondary">
            Every token encodes a decision, not a value — components reach for
            roles like backgroundCard or accentDefault, never a raw hex. StyleX
            is the gatekeeper: the type system only accepts valid tokens, so an
            off-system value never compiles.
          </Text>
          <Text as="p" size="caption" tone="secondary">
            Around 35 components sit on Base UI for accessibility and StyleX for
            styling. The same system re-themes per brand — build Ramp once, then
            switch a single file for Span or Canals.
          </Text>
        </Box>

        <Box width="full">
          <Card>
            <Image
              src="/home-banner.webp"
              alt=""
              width={1918}
              height={917}
              sizes="100vw"
              priority
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </Card>
        </Box>

        <Separator orientation="horizontal" tone="subtle" />

        <Box direction="column" gap="space4">
          <Box direction="column" gap="space1">
            <Text as="h2" size="subheading" tone="primary">
              Explore the components
            </Text>
            <Text as="p" size="caption" tone="secondary">
              A few of the pieces you&rsquo;ll reach for first — open any one
              for live examples, props, and the reasoning behind it.
            </Text>
          </Box>

          <div {...stylex.props(styles.grid)}>
            {CARDS.map((card) => (
              <Link href={card.href} key={card.href}>
                <Card key={card.href}>
                  <Box overflow="hidden">
                    <Image
                      src={card.image}
                      alt=""
                      width={1918}
                      height={917}
                      sizes="(max-width: 640px) 100vw, 400px"
                      {...stylex.props(styles.media)}
                    />
                  </Box>
                  <Card.Body>
                    <Box direction="column" gap="space3" p="space4">
                      <Box direction="column" gap="space1">
                        <Text as="h3" size="subheading" tone="primary">
                          {card.title}
                        </Text>
                        <Text as="p" size="caption" tone="secondary">
                          {card.description}
                        </Text>
                      </Box>
                    </Box>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </div>
        </Box>
      </Box>
    </AppWrapper>
  );
}
