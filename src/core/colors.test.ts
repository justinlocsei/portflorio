import { describe, expect, it } from 'vitest';

import { parseColors } from './colors.ts';

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
});
