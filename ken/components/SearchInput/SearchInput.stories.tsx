import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { SearchInput } from './SearchInput';

const meta = {
  title: 'Atoms/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  args: { size: 'md', placeholder: 'Search', loading: false, disabled: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    placeholder: { control: 'text' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const Col = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}
  >
    {children}
  </div>
);

/** Drive every prop from the Controls panel. Press ⌘K (⌃K on Win/Linux) to focus. */
export const Playground: Story = {};

/**
 * Idle, the field shows a leading magnifier and a trailing `⌘K` chip — a hint
 * that the shortcut jumps you here. The chip retires the moment you focus or type.
 */
export const Default: Story = {
  render: (args) => (
    <Col>
      <SearchInput {...args} aria-label="Search" />
    </Col>
  ),
};

/** Height + text scale with `size`; the pill and both slots track it. */
export const Sizes: Story = {
  render: (args) => (
    <Col>
      <SearchInput {...args} size="sm" aria-label="Small search" />
      <SearchInput {...args} size="md" aria-label="Medium search" />
      <SearchInput {...args} size="lg" aria-label="Large search" />
    </Col>
  ),
};

/** `loading` swaps the magnifier for a Spinner and hides the chip (the field is busy). */
export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <Col>
      <SearchInput {...args} aria-label="Search" />
    </Col>
  ),
};

/** Pre-filled: the chip is gone because there's already a query. */
export const WithValue: Story = {
  render: (args) => (
    <Col>
      <SearchInput {...args} defaultValue="Acme Corp" aria-label="Search" />
    </Col>
  ),
};

/** Disabled: inert fill, muted icon, no chip, and ⌘K won't focus it. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Col>
      <SearchInput {...args} aria-label="Search" />
    </Col>
  ),
};
