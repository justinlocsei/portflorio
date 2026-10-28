import type {
  ArrangementImages,
  Arrangement as CoreArrangement,
  ISODate,
  Mechanic
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
  id: number,
  mechanic: Mechanic,
  flowers: number[],
  image: string,
  thumbnail: string
];
