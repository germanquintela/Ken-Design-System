import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { DollarSign, Mail, Search } from 'lucide-react';
import { FormInput } from './FormInput';

const meta = {
  title: 'Atoms/FormInput',
  component: FormInput,
  tags: ['autodocs'],
  args: { label: 'Email' },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    endIcon: { control: false },
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const Col = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}
  >
    {children}
  </div>
);

/** Drive every prop from the Controls panel. Click in to watch the label float. */
export const Playground: Story = {};

/**
 * The label rests centred when empty and floats up on focus OR when filled — the
 * typed value then shows below it. (Focus the first to see it move.)
 */
export const FloatingLabel: Story = {
  render: (args) => (
    <Col>
      <FormInput {...args} label="Empty — label centred" />
      <FormInput
        {...args}
        label="Filled — label floated"
        defaultValue="work@ramp.com"
      />
    </Col>
  ),
};

/** The four resting states. */
export const States: Story = {
  render: (args) => (
    <Col>
      <FormInput {...args} label="Default" />
      <FormInput {...args} label="Filled" defaultValue="work@ramp.com" />
      <FormInput {...args} label="Disabled" disabled />
      <FormInput
        {...args}
        label="Disabled filled"
        disabled
        defaultValue="work@ramp.com"
      />
    </Col>
  ),
};

/** A decorative trailing icon — auto-sized to the control. */
export const WithIcon: Story = {
  render: (args) => (
    <Col>
      <FormInput {...args} label="Search" endIcon={<Search />} />
      <FormInput
        {...args}
        label="Email"
        endIcon={<Mail />}
        defaultValue="work@ramp.com"
      />
      <FormInput
        {...args}
        label="Amount"
        endIcon={<DollarSign />}
        defaultValue="1,250.00"
      />
    </Col>
  ),
};

/** A helper line sits below the field. */
export const WithHelper: Story = {
  render: (args) => (
    <Col>
      <FormInput
        {...args}
        label="Work email"
        description="We'll only use this for receipts."
      />
    </Col>
  ),
};

/** `error` flips the border + label to danger and replaces the helper with the message. */
export const WithError: Story = {
  render: (args) => (
    <Col>
      <FormInput
        {...args}
        label="Work email"
        defaultValue="not-an-email"
        description="We'll only use this for receipts."
        error="Enter a valid email address."
      />
    </Col>
  ),
};
