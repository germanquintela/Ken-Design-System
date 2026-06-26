import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Button } from '../Button';
import { Showcase } from './Showcase';

const meta = {
  title: 'Components/Showcase',
  component: Showcase,
  tags: ['autodocs'],
  args: { language: 'tsx', defaultOpen: false, children: null },
  argTypes: { defaultOpen: { control: 'boolean' } },
} satisfies Meta<typeof Showcase>;

export default meta;
type Story = StoryObj<typeof meta>;

const Wrap = ({ children }: { children: ReactNode }) => (
  <div style={{ width: 460 }}>{children}</div>
);

/** The canonical docs box: centered live preview + reveal-code footer. */
export const Playground: Story = {
  args: { code: `<Button variant="default">Click me</Button>` },
  render: (args) => (
    <Wrap>
      <Showcase {...args}>
        <Button variant="default">Click me</Button>
      </Showcase>
    </Wrap>
  ),
};
