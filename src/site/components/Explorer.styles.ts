import { component } from 'ruscus';

import { rhythm } from './styles.ts';

const sidebar = '22rem';

export default component('Explorer')
  .css({
    gap: rhythm(4),
    position: 'relative'
  })
  .elements(e => ({
    lens: e({
      bottom: 0,
      left: 0,
      top: 0,
      overflow: 'auto',
      padding: `${rhythm(2)} ${rhythm(3)}`,
      position: 'fixed',
      width: sidebar
    }),

    gallery: e({
      marginLeft: sidebar,
      padding: rhythm(2)
    })
  }))
  .apply();
