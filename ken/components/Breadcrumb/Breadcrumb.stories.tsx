import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The reference shape (Figma node 34:690): a muted ancestor link, a chevron, and
 * the current page — primary and underlined. Hover the first crumb to see it
 * darken and reveal its underline.
 */
export const Playground: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item href="#">April 2026</Breadcrumb.Item>
      <Breadcrumb.Item current>Assets &amp; Prepaids</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

/** A deeper trail — separators are inserted automatically between every crumb. */
export const ThreeLevels: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="#">April 2026</Breadcrumb.Item>
      <Breadcrumb.Item current>Assets &amp; Prepaids</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

/** A long trail keeps the same rhythm; every ancestor is an independent link. */
export const LongTrail: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item href="#">Accounting</Breadcrumb.Item>
      <Breadcrumb.Item href="#">Close</Breadcrumb.Item>
      <Breadcrumb.Item href="#">April 2026</Breadcrumb.Item>
      <Breadcrumb.Item current>Assets &amp; Prepaids</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

/** A single page — one current crumb, no separator. */
export const CurrentOnly: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item current>Assets &amp; Prepaids</Breadcrumb.Item>
    </Breadcrumb>
  ),
};
