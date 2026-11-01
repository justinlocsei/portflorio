import { component } from 'ruscus';

import { rhythm } from './styles.ts';

export default component('Gallery')
  .elements(e => ({
    overviews: e(),

    overview: e()
  }))
  .variants((s, { els }) => ({
    list: s().nested({
      [`${els.overview} + ${els.overview}`]: s({
        marginTop: rhythm(4)
      })
    }),

    grid: s().nested({
      [els.overviews]: s({
        display: 'grid',
        gap: rhythm(2),
        gridTemplateColumns: 'repeat(auto-fill, 30%)',
        justifyContent: 'start'
      })
    })
  }))
  .apply();
