import * as stylex from '@stylexjs/stylex';
import { Box, Text } from '@ken/react';
import {
  fontSize,
  lineHeight,
} from '@ken/react/theme/tokens/typography.stylex';
import { AppWrapper } from '@/components/AppWrapper';
import { DocLayout } from '@/components/docs/DocLayout';
import { DocSection } from '@/components/docs/DocSection';
import { styles } from './FoundationTypography.styles';

const TYPE_HERO: string | null = '/components/typography.webp';

// StyleX defineVars objects carry an internal `__varGroupHash__` string key
// alongside the real role keys — filter it out (anything `__`-prefixed) or it
// renders as a stray scale row. FoundationColors avoids this by filtering tokens
// to known prefixes; the type scale has none, so exclude the artifact explicitly.
const sizes = (Object.entries(fontSize) as [string, string][]).filter(
  ([key]) => !key.startsWith('__'),
);
const lhMap = lineHeight as unknown as Record<string, string>;

export function FoundationTypography() {
  return (
    <AppWrapper>
      <DocLayout
        title="Typography"
        description="The role-based type scale — each size pairs a fontSize with its designed line-height."
        hero={TYPE_HERO}
      >
        <DocSection title="Type scale">
          <Box direction="column" gap="space5">
            {sizes.map(([key, fsVar]) => {
              const lhVar = lhMap[key] ?? '1.4';
              return (
                <Box key={key} direction="column" gap="space1">
                  <Text size="caption" tone="secondary">
                    {key}
                  </Text>
                  <p {...stylex.props(styles.specimen(fsVar, lhVar))}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </Box>
              );
            })}
          </Box>
        </DocSection>
      </DocLayout>
    </AppWrapper>
  );
}
