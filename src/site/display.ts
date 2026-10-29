import { listItems } from '../core/text.ts';
import type { Arrangement, Dimensions, Mechanic } from '../core/types.ts';

const MECHANIC_LABELS: Record<Mechanic, string> = {
  foam: 'Foam',
  kenzan: 'Kenzan',
  wire: 'Wire'
};

/**
 * Produce a description of an arrangement
 */
export function describeArrangement(arrangement: Arrangement): string {
  const flowers = arrangement.flowers.flatMap(f => {
    return f.colors.map(c => `${c} ${f.name.toLocaleLowerCase()}`);
  });

  return `A floral arrangement with ${listItems(flowers, 'and')}`;
}

/**
 * Produce a readable label for a mechanic
 */
export function labelMechanic(id: Mechanic): string {
  return MECHANIC_LABELS[id];
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
