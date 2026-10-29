import { component } from 'ruscus';

export default component('Lens')
  .identifiers({
    swatch: 'variable'
  })
  .elements((e, { ids }) => ({
    section: e().children({
      title: e(),

      content: e()
    }),

    flowers: e(),

    flower: e({
      display: 'flex',
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
