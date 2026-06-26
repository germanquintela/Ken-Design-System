import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: { variant: 'text', lines: 3, size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['text', 'circle', 'rect'] },
    lines: { control: { type: 'number', min: 1, max: 8 } },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    as: { control: false },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

const Frame = ({
  width = 320,
  children,
}: {
  width?: number;
  children: ReactNode;
}) => <div style={{ width }}>{children}</div>;

const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    {children}
  </div>
);

/** Drive every prop from the Controls panel. `rect` fills this 320-wide frame. */
export const Playground: Story = {
  render: (args) => (
    <Frame>
      <Skeleton {...args} />
    </Frame>
  ),
};

/** A single bar, then a multi-line paragraph — the last bar is shortened to ~60%
 *  so the block reads like real copy. */
export const Text: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Skeleton variant="text" />
        <Skeleton variant="text" lines={4} />
      </div>
    </Frame>
  ),
};

/** Three diameters, matching Avatar's `sm`/`md`/`lg` scale. */
export const Circle: Story = {
  render: () => (
    <Row>
      <Skeleton variant="circle" size="sm" />
      <Skeleton variant="circle" size="md" />
      <Skeleton variant="circle" size="lg" />
    </Row>
  ),
};

/** A block placeholder — `rect` fills whatever you size around it (here a 320×180
 *  image slot). Pair with a Box in real layouts. */
export const Rect: Story = {
  render: () => (
    <div style={{ width: 320, height: 180 }}>
      <Skeleton variant="rect" />
    </div>
  ),
};

/** Composed — a circle + two text lines stand in for a loading list row (avatar,
 *  name, subtitle). This is the everyday usage. */
export const LoadingRow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: 320 }}>
      <Skeleton variant="circle" size="lg" />
      <div
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <Skeleton variant="text" />
        <div style={{ width: '50%' }}>
          <Skeleton variant="text" />
        </div>
      </div>
    </div>
  ),
};
