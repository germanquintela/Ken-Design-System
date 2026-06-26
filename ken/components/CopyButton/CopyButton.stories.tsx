import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { CopyButton } from './CopyButton';

const meta = {
  title: 'Atoms/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  args: {
    value: 'npm install @ken/react',
    variant: 'secondary',
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
    value: { control: 'text' },
  },
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}
  >
    {children}
  </div>
);

/** Click it: the copy glyph swaps to a green check, then reverts after 3s. */
export const Playground: Story = {};

/** The same 7 colours as Button / IconButton. */
export const AllVariants: Story = {
  render: (args) => (
    <Row>
      <CopyButton {...args} variant="default" />
      <CopyButton {...args} variant="subtle" />
      <CopyButton {...args} variant="secondary" />
      <CopyButton {...args} variant="ghost" />
      <CopyButton {...args} variant="success" />
      <CopyButton {...args} variant="danger" />
    </Row>
  ),
};

/** The 4px-grid size scale — the glyph tracks the control size. */
export const AllSizes: Story = {
  render: (args) => (
    <Row>
      <CopyButton {...args} size="sm" />
      <CopyButton {...args} size="md" />
      <CopyButton {...args} size="lg" />
    </Row>
  ),
};

/** Square (family radius) vs circle (fully round). */
export const Shapes: Story = {
  render: (args) => (
    <Row>
      <CopyButton {...args} shape="square" />
      <CopyButton {...args} shape="circle" />
    </Row>
  ),
};

/**
 * Floated top-right of a surface — the canonical "copy this block" placement.
 * `ghost` keeps it quiet until hovered.
 */
export const FloatingOnSurface: Story = {
  render: (args) => (
    <div
      style={{
        position: 'relative',
        width: 360,
        height: 160,
        borderRadius: 12,
        background: '#f5f5f3',
        border: '1px solid #ececea',
        fontFamily: 'monospace',
        fontSize: 13,
        padding: 16,
        color: '#3d3d3a',
      }}
    >
      <div style={{ position: 'absolute', top: 8, right: 8 }}>
        <CopyButton {...args} variant="ghost" />
      </div>
      pnpm add @ken/react
    </div>
  ),
};

/** Disabled — inert, no hover, no copy. */
export const Disabled: Story = {
  args: { disabled: true },
};
