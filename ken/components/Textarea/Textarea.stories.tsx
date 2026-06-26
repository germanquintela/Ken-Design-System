import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { label: 'Notes', placeholder: 'Add a note…' },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    rows: { control: { type: 'number', min: 1, max: 12 } },
    seamless: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

const Col = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}
  >
    {children}
  </div>
);

/** Drive every prop from the Controls panel. */
export const Playground: Story = {};

/** The label is optional and sits above the field. Without one, give it an `aria-label`. */
export const Label: Story = {
  render: (args) => (
    <Col>
      <Textarea {...args} label="Memo" />
      <Textarea {...args} label={undefined} aria-label="Memo" />
    </Col>
  ),
};

/**
 * Default behaviour: the field rests three rows tall and grows with its content —
 * no scrollbar, no drag handle. Type into it to watch it expand.
 */
export const AutoGrow: Story = {
  render: (args) => (
    <Col>
      <Textarea {...args} label="Empty (rests at 3 rows)" />
      <Textarea
        {...args}
        label="Pre-filled (grew to fit)"
        defaultValue={
          'Reimbursement for the Q3 offsite dinner.\nSplit across four teammates — receipt attached.\nApprover: Dana.\nThanks!'
        }
      />
    </Col>
  ),
};

/** Passing `rows` opts out of auto-grow: a fixed height that scrolls past N rows. */
export const FixedRows: Story = {
  render: (args) => (
    <Col>
      <Textarea {...args} label="Fixed (rows = 6)" rows={6} />
    </Col>
  ),
};

/**
 * `seamless` strips the border, background, focus ring and padding — just an area
 * to write in, for embedding inside another surface (a card, a composer).
 */
export const Seamless: Story = {
  render: (args) => (
    <Col>
      <div
        style={{ borderRadius: 8, border: '1px solid #e7e5e4', padding: 16 }}
      >
        <Textarea
          {...args}
          label={undefined}
          aria-label="Comment"
          seamless
          placeholder="Write a comment…"
        />
      </div>
    </Col>
  ),
};

/** Default and disabled. */
export const States: Story = {
  render: (args) => (
    <Col>
      <Textarea {...args} label="Default" />
      <Textarea
        {...args}
        label="Disabled"
        disabled
        defaultValue="Locked while the form submits."
      />
    </Col>
  ),
};

/** A helper line sits below the field. */
export const WithHelper: Story = {
  render: (args) => (
    <Col>
      <Textarea
        {...args}
        label="Description"
        description="Markdown is supported."
      />
    </Col>
  ),
};

/** Auto-grow capped at 160px — past the cap the field scrolls internally. */
export const CappedGrow: Story = {
  args: {
    maxHeight: 160,
    defaultValue: Array.from({ length: 12 }, (_, i) => `Line ${i + 1}`).join(
      '\n',
    ),
  },
};

/** `error` flips the border to danger and replaces the helper with the message. */
export const WithError: Story = {
  render: (args) => (
    <Col>
      <Textarea
        {...args}
        label="Description"
        defaultValue="Too short"
        description="Markdown is supported."
        error="Add at least 20 characters."
      />
    </Col>
  ),
};
