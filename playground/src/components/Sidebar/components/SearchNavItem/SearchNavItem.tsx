'use client';

import * as stylex from '@stylexjs/stylex';
import { Search } from 'lucide-react';
import { Kbd } from '@ken/react';
import { styles } from '../../navItem.styles';

/**
 * SearchNavItem — the sidebar "Search" row. Looks identical to a NavLink (shared
 * styles) but is a <button> trigger: leading magnifier, "Search" label, trailing
 * ⌘K keycap. No active/route state — it opens the command palette via `onClick`.
 *
 * The trailing cap rides to the right edge via the shared label's `flexGrow: 1`
 * (Kbd has no external style hatch — it overwrites a passed className with its own
 * stylex.props — so the push must come from a sibling growing, not the cap itself).
 */
export function SearchNavItem({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...stylex.props(styles.link, styles.button)}
    >
      <Search size={16} aria-hidden {...stylex.props(styles.icon)} />
      <span {...stylex.props(styles.label)}>Search</span>
      <Kbd size="sm" aria-hidden>
        ⌘K
      </Kbd>
    </button>
  );
}
