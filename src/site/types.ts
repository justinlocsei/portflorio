import type {
  ArrangementImages,
  Color,
  Arrangement as CoreArrangement,
  ISODate,
  Mechanic
} from '../core/types.ts';

/**
 * An arrangement exposed to the site
 */
export type Arrangement = CoreArrangement & {
  images: ArrangementImages;
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

/**
 * The current view
 */
export type View = {
  colors: Color[];
  flowers: string[];
};

/**
 * A filter in the explorer view
 */
export type ViewFilter<T extends string> = {
  active: boolean;
  add: (...items: T[]) => void;
  clear: () => void;
  has: (item: T) => boolean;
  remove: (...items: T[]) => void;
  toggle: (...items: T[]) => void;
};

/**
 * A manager for the explorer view
 */
export type ViewManager = {
  [K in keyof View]: ViewFilter<View[K][number]>;
};

/**
 * A mode for viewing arrangements
 */
export type ViewMode = 'grid' | 'list';

/**
 * Props shared by components that interact with the explorer view
 */
export type ViewProps = {
  view: ViewManager;
};
