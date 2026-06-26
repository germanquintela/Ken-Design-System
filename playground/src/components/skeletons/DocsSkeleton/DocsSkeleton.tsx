import * as stylex from '@stylexjs/stylex';
import { Box, Card, Separator } from '@ken/react';
import { shell } from '@/components/AppWrapper/AppWrapper.styles';
import { Bar } from '../Bar';
import { SidebarSkeleton } from '../SidebarSkeleton';
import * as s from '../skeletons.styles';

function DocSectionSkeleton({ w }: { w: keyof typeof s.labelW }) {
  return (
    <>
      <Separator orientation="horizontal" tone="subtle" />
      <Box direction="column" gap="space1">
        <Bar shape={[s.shape.subheading]} />
        <Bar shape={[s.shape.docDesc, s.labelW[w]]} />
        <Box mt="space4" width="full">
          <Card border="subtle">
            <Box p="space8" align="center" justify="center" width="full">
              <Bar shape={[s.shape.exampleChip]} />
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
}

/**
 * Docs-page fallback (`app/components/loading.tsx` + `app/foundations/loading.tsx`).
 * Re-uses the real shell background + the real Ken Card so its border/radius/shadow
 * match the live AppWrapper exactly, and mirrors the shared DocLayout body
 * (breadcrumb → title → hero → sections) — the shape of every component and
 * foundation doc. (Home no longer uses DocLayout, so it gets its own `HomeSkeleton`.)
 */
export function DocsSkeleton() {
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
            >
              <Box align="center" gap="space2">
                <Bar shape={[s.shape.crumbHome]} />
                <Bar shape={[s.shape.crumbSep]} />
                <Bar shape={[s.shape.crumbCurrent]} />
              </Box>

              <Box direction="column" gap="space2" mt="space2">
                <Box direction="column" gap="space2" mb="space2">
                  <Bar shape={[s.shape.docTitle]} />
                  <Bar shape={[s.shape.docDesc, s.labelW.w70]} />
                </Box>
              </Box>

              <Box width="full">
                <Card border="subtle">
                  <Bar shape={[s.shape.heroFill]} />
                </Card>
              </Box>

              <DocSectionSkeleton w="w65" />
              <DocSectionSkeleton w="w50" />
            </Box>
          </Box>
        </Card>
      </Box>
    </div>
  );
}
