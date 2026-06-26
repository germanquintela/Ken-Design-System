'use client';

import * as stylex from '@stylexjs/stylex';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ElementType, ReactNode } from 'react';
import { color } from '@ken/react/theme/tokens/color.stylex';
import { styles } from '../../navItem.styles';

// Current-route emphasis is NavLink-only (SearchNavItem has no active state).
const active = stylex.create({
  base: {
    color: color.textPrimary,
    backgroundColor: color.backgroundNeutral,
  },
});

export interface NavLinkProps {
  href: string;
  icon?: ElementType;
  children: ReactNode;
}

export function NavLink({ href, icon: Icon, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      {...stylex.props(styles.link, isActive && active.base)}
    >
      {Icon && <Icon size={16} aria-hidden {...stylex.props(styles.icon)} />}
      <span {...stylex.props(styles.label)}>{children}</span>
    </Link>
  );
}
