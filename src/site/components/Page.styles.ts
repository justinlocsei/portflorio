import { component } from 'ruscus';
import '@fontsource/bitter/300.css';
import '@fontsource/bitter/400.css';
import '@fontsource/bitter/500.css';

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const removeWhitespace = [
  ...headings,
  'body',
  'button',
  'ol',
  'ul'
];

export default component('Page')
  .css({
    fontFamily: 'Bitter, serif',
    fontSize: '1rem',
    lineHeight: 1
  })
  .elements(e => ({
    header: e(),

    body: e()
  }))
  .global(s => ({
    button: s({
      backgroundColor: 'transparent',
      border: 0,
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
