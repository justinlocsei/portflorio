import { assert, describe, it } from 'vitest';

import { sortBy } from './utils.ts';

describe('sortBy', () => {
  it('sorts by a string selector', () => {
    const items = [{ name: 'charlie' }, { name: 'alfa' }, { name: 'bravo' }];

    assert.deepEqual(
      sortBy(items, i => i.name),
      [{ name: 'alfa' }, { name: 'bravo' }, { name: 'charlie' }]
    );
  });

  it('sorts by a numeric selector', () => {
    const items = [{ n: 30 }, { n: 10 }, { n: 20 }];

    assert.deepEqual(
      sortBy(items, i => i.n),
      [{ n: 10 }, { n: 20 }, { n: 30 }]
    );
  });

  it('uses later selectors to break ties', () => {
    const items = [
      { date: '2026-01-02', id: '02' },
      { date: '2026-01-01', id: '01' },
      { date: '2026-01-02', id: '01' }
    ];

    assert.deepEqual(
      sortBy(items, i => i.date, i => i.id),
      [
        { date: '2026-01-01', id: '01' },
        { date: '2026-01-02', id: '01' },
        { date: '2026-01-02', id: '02' }
      ]
    );
  });

  it('does not mutate the input list', () => {
    const items = [{ n: 2 }, { n: 1 }];
    const copy = [...items];

    sortBy(items, item => item.n);

    assert.deepEqual(items, copy);
  });
});
