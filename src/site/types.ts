import type { ArrangementSelector } from '../core/arrangements.ts';
import type { ArrangementMetadata } from '../core/types.ts';

export type { ArrangementSelector };

/**
 * An arrangement exposed to the site
 */
export type Arrangement = ArrangementMetadata & {
  flowers: string[];
  route: string;
};

/**
 * A compact representation of an arrangement
 */
export type PackedArrangement = [
  date: string,
  id: string,
  flowers: string[]
];
