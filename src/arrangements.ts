import { getPaths } from './paths.ts';
import { getISODate } from './time.ts';

import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * The structure of an arrangement stored on disk
 */
type StoredArrangement = {
  data: string;
  directory: string;
  id: string;
  image: string;
};

/**
 * Details on an arrangement
 */
type ArrangementDetails = {
  flowers: string[];
};

/**
 * An arrangement
 */
type Arrangement = StoredArrangement & {
  details: ArrangementDetails;
};

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
  const paths = getPaths();

  const details: ArrangementDetails = {
    flowers: [...flowers].sort()
  };

  const directory = path.join(paths.arrangements, getISODate());
  await fs.mkdir(directory, { recursive: true });

  const existing = await findArrangementsIn(directory);
  const id = asID(existing.length + 1);

  const asPath = (ext: string) => path.join(directory, `${id}.${ext}`);
  const image = asPath('jpg');
  const data = asPath('json');

  await fs.copyFile(imagePath, image);
  await fs.writeFile(data, JSON.stringify(details, null, 2));

  return {
    data,
    details,
    directory,
    id,
    image
  };
}

/**
 * List arrangements present in a directory
 */
async function findArrangementsIn(
  directory: string
): Promise<StoredArrangement[]> {
  const entries = await fs.readdir(directory);
  const names = new Set(entries);
  const arrangements: StoredArrangement[] = [];

  for (let index = 1;; index += 1) {
    const id = asID(index);
    const image = `${id}.jpg`;

    if (!names.has(image)) {
      break;
    }

    arrangements.push({
      data: `${id}.json`,
      directory,
      id,
      image
    });
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
    details: JSON.parse(await fs.readFile(stored.data, 'utf-8'))
  };
}

/**
 * Find all available arrangements
 */
export async function findArrangements(): Promise<Arrangement[]> {
  const available: Arrangement[] = [];

  for (const directory of await fs.readdir(getPaths().arrangements)) {
    for (const arrangement of await findArrangementsIn(directory)) {
      available.push(await loadArrangement(arrangement));
    }
  }

  return available;
}
