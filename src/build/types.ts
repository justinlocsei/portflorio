import type { Arrangement, ArrangementImages } from '../core/types.ts';

/**
 * An arrangement that can be projected as site data
 */
export type ProcessedArrangement = Arrangement & {
  images: ArrangementImages;
};
