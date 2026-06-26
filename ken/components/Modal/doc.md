---
title: Modal
component: Modal
description: A centred dialog over a scrim — focus-trapped, scroll-locked, and built for actions that need full attention.
status: stable
category: Overlays
---

Modal is fully controlled: you own the `open` state and drive `onOpenChange`. Ken handles the focus trap, scroll lock, backdrop, Esc, and the built-in "X" — your job is the title, the body, and an optional footer.

## Basic usage

```tsx
const [open, setOpen] = React.useState(false);

<>
  <Button onClick={() => setOpen(true)}>Edit vendor</Button>
  <Modal
    open={open}
    onOpenChange={setOpen}
    title="Edit vendor"
    footer={
      <>
        <Button variant="subtle" onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={() => setOpen(false)}>Save changes</Button>
      </>
    }
  >
    Update the vendor's billing details. Changes apply to future invoices only.
  </Modal>
</>
```

## Destructive confirmation

Reach for the danger variant when the action is irreversible. A clear title and a destructive confirm keep the choice unambiguous.

```tsx
const [open, setOpen] = React.useState(false);

<>
  <Button variant="danger" onClick={() => setOpen(true)}>Delete account</Button>
  <Modal
    open={open}
    onOpenChange={setOpen}
    title="Delete account?"
    footer={
      <>
        <Button variant="subtle" onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="danger" onClick={() => setOpen(false)}>Delete account</Button>
      </>
    }
  >
    This permanently deletes the account and all associated data. This action cannot be undone.
  </Modal>
</>
```

## Non-dismissible (locked)

`dismissible={false}` blocks backdrop click and Esc. The user must resolve the modal through a footer action. Pair it with `showClose={false}` for a clean AlertDialog pattern.

```tsx
const [open, setOpen] = React.useState(false);

<>
  <Button onClick={() => setOpen(true)}>Confirm transfer</Button>
  <Modal
    open={open}
    onOpenChange={setOpen}
    title="Confirm transfer"
    dismissible={false}
    showClose={false}
    footer={
      <>
        <Button variant="subtle" onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={() => setOpen(false)}>Confirm</Button>
      </>
    }
  >
    Backdrop click and Esc are disabled — you must choose Cancel or Confirm.
  </Modal>
</>
```

## Long body

The body scrolls independently; the title row and footer stay pinned. No extra configuration needed.

```tsx
const [open, setOpen] = React.useState(false);

<>
  <Button onClick={() => setOpen(true)}>View terms</Button>
  <Modal
    open={open}
    onOpenChange={setOpen}
    title="Terms of service"
    footer={
      <>
        <Button variant="subtle" onClick={() => setOpen(false)}>Decline</Button>
        <Button onClick={() => setOpen(false)}>Accept</Button>
      </>
    }
  >
    {Array.from({ length: 16 }).map((_, i) => (
      <p key={i}>
        {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit…
      </p>
    ))}
  </Modal>
</>
```
