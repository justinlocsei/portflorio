import type { Arrangement, Color, Flower } from './types.ts';

/**
 * A flower's usage across a set of arrangements
 */
type Usage = {
  colors: Set<Color>;
  usedIn: number[];
};

/**
 * Summarize the flowers used by a set of arrangements
 */
export function summarizeFlowers(arrangements: Arrangement[]): Flower[] {
  const usage = new Map<string, Usage>();

  for (const arrangement of arrangements) {
    for (const flower of arrangement.flowers) {
      const entry = usage.get(flower.name) ?? {
        colors: new Set<Color>(),
        usedIn: []
      };

      entry.usedIn.push(arrangement.id);

      for (const color of flower.colors) {
        entry.colors.add(color);
      }

      usage.set(flower.name, entry);
    }
  }

  return Array
    .from(usage.keys())
    .sort()
    .reduce<Flower[]>((flowers, name) => {
      const entry = usage.get(name);

      if (entry) {
        flowers.push({
          colors: Array.from(entry.colors).sort(),
          name,
          usedIn: entry.usedIn
        });
      }

      return flowers;
    }, []);
}
