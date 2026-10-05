import sharp from 'sharp';

import type { Variant } from '../core/types/utils.ts';
import { map } from '../core/utils.ts';

/**
 * An approach to resizing an image
 */
type ResizeApproach = Variant<'long-edge', { pixels: number }>;

/**
 * The dimensions of an image
 */
type Dimensions = Record<'height' | 'width', number>;

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
