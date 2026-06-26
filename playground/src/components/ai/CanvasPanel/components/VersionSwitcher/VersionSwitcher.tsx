'use client';
import { History } from 'lucide-react';
import { Select } from '@ken/react';
import type { VersionEntry } from '@/schemas/version';

export interface VersionSwitcherProps {
  versions: VersionEntry[];
  current: number | null;
  onChange(version: number): void;
}

/** Jump to any version via a dropdown, labelled `v{idx}` in chat order. Per-turn
 *  chips in the chat offer the same jump inline. */
export function VersionSwitcher({
  versions,
  current,
  onChange,
}: VersionSwitcherProps) {
  if (!versions.length) return null;
  const idx = Math.max(
    0,
    versions.findIndex((v) => v.version === current),
  );
  const selected = versions[idx].version;

  const options = versions
    .map((v, i) => ({
      value: String(v.version),
      label: `v${i + 1}`,
    }))
    .reverse();

  return (
    <Select
      size="sm"
      aria-label="Version"
      icon={<History />}
      options={options}
      value={String(selected)}
      onValueChange={(next) => {
        if (next != null) onChange(Number(next));
      }}
    />
  );
}
