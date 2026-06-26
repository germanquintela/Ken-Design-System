'use client';
import * as React from 'react';
import * as Lucide from 'lucide-react';
import type { KenNode, KenElement } from '@ken/ai';
import { REGISTRY, IconNode } from './registry';

const isElement = (v: unknown): v is KenElement =>
  !!v &&
  typeof v === 'object' &&
  typeof (v as { type?: unknown }).type === 'string';

function resolveOptionIcon(icon: unknown): unknown {
  // Select/MultiSelect options expect a ReactNode element.
  return typeof icon === 'string' ? <IconNode name={icon} /> : icon;
}
function resolveItemIcon(icon: unknown): unknown {
  // ToggleGroup items expect a Lucide COMPONENT.
  if (typeof icon !== 'string') return icon;
  return (Lucide as unknown as Record<string, unknown>)[icon] ?? Lucide.Square;
}

function resolveProps(
  props: Record<string, unknown> | undefined,
): Record<string, unknown> {
  if (!props) return {};
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(props)) {
    if (k === 'options' && Array.isArray(v)) {
      out[k] = v.map((o) =>
        o && typeof o === 'object'
          ? { ...o, icon: resolveOptionIcon((o as { icon?: unknown }).icon) }
          : o,
      );
    } else if (k === 'items' && Array.isArray(v)) {
      out[k] = v.map((it) =>
        it && typeof it === 'object'
          ? { ...it, icon: resolveItemIcon((it as { icon?: unknown }).icon) }
          : it,
      );
    } else if (isElement(v)) {
      out[k] = <KenRenderer node={v} />;
    } else if (Array.isArray(v) && v.some(isElement)) {
      out[k] = v.map((n, i) => <KenRenderer key={i} node={n as KenNode} />);
    } else {
      out[k] = v;
    }
  }
  return out;
}

export function KenRenderer({
  node,
}: {
  node: KenNode | null;
}): React.ReactElement | null {
  if (node == null) return null;
  if (typeof node === 'string') return <>{node}</>;

  const Cmp = REGISTRY[node.type];
  if (!Cmp) return null;

  const props = resolveProps(node.props);
  const children = node.children?.map((c, i) => (
    <KenRenderer key={i} node={c} />
  ));
  return <Cmp {...props}>{children}</Cmp>;
}

export class PreviewBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  componentDidUpdate(prev: { children: React.ReactNode }) {
    // Reset when a new spec is rendered.
    if (prev.children !== this.props.children && this.state.error)
      this.setState({ error: false });
  }
  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <p style={{ color: 'crimson' }}>This layout could not be rendered.</p>
        )
      );
    }
    return this.props.children;
  }
}
