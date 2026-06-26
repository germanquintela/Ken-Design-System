import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { ShimmerText } from './ShimmerText';

const meta = {
  title: 'Atoms/ShimmerText',
  component: ShimmerText,
  tags: ['autodocs'],
  args: { size: 'body', children: 'Generating your report…' },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: [
        'footnote',
        'caption',
        'body',
        'subheading',
        'heading',
        'headingLg',
      ],
    },
    as: { control: false },
  },
} satisfies Meta<typeof ShimmerText>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      alignItems: 'flex-start',
    }}
  >
    {children}
  </div>
);

/** Drive every prop from the Controls panel. The band sweeps continuously. */
export const Playground: Story = {};

/** The shimmer at each typography role — the same paired fontSize/lineHeight as Text. */
export const Sizes: Story = {
  render: () => (
    <Stack>
      <ShimmerText size="footnote">Footnote shimmer · 12</ShimmerText>
      <ShimmerText size="caption">Caption shimmer · 13</ShimmerText>
      <ShimmerText size="body">Body shimmer · 16</ShimmerText>
      <ShimmerText size="subheading">Subheading shimmer · 18</ShimmerText>
      <ShimmerText size="heading">Heading shimmer · 24</ShimmerText>
      <ShimmerText size="headingLg">Heading Lg shimmer · 28</ShimmerText>
    </Stack>
  ),
};

/** Polymorphic `as` — renders as a heading or paragraph while keeping the sheen. */
export const PolymorphicAs: Story = {
  render: () => (
    <Stack>
      <ShimmerText as="h2" size="heading">
        Crafting something special
      </ShimmerText>
      <ShimmerText as="p" size="body">
        A barely-there gleam travels across the obsidian text on a slow loop.
      </ShimmerText>
    </Stack>
  ),
};

/** A common use: a quiet "working" label next to other UI, subtler than a spinner. */
export const LoadingLabel: Story = {
  render: () => (
    <ShimmerText size="caption">Analyzing transactions…</ShimmerText>
  ),
};
