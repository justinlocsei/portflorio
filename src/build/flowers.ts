import { summarizeFlowers } from '../core/flowers.ts';
import type { Flower } from '../core/types.ts';
import { findArrangements } from './arrangements.ts';

/**
 * Get a list of all available flowers
 */
export async function loadFlowers(): Promise<Flower[]> {
  return summarizeFlowers(await findArrangements());
}
