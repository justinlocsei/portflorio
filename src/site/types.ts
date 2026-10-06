import type { ArrangementSelector } from '../core/arrangements.ts';
import type { ArrangementImages, ArrangementMetadata } from '../core/types.ts';

export type { ArrangementSelector };

/**
 * An arrangement exposed to the site
 */
export type Arrangement = ArrangementMetadata & {
  flowers: string[];
  images: ArrangementImages;
  route: string;
};

/**
 * A compact representation of an image
 */
export type PackedImage = [width: number, height: number, url: string];

/**
 * A compact representation of an arrangement
 */
export type PackedArrangement = [
  date: string,
  id: string,
  flowers: string[],
  image: PackedImage,
  thumbnail: PackedImage
];
