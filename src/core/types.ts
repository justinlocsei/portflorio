import type { Color } from './colors.ts';

declare const ISODateBrand: unique symbol;
declare const UTCDateBrand: unique symbol;

export type { Color };

/**
 * A flower used in a specific arrangement
 */
export type ArrangedFlower = {
  colors: Color[];
  name: string;
};

/**
 * An arrangement
 */
export type Arrangement = {
  date: UTCDate;
  flowers: ArrangedFlower[];
  mechanic: Mechanic;
  id: number;
};

/**
 * An arrangement's images
 */
export type ArrangementImages<T = string> = {
  full: T;
  preview: T;
};

/**
 * The width and height of an image in pixels
 */
export type Dimensions = {
  height: number;
  width: number;
};

/**
 * A generic shape for environment variables
 */
export type EnvironmentVariables = Record<string, string | undefined>;

/**
 * Information on a flower's usage across a set of arrangements
 */
export type Flower = {
  colors: Color[];
  name: string;
  usedIn: number[];
};

/**
 * An image of an arrangement
 */
export type Image = Dimensions & {
  url: string;
};

/**
 * The ID of an arrangement image
 */
export type ImageID = keyof ArrangementImages;

/**
 * A UTC date in ISO 8601 format
 */
export type ISODate = string & {
  readonly [ISODateBrand]: typeof ISODateBrand;
};

export const MECHANICS = ['foam', 'kenzan', 'wire'] as const;

/**
 * A floral mechanic
 */
export type Mechanic = typeof MECHANICS[number];

/**
 * A UTC calendar date with no time component
 */
export type UTCDate = Date & {
  readonly [UTCDateBrand]: typeof UTCDateBrand;
};
