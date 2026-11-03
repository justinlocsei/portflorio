import { describe, expect, it } from 'vitest';

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
      expect(isColor(id)).toBe(true);
    }
  });

  it('rejects unknown strings', () => {
    expect(isColor('')).toBe(false);
    expect(isColor('nope')).toBe(false);
    expect(isColor('Blush')).toBe(false);
  });
});

describe('displayColors', () => {
  it('returns one entry per display order id', () => {
    expect(displayColors()).toHaveLength(DISPLAY_ORDER.length);
  });

  it('adds an ID to each color', () => {
    expect(displayColors()).toEqual(
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
    expect(parseColors('')).toEqual([]);
    expect(parseColors(', ,')).toEqual([]);
  });

  it('parses a single color', () => {
    expect(parseColors('blush')).toEqual(['blush']);
    expect(parseColors('  Blush  ')).toEqual(['blush']);
  });

  it('parses multiple colors', () => {
    expect(parseColors('blush, red,sage')).toEqual([
      'blush',
      'red',
      'sage'
    ]);
  });

  it('ignores unknown color names', () => {
    expect(parseColors('blush, chartreuse, unknown, red')).toEqual([
      'blush',
      'chartreuse',
      'red'
    ]);
  });

  it('preserves order including duplicates', () => {
    expect(parseColors('red, blush, red')).toEqual(['red', 'blush', 'red']);
  });
});
