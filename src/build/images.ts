import fs from 'fs-extra';

import type { ArrangementImages, ImageID } from '../core/types.ts';
import { isFile } from './fs.ts';
import paths from './paths.ts';
import type { ProcessedArrangement, StoredArrangement } from './types.ts';

import { createHash } from 'node:crypto';
import path from 'node:path';

/**
 * Build images for each arrangement in a list
 */
export async function buildArrangementImages(
  arrangements: StoredArrangement[]
): Promise<ProcessedArrangement[]> {
  const dirs = paths.dist;
  const prefix = path.relative(dirs.site, dirs.images);

  await fs.mkdir(dirs.images, { recursive: true });

  const writeImage = async (
    source: string
  ): Promise<string> => {
    const buffer = await fs.readFile(source);

    const hash = createHash('sha256')
      .update(buffer)
      .digest('hex');

    const file = `${hash}.jpg`;

    await fs.writeFile(
      path.join(dirs.images, file),
      buffer
    );

    return `/${prefix}/${file}`;
  };

  return Promise.all(
    arrangements.map(async (arrangement): Promise<ProcessedArrangement> => {
      const { images } = arrangement.paths;

      return {
        ...arrangement,
        images: {
          full: await writeImage(images.full),
          preview: await writeImage(images.preview)
        }
      };
    })
  );
}

/**
 * Find source images for an arrangement that match a pattern
 *
 * This naming pattern is enforced by Lightroom export presents.
 */
export async function findSourceImages(
  directory: string,
  id: number
): Promise<ArrangementImages> {
  const images: ArrangementImages = {
    full: '',
    preview: ''
  };

  for (const type of Object.keys(images) as ImageID[]) {
    const file = path.join(
      directory,
      `portflorio-${id}-${type}.jpg`
    );

    if (await isFile(file)) {
      images[type] = file;
    } else {
      throw new Error(`Source image not found: ${file}`);
    }
  }

  return images;
}
