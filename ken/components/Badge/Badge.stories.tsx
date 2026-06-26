import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import {
  Box as BoxIcon,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
} from 'lucide-react';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Receivables & Revenue', status: 'neutral', size: 'md' },
  argTypes: {
    status: {
      control: 'inline-radio',
      options: ['neutral', 'success', 'warning', 'error', 'info'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    children: { control: 'text' },
    icon: { control: false },
  },
} satisfies Meta<typeof Badge>;

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

/** The neutral default — a filled limestone chip for plain labels/tags. The
 *  optional icon sits inline and inherits the (dark) text colour. */
export const Neutral: Story = {
  render: (args) => (
    <Row>
      <Badge {...args} status="neutral" />
      <Badge {...args} status="neutral" icon={<BoxIcon />} />
    </Row>
  ),
};

/** Status colours the ICON only; the chip switches to the outlined white
 *  surface with secondary (dark-smoke) text. */
export const StatusesWithIcon: Story = {
  render: (args) => (
    <Row>
      <Badge {...args} status="success" icon={<CheckCircle2 />}>
        Paid
      </Badge>
      <Badge {...args} status="warning" icon={<AlertTriangle />}>
        Review
      </Badge>
      <Badge {...args} status="error" icon={<XCircle />}>
        Declined
      </Badge>
      <Badge {...args} status="info" icon={<Info />}>
        Info
      </Badge>
    </Row>
  ),
};

/** Density scale — the icon and padding scale; the 12px text stays. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      <Badge {...args} size="sm" status="success" icon={<CheckCircle2 />}>
        Small
      </Badge>
      <Badge {...args} size="md" status="success" icon={<CheckCircle2 />}>
        Medium
      </Badge>
    </Row>
  ),
};
