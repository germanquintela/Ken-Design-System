import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Mail, Search } from 'lucide-react';
import { Input } from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Email', size: 'md', placeholder: 'you@ramp.com' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    prefix: { control: false },
    suffix: { control: false },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const Col = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}
  >
    {children}
  </div>
);

/** Drive every prop from the Controls panel. */
export const Playground: Story = {};

/** The label is optional and sits above the field. Without one, give the input an `aria-label`. */
export const Label: Story = {
  render: (args) => (
    <Col>
      <Input {...args} label="Work email" />
      <Input {...args} label={undefined} aria-label="Email" />
    </Col>
  ),
};

/** Height + text scale with `size`. */
export const Sizes: Story = {
  render: (args) => (
    <Col>
      <Input {...args} size="sm" label="Small" />
      <Input {...args} size="md" label="Medium" />
      <Input {...args} size="lg" label="Large" />
    </Col>
  ),
};

/** `prefix` / `suffix` take an icon or short text. */
export const PrefixSuffix: Story = {
  render: (args) => (
    <Col>
      <Input
        {...args}
        label="Search"
        prefix={<Search />}
        placeholder="Search…"
      />
      <Input
        {...args}
        label="Amount"
        prefix="$"
        suffix="USD"
        placeholder="0.00"
      />
      <Input {...args} label="Email" suffix={<Mail />} />
    </Col>
  ),
};

/** Default and disabled. */
export const States: Story = {
  render: (args) => (
    <Col>
      <Input {...args} label="Default" />
      <Input {...args} label="Disabled" disabled defaultValue="work@ramp.com" />
    </Col>
  ),
};

/** A helper line sits below the field. */
export const WithHelper: Story = {
  render: (args) => (
    <Col>
      <Input
        {...args}
        label="Work email"
        description="We'll only use this for receipts."
      />
    </Col>
  ),
};

/** `error` flips the border to danger and replaces the helper with the message. */
export const WithError: Story = {
  render: (args) => (
    <Col>
      <Input
        {...args}
        label="Work email"
        defaultValue="not-an-email"
        description="We'll only use this for receipts."
        error="Enter a valid email address."
      />
    </Col>
  ),
};
