import type { Arrangement, Flower } from './types.ts';

/**
 * Summarize the flowers used in a list of arrangements
 */
export function summarizeFlowers(
  arrangements: Arrangement[]
): Flower[] {
  const usage = new Map<string, string[]>();

  for (const arrangement of arrangements) {
    for (const flower of arrangement.details.flowers) {
      const usedIn = usage.get(flower) ?? [];

      usedIn.push(arrangement.guid);
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
