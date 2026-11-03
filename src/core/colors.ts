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
  burgundy: {
    hex: '460506',
    name: 'Burgundy'
  },
  chartreuse: {
    hex: 'B8CF3E',
    name: 'Chartreuse'
  },
  green: {
    hex: '184601',
    name: 'Green'
  },
  lavender: {
    hex: 'A89BC4',
    name: 'Lavender'
  },
  magenta: {
    hex: 'AF38AE',
    name: 'Magenta'
  },
  orange: {
    hex: 'E86F2A',
    name: 'Orange'
  },
  peach: {
    hex: 'E1BAA1',
    name: 'Peach'
  },
  pink: {
    hex: 'EB7BB9',
    name: 'Pink'
  },
  purple: {
    hex: '58358A',
    name: 'Purple'
  },
  red: {
    hex: '8F0218',
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
