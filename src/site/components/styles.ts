export const colors = {
  accent: '#A5B39A',
  bg: '#252725',
  border: '#41443F',
  muted: '#595a4f',
  text: '#F0EDE4'
};

/**
 * Scale the vertical rhythm by the given factor
 */
export function rhythm(factor = 1): string {
  return `${factor}rem`;
}
