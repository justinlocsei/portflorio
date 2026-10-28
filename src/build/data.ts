import fs from 'fs-extra';

import { toJSON } from '../core/data.ts';
import { summarizeFlowers } from '../core/flowers.ts';
import { getISODate } from '../core/time.ts';
import { sortBy } from '../core/utils.ts';
import type { PackedArrangement } from '../site/types.ts';
import paths from './paths.ts';
import type { ProcessedArrangement } from './types.ts';

import path from 'node:path';

/**
 * Generate data files used by the site
 */
export async function generateSiteData(
  arrangements: ProcessedArrangement[]
): Promise<void> {
  const root = paths.generated;

  const flowerNames = summarizeFlowers(arrangements).map(f => f.name);
  const flowerIndexes = new Map(flowerNames.map((name, i) => [name, i]));

  await fs.mkdir(root, { recursive: true });

  await writeJSON(
    flowerNames.toSorted(),
    path.join(root, 'flowers.json')
  );

  await writeJSON(
    sortBy(arrangements, a => a.id).map((a): PackedArrangement => [
      getISODate(a.date),
      a.id,
      a.flowers.map(f => flowerIndexes.get(f) ?? 0),
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
