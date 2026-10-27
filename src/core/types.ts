declare const ISODateBrand: unique symbol;
declare const UTCDateBrand: unique symbol;

/**
 * An arrangement
 */
export type Arrangement = {
  date: UTCDate;
  flowers: string[];
  id: number;
};

/**
 * An arrangement's images
 */
export type ArrangementImages<T = Image> = {
  full: T;
  preview: T;
};

/**
 * Paths to an arrangement stored on disk
 */
export type ArrangementPaths = {
  details: string;
  directory: string;
  images: ArrangementImages<string>;
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
 * A flower used in an arrangement
 */
export type Flower = {
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
 * An UTC date in ISO 8601 format
 */
export type ISODate = string & {
  readonly [ISODateBrand]: typeof ISODateBrand;
};

/**
 * An arrangement stored on disk
 */
export type StoredArrangement = Arrangement & {
  paths: ArrangementPaths;
};

/**
 * A UTC calendar date with no time component
 */
export type UTCDate = Date & {
  readonly [UTCDateBrand]: typeof UTCDateBrand;
};
