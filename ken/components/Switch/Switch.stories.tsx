import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Switch } from './Switch';

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { label: 'Label', size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}
  >
    {children}
  </div>
);

/**
 * Drive every prop from the Controls panel. Press and hold the knob to feel the
 * morph — it stretches on press and extends as it slides across.
 */
export const Playground: Story = {};

/** Off, on, and their disabled twins. On is always success green. */
export const States: Story = {
  render: (args) => (
    <Row>
      <Switch {...args} label="Off" />
      <Switch {...args} label="On" defaultChecked />
      <Switch {...args} label="Disabled off" disabled />
      <Switch {...args} label="Disabled on" disabled defaultChecked />
    </Row>
  ),
};

/** The compact size scale — track, knob, label and gap scale together. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      <Switch {...args} size="sm" label="Small" defaultChecked />
      <Switch {...args} size="md" label="Medium" defaultChecked />
    </Row>
  ),
};

/** Label is optional. Without one, give the switch an accessible name yourself. */
export const WithoutLabel: Story = {
  args: { label: undefined },
  render: (args) => (
    <Row>
      <Switch {...args} aria-label="Standalone off" />
      <Switch {...args} aria-label="Standalone on" defaultChecked />
    </Row>
  ),
};
