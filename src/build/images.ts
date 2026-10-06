import fs from 'fs-extra';
import sharp from 'sharp';

import type { Variant } from '../core/types/utils.ts';
import type { Arrangement, Dimensions, Image } from '../core/types.ts';
import { map } from '../core/utils.ts';
import { getPaths } from './paths.ts';
import type { ProcessedArrangement } from './types.ts';

import { createHash } from 'node:crypto';
import path from 'node:path';

/**
 * An approach to resizing an image
 */
type ResizeApproach = Variant<'long-edge', { pixels: number }>;

/**
 * A resized image
 */
type ResizedImage = {
  buffer: Buffer;
  size: Dimensions;
};

/**
 * Resize an image
 */
export async function resize(
  input: Buffer,
  approach: ResizeApproach,
  { quality = 80 }: { quality?: number } = {}
): Promise<ResizedImage> {
  let image = sharp(input).rotate();

  image = map(approach).to({
    'long-edge': ({ pixels }) =>
      image.resize(pixels, pixels, {
        fit: 'inside',
        withoutEnlargement: true
      })
  });

  const { data, info } = await image
    .jpeg({ mozjpeg: true, quality })
    .toBuffer({ resolveWithObject: true });

  return {
    buffer: data,
    size: info
  };
}

/**
 * Build images for each arrangement in a list
 */
export async function buildArrangementImages(
  arrangements: Arrangement[]
): Promise<ProcessedArrangement[]> {
  const dirs = getPaths().dist;
  const prefix = path.relative(dirs.site, dirs.images);

  await fs.mkdir(dirs.images, { recursive: true });

  const writeImage = async (buffer: Buffer) => {
    const hash = createHash('sha256')
      .update(buffer)
      .digest('hex');

    const file = `${hash}.jpg`;
    await fs.writeFile(path.join(dirs.images, file), buffer);

    return `/${prefix}/${file}`;
  };

  return Promise.all(
    arrangements.map(async (arrangement): Promise<ProcessedArrangement> => {
      const full = await fs.readFile(arrangement.paths.image);
      const thumbnail = await resize(full, { pixels: 480, type: 'long-edge' });

      return {
        ...arrangement,
        images: {
          full: await writeImage(full),
          thumbnail: await writeImage(thumbnail.buffer)
        }
      };
    })
  );
}
