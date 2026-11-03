import { assert, describe, it } from 'vitest';

import { loadArrangements } from './arrangements.ts';
import { shareArrangement } from './share.ts';

describe('shareArrangement', () => {
  it('formats arrangements for sharing', async () => {
    const arrangements = await loadArrangements();
    const shared = arrangements.map(a => shareArrangement(a)).join('\n');

    assert.include(shared, 'Acacia');
    assert.include(shared, 'yarrow');
  });
});
