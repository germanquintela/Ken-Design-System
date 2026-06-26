export interface KenElement {
  type: string;
  props?: Record<string, unknown>;
  children?: KenNode[];
}
export type KenNode = string | KenElement;
