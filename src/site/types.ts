import type { ArrangementSelector } from '../core/arrangements.ts';

export type { ArrangementSelector };

/**
 * An arrangement exposed to the site
 */
export type Arrangement = {
  date: string;
  flowers: string[];
  id: string;
};
