import type { CSS } from 'ruscus';
import { css } from 'ruscus';

export const colors = {
  accent: '#a5b39a',
  bg: '#252725',
  border: '#41443f',
  borderDark: '#1e201d',
  muted: '#595a4f',
  text: '#f0ede4'
};

export const weights = {
  light: 300,
  normal: 400,
  bold: 600
};

/**
 * Scale the vertical rhythm by the given factor
 */
export function rhythm(factor = 1): string {
  return `${factor}rem`;
}

/**
 * Define transitions with shared timing
 */
export function transition(
  ...properties: string[]
): CSS {
  return css({
    transition: properties.map(p => `${p} 150ms ease-out`).join(', ')
  });
}
