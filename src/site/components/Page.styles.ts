import { component } from 'ruscus';

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
    lineHeight: 1
  })
  .elements(e => ({
    header: e(),

    body: e()
  }))
  .global(s => ({
    button: s({
      backgroundColor: 'transparent',
      border: 0
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
