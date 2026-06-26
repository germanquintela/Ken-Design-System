import * as stylex from '@stylexjs/stylex';

/**
 * PRIMITIVES — the raw palette. The "what".
 *
 * Names + values mirror the Figma "Palette" variant set 1:1. This layer only
 * describes what each color IS; the JOB each one does ("hairline", "hover
 * fill", "focus ring") is assigned in ../tokens.
 *
 * PRIVATE layer: components must NEVER import this file. They consume the
 * semantic roles in ../tokens, which map each primitive to a job. Keeping
 * primitives private means the only thing a component can express is a design
 * decision, never a loose hex.
 *
 * Light-mode only, by decision — there are no dark values and none are coming.
 * Semantic tokens hold plain values (no light-dark()).
 */
export const palette = stylex.defineVars({
  paper: '#ffffff',
  lightLimestone: '#fcfcfa',
  limestone: '#ececea',
  darkLimestone: '#d2cecb',

  obsidian: '#0c0a08',
  charcoal: '#1a1919',

  lightSmoke: '#f5f5f4',
  smoke: '#999ba3',
  darkSmoke: '#4d505d',

  lightLime: '#f5ff78',
  lime: '#e4f222',
  darkLime: '#2a2414',

  success: '#24853a',
  successStrong: '#01b14b',
  error: '#c64a2a',
  warning: '#bf9749',
  info: '#5683d2',

  identityYellow: '#d8d07a',
  identityBlue: '#aebbe2',
  identityGreen: '#b5c3af',
});
