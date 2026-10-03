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
 * Metadata for an arrangement
 */
type ArrangementMetadata = {
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
