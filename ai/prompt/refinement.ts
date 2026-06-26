/** When the user is refining an existing canvas, the route prepends this so the
 *  model edits the current UI instead of starting from scratch. */
export function refinementMessage(baseSpec: unknown): {
  role: 'system';
  content: string;
} {
  return {
    role: 'system',
    content: `The user is refining an EXISTING UI. Modify this current spec to satisfy the new request, preserving everything not mentioned. Return the full updated envelope. CURRENT UI:\n${JSON.stringify(baseSpec)}`,
  };
}
