import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The reference shape: three equal-width tabs filling the row, the pipe riding on
 * top of the full-width divider. Switch tabs to watch it slide.
 */
export const Playground: Story = {
  render: () => (
    <Tabs defaultValue="apple">
      <Tabs.List>
        <Tabs.Tab value="apple">Apple</Tabs.Tab>
        <Tabs.Tab value="orange">Orange</Tabs.Tab>
        <Tabs.Tab value="mango">Mango</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  ),
};

/** With panels — content swaps under the strip as the pipe slides. */
export const WithPanels: Story = {
  render: () => (
    <Tabs defaultValue="apple">
      <Tabs.List>
        <Tabs.Tab value="apple">Apple</Tabs.Tab>
        <Tabs.Tab value="orange">Orange</Tabs.Tab>
        <Tabs.Tab value="mango">Mango</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="apple">
        Crisp, sweet, and the classic default.
      </Tabs.Panel>
      <Tabs.Panel value="orange">Citrus — juicy and a little tart.</Tabs.Panel>
      <Tabs.Panel value="mango">Tropical, soft, and fragrant.</Tabs.Panel>
    </Tabs>
  ),
};

/** Two equal slots split the row in half; the pipe spans a full slot. */
export const TwoTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="activity">Activity</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  ),
};

/** A disabled tab greys out, drops its hover, and is skipped by the keyboard. */
export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="apple">
      <Tabs.List>
        <Tabs.Tab value="apple">Apple</Tabs.Tab>
        <Tabs.Tab value="orange" disabled>
          Orange
        </Tabs.Tab>
        <Tabs.Tab value="mango">Mango</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  ),
};
