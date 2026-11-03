import { listItems, sentenceCase } from '../core/text.ts';
import type { Arrangement } from '../core/types.ts';

/**
 * Produce the text of a post to share an arrangement
 */
export function shareArrangement(
  arrangement: Arrangement
): string {
  return sentenceCase(
    listItems(arrangement.flowers.map(f => f.name), 'and')
  );
}
