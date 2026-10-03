import { getISODate } from '../core/time.ts';
import type {
  Arrangement,
  ArrangementDetails,
  ArrangementPaths,
  StoredArrangement
} from '../core/types.ts';
import { isFile } from './fs.ts';
import { getPaths } from './paths.ts';

import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Treat a number as an arrangement ID
 */
function asID(index: number): string {
  return String(index).padStart(2, '0');
}

/**
 * Place an arrangement image in a directory in the repo
 */
export async function addArrangement({
  flowers,
  image: imagePath
}: {
  flowers: string[];
  image: string;
}): Promise<Arrangement> {
  const details: ArrangementDetails = {
    flowers: [...flowers].sort()
  };

  const date = new Date();
  const dateString = getISODate(date);

  const directory = path.join(getPaths().arrangements, dateString);
  await fs.mkdir(directory, { recursive: true });

  const others = await findArrangementsIn(directory);
  const id = others.length + 1;

  const paths = getStoragePaths(directory, id);

  await fs.copyFile(imagePath, paths.image);
  await fs.writeFile(paths.details, JSON.stringify(details, null, 2));

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
  const dateString = path.basename(directory);

  return {
    paths,
    date: new Date(dateString),
    guid: `${dateString}-${id}`,
    id
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
 * Find all available arrangements
 */
export async function findArrangements(): Promise<Arrangement[]> {
  const available: Arrangement[] = [];
  const root = getPaths().arrangements;

  for (const directory of await fs.readdir(root)) {
    for (
      const arrangement of await findArrangementsIn(path.join(root, directory))
    ) {
      available.push(await loadArrangement(arrangement));
    }
  }

  return available;
}
