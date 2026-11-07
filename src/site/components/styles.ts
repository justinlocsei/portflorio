import type { CSS, NestedStyles, StyleFragmentBuilder } from 'ruscus';
import { css, queries, trait } from 'ruscus';

export const colors = {
  accent: '#a5b39a',
  bg: '#252725',
  border: '#41443f',
  borderDark: '#1e201d',
  focus: 'rgba(255, 255, 255, 0.075)',
  muted: '#595a4f',
  text: '#f0ede4',
  textAccent: '#fff'
};

export const weights = {
  light: 300,
  normal: 400,
  bold: 600
};

export const sansSerif = trait(s =>
  s({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300
  })
);

export const views = queries({
  compact: '@media (max-width: 1200px)',
  feed: '@media (max-width: 1080px)',
  stacked: '@media (max-width: 750px)'
});

export const feedGutter = rhythm(2);
export const anchorBufferRhythm = 2;

/**
 * Define focus styles for an element
 */
export function focusable(
  styles: CSS = {},
  nested?: (s: StyleFragmentBuilder) => NestedStyles
) {
  return trait(s => {
    const focus = s({
      outline: 'none',
      ...styles
    });

    return s().nested({
      '&:focus:not(:focus-visible)': s({
        outline: 'none'
      }),

      '&:focus-visible': nested ? focus.nested(nested(s)) : focus
    });
  });
}

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
