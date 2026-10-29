import { component } from 'ruscus';

import { rhythm } from './styles.ts';

export default component('Lens')
  .identifiers({
    swatch: 'variable'
  })
  .elements((e, { ids }) => ({
    section: e().children({
      title: e({
        fontSize: '1.5em',
        marginBottom: rhythm(1.5)
      }),

      content: e()
    }).nested(s => ({
      '& + &': s({
        marginTop: rhythm(2)
      })
    })),

    flowers: e(),

    flower: e({
      display: 'flex',
      lineHeight: 2,
      justifyContent: 'space-between'
    }).children({
      name: e(),

      count: e()
    }).variants(s => ({
      available: s(),
      unavailable: s()
    })),

    colors: e({
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(3rem, 1fr))',
      gap: '1em'
    }),

    color: e().children({
      swatch: e({
        backgroundColor: `var(${ids.swatch})`,
        display: 'block',
        height: '3em',
        width: '3em'
      }),

      count: e()
    })
  }))
  .apply();
