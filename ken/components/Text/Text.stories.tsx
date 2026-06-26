import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Text } from './Text';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    size: 'body',
    tone: 'primary',
  },
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
    tone: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'tertiary'],
    },
    children: { control: 'text' },
    as: { control: false },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    {children}
  </div>
);

/** Drive every prop from the Controls panel. */
export const Playground: Story = {};

/** The curated size scale — each role pairs its own fontSize + lineHeight. */
export const Sizes: Story = {
  render: (args) => (
    <Stack>
      <Text {...args} size="footnote">
        footnote · 12
      </Text>
      <Text {...args} size="caption">
        caption · 13
      </Text>
      <Text {...args} size="body">
        body · 16
      </Text>
      <Text {...args} size="subheading">
        subheading · 18
      </Text>
      <Text {...args} size="heading">
        heading · 24
      </Text>
      <Text {...args} size="headingLg">
        headingLg · 28
      </Text>
    </Stack>
  ),
};

/** The three tones: primary (charcoal), secondary (dark smoke), tertiary (smoke). */
export const Tones: Story = {
  render: (args) => (
    <Stack>
      <Text {...args} tone="primary">
        primary — charcoal
      </Text>
      <Text {...args} tone="secondary">
        secondary — dark smoke
      </Text>
      <Text {...args} tone="tertiary">
        tertiary — smoke
      </Text>
    </Stack>
  ),
};

/** `as` renders the right element — a heading, a paragraph, an inline label. */
export const PolymorphicAs: Story = {
  render: (args) => (
    <Stack>
      <Text {...args} as="h2" size="heading">
        Rendered as &lt;h2&gt;
      </Text>
      <Text {...args} as="p" size="body">
        Rendered as &lt;p&gt; — a block paragraph.
      </Text>
      <Text {...args} as="label" size="caption" tone="secondary">
        Rendered as &lt;label&gt;
      </Text>
    </Stack>
  ),
};
