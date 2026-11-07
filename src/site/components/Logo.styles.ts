import { component } from 'ruscus';

import { colors, focusable, transition } from './styles.ts';

export default component('Logo')
  .css({
    display: 'inline-flex',
    opacity: 0.9,
    ...transition('opacity')
  })
  .is(focusable({
    backgroundColor: colors.focus,
    outline: `4px solid ${colors.focus}`,
    outlineOffset: 0
  }))
  .elements(e => ({
    image: e({
      display: 'block',
      height: 'auto',
      maxWidth: '100%'
    })
  }))
  .variants((s, { els }) => ({
    header: s().nested({
      [els.image]: s({
        width: '20em'
      })
    })
  }))
  .nested(s => ({
    '&:hover': s({
      opacity: 1
    })
  }))
  .apply();
