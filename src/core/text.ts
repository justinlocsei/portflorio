/**
 * Show a list of items with serial commas
 */
export function listItems(
  items: string[],
  joiner: 'and' | 'or'
): string {
  if (items.length < 3) {
    return items.join(` ${joiner} `);
  }

  const last = items.at(-1);
  const rest = items.slice(0, -1).join(', ');

  return `${rest}, ${joiner} ${last}`;
}
