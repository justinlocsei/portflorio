export const colors = {
  accent: '#a5b39a',
  bg: '#252725',
  border: '#41443f',
  borderDark: '#1e201d',
  muted: '#595a4f',
  text: '#f0ede4'
};

/**
 * Scale the vertical rhythm by the given factor
 */
export function rhythm(factor = 1): string {
  return `${factor}rem`;
}
