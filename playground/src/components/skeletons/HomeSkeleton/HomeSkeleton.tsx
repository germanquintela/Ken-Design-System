import * as stylex from '@stylexjs/stylex';
import { Box, Card, Separator } from '@ken/react';
import { shell } from '@/components/AppWrapper/AppWrapper.styles';
import { Bar } from '../Bar';
import { SidebarSkeleton } from '../SidebarSkeleton';
import * as s from '../skeletons.styles';

function HomeCardSkeleton({
  title,
  desc,
}: {
  title: keyof typeof s.labelW;
  desc: keyof typeof s.labelW;
}) {
  return (
    <Card border="subtle">
      <Bar shape={[s.shape.bannerFill]} />
      <Card.Body>
        <Box direction="column" gap="space3" p="space4">
          <Box direction="column" gap="space1">
            <Bar shape={[s.shape.cardTitle, s.labelW[title]]} />
            <Bar shape={[s.shape.captionLine, s.labelW[desc]]} />
          </Box>
        </Box>
      </Card.Body>
    </Card>
  );
}

const HOME_CARDS: Array<{
  title: keyof typeof s.labelW;
  desc: keyof typeof s.labelW;
}> = [
  { title: 'w35', desc: 'w60' },
  { title: 'w40', desc: 'w85' },
  { title: 'w45', desc: 'w50' },
  { title: 'w40', desc: 'w65' },
];

/**
 * Full-shell fallback (`app/loading.tsx`). The root `/` is Home, and the post-login
 * hop lands here too — so this mirrors Home's bespoke layout (no breadcrumb): a
 * title + two lede paragraphs, the hero banner flush in a Card, a divider, then the
 * "Explore the components" heading over a 2-col grid of component cards. Re-uses the
 * real shell background + Ken Card so border/radius/shadow match the live shell.
 */
export function HomeSkeleton() {
  return (
    <div
      role="status"
      aria-busy
      aria-label="Loading"
      {...stylex.props(shell.base)}
    >
      <SidebarSkeleton />

      <Box flex="1" minWidth={0}>
        <Card border="subtle" width="full">
          <Box
            display="block"
            flex="1"
            overflowY="auto"
            hideScrollbar
            p="space4"
          >
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
                  <Bar shape={[s.shape.homeTitle]} />
                  <Bar shape={[s.shape.docDesc, s.labelW.w90]} />
                  <Bar shape={[s.shape.docDesc, s.labelW.w55]} />
                </Box>
                <Box direction="column" gap="space1">
                  <Bar shape={[s.shape.captionLine, s.labelW.w90]} />
                  <Bar shape={[s.shape.captionLine, s.labelW.w85]} />
                  <Bar shape={[s.shape.captionLine, s.labelW.w40]} />
                </Box>
                <Box direction="column" gap="space1">
                  <Bar shape={[s.shape.captionLine, s.labelW.w85]} />
                  <Bar shape={[s.shape.captionLine, s.labelW.w75]} />
                </Box>
              </Box>

              <Box width="full">
                <Card border="subtle">
                  <Bar shape={[s.shape.bannerFill]} />
                </Card>
              </Box>

              <Separator orientation="horizontal" tone="subtle" />

              <Box direction="column" gap="space4">
                <Box direction="column" gap="space1">
                  <Bar shape={[s.shape.subheading]} />
                  <Bar shape={[s.shape.captionLine, s.labelW.w75]} />
                </Box>

                <div {...stylex.props(s.layout.cardGrid)}>
                  {HOME_CARDS.map((c, i) => (
                    <HomeCardSkeleton
                      key={`${c.title}-${i}`}
                      title={c.title}
                      desc={c.desc}
                    />
                  ))}
                </div>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </div>
  );
}
