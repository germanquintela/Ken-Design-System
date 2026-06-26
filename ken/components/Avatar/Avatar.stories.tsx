import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Avatar } from './Avatar';
import { AvatarGroup } from './AvatarGroup';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Ada Lovelace', size: 'md' },
  argTypes: {
    name: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    color: {
      control: 'inline-radio',
      options: ['tint1', 'tint2', 'tint3'],
      description:
        'Override the auto-hashed identity colour (leave empty for auto).',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
  >
    {children}
  </div>
);

/** Drive every prop from the Controls panel. With `color` empty the tint is
 *  hashed from the name — type a different name and the colour follows. */
export const Playground: Story = {};

/** Density scale — 24 / 32 / 40px. The initials font tracks each diameter. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </Row>
  ),
};

/** The three identity tints — auto-assigned by hashing the name, so the same
 *  person is always the same colour. Charcoal initials on every tint. */
export const Colors: Story = {
  render: (args) => (
    <Row>
      <Avatar {...args} name="Alan Turing" />
      <Avatar {...args} name="Katherine Johnson" />
      <Avatar {...args} name="Ada Lovelace" />
      <Avatar {...args} name="Margaret Hamilton" />
      <Avatar {...args} name="Barbara Liskov" />
      <Avatar {...args} name="Grace Hopper" />
    </Row>
  ),
};

/** Pass `color` to override the hash when you need a specific tint. */
export const ColorOverride: Story = {
  render: (args) => (
    <Row>
      <Avatar {...args} name="Ada Lovelace" color="tint1" />
      <Avatar {...args} name="Ada Lovelace" color="tint2" />
      <Avatar {...args} name="Ada Lovelace" color="tint3" />
    </Row>
  ),
};

/** Single-word names fall back to one initial; an empty name shows `?`. */
export const Initials: Story = {
  render: (args) => (
    <Row>
      <Avatar {...args} name="Ada Lovelace" />
      <Avatar {...args} name="Cher" />
      <Avatar {...args} name="" />
    </Row>
  ),
};

/** A stacked group — overlapping circles, each with a white ring. The group
 *  sets one size for all its avatars. */
export const Group: Story = {
  render: () => (
    <Row>
      <AvatarGroup size="md">
        <Avatar name="Alan Turing" />
        <Avatar name="Katherine Johnson" />
        <Avatar name="Ada Lovelace" />
        <Avatar name="Margaret Hamilton" />
      </AvatarGroup>
    </Row>
  ),
};

/** `max` caps the visible avatars; the rest collapse into a circular "+N" chip
 *  (warm-limestone, same size + ring). */
export const GroupWithMax: Story = {
  render: () => (
    <Row>
      <AvatarGroup size="md" max={3}>
        <Avatar name="Alan Turing" />
        <Avatar name="Katherine Johnson" />
        <Avatar name="Ada Lovelace" />
        <Avatar name="Margaret Hamilton" />
        <Avatar name="Barbara Liskov" />
        <Avatar name="Grace Hopper" />
      </AvatarGroup>
    </Row>
  ),
};

/** The group scales as a whole — `sm` / `md` / `lg`. */
export const GroupSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 24,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <AvatarGroup key={size} size={size} max={3}>
          <Avatar name="Alan Turing" />
          <Avatar name="Katherine Johnson" />
          <Avatar name="Ada Lovelace" />
          <Avatar name="Margaret Hamilton" />
          <Avatar name="Barbara Liskov" />
          <Avatar name="Grace Hopper" />
        </AvatarGroup>
      ))}
    </div>
  ),
};
