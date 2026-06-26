import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Modal } from './Modal';
import type { ModalProps } from './Modal';
import { Button } from '../Button';
import type { ButtonVariant } from '../Button';

const meta = {
  title: 'Atoms/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    title: { control: 'text' },
    dismissible: { control: 'boolean' },
    showClose: { control: 'boolean' },
    open: { control: false },
    defaultOpen: { control: false },
    onOpenChange: { control: false },
    footer: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Modal is controlled — you drive `open` from your own state. This wrapper owns
 * that state for the stories and exposes a `close()` to the footer builder so
 * the footer actions can dismiss it (the X / backdrop already can).
 */
function ControlledModal({
  trigger = 'Open modal',
  triggerVariant = 'default',
  renderFooter,
  children,
  ...modalProps
}: Omit<ModalProps, 'open' | 'onOpenChange' | 'footer'> & {
  trigger?: string;
  triggerVariant?: ButtonVariant;
  renderFooter?: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={triggerVariant} onClick={() => setOpen(true)}>
        {trigger}
      </Button>
      <Modal
        {...modalProps}
        open={open}
        onOpenChange={setOpen}
        footer={renderFooter?.(() => setOpen(false))}
      >
        {children}
      </Modal>
    </>
  );
}

/** Drive title / dismissible / showClose from the Controls panel. */
export const Playground: Story = {
  args: { title: 'Delete invoice?', dismissible: true, showClose: true },
  render: ({ title, dismissible, showClose }) => (
    <ControlledModal
      title={title}
      dismissible={dismissible}
      showClose={showClose}
      renderFooter={(close) => (
        <>
          <Button variant="subtle" onClick={close}>
            Cancel
          </Button>
          <Button variant="danger" onClick={close}>
            Delete
          </Button>
        </>
      )}
    >
      This action can’t be undone. The invoice and its attachments will be
      permanently removed.
    </ControlledModal>
  ),
};

/** The everyday shape: title row, body, and a right-aligned footer. */
export const WithTitle: Story = {
  args: { title: 'Edit vendor' },
  render: () => (
    <ControlledModal
      trigger="Edit vendor"
      title="Edit vendor"
      renderFooter={(close) => (
        <>
          <Button variant="subtle" onClick={close}>
            Cancel
          </Button>
          <Button onClick={close}>Save changes</Button>
        </>
      )}
    >
      Update the vendor’s billing details. Changes apply to future invoices
      only.
    </ControlledModal>
  ),
};

/** Body-led: a short title plus a single acknowledge action. */
export const SimpleNote: Story = {
  name: 'Simple note',
  args: { title: 'Quick note' },
  render: () => (
    <ControlledModal
      trigger="Open note"
      title="Quick note"
      renderFooter={(close) => <Button onClick={close}>Got it</Button>}
    >
      The title is always present — it labels the dialog and gives the close “X”
      something to float beside in the top-right corner.
    </ControlledModal>
  ),
};

/** Tall content: the body scrolls while the header and footer stay pinned. */
export const LongBodyScroll: Story = {
  name: 'Long body (scrolls)',
  args: { title: 'Terms of service' },
  render: () => (
    <ControlledModal
      trigger="View terms"
      title="Terms of service"
      renderFooter={(close) => (
        <>
          <Button variant="subtle" onClick={close}>
            Decline
          </Button>
          <Button onClick={close}>Accept</Button>
        </>
      )}
    >
      {Array.from({ length: 16 }).map((_, i) => (
        <p key={i} style={{ margin: i === 0 ? 0 : '12px 0 0' }}>
          {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco.
        </p>
      ))}
    </ControlledModal>
  ),
};

/** `dismissible={false}` (+ hidden X): backdrop and Esc are disabled, so the
 *  user must resolve the modal via a footer action. */
export const NonDismissible: Story = {
  name: 'Non-dismissible (locked)',
  args: { title: 'Confirm transfer' },
  render: () => (
    <ControlledModal
      trigger="Confirm transfer"
      title="Confirm transfer"
      dismissible={false}
      showClose={false}
      renderFooter={(close) => (
        <>
          <Button variant="subtle" onClick={close}>
            Cancel
          </Button>
          <Button onClick={close}>Confirm</Button>
        </>
      )}
    >
      Backdrop click and Esc are disabled — you must choose Cancel or Confirm.
    </ControlledModal>
  ),
};

/** Destructive confirmation: danger trigger + danger confirm action. */
export const ConfirmationDanger: Story = {
  name: 'Confirmation (danger)',
  args: { title: 'Delete account?' },
  render: () => (
    <ControlledModal
      trigger="Delete account"
      triggerVariant="danger"
      title="Delete account?"
      renderFooter={(close) => (
        <>
          <Button variant="subtle" onClick={close}>
            Cancel
          </Button>
          <Button variant="danger" onClick={close}>
            Delete account
          </Button>
        </>
      )}
    >
      This permanently deletes the account and all associated data. This action
      cannot be undone.
    </ControlledModal>
  ),
};
