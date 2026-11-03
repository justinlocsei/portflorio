import { assert, describe, it } from 'vitest';

import { summarizeFlowers } from './flowers.ts';
import type { Arrangement } from './types.ts';

describe('summarizeFlowers', () => {
  it('aggregates colors and arrangement IDs across flowers', () => {
    const arrangements = [
      {
        id: 1,
        flowers: [{ name: 'Rose', colors: ['red', 'pink'] }]
      },
      {
        id: 2,
        flowers: [
          { name: 'Rose', colors: ['white'] },
          { name: 'Dahlia', colors: ['burgundy', 'red'] }
        ]
      }
    ] as Arrangement[];

    assert.deepEqual(summarizeFlowers(arrangements), [
      {
        name: 'Dahlia',
        colors: ['burgundy', 'red'],
        usedIn: [2]
      },
      {
        name: 'Rose',
        colors: ['pink', 'red', 'white'],
        usedIn: [1, 2]
      }
    ]);
  });
});
