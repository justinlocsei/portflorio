import fs from 'fs-extra';
import sharp from 'sharp';

import type { Image } from '../core/types.ts';
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
  ): Promise<Image> => {
    const buffer = await fs.readFile(source);
    const size = await sharp(buffer).metadata();

    const hash = createHash('sha256')
      .update(buffer)
      .digest('hex');

    const file = `${hash}.jpg`;

    await fs.writeFile(
      path.join(dirs.images, file),
      buffer
    );

    return {
      height: size.height,
      url: `/${prefix}/${file}`,
      width: size.width
    };
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
