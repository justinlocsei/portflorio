import { listItems } from '../core/text.ts';
import type { Arrangement } from '../core/types.ts';

/**
 * Produce the text of a post to share an arrangement
 */
export async function shareArrangement(
  arrangement: Arrangement
): Promise<string> {
  const [first, ...rest] = arrangement.flowers.map(f => f.name);

  return listItems(
    [first ?? '', ...rest.map(f => f.toLocaleLowerCase())].filter(
      Boolean
    ),
    'and'
  );
}
