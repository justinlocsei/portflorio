import routes from '../core/routes.ts';
import { parseDate, tryISODate } from '../core/time.ts';
import { sortBy } from '../core/utils.ts';
import { resolveArrangedFlowers } from './flowers.ts';
import packedArrangements from './generated/arrangements.json' with {
  type: 'json'
};
import type { Arrangement, PackedArrangement } from './types.ts';

/**
 * Unpack an arrangement
 */
function unpackArrangement(packed: PackedArrangement): Arrangement {
  const [rawDate, id, mechanic, packedFlowers, full, preview] = packed;

  const date = tryISODate(rawDate);

  return {
    date: parseDate(date),
    flowers: resolveArrangedFlowers(packedFlowers),
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

  return sortBy(arrangements, a => a.id * -1);
}

export const arrangements = loadArrangements();

/**
 * Select an arrangement
 */
export function selectArrangement(id: number): Arrangement | undefined {
  return arrangements.find(a => a.id === id);
}
