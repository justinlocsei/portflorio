import type {
  Arrangement,
  ArrangementImages,
  Color,
  Mechanic
} from '../core/types.ts';

declare const StoredIDBrand: unique symbol;

/**
 * Stored arrangement metadata
 */
export type ArrangementMetadata = {
  date: string;
  flowers: StoredFlowers;
  mechanic: Mechanic;
};

/**
 * Paths to an arrangement stored on disk
 */
export type ArrangementPaths = {
  directory: string;
  images: ArrangementImages;
  meta: string;
};

/**
 * An arrangement that can be projected as site data
 */
export type ProcessedArrangement = Arrangement & {
  images: ArrangementImages;
};

/**
 * An arrangement stored on disk
 */
export type StoredArrangement = Arrangement & {
  paths: ArrangementPaths;
  storedID: StoredID;
};

/**
 * An ID for a stored arrangement
 */
export type StoredID = string & {
  readonly [StoredIDBrand]: typeof StoredIDBrand;
};

/**
 * A record of the flowers used in an arrangement
 */
export type StoredFlowers = Record<string, Color>;
