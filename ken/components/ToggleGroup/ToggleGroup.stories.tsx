import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  LayoutGrid,
  List,
} from 'lucide-react';
import { ToggleGroup } from './ToggleGroup';

const alignItems = [
  { value: 'left', icon: AlignLeft, 'aria-label': 'Align left' },
  { value: 'center', icon: AlignCenter, 'aria-label': 'Align center' },
  { value: 'right', icon: AlignRight, 'aria-label': 'Align right' },
  { value: 'justify', icon: AlignJustify, 'aria-label': 'Justify' },
];

const viewItems = [
  { value: 'grid', icon: LayoutGrid, 'aria-label': 'Grid view' },
  { value: 'list', icon: List, 'aria-label': 'List view' },
];

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    items: alignItems,
    defaultValue: 'left',
    size: 'md',
    'aria-label': 'Text alignment',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'lg'] },
    disabled: { control: 'boolean' },
    items: { control: false },
    value: { control: false },
    defaultValue: { control: false },
    onValueChange: { control: false },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}
  >
    {children}
  </div>
);

/** The reference shape: four alignment options, one pill. Click to watch it slide. */
export const Playground: Story = {};

/** Both densities — `md` (32px tall) and `lg` (36px tall). */
export const Sizes: Story = {
  render: () => (
    <Row>
      <ToggleGroup
        items={viewItems}
        defaultValue="grid"
        size="md"
        aria-label="View mode (medium)"
      />
      <ToggleGroup
        items={viewItems}
        defaultValue="grid"
        size="lg"
        aria-label="View mode (large)"
      />
    </Row>
  ),
};

/** A two-option view switcher — the pill spans exactly one slot. */
export const TwoOptions: Story = {
  args: { items: viewItems, defaultValue: 'grid', 'aria-label': 'View mode' },
};

/** Controlled — the selected value lives in your own state. */
export const Controlled: Story = {
  render: () => {
    const [view, setView] = useState('grid');
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          alignItems: 'flex-start',
        }}
      >
        <ToggleGroup
          items={viewItems}
          value={view}
          onValueChange={setView}
          aria-label="View mode"
        />
        <span style={{ fontSize: 13 }}>Selected: {view}</span>
      </div>
    );
  },
};

/** A single option can be disabled — it greys out, drops its hover, and the pill skips it. */
export const WithDisabledItem: Story = {
  args: {
    defaultValue: 'left',
    items: [
      { value: 'left', icon: AlignLeft, 'aria-label': 'Align left' },
      { value: 'center', icon: AlignCenter, 'aria-label': 'Align center' },
      {
        value: 'right',
        icon: AlignRight,
        'aria-label': 'Align right',
        disabled: true,
      },
      { value: 'justify', icon: AlignJustify, 'aria-label': 'Justify' },
    ],
  },
};

/** The whole control disabled — inert, no hover, no keyboard. */
export const DisabledGroup: Story = {
  args: {
    items: viewItems,
    defaultValue: 'grid',
    disabled: true,
    'aria-label': 'View mode',
  },
};
