import { addons } from 'storybook/manager-api';
import { kenLight } from './theme';

// Theme the chrome (sidebar, toolbar, brand). Light-only by decision.
addons.setConfig({
  theme: kenLight,
});
