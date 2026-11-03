import { assert, describe, it } from 'vitest';

import { loadFlowers } from './flowers.ts';

describe('loadFlowers', () => {
  it('loads flower names from stored arrangements', async () => {
    const names = (await loadFlowers()).map(f => f.name);

    assert.isAbove(names.length, 1);
    assert.include(names, 'Roses');
  });
});
