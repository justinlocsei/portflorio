import { component } from 'ruscus';

import { rhythm } from './styles.ts';

export default component('Explorer')
  .css({
    display: 'flex',
    gap: rhythm(4)
  })
  .elements(e => ({
    lens: e({
      flex: '0 0 15rem',
      padding: `${rhythm(2)} ${rhythm(3)}`
    }),

    gallery: e({
      flex: 1,
      padding: rhythm(2),
      paddingLeft: 0
    })
  }))
  .apply();
