'use client';

import * as stylex from '@stylexjs/stylex';
import { createContext, forwardRef, useContext, useMemo } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import * as s from './Table.styles';

// StyleX has no descendant selectors, so the root can't reach its cells; the
// striped/hover/bordered flags travel down through context and each row/cell
// applies its own StyleX. `section` keeps striping/hover/dividers on body rows only.

type Alignment = 'left' | 'center' | 'right';

interface TableState {
  striped: boolean;
  hover: boolean;
  bordered: boolean;
}

const TableContext = createContext<TableState>({
  striped: false,
  hover: false,
  bordered: false,
});
const SectionContext = createContext<'head' | 'body'>('body');

export interface TableProps
  extends Omit<ComponentPropsWithoutRef<'table'>, 'className' | 'style'> {
  /** Tint even body rows with the faint "limestone light" band. Default `false`. */
  striped?: boolean;
  /** Highlight a body row on hover. Default `false`. */
  hover?: boolean;
  /** Add the outer box + vertical column dividers (full grid). Default `false`. */
  bordered?: boolean;
}

export interface TableSectionProps
  extends Omit<ComponentPropsWithoutRef<'thead'>, 'className' | 'style'> {}

export interface TableRowProps
  extends Omit<ComponentPropsWithoutRef<'tr'>, 'className' | 'style'> {}

export interface TableHeaderCellProps
  extends Omit<
    ComponentPropsWithoutRef<'th'>,
    'className' | 'style' | 'align'
  > {
  /** Text alignment. Pair `right` with numbers. Default `left`. */
  align?: Alignment;
}

export interface TableCellProps
  extends Omit<
    ComponentPropsWithoutRef<'td'>,
    'className' | 'style' | 'align'
  > {
  /** Text alignment. Pair `right` with numbers. Default `left`. */
  align?: Alignment;
}

/**
 * **Table** — Ken's data-display centerpiece: a compound component over semantic
 * `<table>` markup. Compose it from `Table.Head` · `Table.Body` · `Table.Row` ·
 * `Table.HeaderCell` · `Table.Cell`. Three independent display flags live on the
 * root — `striped` (zebra-tint even body rows), `hover` (highlight a body row),
 * and `bordered` (outer box + vertical column dividers). Cells take any children;
 * pair numeric columns with `align="right"` for clean tabular figures.
 *
 * @example
 * ```tsx
 * <Table striped hover>
 *   <Table.Head>
 *     <Table.Row>
 *       <Table.HeaderCell>Vendor</Table.HeaderCell>
 *       <Table.HeaderCell align="right">Amount</Table.HeaderCell>
 *     </Table.Row>
 *   </Table.Head>
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.Cell>Figma</Table.Cell>
 *       <Table.Cell align="right">$144.00</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
 * </Table>
 * ```
 */
const TableRoot = forwardRef<HTMLTableElement, TableProps>(function Table(
  { striped = false, hover = false, bordered = false, children, ...rest },
  ref,
) {
  const state = useMemo<TableState>(
    () => ({ striped, hover, bordered }),
    [striped, hover, bordered],
  );
  return (
    <TableContext.Provider value={state}>
      <table
        ref={ref}
        {...rest}
        {...stylex.props(s.table.base, bordered && s.table.bordered)}
      >
        {children}
      </table>
    </TableContext.Provider>
  );
});

/** **Table.Head** — the `<thead>` section. Wrap one or more header `Table.Row`s
 *  here; striping, hover and row dividers are suppressed inside it. */
const TableHead = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function TableHead({ children, ...rest }, ref) {
    return (
      <SectionContext.Provider value="head">
        <thead ref={ref} {...rest}>
          {children}
        </thead>
      </SectionContext.Provider>
    );
  },
);

/** **Table.Body** — the `<tbody>` section. The root's `striped`, `hover` and the
 *  row dividers apply to its rows only. */
const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function TableBody({ children, ...rest }, ref) {
    return (
      <SectionContext.Provider value="body">
        <tbody ref={ref} {...rest}>
          {children}
        </tbody>
      </SectionContext.Provider>
    );
  },
);

/** **Table.Row** — a `<tr>`. In the body it picks up the root's `striped` /
 *  `hover` background and the bottom divider; in the head it stays plain. */
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({ children, ...rest }, ref) {
    const { striped, hover } = useContext(TableContext);
    const isBody = useContext(SectionContext) === 'body';
    // Striping, hover and the divider are body-only. Pick exactly one background
    // owner so the stripe + hover states never collide on `background-color`.
    const background =
      striped && hover
        ? s.row.stripedHover
        : striped
          ? s.row.striped
          : hover
            ? s.row.hover
            : null;
    return (
      <tr
        ref={ref}
        {...rest}
        {...stylex.props(isBody && s.row.divider, isBody && background)}
      >
        {children}
      </tr>
    );
  },
);

/** **Table.HeaderCell** — a `<th scope="col">` column header. Use inside
 *  `Table.Head`; pass `align` to match its column's body cells. */
const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  function TableHeaderCell({ align: alignProp, children, ...rest }, ref) {
    const { bordered } = useContext(TableContext);
    return (
      <th
        ref={ref}
        scope="col"
        {...rest}
        {...stylex.props(
          s.headerCell.base,
          alignProp && s.align[alignProp],
          bordered && s.cellBordered.on,
        )}
      >
        {children}
      </th>
    );
  },
);

/** **Table.Cell** — a `<td>` body cell. Takes any children; `align="right"` suits
 *  numeric columns. */
const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell({ align: alignProp, children, ...rest }, ref) {
    const { bordered } = useContext(TableContext);
    return (
      <td
        ref={ref}
        {...rest}
        {...stylex.props(
          s.cell.base,
          alignProp && s.align[alignProp],
          bordered && s.cellBordered.on,
        )}
      >
        {children}
      </td>
    );
  },
);

TableRoot.displayName = 'Table';
TableHead.displayName = 'Table.Head';
TableBody.displayName = 'Table.Body';
TableRow.displayName = 'Table.Row';
TableHeaderCell.displayName = 'Table.HeaderCell';
TableCell.displayName = 'Table.Cell';

export const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
});
