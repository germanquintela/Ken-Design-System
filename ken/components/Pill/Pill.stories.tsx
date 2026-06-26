import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import {
  Box as BoxIcon,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
} from 'lucide-react';
import { Pill } from './Pill';

const meta = {
  title: 'Atoms/Pill',
  component: Pill,
  tags: ['autodocs'],
  args: {
    children: 'Pricing page',
    status: 'neutral',
    size: 'md',
    onClick: () => {},
  },
  argTypes: {
    status: {
      control: 'inline-radio',
      options: ['neutral', 'success', 'warning', 'error', 'info'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    icon: { control: false },
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}
  >
    {children}
  </div>
);

/** Drive every prop from the Controls panel — click to see the press scale, tab in for the focus ring. */
export const Playground: Story = {};

/** The neutral default — a clickable filled limestone chip; hover darkens to bone. */
export const Neutral: Story = {
  render: (args) => (
    <Row>
      <Pill {...args} status="neutral" />
      <Pill {...args} status="neutral" icon={<BoxIcon />} />
    </Row>
  ),
};

/** Status colours the ICON only; the chip switches to the outlined white surface
 *  with secondary text. Hover fills with a soft limestone wash. */
export const StatusesWithIcon: Story = {
  render: (args) => (
    <Row>
      <Pill {...args} status="success" icon={<CheckCircle2 />}>
        Approve
      </Pill>
      <Pill {...args} status="warning" icon={<AlertTriangle />}>
        Review
      </Pill>
      <Pill {...args} status="error" icon={<XCircle />}>
        Reject
      </Pill>
      <Pill {...args} status="info" icon={<Info />}>
        Info
      </Pill>
    </Row>
  ),
};

/** Density scale — the icon and padding scale; the 12px text stays. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      <Pill {...args} size="sm" status="success" icon={<CheckCircle2 />}>
        Small
      </Pill>
      <Pill {...args} size="md" status="success" icon={<CheckCircle2 />}>
        Medium
      </Pill>
    </Row>
  ),
};

/** Disabled — inert, greyed fill/text, no hover or press. */
export const Disabled: Story = {
  render: (args) => (
    <Row>
      <Pill {...args} status="neutral" disabled />
      <Pill {...args} status="success" icon={<CheckCircle2 />} disabled>
        Approve
      </Pill>
    </Row>
  ),
};
