import { assert, describe, it } from 'vitest';

import {
  COLOR_IDS,
  COLORS,
  DISPLAY_ORDER,
  displayColors,
  isColor,
  parseColors
} from './colors.ts';

describe('isColor', () => {
  it('accepts every defined color id', () => {
    for (const id of COLOR_IDS) {
      assert.isTrue(isColor(id));
    }
  });

  it('rejects unknown strings', () => {
    assert.isFalse(isColor(''));
    assert.isFalse(isColor('nope'));
    assert.isFalse(isColor('Blush'));
  });
});

describe('displayColors', () => {
  it('returns one entry per display order id', () => {
    assert.lengthOf(displayColors(), DISPLAY_ORDER.length);
  });

  it('adds an ID to each color', () => {
    assert.deepEqual(
      displayColors(),
      DISPLAY_ORDER.map(id => ({
        id,
        hex: COLORS[id].hex,
        name: COLORS[id].name
      }))
    );
  });
});

describe('parseColors', () => {
  it('returns no colors for empty input', () => {
    assert.deepEqual(parseColors(''), []);
    assert.deepEqual(parseColors(', ,'), []);
  });

  it('parses a single color', () => {
    assert.deepEqual(parseColors('blush'), ['blush']);
    assert.deepEqual(parseColors('  Blush  '), ['blush']);
  });

  it('parses multiple colors', () => {
    assert.deepEqual(parseColors('blush, red,sage'), [
      'blush',
      'red',
      'sage'
    ]);
  });

  it('ignores unknown color names', () => {
    assert.deepEqual(parseColors('blush, chartreuse, unknown, red'), [
      'blush',
      'chartreuse',
      'red'
    ]);
  });

  it('preserves order including duplicates', () => {
    assert.deepEqual(parseColors('red, blush, red'), [
      'red',
      'blush',
      'red'
    ]);
  });
});
