import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Timeline } from './Timeline';
import { Text } from '../Text';

const meta = {
  title: 'Atoms/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  args: { loading: false, multiple: true },
  argTypes: {
    loading: { control: 'boolean' },
    multiple: { control: 'boolean' },
    children: { control: false },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const Frame = ({
  width = 280,
  children,
}: {
  width?: number;
  children: ReactNode;
}) => <div style={{ width }}>{children}</div>;

/** Drive `loading` / `multiple` from the Controls panel. With `loading` on, the last
 *  (obsidian) dot bounces and its step reads as in-progress. */
export const Playground: Story = {
  render: (args) => (
    <Frame>
      <Timeline {...args}>
        <Timeline.Item title="Connecting to bank">
          <Text size="footnote">Authenticated with Plaid · Chase ••4821.</Text>
        </Timeline.Item>
        <Timeline.Item title="Importing transactions">
          <Text size="footnote">
            1,204 transactions imported across 3 accounts.
          </Text>
        </Timeline.Item>
        <Timeline.Item title="Reconciling totals">
          <Text size="footnote">Matching against the general ledger…</Text>
        </Timeline.Item>
      </Timeline>
    </Frame>
  ),
};

/** The collapsed rail — three steps, the last dot obsidian (current). Matches the
 *  Figma reference. Open a row to reveal its body; the dotted line stretches to keep
 *  the rail continuous. */
export const Default: Story = {
  args: { loading: false },
  render: (args) => (
    <Frame>
      <Timeline {...args} defaultValue={[1]}>
        <Timeline.Item title="Time is money. Save both">
          <Text size="footnote">Step one detail.</Text>
        </Timeline.Item>
        <Timeline.Item title="Time is money. Save both">
          <Text size="footnote">
            This step is open by default — the connecting line above and below
            the dot stays unbroken as the panel pushes the next step down.
          </Text>
        </Timeline.Item>
        <Timeline.Item title="Time is money. Save both">
          <Text size="footnote">Step three detail.</Text>
        </Timeline.Item>
      </Timeline>
    </Frame>
  ),
};

/** `loading` — the whole timeline is working: the obsidian dot bounces like a ball
 *  (squash on the floor, stretch on the way up). */
export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <Frame>
      <Timeline {...args} defaultValue={[2]}>
        <Timeline.Item title="Connecting to bank">
          <Text size="footnote">Done.</Text>
        </Timeline.Item>
        <Timeline.Item title="Importing transactions">
          <Text size="footnote">Done.</Text>
        </Timeline.Item>
        <Timeline.Item title="Reconciling totals">
          <Text size="footnote">Matching against the general ledger…</Text>
        </Timeline.Item>
      </Timeline>
    </Frame>
  ),
};

/** A single step — no neighbour, so no connecting line; just the current dot. */
export const SingleStep: Story = {
  args: { loading: false },
  render: (args) => (
    <Frame>
      <Timeline {...args}>
        <Timeline.Item title="One lonely step">
          <Text size="footnote">Nothing connects to it.</Text>
        </Timeline.Item>
      </Timeline>
    </Frame>
  ),
};
