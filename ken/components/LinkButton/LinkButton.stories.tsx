import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Check, Plus } from 'lucide-react';
import { iconSize } from '../../theme/foundations/iconSize';
import { LinkButton } from './LinkButton';

const meta = {
  title: 'Atoms/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  args: { children: 'Link button', variant: 'default', size: 'md', href: '#' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'subtle',
        'secondary',
        'ghost',
        'success',
        'warning',
        'danger',
      ],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}
  >
    {children}
  </div>
);

/** Drive every prop from the Controls panel. */
export const Playground: Story = {};

/** Looks identical to Button — same recipe, same variants — but it's an <a>. */
export const AllVariants: Story = {
  render: (args) => (
    <Row>
      <LinkButton {...args} variant="default">
        Default
      </LinkButton>
      <LinkButton {...args} variant="subtle">
        Subtle
      </LinkButton>
      <LinkButton {...args} variant="secondary">
        Secondary
      </LinkButton>
      <LinkButton {...args} variant="ghost">
        Ghost
      </LinkButton>
    </Row>
  ),
};

/** Status treatments, rendered as outlines. */
export const StatusOutline: Story = {
  name: 'Status (outline)',
  render: (args) => (
    <Row>
      <LinkButton {...args} variant="success">
        Success
      </LinkButton>
      <LinkButton {...args} variant="warning">
        Warning
      </LinkButton>
      <LinkButton {...args} variant="danger">
        Danger
      </LinkButton>
    </Row>
  ),
};

/** The 4px-grid size scale. */
export const AllSizes: Story = {
  render: (args) => (
    <Row>
      <LinkButton {...args} size="sm">
        Small
      </LinkButton>
      <LinkButton {...args} size="md">
        Medium
      </LinkButton>
      <LinkButton {...args} size="lg">
        Large
      </LinkButton>
    </Row>
  ),
};

/** Leading / trailing icon slots — icon size tracks the control size. */
export const WithIcons: Story = {
  render: (args) => {
    const px = iconSize[args.size ?? 'md'];
    return (
      <Row>
        <LinkButton {...args} prefix={<Plus size={px} />}>
          Add new
        </LinkButton>
        <LinkButton {...args} suffix={<ArrowRight size={px} />}>
          Continue
        </LinkButton>
        <LinkButton {...args} variant="secondary" prefix={<Check size={px} />}>
          Saved
        </LinkButton>
      </Row>
    );
  },
};

/** Real link semantics: external target gets an out-arrow + safe rel. */
export const ExternalLink: Story = {
  render: (args) => (
    <Row>
      <LinkButton
        {...args}
        href="https://ramp.com"
        target="_blank"
        rel="noreferrer"
        suffix={<ArrowUpRight size={iconSize[args.size ?? 'md']} />}
      >
        Open ramp.com
      </LinkButton>
    </Row>
  ),
};

/**
 * Polymorphic via `render`: swap the <a> for any element — a framework router
 * link (Next's <Link/>), an analytics-wrapped anchor, etc. Here a tiny mock
 * stands in for a router link; @ken/react never imports the router itself.
 */
const MockRouterLink = ({
  to,
  ...props
}: { to: string } & ComponentProps<'a'>) => (
  <a href={to} data-router-link {...props} />
);

export const AsRouterLink: Story = {
  render: (args) => (
    <Row>
      <LinkButton {...args} render={<MockRouterLink to="/dashboard" />}>
        Go to dashboard
      </LinkButton>
    </Row>
  ),
};
