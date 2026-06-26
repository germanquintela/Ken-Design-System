import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { iconSize } from '../../theme/foundations/iconSize';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button', variant: 'default', size: 'md' },
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
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

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

/** The four core treatments. */
export const AllVariants: Story = {
  render: (args) => (
    <Row>
      <Button {...args} variant="default">
        Default
      </Button>
      <Button {...args} variant="subtle">
        Subtle
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </Row>
  ),
};

/** Status buttons — rendered as outlines. */
export const StatusOutline: Story = {
  name: 'Status (outline)',
  render: (args) => (
    <Row>
      <Button {...args} variant="success">
        Success
      </Button>
      <Button {...args} variant="warning">
        Warning
      </Button>
      <Button {...args} variant="danger">
        Danger
      </Button>
    </Row>
  ),
};

/** The 4px-grid size scale. */
export const AllSizes: Story = {
  render: (args) => (
    <Row>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </Row>
  ),
};

/** Leading / trailing icon slots — icon size tracks the control size. */
export const WithIcons: Story = {
  render: (args) => {
    const px = iconSize[args.size ?? 'md'];
    return (
      <Row>
        <Button {...args} prefix={<Plus size={px} />}>
          Add new
        </Button>
        <Button {...args} suffix={<ArrowRight size={px} />}>
          Continue
        </Button>
        <Button {...args} variant="secondary" prefix={<Check size={px} />}>
          Saved
        </Button>
      </Row>
    );
  },
};

/** Loading — a leading spinner takes the icon slot, the label stays, and the
 *  button goes inert while keeping its live colours (no grey flash). The spinner
 *  inherits each variant's text colour. */
export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <Row>
      <Button {...args} variant="default">
        Saving
      </Button>
      <Button {...args} variant="subtle">
        Saving
      </Button>
      <Button {...args} variant="secondary">
        Saving
      </Button>
      <Button {...args} variant="danger">
        Deleting
      </Button>
    </Row>
  ),
};

/** Loading honours the size scale — the spinner tracks the control's icon size. */
export const LoadingSizes: Story = {
  name: 'Loading (sizes)',
  args: { loading: true },
  render: (args) => (
    <Row>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </Row>
  ),
};

/** Disabled across variants — inert fills, no hover. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Row>
      <Button {...args} variant="default">
        Default
      </Button>
      <Button {...args} variant="subtle">
        Subtle
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="danger">
        Danger
      </Button>
    </Row>
  ),
};
