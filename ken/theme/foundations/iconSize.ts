/**
 * ICON SIZE — plain TS map (not StyleX): Lucide takes a numeric `size` prop,
 * not CSS, so these are numbers. Keyed by the canonical control-size scale so a
 * control's icon always matches its label size.
 */
export const iconSize = { sm: 12, md: 14, lg: 16 } as const;

/** The canonical control-size union, shared across Button/IconButton/inputs. */
export type ControlSize = keyof typeof iconSize;
