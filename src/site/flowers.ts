import { COLOR_IDS } from '../core/colors.ts';
import type { ArrangedFlower, Color } from '../core/types.ts';
import { sortBy } from '../core/utils.ts';
import flowerList from './generated/flowers.json' with { type: 'json' };
import type { PackedArrangedFlower } from './types.ts';

export const flowers = flowerList as string[];

/**
 * Resolve packed flowers
 */
export function unpackFlowers(
  packed: PackedArrangedFlower[]
): ArrangedFlower[] {
  const flowerColors = new Map<string, Color[]>();

  for (const [flowerIndex, colorIndex] of packed) {
    const name = flowers[flowerIndex];
    const color = COLOR_IDS[colorIndex];

    if (name === undefined) {
      throw new Error(`Invalid flower index: ${flowerIndex}`);
    }

    if (color === undefined) {
      throw new Error(`Invalid color index: ${colorIndex}`);
    }

    if (!flowerColors.has(name)) {
      flowerColors.set(name, []);
    }

    flowerColors.get(name)?.push(color);
  }

  return sortBy(
    Array
      .from(flowerColors.entries())
      .map(
        ([name, colors]): ArrangedFlower => {
          return { color: colors.toSorted(), name };
        }
      ),
    f => f.name
  );
}
