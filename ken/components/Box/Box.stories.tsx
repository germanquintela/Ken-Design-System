import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';
import { Box } from './Box';

const SPACES = [
  'space0',
  'space1',
  'space2',
  'space3',
  'space4',
  'space5',
  'space6',
  'space8',
  'space10',
  'space12',
  'space16',
  'space20',
] as const;

const meta = {
  title: 'Primitives/Box',
  component: Box,
  tags: ['autodocs'],
  args: {
    display: 'flex',
    direction: 'row',
    align: 'center',
    gap: 'space4',
    p: 'space4',
  },
  argTypes: {
    as: { control: false },
    display: {
      control: 'select',
      options: [
        'block',
        'flex',
        'inline-flex',
        'inline',
        'grid',
        'inline-grid',
        'none',
      ],
    },
    direction: {
      control: 'inline-radio',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: {
      control: 'inline-radio',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    gap: { control: 'select', options: SPACES },
    p: { control: 'select', options: SPACES },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Box is layout-only — it has no visual surface (that's `Card`). So the stories
 * use plain inline-styled scaffolding to make the layout visible: `Chip` is the
 * content being arranged, `Frame` shows the container's bounds (so padding and
 * justification read clearly). Box itself only does the alignment.
 */
const Chip = ({
  children = 'Box',
  style,
}: {
  children?: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      background: '#0c0a08',
      color: '#fff',
      borderRadius: 6,
      padding: '6px 12px',
      fontSize: 14,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </div>
);

const Frame = ({
  children,
  style,
}: {
  children?: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      border: '1px dashed #c9c4ba',
      borderRadius: 12,
      display: 'inline-flex',
      ...style,
    }}
  >
    {children}
  </div>
);

/** Drive the container from the Controls panel. The dashed Frame shows its edges. */
export const Playground: Story = {
  render: (args) => (
    <Frame style={{ display: 'block', width: 420 }}>
      <Box {...args} width="full">
        <Chip>One</Chip>
        <Chip>Two</Chip>
        <Chip>Three</Chip>
      </Box>
    </Frame>
  ),
};

/** `direction` flips the main axis; `gap` is a spacing token. */
export const Direction: Story = {
  render: () => (
    <Box direction="row" gap="space8" align="start">
      <Frame>
        <Box direction="row" gap="space3" p="space4">
          <Chip>row</Chip>
          <Chip>of</Chip>
          <Chip>chips</Chip>
        </Box>
      </Frame>
      <Frame>
        <Box direction="column" gap="space3" p="space4" align="start">
          <Chip>column</Chip>
          <Chip>of</Chip>
          <Chip>chips</Chip>
        </Box>
      </Frame>
    </Box>
  ),
};

/** `justify` distributes along the main axis (Box is `width="full"` inside each Frame). */
export const Justify: Story = {
  render: () => (
    <Box direction="column" gap="space3">
      {(['start', 'center', 'end', 'between', 'around', 'evenly'] as const).map(
        (j) => (
          <Frame key={j} style={{ display: 'block', width: 360 }}>
            <Box justify={j} gap="space2" p="space2" width="full">
              <Chip>{j}</Chip>
              <Chip>·</Chip>
              <Chip>·</Chip>
            </Box>
          </Frame>
        ),
      )}
    </Box>
  ),
};

/** `align` on the cross axis — chips of different heights in a row. */
export const Align: Story = {
  render: () => (
    <Box direction="row" gap="space6" align="start">
      {(['start', 'center', 'end', 'stretch'] as const).map((a) => (
        <Box key={a} direction="column" gap="space2" align="start">
          <Chip style={{ background: 'none', color: '#0c0a08', padding: 0 }}>
            {a}
          </Chip>
          <Frame style={{ height: 96 }}>
            <Box
              direction="row"
              align={a}
              gap="space2"
              p="space2"
              height="full"
            >
              <Chip>A</Chip>
              <Chip style={{ paddingTop: 18, paddingBottom: 18 }}>B</Chip>
            </Box>
          </Frame>
        </Box>
      ))}
    </Box>
  ),
};

/** The padding scale (`p`) — the band between Frame and chip is the padding. */
export const Padding: Story = {
  render: () => (
    <Box direction="row" wrap="wrap" gap="space4" align="start">
      {(['space2', 'space4', 'space6', 'space8'] as const).map((p) => (
        <Box key={p} direction="column" gap="space2" align="start">
          <Chip style={{ background: 'none', color: '#0c0a08', padding: 0 }}>
            {p}
          </Chip>
          <Frame>
            <Box p={p}>
              <Chip>p</Chip>
            </Box>
          </Frame>
        </Box>
      ))}
    </Box>
  ),
};

/**
 * Sizing has three layers: keywords (`full`/`fit`), the token scale (now up to
 * `space240` = 960px for containers), and an escape hatch — a raw number (→ px)
 * or any CSS string (`"60%"`). Spacing axes stay token-only; only sizing opens up.
 */
export const Sizing: Story = {
  render: () => (
    <Box direction="column" gap="space3" width="full">
      <Frame style={{ display: 'block', width: 420 }}>
        <Box width="full" p="space2">
          <Chip style={{ width: '100%', textAlign: 'center' }}>
            width=&quot;full&quot;
          </Chip>
        </Box>
      </Frame>
      <Frame style={{ display: 'block', width: 420 }}>
        <Box width="fit" p="space2">
          <Chip>width=&quot;fit&quot;</Chip>
        </Box>
      </Frame>
      <Frame style={{ display: 'block', width: 420 }}>
        <Box width="space96" p="space2">
          <Chip style={{ width: '100%', textAlign: 'center' }}>
            width=&quot;space96&quot; → 384px
          </Chip>
        </Box>
      </Frame>
      <Frame style={{ display: 'block', width: 420 }}>
        <Box width={240} p="space2">
          <Chip style={{ width: '100%', textAlign: 'center' }}>
            width={'{240}'} → 240px
          </Chip>
        </Box>
      </Frame>
      <Frame style={{ display: 'block', width: 420 }}>
        <Box width="50%" p="space2">
          <Chip style={{ width: '100%', textAlign: 'center' }}>
            width=&quot;50%&quot;
          </Chip>
        </Box>
      </Frame>
    </Box>
  ),
};

/**
 * Responsive props take a `{ base, md }` pair instead of a scalar: `base`
 * applies everywhere (mobile-first), `md` overrides at ≥768px. Here the row
 * stacks into a column below 768px, the gap tightens, and the third chip is
 * hidden on mobile. **Resize the preview / viewport** to see it flip.
 */
export const Responsive: Story = {
  render: () => (
    <Frame style={{ display: 'block', width: '100%' }}>
      <Box
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 'space2', md: 'space6' }}
        p="space4"
        width="full"
        align="stretch"
      >
        <Chip style={{ textAlign: 'center' }}>base: column · md: row</Chip>
        <Chip style={{ textAlign: 'center' }}>resize me</Chip>
        <Box display={{ base: 'none', md: 'flex' }}>
          <Chip style={{ textAlign: 'center' }}>hidden &lt; 768px</Chip>
        </Box>
      </Box>
    </Frame>
  ),
};

/** `as` renders any tag/component while keeping the typed token layout API. */
export const Polymorphism: Story = {
  render: () => (
    <Box direction="column" gap="space4" align="start">
      <Frame>
        <Box as="section" p="space4" gap="space2">
          <Chip>as=&quot;section&quot;</Chip>
        </Box>
      </Frame>
      <Frame>
        <Box as="ul" direction="column" gap="space2" p="space4" align="start">
          <Box as="li">
            <Chip>as=&quot;li&quot; · one</Chip>
          </Box>
          <Box as="li">
            <Chip>as=&quot;li&quot; · two</Chip>
          </Box>
        </Box>
      </Frame>
    </Box>
  ),
};

/** Positioning — an absolutely-placed child pinned to a relative parent. */
export const Position: Story = {
  render: () => (
    <Frame>
      <Box position="relative" width="space20" height="space20" p="space2">
        <Chip>relative</Chip>
        <Box position="absolute" top="space1" right="space1">
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#0c0a08',
            }}
          />
        </Box>
      </Box>
    </Frame>
  ),
};
