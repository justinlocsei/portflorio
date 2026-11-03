/**
 * Details on a color
 */
type Details = {
  hex: string;
  name: string;
};

export const COLORS = {
  blush: {
    hex: 'eec4c4',
    name: 'Blush'
  },
  burgundy: {
    hex: '460506',
    name: 'Burgundy'
  },
  chartreuse: {
    hex: 'b8cf3e',
    name: 'Chartreuse'
  },
  green: {
    hex: '077d10',
    name: 'Green'
  },
  lavender: {
    hex: 'a89bc4',
    name: 'Lavender'
  },
  magenta: {
    hex: 'af38ae',
    name: 'Magenta'
  },
  orange: {
    hex: 'e86f2a',
    name: 'Orange'
  },
  peach: {
    hex: 'e1baa1',
    name: 'Peach'
  },
  pink: {
    hex: 'eb7bb9',
    name: 'Pink'
  },
  purple: {
    hex: '58358a',
    name: 'Purple'
  },
  red: {
    hex: '8f0218',
    name: 'Red'
  },
  sage: {
    hex: '9aada3',
    name: 'Sage'
  },
  white: {
    hex: 'f7f5f0',
    name: 'White'
  },
  yellow: {
    hex: 'efc030',
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
