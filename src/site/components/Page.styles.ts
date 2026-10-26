import { component } from 'ruscus';

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const removeWhitespace = [
  ...headings,
  'ol',
  'ul'
];

export default component('Page')
  .elements(e => ({
    header: e(),

    body: e()
  }))
  .nested(s => ({
    li: s({ listStyle: 'none' }),

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
