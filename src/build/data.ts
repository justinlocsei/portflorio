import fs from 'fs-extra';

import { COLOR_IDS } from '../core/colors.ts';
import { toJSON } from '../core/data.ts';
import { summarizeFlowers } from '../core/flowers.ts';
import { getISODate } from '../core/time.ts';
import { sortBy } from '../core/utils.ts';
import type {
  PackedArrangedFlower,
  PackedArrangement
} from '../site/types.ts';
import paths from './paths.ts';
import type { ProcessedArrangement } from './types.ts';

import path from 'node:path';

/**
 * Create a function to pack values in an array using indexes
 */
function createArrayPacker(values: string[]): (value: string) => number {
  const indexes = new Map(values.map((v, i) => [v, i]));

  return value => {
    const index = indexes.get(value);

    if (index === undefined) {
      throw new Error(`Unknown value: ${value}`);
    }

    return index;
  };
}

/**
 * Generate data files used by the site
 */
export async function generateSiteData(
  arrangements: ProcessedArrangement[]
): Promise<void> {
  const root = paths.generated;
  const flowerNames = summarizeFlowers(arrangements).map(f => f.name);

  const packFlower = createArrayPacker(flowerNames);
  const packColor = createArrayPacker(COLOR_IDS);

  await fs.mkdir(root, { recursive: true });

  await writeJSON(
    flowerNames.toSorted(),
    path.join(root, 'flowers.json')
  );

  await writeJSON(
    sortBy(arrangements, a => a.id).map((a): PackedArrangement => [
      getISODate(a.date),
      a.id,
      a.mechanic,
      a.flowers.flatMap(f =>
        f.color.map((color): PackedArrangedFlower => [
          packFlower(f.name),
          packColor(color)
        ])
      ),
      a.images.full,
      a.images.preview
    ]),
    path.join(root, 'arrangements.json')
  );
}

/**
 * Write a value to a JSON file
 */
export function writeJSON(value: unknown, target: string): Promise<void> {
  return fs.writeFile(target, `${toJSON(value)}\n`);
}
