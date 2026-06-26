import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

const meta = {
  title: 'Atoms/Separator',
  component: Separator,
  tags: ['autodocs'],
  args: { orientation: 'horizontal', tone: 'default' },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    tone: { control: 'inline-radio', options: ['default', 'subtle'] },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = {
  fontFamily: 'var(--font-lausanne), Inter, sans-serif',
  fontSize: 14,
  color: '#1a1919',
};

/** Drive orientation from the Controls panel. (Vertical needs a flex row with a
 *  height to fill — see the Vertical story.) */
export const Playground: Story = {
  render: (args) =>
    args.orientation === 'vertical' ? (
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 12, height: 24 }}
      >
        <span style={text}>Left</span>
        <Separator {...args} />
        <span style={text}>Right</span>
      </div>
    ) : (
      <div
        style={{
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <span style={text}>Above the line</span>
        <Separator {...args} />
        <span style={text}>Below the line</span>
      </div>
    ),
};

/** The default — a full-width hairline. Consumers own the spacing around it; here
 *  a 12px gap on each side. */
export const Horizontal: Story = {
  render: () => (
    <div
      style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <span style={text}>Account settings</span>
      <Separator />
      <span style={text}>Billing</span>
      <Separator />
      <span style={text}>Members</span>
    </div>
  ),
};

/** Two hairline weights: `default` (standard divider) and `subtle` (faintest —
 *  table gridlines, dense lists). */
export const Tone: Story = {
  render: () => (
    <div
      style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <span style={text}>default</span>
      <Separator tone="default" />
      <span style={text}>subtle</span>
      <Separator tone="subtle" />
    </div>
  ),
};

/** In a flex row, a vertical separator fills the row's height — the classic
 *  inline-action / toolbar divider. */
export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 20 }}>
      <span style={text}>Edit</span>
      <Separator orientation="vertical" />
      <span style={text}>Duplicate</span>
      <Separator orientation="vertical" />
      <span style={text}>Delete</span>
    </div>
  ),
};
