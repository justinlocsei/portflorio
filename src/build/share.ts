import { listItems } from '../core/text.ts';
import type { Arrangement } from '../core/types.ts';

/**
 * Produce the text of a post to share an arrangement
 */
export async function shareArrangement(
  arrangement: Arrangement
): Promise<string> {
  const [first, ...rest] = arrangement.flowers.toSorted();

  return listItems(
    [first?.name ?? '', ...rest.map(f => f.name.toLocaleLowerCase())].filter(
      Boolean
    ),
    'and'
  );
}
