import { assert, describe, it } from 'vitest';

import type { Variant } from './types/utils.ts';
import { map, sortBy } from './utils.ts';

describe('map', () => {
  it('maps a string union with constant handlers', () => {
    type Name = 'alfa' | 'bravo';
    const name: Name = 'bravo';

    assert.equal(
      map(name as Name).to({ alfa: 1, bravo: 2 }),
      2
    );
  });

  it('maps a string union with handler functions', () => {
    type Name = 'alfa' | 'bravo';
    const name: Name = 'alfa';

    assert.equal(
      map(name as Name).to({
        alfa: () => 1,
        bravo: () => 2
      }),
      1
    );
  });

  it('maps a tagged union on type with constant handlers', () => {
    type Shape =
      | Variant<'circle', { radius: number }>
      | Variant<'square', { side: number }>;

    const shape: Shape = { radius: 3, type: 'circle' };

    assert.equal(
      map(shape as Shape).to({ circle: 'round', square: 'angular' }),
      'round'
    );
  });

  it('maps a tagged union on type with dynamic handlers', () => {
    type Route =
      | Variant<'detail', { id: string }>
      | Variant<'home'>;

    const route: Route = { id: '0001', type: 'detail' };

    assert.equal(
      map(route as Route).to({
        detail: r => r.id,
        home: () => '/'
      }),
      '0001'
    );
  });

  it('maps a tagged union on a custom field', () => {
    type Custom =
      | { kind: 'alfa'; number: number }
      | { kind: 'bravo'; string: string };

    const item: Custom = { kind: 'alfa', number: 1 };

    assert.equal(
      map(item as Custom, 'kind').to<number | string>({
        alfa: i => i.number,
        bravo: i => i.string
      }),
      1
    );
  });
});

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
