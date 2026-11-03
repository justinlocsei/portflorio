import { component } from 'ruscus';

import { rhythm, views } from './styles.ts';

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
        columnGap: '5%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 30%)',
        justifyContent: 'start',
        rowGap: rhythm(2)
      })
    })
  }))
  .global((s, { els }) =>
    views({
      feed: {
        [els.root('grid')]: s().nested({
          [els.overviews]: s({
            justifyContent: 'center'
          })
        })
      },

      stacked: {
        [els.root('grid')]: s().nested({
          [els.overviews]: s({
            columnGap: '4%',
            gridTemplateColumns: 'repeat(auto-fill, 48%)'
          })
        })
      }
    })
  )
  .apply();
