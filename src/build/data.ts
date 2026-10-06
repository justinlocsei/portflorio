import { toJSON } from '../core/data.ts';
import { getISODate } from '../core/time.ts';
import type { Arrangement as LoadedArrangement } from '../core/types.ts';
import { sortBy } from '../core/utils.ts';
import type { PackedArrangement } from '../site/types.ts';
import { getPaths } from './paths.ts';

import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Pack an arrangement for the site
 */
function packArrangement(arrangement: LoadedArrangement): PackedArrangement {
  const { date, details, id } = arrangement;

  return [
    getISODate(date),
    id,
    details.flowers
  ];
}

/**
 * Generate data files used by the site
 */
export async function generateSiteData(
  arrangements: LoadedArrangement[]
): Promise<void> {
  const root = getPaths().generated;

  await fs.mkdir(root, { recursive: true });

  await writeJSON(
    sortBy(arrangements, a => a.guid).map(packArrangement),
    path.join(root, 'arrangements.json')
  );
}

/**
 * Write a value to a JSON file
 */
export function writeJSON(value: unknown, target: string): Promise<void> {
  return fs.writeFile(target, `${toJSON(value)}\n`);
}
