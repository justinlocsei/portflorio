/**
 * Details on a color
 */
type Details = {
  hex: string;
  name: string;
};

export const COLORS = {
  blush: {
    hex: 'EEC4C4',
    name: 'Blush'
  },
  chartreuse: {
    hex: 'B8CF3E',
    name: 'Chartreuse'
  },
  green: {
    hex: '2E8F4A',
    name: 'Green'
  },
  lavender: {
    hex: 'A89BC4',
    name: 'Lavender'
  },
  magenta: {
    hex: 'D0428C',
    name: 'Magenta'
  },
  orange: {
    hex: 'E86F2A',
    name: 'Orange'
  },
  peach: {
    hex: 'E9A67A',
    name: 'Peach'
  },
  purple: {
    hex: '6E5099',
    name: 'Purple'
  },
  red: {
    hex: 'C7364E',
    name: 'Red'
  },
  sage: {
    hex: '9AADA3',
    name: 'Sage'
  },
  white: {
    hex: 'F7F5F0',
    name: 'White'
  },
  yellow: {
    hex: 'EFC030',
    name: 'Yellow'
  }
} satisfies Record<string, Details>;

/**
 * An internal ID for a floral color
 */
export type Color = keyof typeof COLORS;

export const COLOR_IDS = Object.keys(COLORS) as Color[];

/**
 * Report whether a value is a color ID
 */
export function isColor(value: string): value is Color {
  return value in COLORS;
}

/**
 * Parse a comma-separated list of colors
 */
export function parseColors(input: string): Color[] {
  return input
    .split(',')
    .map(part => part.trim().toLowerCase())
    .filter(Boolean)
    .reduce<Color[]>((p, part) => {
      if (isColor(part)) {
        p.push(part);
      }

      return p;
    }, []);
}
