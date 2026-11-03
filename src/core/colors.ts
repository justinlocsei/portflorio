/**
 * The lightness of a color
 */
type Lightness = 'dark' | 'light';

/**
 * Details on a color
 */
type Details = {
  hex: string;
  lightness: Lightness;
  name: string;
};

export const COLORS = {
  blush: {
    hex: 'EEC4C4',
    lightness: 'light',
    name: 'Blush'
  },
  burgundy: {
    hex: '460506',
    lightness: 'dark',
    name: 'Burgundy'
  },
  chartreuse: {
    hex: 'B8CF3E',
    lightness: 'light',
    name: 'Chartreuse'
  },
  green: {
    hex: '184601',
    lightness: 'light',
    name: 'Green'
  },
  lavender: {
    hex: 'A89BC4',
    lightness: 'light',
    name: 'Lavender'
  },
  magenta: {
    hex: 'AF38AE',
    lightness: 'dark',
    name: 'Magenta'
  },
  orange: {
    hex: 'E86F2A',
    lightness: 'light',
    name: 'Orange'
  },
  peach: {
    hex: 'E1BAA1',
    lightness: 'light',
    name: 'Peach'
  },
  pink: {
    hex: 'EB7BB9',
    lightness: 'light',
    name: 'Pink'
  },
  purple: {
    hex: '58358A',
    lightness: 'dark',
    name: 'Purple'
  },
  red: {
    hex: '8F0218',
    lightness: 'dark',
    name: 'Red'
  },
  sage: {
    hex: '9AADA3',
    lightness: 'light',
    name: 'Sage'
  },
  white: {
    hex: 'F7F5F0',
    lightness: 'light',
    name: 'White'
  },
  yellow: {
    hex: 'EFC030',
    lightness: 'light',
    name: 'Yellow'
  }
} satisfies Record<string, Details>;

/**
 * An internal ID for a floral color
 */
export type Color = keyof typeof COLORS;

export const COLOR_IDS = Object.keys(COLORS) as Color[];

export const DISPLAY_ORDER: Color[] = [
  'white',
  'sage',
  'blush',
  'yellow',
  'chartreuse',
  'green',
  'peach',
  'orange',
  'red',
  'burgundy',
  'pink',
  'magenta',
  'purple',
  'lavender'
];

/**
 * A color for display
 */
export type DisplayColor = Details & {
  id: Color;
};

/**
 * Get all colors for display
 */
export function displayColors(): DisplayColor[] {
  return DISPLAY_ORDER.map(id => ({ ...COLORS[id], id }));
}

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
