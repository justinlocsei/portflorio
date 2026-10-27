/**
 * Paths to an arrangement stored on disk
 */
export type ArrangementPaths = {
  details: string;
  directory: string;
  image: string;
};

/**
 * Details for an arrangement
 */
export type ArrangementDetails = {
  flowers: string[];
};

/**
 * The width and height of an image in pixels
 */
export type Dimensions = Record<'height' | 'width', number>;

/**
 * An image of an arrangement
 */
export type Image = Dimensions & {
  url: string;
};

/**
 * Images generated for an arrangement
 */
export type ArrangementImages = {
  full: Image;
  thumbnail: Image;
};

/**
 * Metadata for an arrangement
 */
export type ArrangementMetadata = {
  date: Date;
  guid: string;
  id: string;
};

/**
 * An arrangement stored on disk
 */
export type StoredArrangement = ArrangementMetadata & {
  paths: ArrangementPaths;
};

/**
 * A fully loaded arrangement
 */
export type Arrangement = StoredArrangement & {
  details: ArrangementDetails;
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
  usedIn: string[];
};

declare const ISODateBrand: unique symbol;
declare const UTCDateBrand: unique symbol;

/**
 * An UTC date in ISO 8601 format
 */
export type ISODate = string & {
  readonly [ISODateBrand]: typeof ISODateBrand;
};

/**
 * A UTC calendar date with no time component
 */
export type UTCDate = Date & {
  readonly [UTCDateBrand]: typeof UTCDateBrand;
};
