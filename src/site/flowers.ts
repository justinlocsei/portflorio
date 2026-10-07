import flowerList from './generated/flowers.json' with { type: 'json' };

export const flowers = flowerList as string[];

/**
 * Resolver flower indexes to names
 */
export function resolveFlowers(indexes: number[]): string[] {
  return indexes.map(index => {
    const name = flowers[index];

    if (name === undefined) {
      throw new Error(`Invalid flower index: ${index}`);
    }

    return name;
  });
}
