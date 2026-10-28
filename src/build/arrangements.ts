import fs from 'fs-extra';

import { getISODate, parseDate, tryISODate } from '../core/time.ts';
import type { Arrangement, ArrangementImages } from '../core/types.ts';
import { writeJSON } from './data.ts';
import paths from './paths.ts';
import type {
  ArrangementMetadata,
  ArrangementPaths,
  StoredArrangement
} from './types.ts';

import path from 'node:path';

const ID_LENGTH = 4;
const IS_ID = new RegExp(`^\\d{${ID_LENGTH}}$`);

/**
 * Format an arrangement ID for storage
 */
function asStoredID(id: number): string {
  return `${id}`.padStart(ID_LENGTH, '0');
}

/**
 * Add an arragement
 */
export async function addArrangement({
  date: customDate,
  flowers,
  images
}: {
  date?: string;
  flowers: string[];
  images: ArrangementImages<string>;
}): Promise<StoredArrangement> {
  const id = (await countArrangements()) + 1;
  const stored = getStoragePaths(id);

  await fs.mkdir(stored.directory);

  const meta: ArrangementMetadata = {
    date: customDate ? tryISODate(customDate) : getISODate(),
    flowers: [...flowers].sort()
  };

  await writeJSON(meta, stored.meta);
  await fs.copyFile(images.full, stored.images.full);
  await fs.copyFile(images.preview, stored.images.preview);

  return loadArrangement(id);
}

/**
 * Count the number of stored arrangements
 */
async function countArrangements(): Promise<number> {
  const directories =
    (await fs.readdir(paths.arrangements, { withFileTypes: true }))
      .filter(d => d.isDirectory())
      .filter(d => IS_ID.test(d.name));

  return directories.length;
}

/**
 * Produce the paths for a stored arrangement
 */
function getStoragePaths(id: number): ArrangementPaths {
  const directory = path.join(paths.arrangements, asStoredID(id));
  const asPath = (name: string) => path.join(directory, name);

  return {
    meta: asPath('meta.json'),
    directory,
    images: {
      full: asPath('full.jpg'),
      preview: asPath('preview.jpg')
    }
  };
}

/**
 * Load a stored arrangement
 */
async function loadArrangement(id: number): Promise<StoredArrangement> {
  const stored = getStoragePaths(id);

  const meta: ArrangementMetadata = await JSON.parse(
    await fs.readFile(stored.meta, 'utf8')
  );

  return {
    date: parseDate(tryISODate(meta.date)),
    flowers: meta.flowers,
    id,
    paths: stored
  };
}

/**
 * Load all stored arrangements
 */
export async function loadArrangements(): Promise<StoredArrangement[]> {
  const requests: Promise<StoredArrangement>[] = [];

  for (let i = 1; i <= await countArrangements(); i += 1) {
    requests.push(loadArrangement(i));
  }

  return Promise.all(requests);
}

/**
 * Pick an arrangement from a list
 */
export function pickArrangement<T extends Arrangement>(
  available: T[],
  id: number
): T {
  const found = available.find(a => a.id === id);

  if (!found) {
    throw new Error(`Arrangement not found: ${id}`);
  }

  return found;
}
