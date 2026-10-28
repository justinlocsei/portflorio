import type { Arrangement, Flower } from './types.ts';

/**
 * Summarize the flowers used by a set of arrangements
 */
export function summarizeFlowers(arrangements: Arrangement[]): Flower[] {
  const usage = new Map<string, number[]>();

  for (const arrangement of arrangements) {
    for (const flower of arrangement.flowers) {
      const usedIn = usage.get(flower.name) ?? [];

      usedIn.push(arrangement.id);
      usage.set(flower.name, usedIn);
    }
  }

  return Array
    .from(usage.keys())
    .sort()
    .reduce<Flower[]>((flowers, name) => {
      const usedIn = usage.get(name);

      if (usedIn) {
        flowers.push({ name, usedIn });
      }

      return flowers;
    }, []);
}
