// Sharp edges encoded here:
//  - Button variants: default|subtle|secondary|ghost|success|warning|danger (NO "primary").
//  - IconButton variants include "primary".
//  - Table sections: Table.Head (not "Header"), Table.Body, Table.Row, Table.HeaderCell, Table.Cell.
//  - icon-bearing props (type:"node") are filled with an Icon node: {type:"Icon",props:{name:"Plus"}}.
//  - Select/MultiSelect "options[].icon" => ReactNode element; ToggleGroup "items[].icon" => Lucide component.

export type PropType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'enum'
  | 'options'
  | 'node'
  | 'other';

export interface PropSpec {
  name: string;
  type: PropType;
  enum?: string[];
  required?: boolean;
  description?: string;
}

export interface SubcomponentSpec {
  name: string;
  description?: string;
  acceptsChildren: boolean;
  childrenKind: 'none' | 'text' | 'nodes';
  props: PropSpec[];
}

export interface CatalogEntry {
  name: string;
  description: string;
  acceptsChildren: boolean;
  childrenKind: 'none' | 'text' | 'nodes';
  props: PropSpec[];
  subcomponents: SubcomponentSpec[];
}
