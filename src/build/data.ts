import fs from 'fs-extra';

import { toJSON } from '../core/data.ts';
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
 * Pack an arrangement for the site
 */
function packArrangement(arrangement: ProcessedArrangement): PackedArrangement {
  const { date, details, id, images } = arrangement;

  return [
    getISODate(date),
    id,
    details.flowers,
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

  await fs.mkdir(root, { recursive: true });

  await writeJSON(
    sortBy(arrangements, a => a.guid).map(a => packArrangement(a)),
    path.join(root, 'arrangements.json')
  );
}

/**
 * Write a value to a JSON file
 */
export function writeJSON(value: unknown, target: string): Promise<void> {
  return fs.writeFile(target, `${toJSON(value)}\n`);
}
