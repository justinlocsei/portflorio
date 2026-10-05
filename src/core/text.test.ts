import { assert, describe, it } from 'vitest';

import { listItems } from './text.ts';

describe('listItems', () => {
  it('supports an empty list', () => {
    assert.equal(listItems([], 'and'), '');
  });

  it('supports a single item', () => {
    assert.equal(listItems(['alfa'], 'and'), 'alfa');
  });

  it('supports two items', () => {
    assert.equal(listItems(['alfa', 'bravo'], 'and'), 'alfa and bravo');
    assert.equal(listItems(['alfa', 'bravo'], 'or'), 'alfa or bravo');
  });

  it('supports three or more items', () => {
    assert.equal(
      listItems(['alfa', 'bravo', 'charlie'], 'and'),
      'alfa, bravo, and charlie'
    );

    assert.equal(
      listItems(['alfa', 'bravo', 'charlie', 'delta'], 'or'),
      'alfa, bravo, charlie, or delta'
    );
  });
});
