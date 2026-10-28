import type {
  ArrangementImages,
  Arrangement as CoreArrangement,
  ISODate
} from '../core/types.ts';

/**
 * An arrangement exposed to the site
 */
export type Arrangement = CoreArrangement & {
  images: ArrangementImages;
  route: string;
};

/**
 * A compact representation of an arrangement
 */
export type PackedArrangement = [
  date: ISODate,
  id: string,
  flowers: number[],
  image: string,
  thumbnail: string
];
