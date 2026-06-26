import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { UserMessage } from './UserMessage';

const meta = {
  title: 'Components/UserMessage',
  component: UserMessage,
  tags: ['autodocs'],
  args: {
    children: "The AI operating system for today's top accounting firms",
    date: 'Jun 23',
    time: '2:45 PM',
  },
  argTypes: {
    children: { control: 'text' },
    date: { control: 'text' },
    time: { control: 'text' },
    as: { control: false },
  },
} satisfies Meta<typeof UserMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// The component hugs the RIGHT edge, so the stories give it a column of room to
// align within (mirrors how a chat thread would lay it out).
const Thread = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 480 }}
  >
    {children}
  </div>
);

/** Drive every prop from the Controls panel. */
export const Playground: Story = {
  render: (args) => (
    <Thread>
      <UserMessage {...args} />
    </Thread>
  ),
};

/** A short message: the bubble hugs its content and sits at the right edge. */
export const Default: Story = {
  args: { children: 'Sounds good — let’s ship it.' },
  render: (args) => (
    <Thread>
      <UserMessage {...args} />
    </Thread>
  ),
};

/**
 * Longer copy wraps inside the 300px cap, right-aligned, showing the bubble
 * surface + 18px radius.
 */
export const Wrapped: Story = {
  render: (args) => (
    <Thread>
      <UserMessage {...args}>
        The AI operating system for today&apos;s top accounting firms — cards,
        expenses, bill payments, and banking, in the blink of AI.
      </UserMessage>
    </Thread>
  ),
};

/** No `date`/`time` → the meta line is omitted entirely (just the bubble). */
export const WithoutTimestamp: Story = {
  args: { date: undefined, time: undefined },
  render: (args) => (
    <Thread>
      <UserMessage {...args} />
    </Thread>
  ),
};

/** Pass only `time` — the meta line shows it alone (no middot). */
export const TimeOnly: Story = {
  args: { date: undefined, time: '2:45 PM' },
  render: (args) => (
    <Thread>
      <UserMessage {...args} />
    </Thread>
  ),
};

/** Several messages stacked — every bubble + stamp aligns to the right. */
export const Conversation: Story = {
  render: () => (
    <Thread>
      <UserMessage date="Jun 23" time="2:43 PM">
        How fast can we close the books this month?
      </UserMessage>
      <UserMessage date="Jun 23" time="2:44 PM">
        And can it categorize the AmEx import automatically?
      </UserMessage>
      <UserMessage date="Jun 23" time="2:45 PM">
        The AI operating system for today&apos;s top accounting firms.
      </UserMessage>
    </Thread>
  ),
};
