import * as stylex from '@stylexjs/stylex';
import { Box, Text } from '@ken/react';
import { color } from '@ken/react/theme/tokens/color.stylex';
import { AppWrapper } from '@/components/AppWrapper';
import { DocLayout } from '@/components/docs/DocLayout';
import { DocImage } from '@/components/docs/DocImage';
import { DocSection } from '@/components/docs/DocSection';
import { styles } from './FoundationColors.styles';

const COLORS_HERO: string | null = '/components/colors.webp';
const PALETTE_IMAGE: string | null = null;

const GROUPS: { title: string; match: (k: string) => boolean }[] = [
  { title: 'Surfaces & fills', match: (k) => k.startsWith('background') },
  { title: 'Text', match: (k) => k.startsWith('text') },
  { title: 'Borders', match: (k) => k.startsWith('border') },
  { title: 'Accent', match: (k) => k.startsWith('accent') },
  { title: 'Status', match: (k) => /^(success|danger|warning|info)/.test(k) },
];

export function FoundationColors() {
  const tokens = Object.entries(color) as [string, string][];
  return (
    <AppWrapper>
      <DocLayout
        title="Colors"
        description="Semantic color roles — every component reads these, never a raw hex."
        hero={COLORS_HERO}
      >
        {PALETTE_IMAGE && (
          <DocSection
            title="Palette"
            description={['The raw palette behind the semantic roles.']}
          >
            <DocImage src={PALETTE_IMAGE} alt="Ken color palette" />
          </DocSection>
        )}

        {GROUPS.map((g) => {
          const items = tokens.filter(([k]) => g.match(k));
          if (!items.length) return null;
          return (
            <DocSection key={g.title} title={g.title}>
              <div {...stylex.props(styles.grid)}>
                {items.map(([name, value]) => (
                  <Box key={name} direction="column" gap="space1">
                    <div {...stylex.props(styles.swatch(value))} />
                    <Text size="caption" tone="secondary">
                      {name}
                    </Text>
                  </Box>
                ))}
              </div>
            </DocSection>
          );
        })}
      </DocLayout>
    </AppWrapper>
  );
}
