import { assert, describe, it } from 'vitest';

import { getISODate, isISODate } from '../core/time.ts';
import { arrangements } from './arrangements.ts';

describe('arrangements', () => {
  it('loads every packed arrangement', () => {
    assert.isAbove(arrangements.length, 0);
  });

  it('sorts by descending ID', () => {
    for (let index = 1; index < arrangements.length; index++) {
      const previous = arrangements[index - 1];
      const current = arrangements[index];

      assert.isDefined(previous);
      assert.isDefined(current);
      assert.isAtMost(current.id, previous.id);
    }
  });

  it('unpacks flowers and image paths', () => {
    for (const arrangement of arrangements) {
      const { flowers, images } = arrangement;

      assert.isAbove(flowers.length, 0);

      for (const flower of flowers) {
        assert.isAbove(flower.name.length, 0);
        assert.isAbove(flower.colors.length, 0);
      }

      assert.isString(images.full);
      assert.isString(images.preview);
      assert.include(images.full, '/images/');
    }
  });

  it('uses UTC calendar dates', () => {
    for (const arrangement of arrangements) {
      assert.equal(
        getISODate(arrangement.date),
        arrangement.date.toISOString().slice(0, 10)
      );
      assert.isTrue(isISODate(getISODate(arrangement.date)));
    }
  });
});
