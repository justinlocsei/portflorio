import { listItems } from '../core/text.ts';
import type { Arrangement, Dimensions, Mechanic } from '../core/types.ts';

export const MECHANIC_LABELS: Record<Mechanic, string> = {
  foam: 'Foam',
  kenzan: 'Kenzan',
  wire: 'Wire'
};

/**
 * Produce a description of an arrangement
 */
export function describeArrangement(arrangement: Arrangement): string {
  const flowers = arrangement
    .flowers
    .map(f => `${f.color} ${f.name.toLocaleLowerCase()}`);

  return `A floral arrangement with ${listItems(flowers, 'and')}`;
}

/**
 * Scale dimensions by a factor
 */
export function scaleBy(dimensions: Dimensions, factor: number): Dimensions {
  return {
    height: dimensions.height * factor,
    width: dimensions.width * factor
  };
}
