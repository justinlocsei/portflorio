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
