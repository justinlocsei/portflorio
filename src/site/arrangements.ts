import routes from '../core/routes.ts';
import { parseDate, tryISODate } from '../core/time.ts';
import { sortBy } from '../core/utils.ts';
import { resolveFlowers } from './flowers.ts';
import packedArrangements from './generated/arrangements.json' with {
  type: 'json'
};
import type { Arrangement, PackedArrangement } from './types.ts';

/**
 * Unpack an arrangement
 */
function unpackArrangement(packed: PackedArrangement): Arrangement {
  const [rawDate, id, mechanic, flowerIndexes, full, preview] = packed;

  const date = tryISODate(rawDate);

  return {
    date: parseDate(date),
    flowers: resolveFlowers(flowerIndexes),
    images: { full, preview },
    mechanic,
    id,
    route: routes.arrangement(id)
  };
}

/**
 * Load all available arrangements
 */
function loadArrangements(): Arrangement[] {
  const arrangements = (packedArrangements as PackedArrangement[]).map(
    unpackArrangement
  );

  return sortBy(arrangements, a => a.id);
}

export const arrangements = loadArrangements();

/**
 * Select an arrangement
 */
export function selectArrangement(id: number): Arrangement | undefined {
  return arrangements.find(a => a.id === id);
}
