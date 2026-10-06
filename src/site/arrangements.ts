import type { ArrangementSelectorRequest } from '../core/arrangements.ts';
import { selectorToGUID } from '../core/arrangements.ts';
import routes from '../core/routes.ts';
import type { Image } from '../core/types.ts';
import { sortBy } from '../core/utils.ts';
import packedArrangements from './generated/arrangements.json' with {
  type: 'json'
};
import type {
  Arrangement,
  ArrangementSelector,
  PackedArrangement,
  PackedImage
} from './types.ts';

/**
 * Unpack an image
 */
function unpackImage([width, height, url]: PackedImage): Image {
  return { height, url, width };
}

/**
 * Unpack an arrangement
 */
function unpackArrangement(packed: PackedArrangement): Arrangement {
  const [date, id, flowers, full, thumbnail] = packed;
  const selector: ArrangementSelectorRequest = { date, id };

  return {
    date: new Date(date),
    flowers,
    guid: selectorToGUID(selector),
    images: {
      full: unpackImage(full),
      thumbnail: unpackImage(thumbnail)
    },
    id,
    route: routes.arrangement(selector)
  };
}

/**
 * Load all available arrangements
 */
function loadArrangements(): Arrangement[] {
  const arrangements = (packedArrangements as PackedArrangement[]).map(
    unpackArrangement
  );

  return sortBy(arrangements, a => a.guid);
}

export const arrangements = loadArrangements();

/**
 * Select an arrangement
 */
export function selectArrangement(
  selector: ArrangementSelector
): Arrangement | undefined {
  const guid = selectorToGUID(selector);

  return arrangements.find(a => a.guid === guid);
}
