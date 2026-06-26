import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Circle,
  CircleDot,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
} from 'lucide-react';
import { Select } from './Select';
import type { SelectOption } from './internals';

const statusOptions: SelectOption[] = [
  { value: 'todo', label: 'To do', icon: <Circle /> },
  { value: 'in-progress', label: 'In progress', icon: <CircleDot /> },
  { value: 'done', label: 'Done', icon: <CheckCircle2 /> },
  { value: 'canceled', label: 'Canceled', icon: <XCircle />, disabled: true },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    options: statusOptions,
    size: 'md',
    placeholder: 'Status',
    icon: <SlidersHorizontal />,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    options: { control: false },
    icon: { control: false },
    value: { control: false },
    defaultValue: { control: false },
    onValueChange: { control: false },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Single-select field — muted placeholder + rotating chevron. Pick an option to
 *  watch the leading icon + label swap to the chosen one. */
export const Playground: Story = {};

/** Both densities. */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 24,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Select
        options={statusOptions}
        size="sm"
        placeholder="sm"
        icon={<SlidersHorizontal />}
      />
      <Select
        options={statusOptions}
        size="md"
        placeholder="md"
        icon={<SlidersHorizontal />}
      />
    </div>
  ),
};

/** No leading icon — just the placeholder + chevron. */
export const WithoutIcon: Story = {
  args: { icon: undefined, placeholder: 'Choose a status' },
};

/** A single option disabled — its row is inert + muted, and the trigger never picks it. */
export const WithDisabledOption: Story = {
  args: { placeholder: 'Status' },
};

/** The whole control disabled — inert, no hover. */
export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Status' },
};

/** Controlled — selection lives in your own state. */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('todo');
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          alignItems: 'flex-start',
        }}
      >
        <Select
          options={statusOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Status"
          icon={<SlidersHorizontal />}
        />
        <span style={{ fontSize: 13 }}>Selected: {value ?? '(none)'}</span>
      </div>
    );
  },
};
