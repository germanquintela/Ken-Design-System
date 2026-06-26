import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Label', color: 'default', size: 'md' },
  argTypes: {
    color: { control: 'inline-radio', options: ['default', 'success'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}
  >
    {children}
  </div>
);

/** Drive every prop from the Controls panel. */
export const Playground: Story = {};

/** The four resting states — unchecked, checked, and their disabled twins. */
export const States: Story = {
  render: (args) => (
    <Row>
      <Checkbox {...args} label="Unchecked" />
      <Checkbox {...args} label="Checked" defaultChecked />
      <Checkbox {...args} label="Disabled" disabled />
      <Checkbox {...args} label="Disabled checked" disabled defaultChecked />
    </Row>
  ),
};

/** `color` only changes the checked fill — obsidian/charcoal vs success green. */
export const Colors: Story = {
  render: (args) => (
    <Row>
      <Checkbox {...args} color="default" label="Default" defaultChecked />
      <Checkbox {...args} color="success" label="Success" defaultChecked />
    </Row>
  ),
};

/** The compact size scale — box, tick, label and gap scale together. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      <Checkbox {...args} size="sm" label="Small" defaultChecked />
      <Checkbox {...args} size="md" label="Medium" defaultChecked />
    </Row>
  ),
};

/** Label is optional. Without one, give the box an accessible name yourself. */
export const WithoutLabel: Story = {
  args: { label: undefined },
  render: (args) => (
    <Row>
      <Checkbox {...args} aria-label="Standalone unchecked" />
      <Checkbox {...args} aria-label="Standalone checked" defaultChecked />
      <Checkbox
        {...args}
        color="success"
        aria-label="Standalone success"
        defaultChecked
      />
    </Row>
  ),
};
