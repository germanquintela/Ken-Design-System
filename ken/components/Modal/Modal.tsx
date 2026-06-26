'use client';

import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import { Dialog } from '@base-ui-components/react/dialog';
import { X } from 'lucide-react';
import { IconButton } from '../IconButton';
import { iconSize } from '../../theme/foundations/iconSize';
import * as s from './Modal.styles';

export interface ModalProps {
  /** Whether the modal is open (controlled). */
  open?: boolean;
  /** Initial open state for an uncontrolled modal. */
  defaultOpen?: boolean;
  /** Called when the modal requests to open / close. Simplified to the boolean. */
  onOpenChange?: (open: boolean) => void;
  /** Header title — renders the labelled header row and sets the dialog's accessible name. */
  title: ReactNode;
  /** Optional footer slot — you decide what goes here (e.g. Cancel / Confirm). */
  footer?: ReactNode;
  /**
   * When false, backdrop click and Esc no longer close the modal (Base UI's
   * AlertDialog "must choose an action" behaviour). The X, if shown, still
   * closes. Default true.
   */
  dismissible?: boolean;
  /** Show the built-in close “X”. Default true. */
  showClose?: boolean;
  /** The modal body. */
  children?: ReactNode;
}

/**
 * **Modal** — a centred dialog over a scrim, and Ken's first portal/overlay
 * surface. Built on Base UI Dialog (focus trap, scroll lock, `Esc`, a11y).
 *
 * Props-driven slots (not compound): drive `open` from your own state, pass a
 * required `title` (also the accessible name) and an optional `footer` (you own
 * its contents); the body is `children`. The close `X` and the scrim are built
 * in. Set `dismissible={false}` to lock it (backdrop + `Esc` no longer close) —
 * Base UI's AlertDialog behaviour without a second primitive, for confirmations
 * that must resolve to a footer action.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * <Modal
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Delete invoice?"
 *   footer={
 *     <>
 *       <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
 *       <Button variant="primary" onClick={confirm}>Delete</Button>
 *     </>
 *   }
 * >
 *   This cannot be undone.
 * </Modal>
 * ```
 */
export function Modal({
  open,
  defaultOpen,
  onOpenChange,
  title,
  footer,
  dismissible = true,
  showClose = true,
  children,
}: ModalProps) {
  return (
    <Dialog.Root
      open={open}
      defaultOpen={defaultOpen}
      disablePointerDismissal={!dismissible} // blocks backdrop / outside-press close
      onOpenChange={(nextOpen, details) => {
        // Lock mode: swallow Esc-initiated closes (outside-press is already
        // blocked above). The X stays live — it closes with reason `close-press`.
        if (!dismissible && !nextOpen && details.reason === 'escape-key') {
          details.cancel();
          return;
        }
        onOpenChange?.(nextOpen);
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop {...stylex.props(s.backdrop.base)} />
        <Dialog.Popup {...stylex.props(s.popup.base)}>
          {showClose && (
            <div {...stylex.props(s.close.base)}>
              <Dialog.Close
                render={
                  <IconButton variant="ghost" size="sm" aria-label="Close">
                    <X size={iconSize.sm} />
                  </IconButton>
                }
              />
            </div>
          )}

          <div {...stylex.props(s.header.base)}>
            <Dialog.Title {...stylex.props(s.title.base)}>{title}</Dialog.Title>
          </div>

          <div
            {...stylex.props(s.body.base, footer == null && s.body.noFooter)}
          >
            {children}
          </div>

          {footer != null && (
            <div {...stylex.props(s.footer.base)}>{footer}</div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
