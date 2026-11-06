import { assert, describe, it } from 'vitest';

import { COLOR_IDS } from '../core/colors.ts';
import { flowers, unpackFlowers } from './flowers.ts';

describe('flowers', () => {
  it('lists unique flower names from generated data', () => {
    assert.isAbove(flowers.length, 0);
    assert.include(flowers, 'Roses');
  });
});

describe('unpackFlowers', () => {
  it('resolves packed indices to names and colors', () => {
    const roseIndex = flowers.indexOf('Roses');
    const yellowIndex = COLOR_IDS.indexOf('yellow');

    assert.isAtLeast(roseIndex, 0);
    assert.isAtLeast(yellowIndex, 0);

    assert.deepEqual(unpackFlowers([[roseIndex, yellowIndex]]), [
      { colors: ['yellow'], name: 'Roses' }
    ]);
  });

  it('merges colors for the same flower and sorts by name', () => {
    const roseIndex = flowers.indexOf('Roses');
    const yellowIndex = COLOR_IDS.indexOf('yellow');
    const redIndex = COLOR_IDS.indexOf('red');
    const mumIndex = flowers.indexOf('Mums');

    assert.deepEqual(
      unpackFlowers([
        [mumIndex, yellowIndex],
        [roseIndex, redIndex],
        [roseIndex, yellowIndex]
      ]),
      [
        { colors: ['yellow'], name: 'Mums' },
        { colors: ['red', 'yellow'], name: 'Roses' }
      ]
    );
  });

  it('rejects an invalid flower index', () => {
    assert.throws(
      () => unpackFlowers([[flowers.length, 0]]),
      /Invalid flower index/
    );
  });

  it('rejects an invalid color index', () => {
    assert.throws(
      () => unpackFlowers([[0, COLOR_IDS.length]]),
      /Invalid color index/
    );
  });
});
