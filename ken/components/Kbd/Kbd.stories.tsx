import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Kbd, KbdGroup } from './Kbd';

const meta = {
  title: 'Atoms/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  args: { children: '⌘K', size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    children: { control: 'text' },
    as: { control: false },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}
  >
    {children}
  </div>
);

/** Drive every prop from the Controls panel. */
export const Playground: Story = {};

/** Density scale — the cap height + square min-width grow; the 12px text stays. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      <Kbd {...args} size="sm">
        ⌘K
      </Kbd>
      <Kbd {...args} size="md">
        ⌘K
      </Kbd>
    </Row>
  ),
};

/** Single keys — minWidth == height, so each reads as a square cap. */
export const SingleKeys: Story = {
  render: (args) => (
    <Row>
      <Kbd {...args}>K</Kbd>
      <Kbd {...args}>⌘</Kbd>
      <Kbd {...args}>⇧</Kbd>
      <Kbd {...args}>↵</Kbd>
      <Kbd {...args}>Esc</Kbd>
    </Row>
  ),
};

/** KbdGroup lays separate caps in a row — the shadcn-style shortcut. Drop plain
 *  text between caps for a "+" combinator. */
export const Group: Story = {
  render: (args) => (
    <Row>
      <KbdGroup>
        <Kbd {...args}>⌘</Kbd>
        <Kbd {...args}>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd {...args}>Ctrl</Kbd>+<Kbd {...args}>B</Kbd>
      </KbdGroup>
    </Row>
  ),
};

/** Inline beside copy — the cap centres against the surrounding text. */
export const InText: Story = {
  render: (args) => (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}
    >
      Press{' '}
      <Kbd {...args} size="sm">
        ⌘K
      </Kbd>{' '}
      to search
    </div>
  ),
};
