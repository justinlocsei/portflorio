import type { Arrangement, Flower } from './types.ts';

/**
 * Summarize the flowers used in a list of arrangements
 */
export function summarizeArrangementFlowers(
  arrangements: Arrangement[]
): Flower[] {
  return summarizeFlowers(
    arrangements.map(a => ({ flowers: a.details.flowers, guid: a.guid }))
  );
}

/**
 * A record of an arrangement with flowers
 */
type HasFlowers = {
  flowers: string[];
  guid: string;
};

/**
 * Summarize the flowers associated with a list of items
 */
export function summarizeFlowers(items: HasFlowers[]): Flower[] {
  const usage = new Map<string, string[]>();

  for (const item of items) {
    for (const flower of item.flowers) {
      const usedIn = usage.get(flower) ?? [];

      usedIn.push(item.guid);
      usage.set(flower, usedIn);
    }
  }

  return Array
    .from(usage.keys())
    .sort()
    .reduce<Flower[]>((flowers, name) => {
      const usedIn = usage.get(name);

      if (usedIn) {
        flowers.push({ name, usedIn: usedIn.sort() });
      }

      return flowers;
    }, []);
}
