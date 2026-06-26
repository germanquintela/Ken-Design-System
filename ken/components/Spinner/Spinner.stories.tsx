import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: { size: 'md', tone: 'default' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'inline-radio', options: ['default', 'inherit'] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}
  >
    {children}
  </div>
);

/** Drive every prop from the Controls panel. */
export const Playground: Story = {};

/** The control-scale diameters — matches the icon size of a sm/md/lg host. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
    </Row>
  ),
};

/** `tone='inherit'` rides the parent's `color` — the same spinner in three
 *  coloured contexts. This is how Button tints it per variant. */
export const Inherit: Story = {
  name: 'Tone: inherit',
  args: { tone: 'inherit', size: 'lg' },
  render: (args) => (
    <Row>
      <span style={{ color: '#0c0a08', display: 'inline-flex' }}>
        <Spinner {...args} />
      </span>
      <span style={{ color: '#c64a2a', display: 'inline-flex' }}>
        <Spinner {...args} />
      </span>
      <span style={{ color: '#5683d2', display: 'inline-flex' }}>
        <Spinner {...args} />
      </span>
    </Row>
  ),
};
