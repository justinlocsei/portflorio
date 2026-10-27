import { assert, describe, it } from 'vitest';

import { toJSON } from './data.ts';

describe('toJSON', () => {
  it('sorts object keys alphabetically', () => {
    assert.equal(
      toJSON({ bravo: 2, alfa: 1 }),
      `{
  "alfa": 1,
  "bravo": 2
}`
    );
  });

  it('sorts keys recursively in nested objects', () => {
    assert.equal(
      toJSON({
        alfa: 1,
        outer: {
          zulu: 3,
          alfa: 1
        }
      }),
      `{
  "alfa": 1,
  "outer": {
    "alfa": 1,
    "zulu": 3
  }
}`
    );
  });

  it('preserves array order while sorting object elements', () => {
    assert.equal(
      toJSON([
        { a: 1, b: 2 },
        { c: 3, d: 4 }
      ]),
      `[
  {
    "a": 1,
    "b": 2
  },
  {
    "c": 3,
    "d": 4
  }
]`
    );
  });

  it('leaves primitives unchanged', () => {
    assert.equal(toJSON('alfa'), '"alfa"');
    assert.equal(toJSON(42), '42');
    assert.equal(toJSON(null), 'null');
    assert.equal(toJSON(true), 'true');
  });
});
