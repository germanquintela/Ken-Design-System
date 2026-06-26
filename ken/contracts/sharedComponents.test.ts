import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Components proven server-renderable. APPEND as each migration lands.
const SHARED = [
  'Logo/Logo',
  'Spinner/Spinner',
  'StackLogo/StackLogo',
  'Box/Box',
  'Text/Text',
  'Badge/Badge',
  'Kbd/Kbd',
  'Skeleton/Skeleton',
  'ShimmerText/ShimmerText',
  'UserMessage/UserMessage',
  'Avatar/AvatarGroup',
  'Avatar/Avatar',
  'Separator/Separator',
  'CodePreview/CodePreview',
  'LinkButton/LinkButton',
  'Card/Card',
];

const CLIENT_SIGNALS = [
  /^\s*['"]use client['"]/m,
  /@base-ui-components\/react\/use-render/,
  /\buse(State|Effect|Ref|Reducer|LayoutEffect|Context|Id|Transition|DeferredValue|SyncExternalStore|Optimistic|ActionState|Router|Pathname|SearchParams)\s*\(/,
];

const root = resolve(__dirname, '..', 'components');

describe('shared component contract', () => {
  for (const rel of SHARED) {
    it(`${rel} is free of client-forcing signals`, () => {
      const src = readFileSync(resolve(root, `${rel}.tsx`), 'utf8');
      const hits = CLIENT_SIGNALS.filter((re) => re.test(src));
      expect(
        hits,
        `${rel} must be a shared (server-renderable) component — found client signal(s). Use renderPoly and drop 'use client'.`,
      ).toEqual([]);
    });
  }
});
