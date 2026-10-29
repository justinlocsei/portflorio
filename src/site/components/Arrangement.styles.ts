import { component } from 'ruscus';

import { rhythm } from './styles.ts';

export default component('Arrangement')
  .css({
    display: 'flex',
    gap: rhythm(2)
  })
  .elements(e => ({
    media: e({
      flex: 'none'
    }),

    image: e(),

    meta: e({
      flex: 1
    }),

    details: e().children({
      date: e({
        fontSize: '2em'
      }),

      mechanic: e({
        fontSize: '1.25em',
        lineHeight: rhythm(2)
      })
    }),

    flowers: e({
      fontSize: '1.5em',
      marginTop: rhythm()
    }),

    flower: e().nested(s => ({
      '& + &': s({
        marginTop: rhythm(1)
      })
    }))
  }))
  .apply();
