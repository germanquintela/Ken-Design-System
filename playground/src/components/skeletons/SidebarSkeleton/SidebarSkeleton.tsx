import { Box, Separator } from '@ken/react';
import { layout } from '@ken/react/theme/tokens/space.stylex';
import { Bar } from '../Bar';
import * as s from '../skeletons.styles';

function NavRow({ w }: { w: keyof typeof s.labelW }) {
  return (
    <Box align="center" gap="space2" px="space3" py="space2">
      <Bar shape={[s.shape.icon]} />
      <Bar shape={[s.shape.label, s.labelW[w]]} />
    </Box>
  );
}

function SearchRow() {
  return (
    <Box align="center" gap="space2" px="space3" py="space2">
      <Bar shape={[s.shape.icon]} />
      <Box grow minWidth={0}>
        <Bar shape={[s.shape.label, s.labelW.w50]} />
      </Box>
      <Bar shape={[s.shape.kbdCap]} />
    </Box>
  );
}

function GroupTitle() {
  return (
    <Box px="space3" py="space1">
      <Bar shape={[s.shape.groupTitle]} />
    </Box>
  );
}

export function SidebarSkeleton() {
  return (
    <Box
      as="aside"
      direction="column"
      flex="none"
      width={layout.sidebarWidth}
      py="space2"
      height="full"
    >
      <Box direction="column" gap="space4">
        <Box align="center" minHeight="space8" pl="space4">
          <Bar shape={[s.shape.logo]} />
        </Box>
        <Bar shape={[s.shape.cta]} />
        <Separator tone="subtle" />
      </Box>

      {/* Scrolling middle — flex:1 so the row count never shifts the pinned footer
          below; clips on overflow like the real rail (which scrolls here). */}
      <Box
        direction="column"
        gap="space4"
        flex="1"
        minHeight={0}
        py="space4"
        overflowY="hidden"
      >
        <Box direction="column" gap="space1">
          <SearchRow />
          <NavRow w="w40" />
        </Box>

        <Box direction="column" gap="space1">
          <GroupTitle />
          <NavRow w="w70" />
          <NavRow w="w55" />
        </Box>

        <Separator orientation="horizontal" tone="subtle" />

        <Box direction="column" gap="space1">
          <GroupTitle />
          <NavRow w="w50" />
          <NavRow w="w75" />
        </Box>

        <Separator orientation="horizontal" tone="subtle" />

        <Box direction="column" gap="space1">
          <GroupTitle />
          <NavRow w="w60" />
          <NavRow w="w45" />
          <NavRow w="w80" />
          <NavRow w="w55" />
          <NavRow w="w65" />
          <NavRow w="w50" />
          <NavRow w="w70" />
        </Box>
      </Box>

      <Box direction="column" gap="space4">
        <Separator tone="subtle" />
        <Box direction="row" justify="between" align="center" gap="space3">
          <Box align="center" gap="space2" minWidth={0}>
            <Bar shape={[s.shape.avatar]} />
            <Bar shape={[s.shape.email]} />
          </Box>
          <Bar shape={[s.shape.icon]} />
        </Box>
      </Box>
    </Box>
  );
}
