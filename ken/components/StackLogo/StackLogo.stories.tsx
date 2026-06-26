import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { StackLogo } from './StackLogo';

const meta = {
  title: 'Atoms/StackLogo',
  component: StackLogo,
  tags: ['autodocs'],
  args: { size: 'md', loading: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md'] },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof StackLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}
  >
    {children}
  </div>
);

/** Drive every prop from the Controls panel — flip `loading` to see the spin. */
export const Playground: Story = {};

/** The three box sizes — the mark hugs the box height, aspect preserved. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      <StackLogo {...args} size="xs" />
      <StackLogo {...args} size="sm" />
      <StackLogo {...args} size="md" />
    </Row>
  ),
};

/** The loading state — a 3D wobble: from the flat logo, the tilt blooms and sweeps
 *  one CLOCKWISE circle, settles back to flat, pauses, then repeats. Never flips; the
 *  centre stays pinned (it rests on the flat svg). */
export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <Row>
      <StackLogo {...args} size="xs" />
      <StackLogo {...args} size="sm" />
      <StackLogo {...args} size="md" />
    </Row>
  ),
};
