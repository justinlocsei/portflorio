import { COLOR_IDS } from '../core/colors.ts';
import type { ArrangedFlower } from '../core/types.ts';
import flowerList from './generated/flowers.json' with { type: 'json' };
import type { PackedArrangedFlower } from './types.ts';

export const flowers = flowerList as string[];

/**
 * Resolver flower indexes to names
 */
export function resolveArrangedFlowers(
  packed: PackedArrangedFlower[]
): ArrangedFlower[] {
  return packed.map(([flowerIndex, colorIndex]) => {
    const name = flowers[flowerIndex];
    const color = COLOR_IDS[colorIndex];

    if (name === undefined) {
      throw new Error(`Invalid flower index: ${flowerIndex}`);
    }

    if (color === undefined) {
      throw new Error(`Invalid color index: ${colorIndex}`);
    }

    return { color, name };
  });
}
