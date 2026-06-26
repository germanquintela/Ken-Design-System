import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';
import { Logo } from './Logo';

const meta = {
  title: 'Atoms/Logo',
  component: Logo,
  tags: ['autodocs'],
  args: { size: 'sm', type: 'mark', tone: 'default' },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md'] },
    type: { control: 'inline-radio', options: ['mark', 'wordmark'] },
    tone: { control: 'inline-radio', options: ['default', 'muted', 'inverse'] },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      display: 'flex',
      gap: 28,
      alignItems: 'center',
      flexWrap: 'wrap',
      ...style,
    }}
  >
    {children}
  </div>
);

/** Drive every prop from the Controls panel. */
export const Playground: Story = {};

/** The two lockups: `mark` (iso swoosh) and `wordmark` (full logotype). */
export const Lockups: Story = {
  render: (args) => (
    <Row>
      <Logo {...args} type="mark" />
      <Logo {...args} type="wordmark" />
    </Row>
  ),
};

/** The three heights — each lockup hugs the height, its own aspect preserved. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      <Logo {...args} size="xs" />
      <Logo {...args} size="sm" />
      <Logo {...args} size="md" />
    </Row>
  ),
};

/** The three tones. `inverse` (white) is shown on a dark band where it belongs. */
export const Tones: Story = {
  render: (args) => (
    <Row>
      <Logo {...args} tone="default" />
      <Logo {...args} tone="muted" />
      <span
        style={{
          background: '#0c0a08',
          padding: 16,
          borderRadius: 8,
          lineHeight: 0,
        }}
      >
        <Logo {...args} tone="inverse" />
      </span>
    </Row>
  ),
};
