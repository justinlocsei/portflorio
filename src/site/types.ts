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
 * The current explorer view
 */
export type ExplorerView = {
  flowers: string[];
};

/**
 * A compact representation of an arrangement
 */
export type PackedArrangement = [
  date: ISODate,
  id: number,
  mechanic: Mechanic,
  flowers: PackedArrangedFlower[],
  image: string,
  thumbnail: string
];

/**
 * A compact representation of an arranged flower
 */
export type PackedArrangedFlower = [
  flower: number,
  color: number
];
