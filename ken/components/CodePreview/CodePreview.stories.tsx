import type { Meta, StoryObj } from '@storybook/react';
import { CodePreview } from './CodePreview';

const meta = {
  title: 'Components/CodePreview',
  component: CodePreview,
  tags: ['autodocs'],
  args: { language: 'tsx', bordered: true, showCopy: true },
  argTypes: {
    language: {
      control: 'inline-radio',
      options: ['tsx', 'jsx', 'ts', 'js', 'css', 'bash'],
    },
    bordered: { control: 'boolean' },
    showCopy: { control: 'boolean' },
  },
} satisfies Meta<typeof CodePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE = `import { Button } from '@ken/react';

export function Example() {
  return <Button variant="default">Click me</Button>;
}`;

/** Standalone, bordered surface — drive props from Controls. */
export const Playground: Story = { args: { code: SAMPLE } };

/** Borderless — how Showcase embeds it (flush inside the card). */
export const Flush: Story = { args: { code: SAMPLE, bordered: false } };
