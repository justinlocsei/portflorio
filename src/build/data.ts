import fs from 'fs-extra';

import { toJSON } from '../core/data.ts';
import { summarizeFlowers } from '../core/flowers.ts';
import { getISODate } from '../core/time.ts';
import type { Image } from '../core/types.ts';
import { sortBy } from '../core/utils.ts';
import type { PackedArrangement, PackedImage } from '../site/types.ts';
import { getPaths } from './paths.ts';
import type { ProcessedArrangement } from './types.ts';

import path from 'node:path';

/**
 * Pack an image
 */
function packImage({ height, url, width }: Image): PackedImage {
  return [width, height, url];
}

/**
 * Pack flower names for an arrangement as global indexes
 */
function packFlowers(
  names: string[],
  allNames: string[]
): number[] {
  const indexes = new Map(allNames.map((name, i) => [name, i]));

  return names.map(name => {
    const index = indexes.get(name);

    if (index === undefined) {
      throw new Error(`No index found for flower: ${name}`);
    }

    return index;
  });
}

/**
 * Pack an arrangement for the site
 */
function packArrangement(
  arrangement: ProcessedArrangement,
  flowers: string[]
): PackedArrangement {
  const { date, details, id, images } = arrangement;

  return [
    getISODate(date),
    id,
    packFlowers(details.flowers, flowers),
    packImage(images.full),
    packImage(images.thumbnail)
  ];
}

/**
 * Generate data files used by the site
 */
export async function generateSiteData(
  arrangements: ProcessedArrangement[]
): Promise<void> {
  const root = getPaths().generated;
  const flowers = summarizeFlowers(arrangements).map(f => f.name);

  await fs.mkdir(root, { recursive: true });

  await writeJSON(flowers, path.join(root, 'flowers.json'));

  await writeJSON(
    sortBy(arrangements, a => a.guid).map(a => packArrangement(a, flowers)),
    path.join(root, 'arrangements.json')
  );
}

/**
 * Write a value to a JSON file
 */
export function writeJSON(value: unknown, target: string): Promise<void> {
  return fs.writeFile(target, `${toJSON(value)}\n`);
}
