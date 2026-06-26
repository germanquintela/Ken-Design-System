import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Home, FileText, Plus, MessageSquare } from 'lucide-react';
import { CommandMenu, type CommandGroup } from './CommandMenu';

const groups: CommandGroup[] = [
  {
    heading: 'Navigation',
    items: [
      { id: 'home', label: 'Home', icon: Home, onSelect: () => {} },
      { id: 'color', label: 'Color', icon: FileText, onSelect: () => {} },
    ],
  },
  {
    heading: 'Chats',
    items: [
      {
        id: 'c1',
        label: 'Pricing table redesign',
        icon: MessageSquare,
        onSelect: () => {},
      },
      {
        id: 'c2',
        label: 'Settings page layout',
        icon: MessageSquare,
        onSelect: () => {},
      },
    ],
  },
  {
    heading: 'Actions',
    items: [{ id: 'new', label: 'New Chat', icon: Plus, onSelect: () => {} }],
  },
];

const meta = {
  title: 'Overlays/CommandMenu',
  component: CommandMenu,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CommandMenu>;
export default meta;

type Story = StoryObj<typeof meta>;

// Controlled wrapper so the story opens the palette on mount.
function Demo(args: React.ComponentProps<typeof CommandMenu>) {
  const [open, setOpen] = React.useState(true);
  return <CommandMenu {...args} open={open} onOpenChange={setOpen} />;
}

export const Playground: Story = {
  args: { groups, shortcut: false },
  render: (args) => <Demo {...args} />,
};

export const Empty: Story = {
  args: { groups: [], shortcut: false },
  render: (args) => <Demo {...args} />,
};
