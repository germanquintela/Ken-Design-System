import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import {
  MoreHorizontal,
  Pencil,
  Copy,
  Share2,
  Trash2,
  ExternalLink,
  Settings,
  UserPlus,
  Download,
} from 'lucide-react';
import { iconSize } from '../../theme/foundations/iconSize';
import { Menu } from './Menu';
import { Button } from '../Button';
import { IconButton } from '../IconButton';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  // `children` is required by MenuProps but all stories use a render function,
  // so we supply a stub default to satisfy Storybook's args inference.
  args: { children: undefined as unknown as ReactNode },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The canonical actions menu: a secondary-button trigger with a rotating chevron. */
export const Default: Story = {
  render: () => (
    <Menu>
      <Menu.Trigger render={<Button variant="secondary" />}>
        Options
        <Menu.Chevron />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item prefix={<Pencil />}>Edit</Menu.Item>
        <Menu.Item prefix={<Copy />}>Duplicate</Menu.Item>
        <Menu.Item prefix={<Share2 />}>Share</Menu.Item>
      </Menu.Content>
    </Menu>
  ),
};

/** Icon-only 3-dots trigger (IconButton enforces an aria-label). Right-aligned panel. */
export const ThreeDots: Story = {
  render: () => (
    <Menu>
      <Menu.Trigger
        render={
          <IconButton variant="ghost" aria-label="More actions">
            <MoreHorizontal size={iconSize.md} />
          </IconButton>
        }
      />
      <Menu.Content align="end">
        <Menu.Item prefix={<UserPlus />}>Invite teammate</Menu.Item>
        <Menu.Item prefix={<Download />}>Export</Menu.Item>
        <Menu.Item prefix={<Settings />}>Settings</Menu.Item>
      </Menu.Content>
    </Menu>
  ),
};

/** prefix + suffix icon slots, a link item (renders <a>), and a disabled item. */
export const ItemAnatomy: Story = {
  render: () => (
    <Menu>
      <Menu.Trigger render={<Button variant="secondary" />}>
        Account
        <Menu.Chevron />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item prefix={<Settings />} suffix={<ExternalLink />}>
          Manage
        </Menu.Item>
        <Menu.LinkItem href="https://ramp.com" prefix={<ExternalLink />}>
          Open docs
        </Menu.LinkItem>
        <Menu.Item prefix={<Download />} disabled>
          Export (locked)
        </Menu.Item>
      </Menu.Content>
    </Menu>
  ),
};

/** Sections + a separator, with the destructive action grouped at the bottom. */
export const SectionsAndDestructive: Story = {
  render: () => (
    <Menu>
      <Menu.Trigger render={<Button variant="secondary" />}>
        Manage
        <Menu.Chevron />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item prefix={<Pencil />}>Edit</Menu.Item>
        <Menu.Item prefix={<Copy />}>Duplicate</Menu.Item>
        <Menu.Separator />
        <Menu.Section label="Danger zone">
          <Menu.Item destructive prefix={<Trash2 />}>
            Delete
          </Menu.Item>
        </Menu.Section>
      </Menu.Content>
    </Menu>
  ),
};
