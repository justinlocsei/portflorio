import { findArrangements } from './arrangements.ts';

/**
 * A flower used in an arrangement
 */
type Flower = {
  name: string;
  usedIn: string[];
};

/**
 * Get a list of all available flowers
 */
export async function loadFlowers(): Promise<Flower[]> {
  const usage = new Map<string, string[]>();

  for (const arrangement of await findArrangements()) {
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
