import { assert, describe, it } from 'vitest';

import { parseDate, tryISODate } from '../core/time.ts';
import type { Arrangement } from '../core/types.ts';
import {
  describeArrangement,
  labelArrangement,
  labelColor,
  labelMechanic,
  scaleBy
} from './display.ts';

function buildArrangement(): Arrangement {
  return {
    date: parseDate(tryISODate('2026-01-08')),
    flowers: [
      { colors: ['yellow', 'red'], name: 'Roses' },
      { colors: ['white'], name: 'Chamomile' }
    ],
    id: 1,
    mechanic: 'foam'
  };
}

describe('describeArrangement', () => {
  it('lists flower names without colors', () => {
    assert.equal(
      describeArrangement(buildArrangement(), { colors: false }),
      'Roses and chamomile'
    );
  });

  it('includes color names when requested', () => {
    assert.equal(
      describeArrangement(buildArrangement(), { colors: true }),
      'Yellow roses, red roses, and white chamomile'
    );
  });
});

describe('labelArrangement', () => {
  it('combines the formatted date and mechanic', () => {
    assert.equal(
      labelArrangement(buildArrangement()),
      'January 8, 2026 / Floral Foam'
    );
  });
});

describe('labelColor', () => {
  it('uses the display name for a color ID', () => {
    assert.equal(labelColor('yellow'), 'Yellow');
  });
});

describe('labelMechanic', () => {
  it('uses a readable mechanic label', () => {
    assert.equal(labelMechanic('kenzan'), 'Kenzan');
  });
});

describe('scaleBy', () => {
  it('scales width and height by a factor', () => {
    assert.deepEqual(
      scaleBy({ height: 100, width: 200 }, 0.5),
      { height: 50, width: 100 }
    );
  });
});
