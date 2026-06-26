import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';
import { Table } from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  args: { striped: false, hover: false, bordered: false },
  argTypes: {
    striped: { control: 'boolean' },
    hover: { control: 'boolean' },
    bordered: { control: 'boolean' },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const ROWS = [
  {
    vendor: 'Acme Corp',
    status: 'success' as const,
    label: 'Paid',
    date: 'Jun 12',
    amount: '$1,200.00',
  },
  {
    vendor: 'Globex',
    status: 'warning' as const,
    label: 'Review',
    date: 'Jun 14',
    amount: '$980.50',
  },
  {
    vendor: 'Initech',
    status: 'neutral' as const,
    label: 'Draft',
    date: 'Jun 18',
    amount: '$540.00',
  },
  {
    vendor: 'Soylent',
    status: 'error' as const,
    label: 'Declined',
    date: 'Jun 20',
    amount: '$12,340.75',
  },
];

/** A bill-pay-style ledger. Cells take any component — here a `Badge` in the
 *  status column — and the amount column is right-aligned with tabular numerals. */
const Ledger = (args: Story['args']) => (
  <Table {...args}>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>Vendor</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell align="right">Amount</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {ROWS.map((r) => (
        <Table.Row key={r.vendor}>
          <Table.Cell>{r.vendor}</Table.Cell>
          <Table.Cell>
            <Badge status={r.status} size="sm">
              {r.label}
            </Badge>
          </Table.Cell>
          <Table.Cell>{r.date}</Table.Cell>
          <Table.Cell align="right">{r.amount}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

/** Drive `striped` / `hover` / `bordered` from the Controls panel. */
export const Playground: Story = { render: (args) => Ledger(args) };

/** The bare table — header rule + row dividers in limestone, no outer box, no
 *  column lines, no zebra. */
export const Default: Story = { render: (args) => Ledger(args) };

/** `striped` tints even rows with the faint "limestone light" band (#fcfcfa). */
export const Striped: Story = {
  args: { striped: true },
  render: (args) => Ledger(args),
};

/** `hover` highlights the row under the cursor (#f5f5f4) — it paints over the
 *  stripe when both are on. */
export const Hover: Story = {
  args: { hover: true },
  render: (args) => Ledger(args),
};

/** `bordered` adds the enclosing box + vertical column dividers — the full grid. */
export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => Ledger(args),
};

/** Everything on at once: grid + zebra + hover. */
export const StripedBorderedHover: Story = {
  args: { striped: true, bordered: true, hover: true },
  render: (args) => Ledger(args),
};
