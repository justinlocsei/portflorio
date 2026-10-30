import { component } from 'ruscus';

import { colors } from './styles.ts';
import '@fontsource/bitter/300.css';
import '@fontsource/bitter/400.css';
import '@fontsource/bitter/600.css';

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
  .css({
    backgroundColor: colors.bg,
    color: colors.text,
    fontFamily: 'Bitter, serif',
    fontSize: '1rem',
    lineHeight: 1
  })
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
      fontFamily: 'inherit',
      fontSize: 'inherit'
    }),

    li: s({
      listStyle: 'none'
    }),

    [headings.join(', ')]: s({
      fontSize: '1em',
      fontWeight: 'normal'
    }),

    [removeWhitespace.join(', ')]: s({
      margin: 0,
      padding: 0
    })
  }))
  .apply();
