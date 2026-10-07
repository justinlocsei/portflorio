import fs from 'fs-extra';

import { asID, selectorToGUID } from '../core/arrangements.ts';
import { getISODate } from '../core/time.ts';
import type {
  Arrangement,
  ArrangementDetails,
  ArrangementPaths,
  StoredArrangement
} from '../core/types.ts';
import { writeJSON } from './data.ts';
import { isFile } from './fs.ts';
import paths from './paths.ts';

import path from 'node:path';

/**
 * Add an arragement
 */
export async function addArrangement({
  date,
  flowers,
  image: imagePath
}: {
  date?: string;
  flowers: string[];
  image: string;
}): Promise<Arrangement> {
  const details: ArrangementDetails = {
    flowers: [...flowers].sort()
  };

  const directory = path.join(
    paths.arrangements,
    date || getISODate()
  );

  await fs.mkdir(directory, { recursive: true });

  const others = await findArrangementsIn(directory);
  const id = others.length + 1;

  const stored = getStoragePaths(directory, id);

  await fs.copyFile(imagePath, stored.image);
  await writeJSON(details, stored.details);

  return loadArrangement(await getStoredArrangement(directory, id));
}

/**
 * Produce the paths for an arrangement in a directory
 */
function getStoragePaths(directory: string, id: number): ArrangementPaths {
  const asPath = (ext: string) => path.join(directory, `${asID(id)}.${ext}`);

  return {
    details: asPath('json'),
    directory,
    image: asPath('jpg')
  };
}

/**
 * Produce a reference to a stored arrangement
 */
async function getStoredArrangement(
  directory: string,
  number: number
): Promise<StoredArrangement> {
  const id = asID(number);

  const paths = getStoragePaths(directory, number);
  const date = path.basename(directory);

  return {
    date: new Date(date),
    guid: selectorToGUID({ date, id }),
    id,
    paths
  };
}

/**
 * Report whether an arrangement appears to have valid files
 */
function arrangementHasFiles(paths: ArrangementPaths): Promise<boolean> {
  return Promise
    .all([paths.details, paths.image].map(isFile))
    .then(c => c.every(Boolean));
}

/**
 * List arrangements present in a directory
 */
async function findArrangementsIn(
  directory: string
): Promise<StoredArrangement[]> {
  const arrangements: StoredArrangement[] = [];

  for (let index = 1;; index += 1) {
    const stored = await getStoredArrangement(directory, index);

    if (await arrangementHasFiles(stored.paths)) {
      arrangements.push(stored);
    } else {
      break;
    }
  }

  return arrangements;
}

/**
 * Find all stored arrangements
 */
export async function findArrangements(): Promise<StoredArrangement[]> {
  const available: StoredArrangement[] = [];
  const root = paths.arrangements;

  for (const directory of await fs.readdir(root, { withFileTypes: true })) {
    if (directory.isDirectory()) {
      available.push(
        ...(await findArrangementsIn(path.join(root, directory.name)))
      );
    }
  }

  return available;
}

/**
 * Load a stored arrangement
 */
async function loadArrangement(
  stored: StoredArrangement
): Promise<Arrangement> {
  return {
    ...stored,
    details: JSON.parse(await fs.readFile(stored.paths.details, 'utf-8'))
  };
}

/**
 * Load information on all available arrangements
 */
export async function loadArrangements(): Promise<Arrangement[]> {
  const available: Arrangement[] = [];

  for (const arrangement of await findArrangements()) {
    available.push(await loadArrangement(arrangement));
  }

  return available;
}

/**
 * Pick an arrangement from a list
 */
export function pickArrangement(
  available: Arrangement[],
  guid: string
): Arrangement {
  const found = available.find(a => a.guid === guid);

  if (!found) {
    throw new Error(`Arrangement not found: ${guid}`);
  }

  return found;
}
