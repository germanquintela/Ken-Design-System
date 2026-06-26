import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Circle,
  CircleDot,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
} from 'lucide-react';
import { MultiSelect } from './MultiSelect';
import type { SelectOption } from './internals';

const statusOptions: SelectOption[] = [
  { value: 'todo', label: 'To do', icon: <Circle /> },
  { value: 'in-progress', label: 'In progress', icon: <CircleDot /> },
  { value: 'done', label: 'Done', icon: <CheckCircle2 /> },
  { value: 'canceled', label: 'Canceled', icon: <XCircle />, disabled: true },
];

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
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
    maxVisiblePills: { control: { type: 'number', min: 1 } },
    options: { control: false },
    icon: { control: false },
    value: { control: false },
    defaultValue: { control: false },
    onValueChange: { control: false },
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Empty filter pill — limestone fill, fixed leading icon, charcoal placeholder.
 *  Padding is symmetric while empty; the right edge tightens once pills appear. */
export const Playground: Story = {};

/** Pre-filled — each selection is a white pill; the leading icon stays put. */
export const Selected: Story = {
  args: { defaultValue: ['todo', 'in-progress'] },
};

/** Overflow collapses to "+N" past `maxVisiblePills` (default 2). */
export const Overflow: Story = {
  args: { defaultValue: ['todo', 'in-progress', 'done'] },
};

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
      <MultiSelect
        options={statusOptions}
        size="sm"
        defaultValue={['todo', 'done']}
        placeholder="sm"
        icon={<SlidersHorizontal />}
      />
      <MultiSelect
        options={statusOptions}
        size="md"
        defaultValue={['todo', 'done']}
        placeholder="md"
        icon={<SlidersHorizontal />}
      />
    </div>
  ),
};

/** The whole control disabled — flat fill, muted pills, no hover. */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: ['todo', 'in-progress'] },
};

/** Controlled — the selection array lives in your own state. */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['todo']);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          alignItems: 'flex-start',
        }}
      >
        <MultiSelect
          options={statusOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Status"
          icon={<SlidersHorizontal />}
        />
        <span style={{ fontSize: 13 }}>
          Selected: {value.join(', ') || '(none)'}
        </span>
      </div>
    );
  },
};
