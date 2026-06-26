import type { LucideIcon } from 'lucide-react';
import { Box, User2 } from 'lucide-react';

/** A curated prompt suggestion shown in the chat empty state. */
export interface PromptSuggestion {
  /** Short chip label. */
  label: string;
  /** Leading chip icon (a Lucide component, rendered + auto-sized by Pill). */
  icon: LucideIcon;
  /** Full text dropped into the chat input when the chip is clicked. */
  prompt: string;
}

/**
 * Starter prompts surfaced in the empty chat. Clicking a chip pre-fills the
 * input (it does not auto-send), so `prompt` carries the fuller phrasing while
 * `label` stays short. Deliberately small, single-component asks — the kind of
 * thing the builder can render well in one shot.
 */
export const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  {
    label: 'All 3 buttons in a row',
    icon: Box,
    prompt:
      'Create a row with 3 buttons in a row, with some lorem ipsum text and box icons',
  },
  {
    label: 'Card with avatar',
    icon: User2,
    prompt: 'Create a card with an avatar and Success Payment confim badge',
  },
];
