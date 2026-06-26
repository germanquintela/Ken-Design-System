import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Check, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { iconSize } from '../../theme/foundations/iconSize';
import { IconButton } from './IconButton';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Add',
    children: <Plus size={iconSize.md} />,
    variant: 'default',
    size: 'md',
    shape: 'square',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'subtle',
        'secondary',
        'ghost',
        'success',
        'warning',
        'danger',
      ],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    shape: { control: 'inline-radio', options: ['square', 'circle'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    children: { control: false },
  },
} satisfies Meta<typeof IconButton>;

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

/** Same 7 colours as Button — just icon-only. */
export const AllVariants: Story = {
  render: (args) => (
    <Row>
      <IconButton {...args} variant="default" aria-label="Add" />
      <IconButton {...args} variant="subtle" aria-label="Add" />
      <IconButton {...args} variant="secondary" aria-label="Add" />
      <IconButton
        {...args}
        variant="ghost"
        aria-label="More"
        children={<MoreHorizontal size={iconSize[args.size ?? 'md']} />}
      />
      <IconButton
        {...args}
        variant="success"
        aria-label="Confirm"
        children={<Check size={iconSize[args.size ?? 'md']} />}
      />
      <IconButton
        {...args}
        variant="danger"
        aria-label="Delete"
        children={<Trash2 size={iconSize[args.size ?? 'md']} />}
      />
    </Row>
  ),
};

/** Square (family radius) vs circle (fully round). */
export const Shapes: Story = {
  render: (args) => (
    <Row>
      <IconButton {...args} shape="square" aria-label="Add" />
      <IconButton {...args} shape="circle" aria-label="Add" />
    </Row>
  ),
};

/** The 4px-grid size scale — the icon tracks the control size. */
export const AllSizes: Story = {
  render: (args) => (
    <Row>
      <IconButton
        {...args}
        size="sm"
        aria-label="Add"
        children={<Plus size={iconSize.sm} />}
      />
      <IconButton
        {...args}
        size="md"
        aria-label="Add"
        children={<Plus size={iconSize.md} />}
      />
      <IconButton
        {...args}
        size="lg"
        aria-label="Add"
        children={<Plus size={iconSize.lg} />}
      />
    </Row>
  ),
};

/** Disabled — inert fill, no hover. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Row>
      <IconButton {...args} variant="default" aria-label="Add" />
      <IconButton {...args} variant="secondary" aria-label="Add" />
      <IconButton
        {...args}
        variant="danger"
        aria-label="Delete"
        children={<Trash2 size={iconSize[args.size ?? 'md']} />}
      />
    </Row>
  ),
};

/** Loading — spinner replaces the icon, control inert but keeps its live colour. */
export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <Row>
      <IconButton {...args} variant="default" aria-label="Add" />
      <IconButton {...args} variant="secondary" aria-label="Add" />
      <IconButton
        {...args}
        shape="circle"
        variant="default"
        aria-label="Send"
      />
    </Row>
  ),
};
