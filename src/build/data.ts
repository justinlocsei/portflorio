import fs from 'fs-extra';

import { toJSON } from '../core/data.ts';
import { getISODate } from '../core/time.ts';
import { sortBy } from '../core/utils.ts';
import type { PackedArrangement } from '../site/types.ts';
import { getPaths } from './paths.ts';
import type { ProcessedArrangement } from './types.ts';

import path from 'node:path';

/**
 * Pack an arrangement for the site
 */
function packArrangement(arrangement: ProcessedArrangement): PackedArrangement {
  const { date, details, id, images } = arrangement;

  return [
    getISODate(date),
    id,
    details.flowers,
    images.full,
    images.thumbnail
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
