import { component } from 'ruscus';

import { colors, transition } from './styles.ts';

export default component('Logo')
  .css({
    display: 'inline-flex',
    opacity: 0.9,
    ...transition('opacity')
  })
  .elements(e => ({
    image: e({
      display: 'block',
      height: 'auto',
      maxWidth: '100%'
    })
  }))
  .nested((s, { els }) => ({
    [`${els.root}:hover`]: s({
      opacity: 1
    }),

    [`${els.root}:focus-visible`]: s({
      backgroundColor: colors.focus,
      outline: `4px solid ${colors.focus}`,
      outlineOffset: 0
    })
  }))
  .variants((s, { els }) => ({
    header: s().nested({
      [els.image]: s({
        width: '20em'
      })
    })
  }))
  .apply();
