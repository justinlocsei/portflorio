import type { Arrangement, ArrangementImages } from '../core/types.ts';

declare const StoredIDBrand: unique symbol;

/**
 * Stored arrangement metadata
 */
export type ArrangementMetadata = {
  date: string;
  flowers: string[];
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
};

/**
 * An ID for a stored arrangement
 */
export type StoredID = string & {
  readonly [StoredIDBrand]: typeof StoredIDBrand;
};
