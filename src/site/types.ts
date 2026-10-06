import type { ArrangementSelector } from '../core/arrangements.ts';
import type { ArrangementMetadata } from '../core/types.ts';

export type { ArrangementSelector };

/**
 * Images generated for an arrangement
 */
export type ArrangementImages = {
  full: string;
  thumbnail: string;
};

/**
 * An arrangement exposed to the site
 */
export type Arrangement = ArrangementMetadata & {
  flowers: string[];
  images: ArrangementImages;
  route: string;
};

/**
 * A compact representation of an arrangement
 */
export type PackedArrangement = [
  date: string,
  id: string,
  flowers: string[],
  image: string,
  thumbnail: string
];
