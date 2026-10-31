import { component } from 'ruscus';

import { colors, weights } from './styles.ts';

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const removeWhitespace = [
  ...headings,
  'body',
  'button',
  'p',
  'ol',
  'ul'
];

export default component('Page')
  .elements(e => ({
    header: e(),

    body: e()
  }))
  .global(s => ({
    '*, *::before, *::after': s({
      boxSizing: 'border-box'
    }),

    button: s({
      backgroundColor: 'transparent',
      border: 0,
      color: 'inherit',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit'
    }).nested({
      '&:disabled': s({
        cursor: 'default'
      })
    }),

    html: s({
      backgroundColor: colors.bg,
      color: colors.text,
      fontFamily: 'Bitter, serif',
      fontSize: '1rem',
      lineHeight: 1
    }),

    li: s({
      listStyle: 'none'
    }),

    [headings.join(', ')]: s({
      fontSize: '1em',
      fontWeight: weights.normal
    }),

    [removeWhitespace.join(', ')]: s({
      margin: 0,
      padding: 0
    })
  }))
  .apply();
